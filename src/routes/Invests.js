import React from 'react';
import { connect } from 'dva';
import styles from './Invests.less';
import InvestsComponent from '../components/Invests/Invests';
import MainLayout from '../components/MainLayout/MainLayout';

function Invests({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <InvestsComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Invests);