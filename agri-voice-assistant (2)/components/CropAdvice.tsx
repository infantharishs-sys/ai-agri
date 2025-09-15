import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getGeminiDetailedCropAdvice } from '../services/geminiService';
import { ICONS } from '../constants';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Language } from '../types';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const CropAdvicePage: React.FC = () => {
    const { translate, language, userProfile, speak, isSpeaking, stopSpeaking } = useAppContext();
    const [step, setStep] = useState(1);
    const [crop, setCrop] = useState('');
    const [area, setArea] = useState(userProfile?.farmSize || 5);
    const [advice, setAdvice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSpeechResult = (transcript: string) => {
        setCrop(transcript.split(' ')[0]); // Take the first word as crop
    };

    const { isListening, startListening, isSupported } = useSpeechRecognition({
        onResult: handleSpeechResult,
        lang: language,
    });
    
    const popularCrops = {
        [Language.EN]: ["Cotton", "Wheat", "Rice", "Tomato"],
        [Language.HI]: ["कपास", "गेहूं", "चावल", "टमाटर"],
        [Language.TA]: ["பருத்தி", "கோதுமை", "அரிசி", "தக்காளி"],
    }

    const handleGetAdvice = async () => {
        if (!crop || !area || !userProfile) return;
        setIsLoading(true);
        const result = await getGeminiDetailedCropAdvice(crop, area, userProfile.soilType, language);
        setAdvice(result);
        setIsLoading(false);
        setStep(3);
    }
    
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
                <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                <p className="mt-6 text-lg font-semibold text-gray-700">{translate('processing')}</p>
            </div>
        )
    }

    if (step === 3) {
        return (
            <div className="p-4 space-y-4">
                 <h2 className="text-2xl font-bold text-gray-800 px-2">{translate('your_crop_plan')}</h2>
                 <div className="p-5 bg-white rounded-2xl shadow-lg">
                    <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: advice.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></div>
                 </div>
                 {advice && (
                    <button
                        onClick={() => isSpeaking ? stopSpeaking() : speak(advice)}
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition flex items-center justify-center space-x-2 shadow-lg"
                    >
                        <Icon svg={isSpeaking ? ICONS.x : ICONS.readAloud} className="w-6 h-6" />
                        <span>{isSpeaking ? translate('stop') : translate('read_aloud')}</span>
                    </button>
                 )}
                 <button onClick={() => {setStep(1); setCrop(''); stopSpeaking();}} className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg">
                    Start Over
                 </button>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-10">
            {/* Step 1: Select Crop */}
            <div className={`${step === 1 ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{translate('step_1_crop')}</h3>
                <div className="relative my-2">
                     <input
                      type="text"
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      placeholder="e.g., Cotton"
                      className="w-full text-lg p-4 pr-16 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    />
                    {isSupported && (
                        <button
                            onClick={startListening}
                            className="absolute inset-y-0 right-0 flex items-center justify-center px-4 rounded-r-xl group"
                        >
                            <Icon svg={ICONS.mic} className={`h-7 w-7 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-green-600 group-hover:text-green-800'}`} />
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {popularCrops[language].map(c => (
                        <button key={c} onClick={() => setCrop(c)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${crop === c ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                            {c}
                        </button>
                    ))}
                </div>
                <button onClick={() => setStep(2)} disabled={!crop} className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-xl disabled:bg-gray-300 shadow-lg hover:bg-blue-600 transition">
                    Next
                </button>
            </div>

            {/* Step 2: Select Area */}
            <div className={`${step === 2 ? 'opacity-100' : 'opacity-60'}`}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{translate('step_2_area')}</h3>
                 <div className="p-5 bg-white rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-4">
                        <input type="range" min="1" max="50" value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                        <span className="font-bold text-green-700 text-xl w-24 text-center">{area} {translate('acres')}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleGetAdvice}
                disabled={!crop || step !== 2}
                className="w-full py-4 px-6 bg-green-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:bg-green-700 disabled:bg-gray-400 transition-all transform hover:scale-105"
            >
                {translate('get_advice')}
            </button>
        </div>
    );
};