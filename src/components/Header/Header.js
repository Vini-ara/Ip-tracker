import React, { useContext, useState, } from 'react';
import { MapContext } from '../MapContext/MapContext';

import styles from './header.module.scss';


export default function Header() {
  const data = useContext(MapContext);

  const [input, setInput] = useState(null)

  const {isp, location, timezone} = data.result;

  function ipSubmit(event) {
    event.preventDefault();
    return data.handleSubmit(input)
  }

  function handleChange(event) {
    setInput(event.target.value)
  }

  if(!data.loading) {
  return(
    <header className={styles.Header}>
      <h1>IP Address Tracker</h1>
      <div className={styles.Inputs}>
        <form onSubmit={ipSubmit}>
          <input type="text" placeholder="Search for any IP address or domain" onChange={handleChange}/>
          <button type='submit'></button>
        </form>
      </div>

      <div className={styles.Table}>
        <div className={styles.Info}>
          <p>IP ADDRESS</p>
          <h3>{data.ipAddress}</h3>
        </div>
        <div className={styles.Bar}></div>
        <div className={styles.Info}>
          <p>LOCATION</p>
          <h3>{location}</h3>
        </div>
        <div className={styles.Bar}></div>
        <div className={styles.Info}>
          <p>TIMEZONE</p>
          <h3>UTC {timezone}</h3>
        </div>
        <div className={styles.Bar}></div>
        <div className={styles.Info}>
          <p>ISP</p>
          <h3>{isp}</h3>
        </div>
      </div>
    </header>
  );
  } else {
    return null
  }
}