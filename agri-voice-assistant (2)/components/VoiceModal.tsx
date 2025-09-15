



import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { getGeminiAdvice } from '../services/geminiService';
import { ICONS } from '../constants';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const VoiceModal: React.FC<{ show: boolean, onClose: () => void }> = ({ show, onClose }) => {
    const { language, translate, speak, stopSpeaking } = useAppContext();
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSpeechResult = async (transcript: string) => {
        setQuery(transcript);
        setIsProcessing(true);
        const aiResponse = await getGeminiAdvice(transcript, language);
        setResponse(aiResponse);
        setIsProcessing(false);
        speak(aiResponse);
    };

    const { isListening, startListening, isSupported } = useSpeechRecognition({
        onResult: handleSpeechResult,
        lang: language,
    });
    
    useEffect(() => {
      // Auto-start listening when modal opens
      if (show && isSupported) {
        startListening();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, isSupported]);
    
    const handleClose = () => {
      setQuery('');
      setResponse('');
      setIsProcessing(false);
      stopSpeaking();
      onClose();
    }
    
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col transition-transform transform duration-300 scale-100">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">{response ? translate('ai_response') : translate('ask_your_question')}</h2>
                  <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
                    <Icon svg={ICONS.x} className="w-6 h-6"/>
                  </button>
                </div>
                
                <div className="p-6 flex-grow overflow-y-auto min-h-[200px]">
                  {isListening && !query && (
                    <div className="flex flex-col items-center justify-center text-center h-full">
                       <div className="relative w-24 h-24">
                          <div className="absolute inset-0 bg-green-200 rounded-full animate-ping"></div>
                          <div className="relative flex items-center justify-center w-full h-full bg-green-500 rounded-full">
                            <Icon svg={ICONS.mic} className="w-12 h-12 text-white" />
                          </div>
                       </div>
                       <p className="text-lg text-gray-600 mt-6 font-semibold">{translate('listening')}</p>
                    </div>
                  )}

                  {query && (
                     <div className="mb-4 flex justify-end">
                        <p className="bg-blue-500 text-white p-3 rounded-xl max-w-xs">{query}</p>
                     </div>
                  )}

                  {isProcessing && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-2 text-gray-600 bg-gray-100 p-3 rounded-xl">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse delay-150"></div>
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse delay-300"></div>
                            <span className="font-medium">{translate('processing')}</span>
                        </div>
                    </div>
                  )}

                  {response && (
                    <div className="flex justify-start">
                        <div className="p-3 bg-gray-100 rounded-xl max-w-xs">
                            <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
                        </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
                  <button onClick={handleClose} className="w-full py-3 px-4 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition">
                    {translate('close')}
                  </button>
                </div>
            </div>
        </div>
    );
};