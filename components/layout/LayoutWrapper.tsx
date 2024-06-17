import React from 'react';
import styles from './LayoutWrapper.module.css';

const LayoutWrapper = ({ children }:any) => {
  return (
    <div className={styles.layoutWrapper}>
      {children}
    </div>
  );
};

export default LayoutWrapper;