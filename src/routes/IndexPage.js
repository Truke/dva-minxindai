import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import HomeComponent from '../components/Home/Home';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <HomeComponent />
      </div>
    </MainLayout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
