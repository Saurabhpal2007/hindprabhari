
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AIProvider } from './context/AIContext.tsx'
import { ThemeProvider } from './components/ui/use-theme.tsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider>
      <AIProvider>
        <App />
      </AIProvider>
    </ThemeProvider>
  </HelmetProvider>
);
