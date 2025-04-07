
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ui/use-theme.tsx'
import { HelmetProvider } from 'react-helmet-async'

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </BrowserRouter>
);
