import React, { useState, useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { SchemesPage } from './components/Schemes';
import { WarehousePage } from './components/Warehouse';
import { VoiceModal } from './components/VoiceModal';
import { CropAdvicePage } from './components/CropAdvice';
import { AlliedFarmingPage } from './components/AlliedFarming';
import { DiseaseFinderPage } from './components/DiseaseFinder';
import { ICONS } from './constants';
import { Page } from './types';

const Icon: React.FC<{ svg: string; className?: string }> = ({ svg, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

const MainLayout: React.FC = () => {
    const { currentPage, setCurrentPage, translate } = useAppContext();
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

    const navItems = [
      { page: Page.Dashboard, label: 'dashboard', icon: ICONS.plant },
      { page: Page.Schemes, label: 'schemes_loans', icon: ICONS.building },
      { page: Page.Warehouse, label: 'warehouse_availability', icon: ICONS.warehouse },
    ];
    
    const pageTitles: {[key in Page]?: string} = {
        [Page.Dashboard]: 'dashboard',
        [Page.CropAdvice]: 'crop_advice',
        [Page.AlliedFarming]: 'allied_farming',
        [Page.Schemes]: 'schemes_loans',
        [Page.Warehouse]: 'warehouse_availability',
        [Page.DiseaseFinder]: 'disease_finder',
    };
    
    const showHeader = currentPage !== Page.Dashboard;
    const headerTitle = pageTitles[currentPage] ? translate(pageTitles[currentPage]!) : '';

    // Render the current page based on the state. This prevents re-mounting.
    const renderCurrentPage = () => {
      switch (currentPage) {
        case Page.Dashboard: return <Dashboard />;
        case Page.CropAdvice: return <CropAdvicePage />;
        case Page.AlliedFarming: return <AlliedFarmingPage />;
        case Page.Schemes: return <SchemesPage />;
        case Page.Warehouse: return <WarehousePage />;
        case Page.DiseaseFinder: return <DiseaseFinderPage />;
        default: return <Dashboard />;
      }
    };
    
    return (
        <div className="relative min-h-screen bg-gray-50 flex flex-col">
            {showHeader && (
                <header className="sticky top-0 bg-white text-gray-800 p-4 border-b border-gray-200 z-20 flex items-center">
                    <button onClick={() => setCurrentPage(Page.Dashboard)} className="mr-4 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 className="text-xl font-bold">{headerTitle}</h1>
                </header>
            )}
            <main className="flex-grow pb-40">
                {renderCurrentPage()}
            </main>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center z-10">
                {navItems.map(item => (
                     <button key={item.page} onClick={() => setCurrentPage(item.page)} className={`flex flex-col items-center justify-center p-3 w-full transition-colors duration-300 ${currentPage === item.page ? 'text-green-600' : 'text-gray-500 hover:text-green-500'}`}>
                         <Icon svg={item.icon} className="w-7 h-7" />
                         <span className="text-xs font-semibold mt-1">{translate(item.label)}</span>
                     </button>
                ))}
            </div>

            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 group">
                 <button onClick={() => setIsVoiceModalOpen(true)} className="bg-green-500 text-white rounded-full p-5 shadow-2xl hover:bg-green-600 transition-all transform group-hover:scale-110 duration-300 ease-in-out flex items-center justify-center">
                    <Icon svg={ICONS.mic} className="w-9 h-9"/>
                 </button>
            </div>

            <VoiceModal show={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
        </div>
    );
};

function App() {
  const { userProfile } = useAppContext();

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      {userProfile ? (
        <MainLayout />
      ) : (
        <Onboarding />
      )}
    </div>
  );
}

export default App;