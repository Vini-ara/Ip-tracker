import React from 'react';

import './styles/global.scss';
import styles from './styles/app.module.scss';

import Header from './components/Header/Header.js';
import Map from './components/Map/Map.js';
import { Loading } from './components/Loading/Loading';
import { MapContextProvider } from './components/MapContext/MapContext';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {

  return (
    <MapContextProvider>
      <div className={styles.App}>
        <ReactNotification/>
        <Loading/>
        <Header/>
        <Map/>
      </div>
    </MapContextProvider>
  );
}

export default App;
