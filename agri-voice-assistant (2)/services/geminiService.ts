import { GoogleGenAI, Type } from "@google/genai";
import { Language, UserProfile, DiagnosisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const getLanguageName = (lang: Language): string => {
    const langMap = {
        [Language.EN]: 'English',
        [Language.HI]: 'Hindi',
        [Language.TA]: 'Tamil',
    };
    return langMap[lang];
}

const getBaseSystemInstruction = (lang: Language): string => `You are an expert agricultural assistant for Indian farmers. 
Your name is "Agri-Mitra". 
You provide concise, practical, and easy-to-understand advice on farming topics. 
Always respond in ${getLanguageName(lang)}.`;

const handleError = (error: any, lang: Language): string => {
    console.error("Error getting advice from Gemini:", error);
    if (lang === Language.HI) {
        return 'क्षमा करें, मुझे अभी कोई त्रुटि आ रही है। कृपया बाद में प्रयास करें।';
    } else if (lang === Language.TA) {
        return 'மன்னிக்கவும், நான் இப்போது ஒரு பிழையை எதிர்கொள்கிறேன். தயவுசெய்து பின்னர் முயற்சிக்கவும்.';
    }
    return 'Sorry, I am facing an error right now. Please try again later.';
}

// For VoiceModal
export const getGeminiAdvice = async (query: string, lang: Language): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{ text: query }] },
      config: {
        systemInstruction: `${getBaseSystemInstruction(lang)} Keep your answers short, friendly, and to the point (no more than 3-4 sentences).`,
      },
    });
    return response.text;
  } catch (error) {
    return handleError(error, lang);
  }
};

// For CropAdvicePage
export const getGeminiDetailedCropAdvice = async (crop: string, area: number, soil: string, lang: Language): Promise<string> => {
    const prompt = `Create a detailed, step-by-step crop plan for a farmer in India planting ${crop} on a ${area} acre farm with ${soil} soil. The plan should be easy to follow and practical. Include the following sections, clearly marked: 
1.  **Land Prep:** 
2.  **Seeds:** 
3.  **Fertilizer:** 
4.  **Irrigation:** 
Conclude with a general disclaimer to consult local experts. The response should be formatted using Markdown.`;
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: getBaseSystemInstruction(lang),
            },
        });
        return response.text;
    } catch (error) {
        return handleError(error, lang);
    }
};

// For AlliedFarmingPage (Intercropping)
export const getGeminiIntercroppingAdvice = async (mainCrop: string, lang: Language): Promise<string> => {
    const prompt = `What are 2-3 good intercropping options for a farmer in India growing ${mainCrop}? For each option, briefly explain the benefits (e.g., pest control, soil health, extra income).`;
     try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: getBaseSystemInstruction(lang),
            },
        });
        return response.text;
    } catch (error) {
        return handleError(error, lang);
    }
}

// For AlliedFarmingPage (Livestock)
export const getGeminiLivestockFeedAdvice = async (profile: UserProfile, lang: Language): Promise<string> => {
    const prompt = `I am a farmer in India with ${profile.livestock.cows} cows and ${profile.livestock.chickens} chickens. How can I use my crop residues (like maize stalks, wheat straw, etc.) to create supplementary feed for them? Provide simple, practical tips.`;
     try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: getBaseSystemInstruction(lang),
            },
        });
        return response.text;
    } catch (error) {
        return handleError(error, lang);
    }
}

// For DiseaseFinderPage
export const getGeminiDiseaseDiagnosis = async (imageData: string, lang: Language): Promise<DiagnosisResult> => {
    const mimeType = imageData.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
    const base64Data = imageData.split(',')[1];

    const imagePart = {
        inlineData: {
            mimeType: mimeType,
            data: base64Data,
        },
    };
    
    const textPart = {
        text: `Analyze this image of a plant leaf. Your response MUST be in JSON.
        - Is the plant healthy? (isHealthy: boolean)
        - What is the crop? (crop: string)
        - If it's not healthy, what is the disease? If healthy, state 'Healthy'. (disease: string)
        - What is the remedy? If healthy, give a positive encouragement. (remedy: string)
        Translate the 'crop', 'disease', and 'remedy' fields into ${getLanguageName(lang)}.
        `
    };

    const diagnosisSchema = {
        type: Type.OBJECT,
        properties: {
            isHealthy: { type: Type.BOOLEAN },
            crop: { type: Type.STRING },
            disease: { type: Type.STRING },
            remedy: { type: Type.STRING },
        },
        required: ['isHealthy', 'crop', 'disease', 'remedy']
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: diagnosisSchema,
            },
        });
        
        const jsonResponse = JSON.parse(response.text);

        const langCode = lang as string;
        const diagnosis: DiagnosisResult = {
            isHealthy: jsonResponse.isHealthy,
            crop: { en: '', hi: '', ta: '' },
            disease: { en: '', hi: '', ta: '' },
            remedy: { en: '', hi: '', ta: '' },
        };
        diagnosis.crop[langCode] = jsonResponse.crop;
        diagnosis.disease[langCode] = jsonResponse.disease;
        diagnosis.remedy[langCode] = jsonResponse.remedy;

        return diagnosis;

    } catch (error) {
        console.error("Error getting diagnosis from Gemini:", error);
        const langCode = lang as string;
        const errorResult: DiagnosisResult = {
            isHealthy: false,
            crop: { en: '', hi: '', ta: '' },
            disease: { en: '', hi: '', ta: '' },
            remedy: { en: '', hi: '', ta: '' },
        };
        errorResult.crop[langCode] = 'Unknown';
        errorResult.disease[langCode] = 'Analysis Error';
        errorResult.remedy[langCode] = handleError(error, lang);
        return errorResult;
    }
};