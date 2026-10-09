import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { theme } from './config/theme';
import './styles/globals.css';
import './styles/typography.css';
import './styles/presentation.css';
import './styles/animations.css';
import './styles/product.css';
import './styles/product-scenes.css';
import './styles/story-scenes.css';
import './styles/opening-slides.css';
import './styles/unknown-landmarks.css';

for (const [name, value] of Object.entries(theme.colors)) {
  const property = name.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
  document.documentElement.style.setProperty(`--${property}`, value);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
