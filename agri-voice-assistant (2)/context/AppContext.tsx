import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Language, Page, UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';

interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  translate: (key: string) => string;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const handleVoicesChanged = () => {
      if ('speechSynthesis' in window) {
        setVoices(speechSynthesis.getVoices());
      }
    };

    if ('speechSynthesis' in window) {
      // Fetch voices immediately and listen for changes.
      handleVoicesChanged();
      speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    }
    
    return () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        }
    };
  }, []);


  const translate = useCallback((key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  }, [language]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;

    stopSpeaking(); // Cancel any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to find a voice for the selected language
    const voice = voices.find(v => v.lang.startsWith(language));
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = language;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
      // The 'interrupted' error is expected when we call `speechSynthesis.cancel()`.
      // This happens when starting new speech or when the user clicks "Stop".
      // We don't log it as an error to avoid console noise for normal behavior.
      if (e.error !== 'interrupted') {
        console.error("SpeechSynthesis Error:", e.error);
      }
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  }, [language, stopSpeaking, voices]);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      userProfile,
      setUserProfile,
      currentPage,
      setCurrentPage,
      translate,
      speak,
      stopSpeaking,
      isSpeaking,
      isLoading,
      setIsLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};