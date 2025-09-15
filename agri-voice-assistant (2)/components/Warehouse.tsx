

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getMockWarehouseData } from '../services/mockApiService';

interface WarehouseData {
  totalCapacity: number;
  occupied: number;
}

export const WarehousePage: React.FC = () => {
  const { translate } = useAppContext();
  const [data, setData] = useState<WarehouseData | null>(null);

  useEffect(() => {
    getMockWarehouseData().then(res => setData(res as WarehouseData));
  }, []);

  const percentageOccupied = data ? (data.occupied / data.totalCapacity) * 100 : 0;
  const availableSpace = data ? data.totalCapacity - data.occupied : 0;
  
  const getBarColor = () => {
    if (percentageOccupied > 90) return 'bg-red-500';
    if (percentageOccupied > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">{translate('warehouse_availability')}</h2>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-lg text-gray-700 mb-4">Mandi Storage Status</h3>
        
        {data ? (
          <>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div 
                  className={`h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-3 text-white font-bold ${getBarColor()}`}
                  style={{ width: `${percentageOccupied}%` }}
                >
                  {percentageOccupied > 10 && <span>{percentageOccupied.toFixed(0)}%</span>}
                </div>
              </div>
            </div>
            
            <div className="text-center font-semibold text-gray-600 mb-8 mt-4">
              {data.occupied.toLocaleString()} / {data.totalCapacity.toLocaleString()} Quintals Occupied
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 font-medium">Available Space</p>
                <p className="text-3xl font-bold text-green-600">{availableSpace.toLocaleString()} Q</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 font-medium">Occupied Space</p>
                <p className="text-3xl font-bold text-red-600">{data.occupied.toLocaleString()} Q</p>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="h-8 w-full bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-8 w-1/2 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-16 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};