import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Page, WeatherData, MarketPrice, Alert } from '../types';
import { getMockWeather, getMockMarketPrices, getMockAlerts } from '../services/mockApiService';
import { ICONS } from '../constants';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

const WeatherCard: React.FC = () => {
  const { translate } = useAppContext();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    getMockWeather().then(setWeather);
  }, []);

  const weatherIcons: { [key: string]: string } = {
      'Sunny': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-300"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
      // Add other conditions here
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-5 rounded-2xl shadow-xl">
      <h3 className="font-bold text-lg mb-2 opacity-90">{translate('weather_forecast')}</h3>
      {weather ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Icon svg={weatherIcons[weather.condition] || weatherIcons['Sunny']} className="w-16 h-16" />
            <div>
              <p className="text-5xl font-extrabold">{weather.temp}°C</p>
              <p className="font-semibold text-lg opacity-90">{weather.condition}</p>
            </div>
          </div>
          <div className="text-right text-sm font-medium opacity-90">
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind} km/h</p>
          </div>
        </div>
      ) : (
        <div className="h-24 animate-pulse bg-blue-600 rounded-md"></div>
      )}
    </div>
  );
};

const MarketPricesCard: React.FC = () => {
  const { translate, speak, isSpeaking, stopSpeaking } = useAppContext();
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMockMarketPrices().then(data => {
        setPrices(data);
        setIsLoading(false);
    });
  }, []);
  
  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    if (prices.length > 0) {
      const priceListString = prices.map(p =>
        translate('crop_price_tts_item')
          .replace('{crop}', p.crop)
          .replace('{price}', p.price.toLocaleString('en-IN'))
      ).join('. ');
      const text = translate('market_prices_list_tts').replace('{list}', priceListString);
      speak(text);
    }
  };

  const getVolatilityColor = (volatility?: 'Low' | 'Medium' | 'High') => {
    switch(volatility) {
        case 'Low': return 'text-green-700 bg-green-100';
        case 'Medium': return 'text-yellow-700 bg-yellow-100';
        case 'High': return 'text-red-700 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
    }
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl text-gray-800">{translate('market_prices')}</h3>
        <button onClick={handleReadAloud} aria-label="Read prices aloud" className="text-gray-500 hover:text-green-600 transition-colors">
          <Icon svg={isSpeaking ? ICONS.x : ICONS.readAloud} className="w-6 h-6" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-12 animate-pulse bg-gray-100 rounded-lg"></div>)}
        </div>
      ) : (
        <div className="space-y-1">
          {prices.map((item) => (
            <div key={item.crop} className="grid grid-cols-2 items-center w-full text-left p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="text-gray-800 font-semibold text-lg">{item.crop}</span>
                   <p className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ml-3 ${getVolatilityColor(item.volatility)}`}>
                      {item.volatility}
                   </p>
                </div>
                <span className="font-mono font-bold text-xl text-green-700 text-right">₹{item.price.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AlertCard: React.FC = () => {
  const { translate, language } = useAppContext();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    getMockAlerts(language).then(setAlerts);
  }, [language]);

  const getAlertConfig = (type: 'pest' | 'weather' | 'insurance') => {
    switch(type) {
        case 'pest': return {
            colors: 'bg-yellow-50 border-yellow-500 text-yellow-800',
            icon: ICONS.bug
        };
        case 'insurance': return {
            colors: 'bg-blue-50 border-blue-500 text-blue-800',
            icon: ICONS.insuranceClaim
        };
        default: return {
            colors: 'bg-gray-50 border-gray-500 text-gray-800',
            icon: ''
        };
    }
  }

  return (
    <div className="space-y-4">
        <h3 className="font-bold text-xl text-gray-800">{translate('smart_alerts')}</h3>
        {alerts.length > 0 ? alerts.map(alert => {
            const config = getAlertConfig(alert.type);
            return (
            <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg shadow-lg flex items-start space-x-4 ${config.colors}`} role="alert">
              <Icon svg={config.icon} className="w-6 h-6 mt-1"/>
              <div>
                <h4 className="font-bold text-md">{alert.title[language]}</h4>
                <p className="text-sm">{alert.message[language]}</p>
                {alert.isActionable && (
                    <button className="mt-2 px-3 py-1 bg-white text-sm font-semibold rounded-md shadow hover:bg-gray-50 text-gray-800">
                        {alert.actionText?.[language]}
                    </button>
                )}
              </div>
            </div>
        )}) : (
            <div className="h-20 animate-pulse bg-gray-200 rounded-lg"></div>
        )}
    </div>
  );
};

const QuickActions: React.FC = () => {
  const { translate, setCurrentPage } = useAppContext();
  const actions = [
    { label: 'crop_advice', icon: ICONS.plant, page: Page.CropAdvice },
    { label: 'allied_farming', icon: ICONS.alliedFarming, page: Page.AlliedFarming },
    { label: 'schemes_loans', icon: ICONS.building, page: Page.Schemes },
    { label: 'disease_finder', icon: ICONS.scan, page: Page.DiseaseFinder },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => setCurrentPage(action.page)}
          className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-3 hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-3 bg-green-100 rounded-full flex items-center justify-center">
            <Icon svg={action.icon} className="w-8 h-8 text-green-700" />
          </div>
          <span className="font-semibold text-gray-800 text-center text-sm">{translate(action.label)}</span>
        </button>
      ))}
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { userProfile } = useAppContext();
  return (
    <div className="p-4 space-y-8 bg-gradient-to-b from-green-50 to-gray-50">
      <h2 className="text-3xl font-bold text-gray-800">Hello, Farmer {userProfile?.mobileNumber.slice(-4)}!</h2>
      <WeatherCard />
      <QuickActions />
      <AlertCard />
      <MarketPricesCard />
    </div>
  );
};