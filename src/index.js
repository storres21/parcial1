import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './App'; // Asegúrate de importar tu componente principal (App.js u otro nombre si es diferente).
import esMessages from './locales/es'; // Importa las traducciones en español.
import enMessages from './locales/en'; // Importa las traducciones en inglés.
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const userLanguage = navigator.language || navigator.userLanguage;
const messages = userLanguage.startsWith('es') ? esMessages : enMessages;

ReactDOM.render(
  <IntlProvider locale={userLanguage} messages={messages}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </IntlProvider>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();

reportWebVitals();
