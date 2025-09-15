

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Scheme, Language } from '../types';
import { getMockSchemes } from '../services/mockApiService';
import { ICONS } from '../constants';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

const SchemeCard: React.FC<{ scheme: Scheme }> = ({ scheme }) => {
  const { language, translate, speak, isSpeaking, stopSpeaking } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const textToRead = `${scheme.name[language]}. ${scheme.benefit[language]}. ${translate('required_documents')}: ${scheme.documents[language].join(', ')}.`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 flex justify-between items-center"
      >
        <div>
            <h3 className="font-bold text-lg text-gray-800">{scheme.name[language]}</h3>
            <p className="text-gray-600 text-sm mt-1">{scheme.benefit[language]}</p>
        </div>
        <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isExpanded && (
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <h4 className="font-semibold text-md text-gray-700 mb-3">{translate('required_documents')}</h4>
          <ul className="space-y-2.5">
            {scheme.documents[language].map((doc, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <Icon svg={ICONS.document} className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">{doc}</span>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => isSpeaking ? stopSpeaking() : speak(textToRead)}
            className="mt-5 flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
          >
            <Icon svg={isSpeaking ? ICONS.x : ICONS.readAloud} className="w-5 h-5" />
            <span>{isSpeaking ? translate('stop') : translate('read_aloud')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const SchemesPage: React.FC = () => {
  const { translate, stopSpeaking } = useAppContext();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemesVisible, setSchemesVisible] = useState(false);

  const handleFindSchemes = () => {
    stopSpeaking();
    setIsLoading(true);
    getMockSchemes().then(data => {
      setSchemes(data);
      setIsLoading(false);
      setSchemesVisible(true);
    });
  };

  return (
    <div className="p-4 space-y-6">
      {!schemesVisible ? (
         <div className="flex flex-col items-center justify-center text-center pt-20">
            <div className="p-6 bg-green-100 rounded-full mb-6 flex items-center justify-center">
                <Icon svg={ICONS.building} className="w-20 h-20 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Government Schemes</h2>
            <p className="text-gray-600 mb-8 max-w-sm">Get a list of agricultural schemes you might be eligible for.</p>
            <button
                onClick={handleFindSchemes}
                disabled={isLoading}
                className="w-full max-w-sm py-4 px-6 bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-700 disabled:bg-gray-400 transition-all transform hover:scale-105"
            >
                {isLoading ? 'Searching...' : translate('find_schemes')}
            </button>
        </div>
      ) : (
        <>
            <h2 className="text-2xl font-bold text-gray-800 px-2">{translate('eligible_schemes')}</h2>
            <div className="space-y-4">
                {schemes.map(scheme => <SchemeCard key={scheme.id} scheme={scheme} />)}
            </div>
        </>
      )}
    </div>
  );
};