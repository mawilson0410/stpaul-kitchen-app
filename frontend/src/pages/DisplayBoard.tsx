import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket';
import { getFood } from '../api';
import type { FoodItem } from '../types';

const DisplayBoard: React.FC = () => {
  const [food, setFood] = useState<FoodItem[]>([]);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    getFood().then(setFood);
    socket.on('update', setFood);
    return () => { socket.off('update', setFood); };
  }, []);

  useEffect(() => {
    // Try to acquire wake lock when component mounts
    const requestWakeLock = async () => {
      try {
        // @ts-ignore
        if ('wakeLock' in navigator) {
          // @ts-ignore
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        // Wake Lock not supported or denied
        console.warn('Wake Lock not available:', err);
      }
    };
    requestWakeLock();

    // Release wake lock on unmount
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
      }
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col p-4 overflow-hidden">
      <h1 className="text-6xl font-extrabold text-white text-center drop-shadow-lg flex-shrink-0 mb-4">
        Available Food
      </h1>
      <div
        className="
          flex-1
          grid
          gap-6
          w-full
          px-2
          overflow-auto
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
        style={{ alignContent: 'start' }}
      >
        {food.map(item => (
          <div
            key={item.id}
            className="bg-white/95 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 min-h-0 w-full"
            style={{
              minHeight: 0,
              minWidth: 0,
              height: '18vw',
              maxHeight: 220,
              maxWidth: 320,
              width: '100%',
            }}
          >
            <div className="text-3xl font-bold text-gray-800 text-center break-words w-full mb-2 flex-shrink-0">
              {item.name}
            </div>
            <div
              className={`font-extrabold drop-shadow-xl flex-1 flex items-center justify-center ${
                item.count <= 3 ? 'text-red-500' : 'text-green-600'
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
