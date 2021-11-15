import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { Main } from './components/Main/Main';
import { FutureWeather } from './components/FutureWeather/FutureWeather';

import style from './App.module.css';




export type AppDataType = {
  main: MainType
  weather: IconWeather[]
  dt_txt: DateType
  dt: number
  days: string
}

type MainType = {
  temp: number
}

type IconWeather = {
  icon: string
}

type DateType = {
  date: string
}


function App() {

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [appData, setAppData] = useState<AppDataType[]>([]);
  const [country, setCountry] = useState<string>(pathname.split('/')[2] ?? 'Minsk');

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&units=metric&mode=json&appid=bc12ce5d71bdb654317719e7a2494f3d`)
        .then((resp) => {
          const filteredData = resp.data.list.filter((w: { dt_txt: string }) => w.dt_txt.includes('18:00:00'));
          setAppData(filteredData);
          navigate(`/in/${country}`, {replace: false});
        }).catch(() => alert('Проверьте название города'));
  }, [country]);



  return (
      <div className={style.main}>
        <div className={style.app}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/*' element={<Main appData={appData} country={country} setCountry={setCountry}/>}/>
              <Route path='/future' element={<FutureWeather appData={appData}/>}/>
            </Routes>
          </Suspense>
        </div>
      </div>
  )
}

export default App;


