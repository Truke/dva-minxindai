import React from 'react';
import { connect } from 'dva';
import styles from './Borrow.css';

function Borrow() {
  return (
    <div className={styles.normal}>
      Route Component: Borrow
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Borrow);
