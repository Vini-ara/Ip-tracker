import React, { useContext } from 'react'; 
import { MapContainer, TileLayer, Marker, useMap} from 'react-leaflet';
import L from 'leaflet';

import styles from './map.module.scss'
import pin from '../../styles/images/icon-location.svg';

import { MapContext } from '../MapContext/MapContext';

export default function Map() {
  const data = useContext(MapContext);

  const { lat, lng } = data.result; 

  function RecenterMap() {
   const map = useMap();

   map.flyTo([lat, lng], 14, {
    duration: 4
    })

   return null
  }

  const icon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [45, 55],
    className: ''
  })
  return (
    <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={true} className={styles.Container}>
      <TileLayer
        attribution=''
        url="https://api.mapbox.com/styles/v1/biguzz/ckpooe79o055o17s42irnyxjc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmlndXp6IiwiYSI6ImNrcG9vcTk3bjF6a24ycG55ODFoOGk3aG8ifQ.FDzRtovzYNOFQQ-7XHjRmQ"
        />
        <RecenterMap/>
      <Marker position={[lat, lng]} icon={ icon }></Marker>
    </MapContainer> 
    );

}
