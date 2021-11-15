import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import style from './Header.module.css';

type HeaderDataType = {
  setCountry: Dispatch<SetStateAction<string>>
  country: string
}

export function Header({ setCountry, country }: HeaderDataType) {

  const [value, setValue] = useState<string>('');

  const cities = ['Minsk', 'Moscow', 'Bratislava'];

  const day = new Date().toLocaleDateString('ru', {weekday: 'long'});
  const date = `${day},  ${new Date().toLocaleDateString('ru', {month: 'long'})}\n\n ${new Date().getDate()}`;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  };

  return (
      <header className={style.header}>
        <div className={style.date}>{date}</div>
        <div className={style.titleBlock}>
          <div>Выбранный город:</div>
        </div>
        <div className={style.title}>{country}</div>
        <div className={style.countryBtn}>
          {
            cities.map((city,index) => {
              return (
                  <input key={index} className={style.input} defaultValue={city} onClick={() => {setCountry(city)}}/>
              )
            })
          }
        </div>
        <div className={style.inputCountry}>
          <input placeholder='Введите название города' defaultValue={value} onChange={onChangeHandler}/>
          <button className={style.searchBtn} onClick={() => setCountry(value)}>Искать город</button>
        </div>
      </header>
  );
}