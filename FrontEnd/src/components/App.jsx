import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import AppContent from './AppContext';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
