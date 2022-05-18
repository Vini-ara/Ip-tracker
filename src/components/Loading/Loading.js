import React, { useContext, useEffect } from "react";
import { MapContext } from "../MapContext/MapContext";
import styles from './loading.module.scss';

export function Loading() {
  const data = useContext(MapContext)

  useEffect(()=>{},[data.loading])

  if(data.loading) {
    return(
      <div className={styles.Overlay}>
        <h1>IP Address Tracker</h1>
        <div className={styles.AnmContainer}>
          <div className={styles.ball1}></div>
          <div className={styles.ball2}></div>
          <div className={styles.ball3}></div>
        </div>
      </div>
    )
  } else {
    return null
  }
}