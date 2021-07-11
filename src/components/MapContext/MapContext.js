import React,{ createContext, useEffect, useState } from "react";
import axios from 'axios';

import { store } from "react-notifications-component";

export const MapContext = createContext();

function MapContextProvider(props) {
  const [ipAddress, setIpAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({
    location: '',
    timezone: '',
    isp: '',
    lat: '',
    lng: ''
  });
  
  

  useEffect(()=>{
    async function firstLoad() {
      const apiKey = 'at_7HUKdQSWEQp1Z3A7SgwWONBDey3j3'

      const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}`;
  
      setLoading(true)
  
      await axios.get(apiUrl)
        .then(res => {
  
          if(res.status !== 200) throw new Error();
  
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
      }, 4000)
    };
    firstLoad()
  },[])
  

  async function handleSubmit(ip) {
    const apiKey = 'at_7HUKdQSWEQp1Z3A7SgwWONBDey3j3'
    
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
  }
  
  return(
    <MapContext.Provider value={{
      ipAddress,
      result,
      loading, 
      handleSubmit}}>
      {props.children}
    </MapContext.Provider>
  );
}

export {MapContextProvider};