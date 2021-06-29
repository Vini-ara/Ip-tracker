import React,{ createContext, useState } from "react";
import axios from 'axios';

import { store } from "react-notifications-component";

export const MapContext = createContext();

function MapContextProvider(props) {
  const [ipAddress, setIpAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [historic, setHistoric] = useState([]);
  const [result, setResult] = useState({
    location: '',
    timezone: '',
    isp: '',
    lat: '',
    lng: ''
  });
  const apiKey = process.env.REACT_APP_API_KEY;
  
  async function firstLoad() {
    const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}`;

    //const storage = localStorage.getItem('@ip-tracker/searchHistory');

    //if(!storage) {
      //localStorage.setItem('@ip-tracker/searchHistory', [])
    //} else{
     // setHistoric(historic.push(storage));
    //}

    await axios.get(apiUrl)
      .then(res => {

        if(res.status !== 200) throw new Error();

        console.log(res)

        const data = res.data

        setResult({
          location: `${data.location.region},${data.location.city}`,
          timezone: `${data.location.timezone}`,
          isp: `${data.isp}`,
          lat: `${data.location.lat}`,
          lng: `${data.location.lng}`
        })

        setIpAddress(data.ip)
      })

    setTimeout(()=>{
      setLoading(false);

      store.addNotification({
        title: "Warning",
        message: "Addblocks may enter in conflict with the app",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate-animated", "animate-fadeIn"],
        animationOut: ["animate-animated", "animate-fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true
        }
      })
    }, 4000)

  }

  async function handleSubmit(ip) { 
    let apiUrl = ''

    const lastChar = ip.charAt(ip.length - 1)

    if(ip === '' || ip === null) { 
      apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}`
    } else if(Number(lastChar) === /\d/){
      apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`
    } else {
      apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${ip}`
    }
    
    try {
      await axios.get(apiUrl)
        .then(res => {
          if(res.status !== 200) {
            throw new Error("Cannot get this Ip/Domain");
          } 
          const data = res.data

          setResult({
            location: `${data.location.region},${data.location.city}`,
            timezone: `${data.location.timezone}`,
            isp: `${data.isp}`,
            lat: `${data.location.lat}`,
            lng: `${data.location.lng}`
          })
        
          setIpAddress(data.ip) 
        })
    } catch(err) {
     store.addNotification({
       title: "Error",
       message: "Invalid Ip/Address",
       type: "danger",
       insert: "top",
       container: "top-right",
       animationIn: ["animate-animated", "animate-fadeIn"],
       animationOut: ["animate-animated", "animate-fadeOut"],
       dismiss: {
         duration: 4000,
         onScreen: true
       }
     })
    }
    
    //setHistoric(historic.push(ip))
    //localStorage.setItem('@ip-tracker/searchHistory', historic)
  }
  
  return(
    <MapContext.Provider value={{
      ipAddress,
      result,
      loading, 
      firstLoad,
      handleSubmit}}>
      {props.children}
    </MapContext.Provider>
  );
}

export {MapContextProvider};