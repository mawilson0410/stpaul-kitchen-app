import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFood, addFood, updateFood, deleteFood } from '../api';
import socket from '../socket';
import type { FoodItem } from '../types';
import Footer from '../components/Footer';

const Editor: React.FC = () => {
  const [food, setFood] = useState<FoodItem[]>([]);
  const [newName, setNewName] = useState('');
  const [lockItems, setLockItems] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFood().then(setFood);
    socket.on('update', setFood);
    return () => { socket.off('update', setFood); };
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && !lockItems) {
      await addFood(newName.trim());
      setNewName('');
    }
  };

  const handleUpdate = async (id: number, count: number) => {
    await updateFood(id, count);
  };

  const handleDelete = async (id: number) => {
    if (!lockItems) {
      await deleteFood(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-greek-blue-gradient">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-center flex-1">Edit Food Counts</h2>
            <button
              className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 font-semibold hover:bg-gray-400 transition"
              onClick={() => navigate('/')}
            >
              ← Back
            </button>
          </div>
          <ul className="divide-y">
            {food.map(item => (
              <li key={item.id} className="flex items-center py-3">
                <span className="flex-1 text-lg">{item.name}</span>
                <button
                  className="text-red-500 text-2xl px-2"
                  onClick={() => handleUpdate(item.id, item.count - 1)}
                  aria-label="decrement"
                >-</button>
                <span className="w-10 text-center text-xl">{item.count}</span>
                <button
                  className="text-green-500 text-2xl px-2"
                  onClick={() => handleUpdate(item.id, item.count + 1)}
                  aria-label="increment"
                >+</button>
                <button
                  className="ml-4 text-gray-400 hover:text-red-600 disabled:opacity-50"
                  onClick={() => handleDelete(item.id)}
                  aria-label="delete"
                  disabled={lockItems}
                >🗑️</button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAdd} className="flex gap-2 mt-6">
            <input
              type="text"
              placeholder="New food item"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={lockItems}
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white rounded px-4 py-2 font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
              disabled={lockItems}
            >
              Add
            </button>
          </form>
          <div className="flex items-center mt-4">
            <input
              id="lock-items"
              type="checkbox"
              checked={lockItems}
              onChange={e => setLockItems(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="lock-items" className="text-gray-700 select-none cursor-pointer">
              Lock current food items
            </label>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Editor;
