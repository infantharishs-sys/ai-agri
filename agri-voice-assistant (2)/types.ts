export enum Language {
  EN = 'en',
  HI = 'hi',
  TA = 'ta',
}

export enum Page {
  Dashboard = 'DASHBOARD',
  CropAdvice = 'CROP_ADVICE',
  Schemes = 'SCHEMES',
  Warehouse = 'WAREHOUSE',
  AlliedFarming = 'ALLIED_FARMING',
  DiseaseFinder = 'DISEASE_FINDER',
}

export interface UserProfile {
  mobileNumber: string;
  farmSize: number; // in acres
  soilType: 'loamy' | 'clay' | 'sandy' | 'silty';
  location: {
    lat: number;
    lon: number;
  };
  livestock: {
    cows: number;
    chickens: number;
  };
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
}

export interface MarketPrice {
  crop: string;
  price: number;
  volatility?: 'Low' | 'Medium' | 'High';
}

export interface Scheme {
  id: string;
  name: { [key in Language]: string };
  benefit: { [key in Language]: string };
  documents: { [key in Language]: string[] };
}

export type AlertType = 'weather' | 'pest' | 'insurance';

export interface Alert {
  id: string;
  type: AlertType;
  title: { [key in Language]: string };
  message: { [key in Language]: string };
  isActionable: boolean;
  actionText?: { [key in Language]: string };
}

export interface DiagnosisResult {
  isHealthy: boolean;
  crop: { [key in Language]: string };
  disease: { [key in Language]: string };
  remedy: { [key in Language]: string };
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  type: 'text' | 'image' | 'thinking' | 'diagnosis';
  content: string | DiagnosisResult;
}

export interface Translation {
  [key: string]: { [key in Language]: string };
}