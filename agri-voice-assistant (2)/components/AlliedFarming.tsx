import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getGeminiIntercroppingAdvice, getGeminiLivestockFeedAdvice } from '../services/geminiService';
import { ICONS } from '../constants';
import { Language } from '../types';

type Tab = 'intercropping' | 'livestock' | 'ipm';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const AlliedFarmingPage: React.FC = () => {
    const { translate, language, userProfile, speak, isSpeaking, stopSpeaking } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('intercropping');
    const [mainCrop, setMainCrop] = useState('');
    const [advice, setAdvice] = useState<{ [key in Tab]?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const popularCrops = {
        [Language.EN]: ["Cotton", "Wheat", "Maize"],
        [Language.HI]: ["कपास", "गेहूं", "मक्का"],
        [Language.TA]: ["பருத்தி", "கோதுமை", "மக்காச்சோளம்"],
    };
    
    useEffect(() => {
        // Fetch livestock advice automatically if profile exists
        if (userProfile && (userProfile.livestock.cows > 0 || userProfile.livestock.chickens > 0)) {
            getGeminiLivestockFeedAdvice(userProfile, language).then(res => {
                setAdvice(prev => ({ ...prev, 'livestock': res }));
            });
        }
    }, [userProfile, language]);

    const handleGetIntercroppingAdvice = async () => {
        if (!mainCrop) return;
        setIsLoading(true);
        const result = await getGeminiIntercroppingAdvice(mainCrop, language);
        setAdvice(prev => ({...prev, 'intercropping': result }));
        setIsLoading(false);
    };

    const handleTabChange = (newTab: Tab) => {
        stopSpeaking();
        setActiveTab(newTab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'intercropping':
                return (
                    <div className="space-y-4">
                        <label className="block text-md font-semibold text-gray-700">{translate('select_main_crop')}</label>
                        <div className="flex flex-wrap gap-2">
                            {popularCrops[language].map(c => (
                                <button key={c} onClick={() => setMainCrop(c)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${mainCrop === c ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                                    {c}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleGetIntercroppingAdvice} disabled={!mainCrop || isLoading} className="w-full py-2.5 bg-blue-500 text-white font-semibold rounded-lg disabled:bg-gray-300 shadow-md hover:bg-blue-600 transition">
                           {isLoading ? translate('processing') : 'Get Suggestions'}
                        </button>
                        {advice.intercropping && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                               <p className="text-gray-800 whitespace-pre-wrap">{advice.intercropping}</p>
                               <button onClick={() => isSpeaking ? stopSpeaking() : speak(advice.intercropping!)} className="mt-3 flex items-center space-x-2 text-blue-600 font-semibold">
                                   <Icon svg={isSpeaking ? ICONS.x : ICONS.readAloud} className="w-5 h-5" />
                                   <span>{isSpeaking ? translate('stop') : translate('read_aloud')}</span>
                               </button>
                            </div>
                        )}
                    </div>
                );
            case 'livestock':
                return (
                    <div>
                        {(userProfile?.livestock.cows ?? 0) > 0 || (userProfile?.livestock.chickens ?? 0) > 0 ? (
                            advice.livestock ? (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-gray-800 whitespace-pre-wrap">{advice.livestock}</p>
                                    <button onClick={() => isSpeaking ? stopSpeaking() : speak(advice.livestock!)} className="mt-3 flex items-center space-x-2 text-blue-600 font-semibold">
                                       <Icon svg={isSpeaking ? ICONS.x : ICONS.readAloud} className="w-5 h-5" />
                                       <span>{isSpeaking ? translate('stop') : translate('read_aloud')}</span>
                                    </button>
                                </div>
                            ) : <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        ) : (
                            <p className="text-gray-600 text-center p-4">No livestock found in your profile. Add them in settings to get advice.</p>
                        )}
                    </div>
                );
            case 'ipm':
                 return (
                    <div className="text-center text-gray-600 p-4">
                        <p>Integrated Pest Management tips coming soon!</p>
                    </div>
                 );
            default:
                return null;
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-center bg-gray-200 rounded-full p-1 mb-6">
                <button onClick={() => handleTabChange('intercropping')} className={`flex-1 py-2 font-semibold rounded-full transition-colors ${activeTab === 'intercropping' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>{translate('intercropping')}</button>
                <button onClick={() => handleTabChange('livestock')} className={`flex-1 py-2 font-semibold rounded-full transition-colors ${activeTab === 'livestock' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>{translate('livestock_feed')}</button>
                <button onClick={() => handleTabChange('ipm')} className={`flex-1 py-2 font-semibold rounded-full transition-colors ${activeTab === 'ipm' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>{translate('ipm')}</button>
            </div>
            
            <div className="p-5 bg-white rounded-2xl shadow-lg min-h-[250px]">
                {renderContent()}
            </div>
        </div>
    );
};