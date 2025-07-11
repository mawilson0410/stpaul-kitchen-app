import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-greek-blue-gradient">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6 items-center relative">
        <h2 className="text-3xl font-bold mb-2 text-center leading-tight">St. Paul Festival Kitchen Food Dashboard</h2>
        <button
          className="w-full py-4 bg-green-500 text-white rounded-lg text-xl font-semibold hover:bg-green-600 transition"
          onClick={() => navigate('/editor')}
        >
          Edit Food Counts
        </button>
        <button
          className="w-full py-4 bg-blue-500 text-white rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          onClick={() => navigate('/display')}
        >
          Display Board
        </button>
        <button
          className="w-full py-2 bg-gray-200 text-blue-800 rounded-lg text-lg font-semibold hover:bg-gray-300 transition mt-2"
          onClick={() => setShowHelp(true)}
        >
          How do I use this app?
        </button>
        <button
          className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-400 transition mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={() => setShowHelp(false)}
                aria-label="Close help dialog"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">How to Use</h3>
              <ul className="list-disc pl-6 text-gray-800 space-y-2 text-lg">
                <li>Login with the shared kitchen password.</li>
                <li>On the dashboard, choose <b>Edit Food Counts</b> to add, remove, or update the number of trays for each food item.</li>
                <li>Use the <b>Display Board</b> button to show the current food counts on a TV or large screen for the kitchen staff.</li>
                <li>All changes update in real time for everyone.</li>
                <li>Text Mike at 216-213-5989 if you need help.</li>
                <li>Click <b>Logout</b> to sign out when done.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainMenu;
