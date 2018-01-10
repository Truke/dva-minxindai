import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { NavBar,Icon, PullToRefresh, Button } from 'antd-mobile';
import styles from './Borrow.less';

function Borrow({dispatch, borrowType, borrowId, depositoryId, borrowStatus}) {
  function title () {
    return {1: '优选标详情', 2: 'VIP详情', 3: '新手标详情', 4: '优+系列详情'}[borrowType]
  }
  function statusText (v) {
    return {2: '立即抢投', 4: '已流标', 6: '已满标', 7: '还款中', 9: '已完成'}[v]
  }
  return (
    <div className={styles.normal}>
      <NavBar 
       mode="light"
       icon={<Icon type="left" size="md" />}
       onLeftClick={() => {
        dispatch(routerRedux.push('/invests'))
       }}
      >{title()}</NavBar>
      <div className={styles.content}>
        <PullToRefresh
         
        >
          第一屏
        </PullToRefresh>
        <PullToRefresh
         
        >
          第二屏
        </PullToRefresh>
      </div>
      <Button
      >{statusText(borrowStatus)}
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  const { borrowType, borrowId, depositoryId, borrowStatus } = state.borrow
  return { borrowType, borrowId, depositoryId, borrowStatus };
}

export default connect(mapStateToProps)(Borrow);
