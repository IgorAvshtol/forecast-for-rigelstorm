import { AppDataType } from '../../App';

import style from './FutureWeather.module.css';

type FutureWeatherDataType = {
  appData: AppDataType[]
}

export function FutureWeather({ appData }: FutureWeatherDataType) {

  return (
      <div className={style.futureBlock}>
        {
          appData.map((days, index) => {
            return (
                <div key={index} className={style.dayBlock}>
                  <span className={style.temp}>{Math.round(days.main.temp) + '℃'}</span>
                  <span>{new Date(days.dt * 1000).toLocaleString('ru', {month: 'long', day: 'numeric'})}</span>
                  <img alt='weather' src={`http://openweathermap.org/img/wn/${days.weather[0].icon}.png`}/>
                </div>
            )
          })
        }
      </div>
  )
}

