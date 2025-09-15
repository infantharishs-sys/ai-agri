import { WeatherData, MarketPrice, Scheme, Language, Alert, UserProfile, DiagnosisResult } from '../types';

export const getMockWeather = async (): Promise<WeatherData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        temp: 32,
        condition: 'Sunny',
        humidity: 65,
        wind: 10,
      });
    }, 500);
  });
};

export const getMockMarketPrices = async (): Promise<MarketPrice[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { crop: 'Tomato', price: 25, volatility: 'High' },
        { crop: 'Onion', price: 20, volatility: 'Medium' },
        { crop: 'Potato', price: 15, volatility: 'Low' },
        { crop: 'Carrot', price: 30, volatility: 'Medium' },
        { crop: 'Cotton', price: 5500, volatility: 'Medium' },
      ]);
    }, 500);
  });
};

export const getMockAlerts = async (lang: Language): Promise<Alert[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 'pest1',
                    type: 'pest',
                    title: {
                        [Language.EN]: 'Pest Alert',
                        [Language.HI]: 'कीट चेतावनी',
                        [Language.TA]: 'பூச்சி எச்சரிக்கை',
                    },
                    message: {
                        [Language.EN]: 'High chance of pest attack in cotton crops this week. Consider preventive spraying.',
                        [Language.HI]: 'इस सप्ताह कपास की फसलों में कीटों के हमले की प्रबल संभावना है। निवारक छिड़काव पर विचार करें।',
                        [Language.TA]: 'இந்த வாரம் பருத்திப் பயிர்களில் பூச்சித் தாக்குதலுக்கு அதிக வாய்ப்புள்ளது. தடுப்பு தெளிப்பைக் கவனியுங்கள்.',
                    },
                    isActionable: false,
                },
                {
                    id: 'ins1',
                    type: 'insurance',
                    title: {
                        [Language.EN]: 'Insurance Claim Opportunity',
                        [Language.HI]: 'बीमा दावा अवसर',
                        [Language.TA]: 'காப்பீட்டு உரிமைகோரல் வாய்ப்பு',
                    },
                    message: {
                        [Language.EN]: 'A severe hailstorm was recorded in your area. Your crops may be eligible for an insurance claim.',
                        [Language.HI]: 'आपके क्षेत्र में भीषण ओलावृष्टि दर्ज की गई। आपकी फसलें बीमा दावे के लिए पात्र हो सकती हैं।',
                        [Language.TA]: 'உங்கள் பகுதியில் கடுமையான ஆலங்கட்டி மழை பதிவாகியுள்ளது. உங்கள் பயிர்கள் காப்பீட்டு உரிமைகோரலுக்கு தகுதியுடையதாக இருக்கலாம்.',
                    },
                    isActionable: true,
                    actionText: {
                        [Language.EN]: 'Start Claim Process',
                        [Language.HI]: 'दावा प्रक्रिया शुरू करें',
                        [Language.TA]: 'உரிமைகோரல் செயல்முறையைத் தொடங்குங்கள்',
                    },
                },
            ]);
        }, 700);
    });
};


export const getMockSchemes = async (): Promise<Scheme[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 'pm-kisan',
          name: {
            [Language.EN]: 'PM-KISAN Scheme',
            [Language.HI]: 'पीएम-किसान योजना',
            [Language.TA]: 'பிஎம்-கிசான் திட்டம்',
          },
          benefit: {
            [Language.EN]: 'Financial support of ₹6,000 per year to all landholding farmer families.',
            [Language.HI]: 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता।',
            [Language.TA]: 'அனைத்து நில உரிமையாளர் விவசாயி குடும்பங்களுக்கும் ஆண்டுக்கு ₹6,000 நிதி உதவி.',
          },
          documents: {
            [Language.EN]: ['Aadhaar Card', 'Land Record Document'],
            [Language.HI]: ['आधार कार्ड', 'भूमि रिकॉर्ड दस्तावेज़'],
            [Language.TA]: ['ஆதார் அட்டை', 'நில பதிவு ஆவணம்'],
          },
        },
        {
          id: 'fasal-bima',
          name: {
            [Language.EN]: 'Pradhan Mantri Fasal Bima Yojana',
            [Language.HI]: 'प्रधानमंत्री फसल बीमा योजना',
            [Language.TA]: 'பிரதம மந்திரி ஃபசல் பீமா யோஜனா',
          },
          benefit: {
            [Language.EN]: 'Insurance coverage against crop failure due to natural calamities.',
            [Language.HI]: 'प्राकृतिक आपदाओं के कारण फसल खराब होने पर बीमा कवरेज।',
            [Language.TA]: 'இயற்கை சீற்றங்களால் பயிர் சேதம் அடைந்தால் காப்பீடு.',
          },
          documents: {
            [Language.EN]: ['Aadhaar Card', 'Land Record', 'Bank Passbook'],
            [Language.HI]: ['आधार कार्ड', 'भूमि रिकॉर्ड', 'बैंक पासबुक'],
            [Language.TA]: ['ஆதார் அட்டை', 'நில பதிவு', 'வங்கி பாஸ்புக்'],
          },
        },
      ]);
    }, 800);
  });
};

export const getMockWarehouseData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        totalCapacity: 5000, // in Quintals
        occupied: 3750,
      });
    }, 600);
  });
};
