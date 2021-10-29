import React from 'react';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import unknownError from "./Images/Unknownerror.png";
import networkError from "./Images/NetworkError.png";


const genData = (collectionData) => {
  const city = collectionData.map((el) => el.city).sort();
  const arrCity = ['all', ...Array.from(new Set(city))];
  const monyh = collectionData.map((el) => (el.date.slice(3, 5)))
  const arrMonyh = ['all', ...Array.from(new Set(monyh)).sort((a, b) => a - b)];
  return {arrCity, arrMonyh}
}

const App = (props) => {

  const collectionData = props.response.data;

  const [city, setCity] = useState('all');
  const [month, setDate] = useState('all');
  const [newCollectionData, setnewCollectionData] = useState(collectionData);

  useEffect(() => {
    setCity((localStorage.getItem('city')));
    setDate((localStorage.getItem('month')));
    setnewCollectionData(JSON.parse(localStorage.getItem('newCollectionData')));
  }, []);

  useEffect(() => {
    localStorage.setItem('city', city)
    localStorage.setItem('month', month);
    localStorage.setItem("newCollectionData", JSON.stringify(newCollectionData));
  }, [city, month, newCollectionData,]);

  const renderEror = (error) => {
    const image = error.nameEror === 'networkError' ? networkError : unknownError;
    const message  = error.nameEror === 'networkError' ? 'Проверьте соединение с интернетом' : 'Неизвестная ошибка';
    return (
      <div>
        <h1 style={{'text-align': 'center' }}>{message}</h1>
        <img src={image} alt={error.nameEror} style={{'width': '1000px', 'height': 'auto', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto' }}/>
      </div>)
  }

  if (props.response.hasOwnProperty('nameEror')) {
    return renderEror(props.response);
  }

  const arrCityMonyh = genData(newCollectionData)

  const renderEvent = () => {
    const filtrCity = city === 'all' ? newCollectionData : newCollectionData.filter((el) => el.city === city);
    const filtrMonth = month === 'all' ? filtrCity : filtrCity.filter((el) => el.date.slice(3, 5) === month);
    
    filtrMonth.sort((a, b) => a.date > b.date ? 1 : -1);

    filtrMonth.sort( (a,b) =>  a.featured && !b.featured);
    
    return filtrMonth.map((el) => {
      const id = el.id;
      const image = 'https://www.pngwing.com/ru/free-png-pinvw';
      el.hasOwnProperty('featured') &&  el.featured === true ? el.featured = false : el.featured = true;
      const color = el.featured === true ? 'black' : '#fff';
      const colorCheckbox  = { 'backgroundColor': color};
      return (<div className="ss"  key={_.uniqueId()}>
      <img src={el.image} alt={el.genre} width="600" height="400"/>
      <p>{String(el.date).slice(0, 2)}</p>
       <h4>{el.name}</h4>
       <button type="button" value="" style={colorCheckbox} src={image} onClick={() => setnewCollectionData(newCollectionData.map((elFeaturd) => {
         if (elFeaturd.id === id) {
          elFeaturd.featured = elFeaturd.featured === false ? true : false;
         }
         return elFeaturd;
       }))}/>
      </div>)
    })
  }

  const vDomaCity = arrCityMonyh.arrCity.map((el) => {
    return <option value={el} key={_.uniqueId()} >{el}</option>
  })

  const vDomaMonyh = arrCityMonyh.arrMonyh.map((el) => {
    const date = new Date(`2021/${el}/01`);
    const month = date.toLocaleString('en', { month: 'long' })
    return <option value={el} key={_.uniqueId()}>{ el === 'all' ? el : month}</option>
  })

    return(
      <div className="contener">
      <div className="contener-content">
          <div className="name-list">
              <h3>Event Listing</h3>
          </div>
          <div className="form-grup">
              <form className="form">
                  <div className="form-city">
                    <label>City :  </label>
                    <select className="city" onChange={(event) => setCity(event.target.value)} multiple={false} value={city}>
                      <>
                      {vDomaCity}
                    </>
                    </select>
                  </div>
                  <div className="form-month">
                    <label>Month :  </label>
                    <select className="date" onChange={(event) => setDate(event.target.value)} multiple={false} value={month}>
                      <>
                      {vDomaMonyh}
                     </>
                      </select>
                  </div>
                </form>
          </div>
              <div className="flex-container">
                <>
                {renderEvent()}
                </>
             </div>
      </div>
  </div>
    );
  };


export default App;