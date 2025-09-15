import React, { useState, useEffect } from 'react';
import { Language, UserProfile } from '../types';
import { useAppContext } from '../context/AppContext';
import { ICONS } from '../constants';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

const LanguageSelector: React.FC<{ onSelect: (lang: Language) => void }> = ({ onSelect }) => {
  const { translate } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-green-50">
      <h1 className="text-3xl font-bold mb-10 text-green-800">{translate('select_language')}</h1>
      <div className="w-full max-w-sm space-y-5">
        <button onClick={() => onSelect(Language.EN)} className="w-full text-left p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-6 hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
          <span className="text-4xl font-bold text-green-700">Abc</span>
          <span className="text-xl font-semibold text-gray-800">English</span>
        </button>
        <button onClick={() => onSelect(Language.HI)} className="w-full text-left p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-6 hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
          <span className="text-4xl font-bold text-green-700">अ</span>
          <span className="text-xl font-semibold text-gray-800">हिन्दी</span>
        </button>
        <button onClick={() => onSelect(Language.TA)} className="w-full text-left p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-6 hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
          <span className="text-4xl font-bold text-green-700">அ</span>
          <span className="text-xl font-semibold text-gray-800">தமிழ்</span>
        </button>
      </div>
    </div>
  );
};

const VoiceLogin: React.FC<{ onComplete: (mobile: string) => void }> = ({ onComplete }) => {
  const { language, translate } = useAppContext();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSpeechResult = (transcript: string) => {
    const numbers = transcript.replace(/\D/g, ''); // Remove all non-digits
    if (numbers.length >= 10) {
      setMobileNumber(numbers.substring(0, 10));
    }
  };

  const { isListening, startListening, isSupported } = useSpeechRecognition({
    onResult: handleSpeechResult,
    lang: language,
  });
  
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\D/g, '');
    if (sanitizedValue.length <= 10) {
      setMobileNumber(sanitizedValue);
    }
  };

  if (otpSent) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-50 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Enter OTP</h2>
            <p className="text-gray-600 mb-6 max-w-xs">We've sent an OTP to {mobileNumber}. (Hint: Any 4 digits will work)</p>
            <input 
              type="tel"
              pattern="[0-9]*"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="p-4 text-3xl tracking-[1.5em] text-center w-56 rounded-xl border-2 border-green-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
            <button
                onClick={() => onComplete(mobileNumber)}
                disabled={otp.length < 4}
                className="mt-8 w-full max-w-sm py-4 px-6 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105"
            >
                Verify
            </button>
        </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-50 text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-4 max-w-xs">{translate('welcome_please_say_number')}</h2>
      
      <div className="relative w-full max-w-sm my-6">
        <input
          type="tel"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          placeholder="Enter or say number"
          className="w-full text-2xl font-mono p-4 pr-16 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          maxLength={10}
        />
        {isSupported && (
            <button
                onClick={startListening}
                className="absolute inset-y-0 right-0 flex items-center justify-center px-4 rounded-r-xl group"
                aria-label="Use microphone to enter number"
            >
                <Icon svg={ICONS.mic} className={`h-8 w-8 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-green-600 group-hover:text-green-800'}`} />
            </button>
        )}
      </div>

       {isListening && <p className="text-lg text-green-700 mt-2">{translate('listening')}</p>}

       <button
        onClick={() => setOtpSent(true)}
        disabled={mobileNumber.length !== 10}
        className="mt-8 w-full max-w-sm py-4 px-6 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105"
      >
        {translate('confirm_number')}
      </button>
    </div>
  );
};

const FarmSetup: React.FC<{ mobile: string, onComplete: (profile: UserProfile) => void }> = ({ mobile, onComplete }) => {
    const { translate } = useAppContext();
    const [farmSize, setFarmSize] = useState<number>(5);
    const [soilType, setSoilType] = useState<'loamy' | 'clay' | 'sandy' | 'silty' | null>(null);
    const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [livestock, setLivestock] = useState({ cows: 0, chickens: 0 });

    const handleGetLocation = () => {
        setIsFetchingLocation(true);
        const options = {
            enableHighAccuracy: false, // Prioritize speed over accuracy
            timeout: 10000,          // 10-second timeout
            maximumAge: 0            // Don't use a cached position
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
                setIsFetchingLocation(false);
            },
            (error) => {
                console.error(`Error getting location: ${error.message} (Code: ${error.code})`);
                setIsFetchingLocation(false);
                // Fallback location for testing
                setLocation({ lat: 28.6139, lon: 77.2090 });
            },
            options
        );
    };
    
    const handleLivestockChange = (type: 'cows' | 'chickens', value: number) => {
        setLivestock(prev => ({...prev, [type]: value}));
    };

    const isComplete = farmSize && soilType && location;

    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-50 overflow-y-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{translate('farm_setup')}</h2>

            <div className="mb-8 p-5 bg-white rounded-2xl shadow-lg">
                <label className="block text-lg font-semibold text-gray-700 mb-3">{translate('what_farm_size')}</label>
                <div className="flex items-center space-x-4">
                    <input type="range" min="1" max="50" value={farmSize} onChange={(e) => setFarmSize(Number(e.target.value))} className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                    <span className="font-bold text-green-700 text-xl w-24 text-center">{farmSize} {translate('acres')}</span>
                </div>
            </div>

            <div className="mb-8 p-5 bg-white rounded-2xl shadow-lg">
                <label className="block text-lg font-semibold text-gray-700 mb-4">{translate('what_soil_type')}</label>
                <div className="grid grid-cols-2 gap-4">
                    {(['loamy', 'clay', 'sandy', 'silty'] as const).map(type => (
                        <button key={type} onClick={() => setSoilType(type)} className={`p-4 rounded-xl text-center font-semibold transition-all duration-200 ${soilType === type ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-500' : 'bg-gray-100 hover:bg-green-100 text-gray-700'}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-8 p-5 bg-white rounded-2xl shadow-lg">
                <label className="block text-lg font-semibold text-gray-700 mb-3">{translate('how_many_livestock')}</label>
                <div className="space-y-5 mt-4">
                    <div>
                        <label className="flex items-center text-md text-gray-600 mb-2">
                            <Icon svg={ICONS.cow} className="w-6 h-6 mr-3 text-blue-600"/>
                            <span className="font-medium">{translate('cows')}</span>
                        </label>
                        <div className="flex items-center space-x-4">
                            <input type="range" min="0" max="20" value={livestock.cows} onChange={(e) => handleLivestockChange('cows', Number(e.target.value))} className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                            <span className="font-bold text-blue-700 text-xl w-12 text-center">{livestock.cows}</span>
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center text-md text-gray-600 mb-2">
                            <Icon svg={ICONS.chicken} className="w-6 h-6 mr-3 text-red-600"/>
                            <span className="font-medium">{translate('chickens')}</span>
                        </label>
                        <div className="flex items-center space-x-4">
                            <input type="range" min="0" max="100" step="5" value={livestock.chickens} onChange={(e) => handleLivestockChange('chickens', Number(e.target.value))} className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
                            <span className="font-bold text-red-700 text-xl w-12 text-center">{livestock.chickens}</span>
                        </div>
                    </div>
                </div>
            </div>

             <div className="mb-6 p-5 bg-white rounded-2xl shadow-lg">
                <button onClick={handleGetLocation} disabled={isFetchingLocation || !!location} className="w-full py-3.5 px-4 bg-blue-500 text-white font-bold rounded-xl shadow-md hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-300 flex items-center justify-center text-lg">
                    {isFetchingLocation ? 'Fetching...' : location ? translate('location_set') : translate('get_location')}
                    {location && <Icon svg={ICONS.check} className="w-6 h-6 ml-3" />}
                </button>
             </div>

            <button
                onClick={() => onComplete({ mobileNumber: mobile, farmSize, soilType: soilType!, location: location!, livestock })}
                disabled={!isComplete}
                className="mt-auto w-full py-4 px-6 bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-700 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105"
            >
                {translate('finish_setup')}
            </button>
        </div>
    );
};


export const Onboarding: React.FC = () => {
  const { setLanguage, setUserProfile } = useAppContext();
  const [step, setStep] = useState(0);
  const [mobile, setMobile] = useState('');

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setStep(1);
  };
  
  const handleLoginComplete = (mobileNumber: string) => {
    setMobile(mobileNumber);
    setStep(2);
  };

  const handleSetupComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };
  
  if (step === 0) return <LanguageSelector onSelect={handleLanguageSelect} />;
  if (step === 1) return <VoiceLogin onComplete={handleLoginComplete} />;
  if (step === 2) return <FarmSetup mobile={mobile} onComplete={handleSetupComplete} />;

  return null;
};