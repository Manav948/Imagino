import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: 'bg-gray-800 text-white',
            style: {
              fontSize: '16px',
              padding: '10px 20px',
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
