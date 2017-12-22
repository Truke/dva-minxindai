import React from 'react';
import styles from './MainLayout.css';
import Footer from './Footer';

function MainLayout({ children, location }) {
  return (
    <div className={styles.normal}>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <Footer location={location} />
    </div>
  );
}

export default MainLayout;
