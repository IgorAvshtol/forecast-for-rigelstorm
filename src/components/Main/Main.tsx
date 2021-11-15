import React, { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import { Header } from '../Header/Header';
import { AppDataType } from '../../App';

import style from './Main.module.css';


type MainDataType = {
  appData: AppDataType[]
  country: string
  setCountry: Dispatch<SetStateAction<string>>
}

export function Main({ appData, setCountry, country }: MainDataType) {

  const weatherForTreeDays = appData.slice(0, 3);

  return (
      <div className={style.main}>
        <Header setCountry={setCountry} country={country}/>
        <div className={style.daysBlock}>
          {weatherForTreeDays.map((days,index) => {
            return (
                <div key={index} className={style.dayBlock}>
                  <span className={style.temp}>{Math.round(days.main.temp) + '℃'}</span>
                  <span className={style.day}>{new Date(days.dt * 1000).toLocaleString('ru', {month: 'long', day: 'numeric'})}</span>
                  <img alt='weather' src={`https://openweathermap.org/img/wn/${days.weather[0].icon}.png`}/>
                </div>
            )
          })}
        </div>
        <div className={style.navBlock}>
          <NavLink className={style.nav} to='/future'>Посмотреть погоду на ближайшие 5 дней</NavLink>
        </div>
      </div>
  )
}