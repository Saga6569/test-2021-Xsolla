import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style.css';
import axios from 'axios';

const Init =  async () => {
  const renderDate = (date) => {
    return (ReactDOM.render(
      <React.StrictMode>
        <App response={date}/>
      </React.StrictMode>,
      document.getElementById('root')
    ));
  }
  
  try {
    const response =  await axios.get(`https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json`);
    if (response === undefined) {
      return renderDate({'nameEror': 'networkError'})
    }
      return renderDate(response)
    } catch {
    return renderDate({'nameEror': 'unknownError'})
  }
   
};

Init();

reportWebVitals();
