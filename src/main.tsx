
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AIProvider } from './context/AIContext.tsx'

createRoot(document.getElementById("root")!).render(
  <AIProvider>
    <App />
  </AIProvider>
);
