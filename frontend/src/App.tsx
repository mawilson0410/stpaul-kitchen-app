import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
import Editor from './pages/Editor';
import DisplayBoard from './pages/DisplayBoard';
import type { ReactNode } from 'react';

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

const PrivateRoute = ({ children }: { children: ReactNode }) =>
  isLoggedIn() ? children : <Navigate to="/login" />;

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><MainMenu /></PrivateRoute>} />
      <Route path="/editor" element={<PrivateRoute><Editor /></PrivateRoute>} />
      <Route path="/display" element={<PrivateRoute><DisplayBoard /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
