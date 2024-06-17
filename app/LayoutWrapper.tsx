import React from 'react';
import styles from './LayoutWrapper.module.css';

const LocalLayoutWrapper = ({ children }:any) => {
  return (
    <div className={styles.layoutWrapper}>
      {children}
    </div>
  );
};

export default LocalLayoutWrapper;