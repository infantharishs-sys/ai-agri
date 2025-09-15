import { Translation, Language } from './types';

export const ICONS = {
  mic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
  plant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M14 20c-5.5-2.5-.8-6.4-3-10"/><path d="M12 20V10"/><path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13V8a5 5 0 0 1 10 0v5a7 7 0 0 1-7 7m0 0v-5"/><path d="M11 8.92a5.002 5.002 0 0 0 5.21-1.66A5 5 0 0 1 19 8v5a7 7 0 0 1-7 7h0"/></svg>`,
  coins: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="M16.71 13.89l.7-1.79-2.13-.82-.7 1.79 2.13.82z"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  readAloud: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  idCard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M14 14c-2.5 0-4.5-2-4.5-4.5S11.5 5 14 5s4.5 2 4.5 4.5-2 4.5-4.5 4.5Z"/><path d="M13 14h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1"/></svg>`,
  document: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  cow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.6 6.4c.3.2.5.5.6.9s.1.8-.1 1.2l-1.6 4.5c-.2.5-.5 1-.9 1.4s-1 .8-1.5.9c-.6.1-1.2 0-1.8-.3s-1.1-.7-1.4-1.2l-2.3-3.4-1-.1c-.6 0-1.2.1-1.7.4s-1 .6-1.3 1.1c-.4.5-.6 1-.7 1.6s-.1 1.2.1 1.8l1.6 4.5c.2.5.5 1 .9 1.4s1 .8 1.5.9c.6.1 1.2 0 1.8-.3s1.1-.7 1.4-1.2l5.2-7.5c.3-.4.5-.8.6-1.3s.1-.9-.1-1.4l-1.5-4.3c-.2-.5-.5-1-.9-1.3s-.9-.6-1.5-.7c-.6-.1-1.1.1-1.7.4s-1.1.7-1.4 1.2l-1.9 2.8"/><path d="M5.5 14.5c-1.3 0-2.5-1.1-2.5-2.5S4.2 9.5 5.5 9.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/><path d="m15 5 1-2"/><path d="M7 21h-1a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"/></svg>`,
  chicken: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.72 13.59a8.4 8.4 0 0 1-1.12 3.82c-.99 1.35-2.4 2.15-4.33 2.54"/><path d="m13.27 12.33 2.01 2.01"/><path d="M12.26 15.17 14 17h-4l-1.2-2.16"/><path d="M16.5 7.5c.42.06.85.11 1.28.16"/><path d="M17.5 12c.38-.2.75-.41 1.1-.64"/><path d="M12 2a4 4 0 0 0-4 4c0 1.48.81 2.77 2 3.46"/><path d="M12.33 10.73 14 9l-1.1 2.21"/><path d="m3.5 15.5.9-1.51"/><path d="M10.5 19.5 10 21"/><path d="M4 11.5c-.34.23-.67.49-.99.76"/><path d="M7.5 4.5c.42-.06.85-.11 1.28-.16"/></svg>`,
  risk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11.94 14.23-1.23 2.45a.55.55 0 0 1-1.01-.02l-1.22-3.61a.53.53 0 0 1 .6-.64l3.61 1.22a.55.55 0 0 1 .02 1.01Z"/><path d="M10.23 7.21 8.34 5.32a.5.5 0 0 0-.71 0L5.32 7.63a.5.5 0 0 0 0 .71l1.89 1.89a.5.5 0 0 0 .71 0l2.31-2.31a.5.5 0 0 0 0-.71Z"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>`,
  scan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" x2="17" y1="12" y2="12"/></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  bug: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20c-4.4 0-8-3.6-8-8V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5c0 4.4-3.6 8-8 8Z"/><path d="M12 20v-8"/><path d="M6.5 12h11"/><path d="m10 7-1-3"/><path d="m14 7 1-3"/></svg>`,
  warehouse: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8l9-5 9 5v13h-4v-9H7v9H3z"/><path d="M7 21v-5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5"/></svg>`,
  alliedFarming: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22V8.2c0-.5.4-.8.9-.6l5.2 2.3c.5.2.9.7.9 1.3v10.8A2 2 0 0 1 19 22H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1"/><path d="M18 10a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4a2 2 0 0 0-2 2"/><path d="M10 16h4"/></svg>`,
  insuranceClaim: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="m10 13 2 2 4-4"/></svg>`,
};

export const TRANSLATIONS: Translation = {
  // Onboarding
  "select_language": { [Language.EN]: "Select Language", [Language.HI]: "भाषा चुने", [Language.TA]: "மொழியை தேர்ந்தெடு" },
  "welcome_please_say_number": { [Language.EN]: "Welcome! Tap the mic or type your 10-digit mobile number.", [Language.HI]: "आपका स्वागत है! माइक पर टैप करें या अपना 10 अंकों का मोबाइल नंबर टाइप करें।",[Language.TA]: "வரவேற்பு! மைக்கைத் தட்டவும் அல்லது உங்கள் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்." },
  "confirm_number": { [Language.EN]: "Confirm Number", [Language.HI]: "नंबर की पुष्टि करें", [Language.TA]: "எண்ணை உறுதிப்படுத்தவும்" },
  "listening": { [Language.EN]: "Listening...", [Language.HI]: "सुन रहा है...", [Language.TA]: "கேட்கிறது..." },
  "farm_setup": { [Language.EN]: "Farm Setup", [Language.HI]: "खेत सेटअप", [Language.TA]: "பண்ணை அமைப்பு" },
  "what_farm_size": { [Language.EN]: "What is your farm size?", [Language.HI]: "आपके खेत का आकार क्या है?", [Language.TA]: "உங்கள் பண்ணையின் அளவு என்ன?" },
  "acres": { [Language.EN]: "acres", [Language.HI]: "एकड़", [Language.TA]: "ஏக்கர்" },
  "what_soil_type": { [Language.EN]: "What is your soil type?", [Language.HI]: "आपकी मिट्टी का प्रकार क्या है?", [Language.TA]: "உங்கள் மண்ணின் வகை என்ன?" },
  "how_many_livestock": { [Language.EN]: "Do you have any livestock?", [Language.HI]: "क्या आपके पास कोई पशुधन है?", [Language.TA]: "உங்களிடம் கால்நடைகள் உள்ளதா?" },
  "cows": { [Language.EN]: "Cows", [Language.HI]: "गायें", [Language.TA]: "மாடுகள்" },
  "chickens": { [Language.EN]: "Chickens", [Language.HI]: "मुर्गियां", [Language.TA]: "கோழிகள்" },
  "get_location": { [Language.EN]: "Set Farm Location", [Language.HI]: "खेत का स्थान निर्धारित करें", [Language.TA]: "பண்ணை இருப்பிடத்தை அமைக்கவும்" },
  "location_set": { [Language.EN]: "Location Set!", [Language.HI]: "स्थान निर्धारित!", [Language.TA]: "இருப்பிடம் அமைக்கப்பட்டது!" },
  "finish_setup": { [Language.EN]: "Finish Setup", [Language.HI]: "सेटअप समाप्त करें", [Language.TA]: "அமைப்பை முடிக்கவும்" },

  // Dashboard
  "dashboard": { [Language.EN]: "Dashboard", [Language.HI]: "डैशबोर्ड", [Language.TA]: "டாஷ்போர்டு" },
  "ask_here": { [Language.EN]: "Ask Here", [Language.HI]: "यहां पूछें", [Language.TA]: "இங்கே கேளுங்கள்" },
  "crop_advice": { [Language.EN]: "Crop Advice", [Language.HI]: "फसल सलाह", [Language.TA]: "பயிர் ஆலோசனை" },
  "allied_farming": { [Language.EN]: "Allied Farming", [Language.HI]: "संबद्ध खेती", [Language.TA]: "சார்பு விவசாயம்" },
  "market_prices": { [Language.EN]: "Market Prices", [Language.HI]: "बाजार मूल्य", [Language.TA]: "சந்தை விலைகள்" },
  "schemes_loans": { [Language.EN]: "Schemes & Loans", [Language.HI]: "योजनाएं और ऋण", [Language.TA]: "திட்டங்கள் & கடன்கள்" },
  "weather_forecast": { [Language.EN]: "Weather Forecast", [Language.HI]: "मौसम पूर्वानुमान", [Language.TA]: "வானிலை முன்னறிவிப்பு" },
  "smart_alerts": { [Language.EN]: "Smart Alerts", [Language.HI]: "स्मार्ट अलर्ट", [Language.TA]: "ஸ்மார்ட் விழிப்பூட்டல்கள்" },
  "warehouse_availability": { [Language.EN]: "Warehouse", [Language.HI]: "गोदाम", [Language.TA]: "கிடங்கு" },
  "price_volatility": { [Language.EN]: "Price Volatility", [Language.HI]: "मूल्य अस्थिरता", [Language.TA]: "விலை અસ્થિરતા" },
  "disease_finder": { [Language.EN]: "Disease Finder", [Language.HI]: "रोग खोजक", [Language.TA]: "நோய் கண்டறிதல்" },

  // Schemes
  "find_schemes": { [Language.EN]: "Find Schemes for Me", [Language.HI]: "मेरे लिए योजनाएं खोजें", [Language.TA]: "எனக்கான திட்டங்களைக் கண்டறியவும்" },
  "eligible_schemes": { [Language.EN]: "Eligible Schemes", [Language.HI]: "योग्य योजनाएं", [Language.TA]: "தகுதியான திட்டங்கள்" },
  "required_documents": { [Language.EN]: "Required Documents", [Language.HI]: "आवश्यक दस्तावेज़", [Language.TA]: "தேவையான ஆவணங்கள்" },
  "read_aloud": { [Language.EN]: "Read Aloud", [Language.HI]: "जोर से पढ़ें", [Language.TA]: "உரக்கப்படி" },
  "stop": { [Language.EN]: "Stop", [Language.HI]: "रोकें", [Language.TA]: "நிறுத்து" },
  
  // Voice Modal
  "ask_your_question": { [Language.EN]: "Ask your question...", [Language.HI]: "अपना सवाल पूछें...", [Language.TA]: "உங்கள் கேள்வியைக் கேளுங்கள்..." },
  "processing": { [Language.EN]: "Thinking...", [Language.HI]: "सोच रहा हूँ...", [Language.TA]: "சிந்திக்கிறேன்..." },
  "ai_response": { [Language.EN]: "AI Response", [Language.HI]: "एआई प्रतिक्रिया", [Language.TA]: "AI பதில்" },
  "close": { [Language.EN]: "Close", [Language.HI]: "बंद करे", [Language.TA]: "மூடு" },

  // Crop Advice Form
  "get_crop_advice": { [Language.EN]: "Get Crop Advice", [Language.HI]: "फसल सलाह प्राप्त करें", [Language.TA]: "பயிர் ஆலோசனை பெறுங்கள்" },
  "step_1_crop": { [Language.EN]: "Step 1: What crop will you plant?", [Language.HI]: "चरण 1: आप कौन सी फसल लगाएंगे?", [Language.TA]: "படி 1: நீங்கள் என்ன பயிர் நடுவீர்கள்?" },
  "step_2_area": { [Language.EN]: "Step 2: How much land area?", [Language.HI]: "चरण 2: कितनी भूमि क्षेत्र?", [Language.TA]: "படி 2: எவ்வளவு நிலப்பரப்பு?" },
  "get_advice": { [Language.EN]: "Get Advice", [Language.HI]: "सलाह लें", [Language.TA]: "ஆலோசனைப் பெறுங்கள்" },
  "your_crop_plan": { [Language.EN]: "Your Custom Crop Plan", [Language.HI]: "आपकी व्यक्तिगत फसल योजना", [Language.TA]: "உங்கள் தனிப்பயன் பயிர் திட்டம்" },

  // Allied Farming
  "intercropping": { [Language.EN]: "Intercropping", [Language.HI]: "अंतरफसल", [Language.TA]: "ஊடுபயிர்" },
  "livestock_feed": { [Language.EN]: "Livestock Feed", [Language.HI]: "पशु चारा", [Language.TA]: "கால்நடை தீவனம்" },
  "ipm": { [Language.EN]: "Pest Management", [Language.HI]: "कीट प्रबंधन", [Language.TA]: "பூச்சி மேலாண்மை" },
  "select_main_crop": { [Language.EN]: "Select your main crop for suggestions:", [Language.HI]: "सुझावों के लिए अपनी मुख्य फसल चुनें:", [Language.TA]: "பரிந்துரைகளுக்கு உங்கள் முக்கிய பயிரைத் தேர்ந்தெடுக்கவும்:" },

  // Disease Finder
  "upload_image_prompt": { [Language.EN]: "Hello! Please upload an image of the plant leaf you're concerned about.", [Language.HI]: "नमस्ते! कृपया जिस पौधे की पत्ती के बारे में आप चिंतित हैं, उसकी एक तस्वीर अपलोड करें।", [Language.TA]: "வணக்கம்! நீங்கள் கவலைப்படும் தாவர இலையின் படத்தை பதிவேற்றவும்." },
  "upload_button": { [Language.EN]: "Upload Image", [Language.HI]: "छवि अपलोड करें", [Language.TA]: "படத்தை பதிவேற்று" },
  "analyzing": { [Language.EN]: "Analyzing image...", [Language.HI]: "छवि का विश्लेषण किया जा रहा है...", [Language.TA]: "படத்தை பகுப்பாய்வு செய்கிறது..." },

  // TTS specific
  "market_prices_list_tts": {
    [Language.EN]: "Current market prices per quintal are: {list}.",
    [Language.HI]: "वर्तमान बाजार मूल्य प्रति क्विंटल हैं: {list}।",
    [Language.TA]: "ஒரு குவிண்டாலுக்கான தற்போதைய சந்தை விலைகள்: {list}."
  },
  "crop_price_tts_item": {
      [Language.EN]: "{crop}, {price} rupees",
      [Language.HI]: "{crop}, {price} रुपये",
      [Language.TA]: "{crop}, {price} ரூபாய்"
  }
};