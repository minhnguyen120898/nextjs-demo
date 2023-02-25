
import { useAlert } from '@/hooks/use-alert';
import * as React from 'react';
import { Utils } from 'shared/enum';
import styles from './alert.module.scss';

export function AlertComponent () {
  const { alert, hideAlert } = useAlert();

  if (!alert.message) {
    return <></>
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalBody}>
          {
            alert.icon && (
              <img src={alert.icon} alt="" className={styles.icon} />
            )
          }
          <h3>{alert.title}</h3>
          {
            alert.message && (
              <p>{alert.message}</p>
            )
          }
          {
            alert.arrayMessage && alert.arrayMessage.length > 0 && (
              alert.arrayMessage.map((e, index) => {
                return (
                  <p key={e + 'index'}>{e}</p>
                )
              })
            )
          }
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.btn} ${styles.cancel}`} onClick={hideAlert}>
            { alert.textBtnError || Utils.CLOSE }
          </button>
          <button className={`${styles.btn} ${styles.save}`} onClick={hideAlert}>
            { alert.textBtnSuccess || Utils.SAVE }
          </button>
        </div>
      </div>
    </div>
  );
}
