import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { getGeminiDiseaseDiagnosis } from '../services/geminiService';
import { ChatMessage, DiagnosisResult } from '../types';
import { ICONS } from '../constants';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

const DiagnosisCard: React.FC<{ result: DiagnosisResult }> = ({ result }) => {
    const { language, speak, isSpeaking, stopSpeaking, translate } = useAppContext();

    const textToRead = result.isHealthy
        ? result.remedy[language]
        : `Detected ${result.disease[language]} on your ${result.crop[language]}. Remedy: ${result.remedy[language]}`;
    
    return (
        <div className={`p-4 rounded-lg shadow-md ${result.isHealthy ? 'bg-green-50' : 'bg-red-50'}`}>
            <h4 className="font-bold text-lg mb-2 flex items-center">
                {result.isHealthy 
                    ? <Icon svg={ICONS.check} className="w-6 h-6 mr-2 text-green-700" /> 
                    : <Icon svg={ICONS.risk} className="w-6 h-6 mr-2 text-red-700" />
                }
                <span className={result.isHealthy ? 'text-green-800' : 'text-red-800'}>{result.disease[language]}</span>
            </h4>
            <p className="text-gray-700 mb-1"><strong>Crop:</strong> {result.crop[language]}</p>
            <p className="text-gray-700">{result.remedy[language]}</p>
            <button
                onClick={() => isSpeaking ? stopSpeaking() : speak(textToRead)}
                className="mt-4 flex items-center space-x-2 text-blue-600 font-semibold"
            >
                <Icon svg={isSpeaking ? ICONS.x : ICONS.readAloud} className="w-5 h-5" />
                <span>{isSpeaking ? translate('stop') : translate('read_aloud')}</span>
            </button>
        </div>
    )
}


export const DiseaseFinderPage: React.FC = () => {
    const { translate, language } = useAppContext();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{
            sender: 'bot',
            type: 'text',
            content: translate('upload_image_prompt')
        }]);
    }, [translate]);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageData = e.target?.result as string;
                
                setMessages(prev => [
                    ...prev, 
                    { sender: 'user', type: 'image', content: imageData },
                    { sender: 'bot', type: 'thinking', content: '' }
                ]);

                const diagnosis = await getGeminiDiseaseDiagnosis(imageData, language);
                
                setMessages(prev => [
                    ...prev.filter(m => m.type !== 'thinking'),
                    { sender: 'bot', type: 'diagnosis', content: diagnosis }
                ]);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-xs md:max-w-md rounded-2xl p-3 shadow ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                           {msg.type === 'text' && <p>{msg.content as string}</p>}
                           {msg.type === 'image' && <img src={msg.content as string} alt="Uploaded leaf" className="rounded-lg max-h-64"/>}
                           {msg.type === 'thinking' && <p className="italic animate-pulse p-2">{translate('analyzing')}</p>}
                           {msg.type === 'diagnosis' && <DiagnosisCard result={msg.content as DiagnosisResult} />}
                       </div>
                    </div>
                ))}
                 <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t-2 border-gray-100">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageSelect} className="hidden" />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
                >
                    <Icon svg={ICONS.upload} className="w-6 h-6"/>
                    <span className="text-lg">{translate('upload_button')}</span>
                </button>
            </div>
        </div>
    );
};