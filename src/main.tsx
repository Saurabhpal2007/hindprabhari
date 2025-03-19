
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AIProvider } from './context/AIContext.tsx'
import { ThemeProvider } from './components/ui/use-theme.tsx'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AIProvider>
      <App />
    </AIProvider>
  </ThemeProvider>
);
