import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { getFood } from '../api';
import type { FoodItem } from '../types';

const DisplayBoard: React.FC = () => {
  const [food, setFood] = useState<FoodItem[]>([]);

  useEffect(() => {
    getFood().then(setFood);
    socket.on('update', setFood);
    return () => { socket.off('update', setFood); };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col p-4 overflow-hidden">
      <h1 className="text-6xl font-extrabold text-white text-center drop-shadow-lg flex-shrink-0 mb-4">
        Available Food
      </h1>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 overflow-hidden">
        {food.map(item => (
          <div
            key={item.id}
            className="bg-white/95 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-4 min-h-0"
            style={{
              aspectRatio: '1.2',
              fontSize: 'clamp(1rem, 2.5vw, 3rem)'
            }}
          >
            <div className="text-center font-bold text-gray-800 break-words w-full mb-2 flex-shrink-0">
              {item.name}
            </div>
            <div
              className={`font-extrabold drop-shadow-xl flex-1 flex items-center justify-center ${
                item.count === 0 ? 'text-red-500' : 'text-green-600'
              }`}
              style={{
                fontSize: 'clamp(2rem, 6vw, 8rem)'
              }}
            >
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayBoard;
