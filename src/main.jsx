import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContextApi } from './Components/ContextApi.jsx';
import { Provider } from 'react-redux'
import Store from './Store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
      <ContextApi>
        <App />
      </ContextApi>
    </Provider>
)
