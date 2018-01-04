import React from 'react';
import { connect } from 'dva';
import { NavBar, PullToRefresh, Button } from 'antd-mobile';
import styles from './InvestDetail.less'

function InvestDetail({ location, history, match }) {
  console.log(location, history, match)
  function title () {
    return {1: '优选标详情', 2: 'VIP详情', 3: '新手标详情', 4: '优+系列详情'}[match.params.type]
  }
  function statusText (v) {
    return {2: '立即抢投', 4: '已流标', 6: '已满标', 7: '还款中', 9: '已完成'}[v]
  }
  return (
    <div className={styles.normal}>
      <NavBar mode="light">{title()}</NavBar>
      <div className={styles.content}>
        <PullToRefresh
         
        >
          dfdfd
        </PullToRefresh>
      </div>
      <Button
      >dfd
      </Button>
    </div>
  )
}

function mapStateToProps(state) {
  const { status } = state.investdetail;
  return {
    status,
  };
}

export default connect(mapStateToProps)(InvestDetail);