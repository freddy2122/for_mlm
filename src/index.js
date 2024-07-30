import React from 'react';
import ReactDOM from 'react-dom/client';
// import './dashboard-css/index.css'
// import './dashboard-css/atlantis.css'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { CustomizationProvider } from './api/theme-context';
import { Provider } from './api/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <CustomizationProvider>
        <App />
      </CustomizationProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
