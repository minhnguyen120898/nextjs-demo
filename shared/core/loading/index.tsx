
import React from "react";
import styles from "./loading.module.scss";

const LoadingComponent = () => {
  return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}>
        <div className={styles['loading-bounce1']}></div>
        <div className={styles['loading-bounce2']}></div>
        <div className={styles['loading-bounce3']}></div>
      </div>
    </div>
  );
};

export default LoadingComponent;

