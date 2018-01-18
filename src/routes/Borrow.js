import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import ReactDOM from 'react-dom';
import { NavBar,Icon, PullToRefresh, Button } from 'antd-mobile';
// import classnames from 'classnames'
import styles from './Borrow.less';
import OnePageComponent from '../components/Borrow/OnePage'

function Borrow({dispatch, borrowType, borrowId, depositoryId, borrowStatus}) {
  let one,two
  function title () {
    return {1: '优选标详情', 2: 'VIP详情', 3: '新手标详情', 4: '优+系列详情'}[borrowType]
  }
  function statusText (v) {
    return {2: '立即抢投', 4: '已流标', 6: '已满标', 7: '还款中', 9: '已完成'}[v]
  }
  function onOneRefresh(){
    ReactDOM.findDOMNode(one).classList.add('animated')
    ReactDOM.findDOMNode(one).classList.remove('slideInDown')
    ReactDOM.findDOMNode(one).classList.add('slideOutUp')
    ReactDOM.findDOMNode(two).classList.add('animated')
    ReactDOM.findDOMNode(two).classList.remove('slideOutDown')
    ReactDOM.findDOMNode(two).classList.add('slideInUp')
    ReactDOM.findDOMNode(two).style.zIndex = 1
  }
  function onTwoRefresh(){
    ReactDOM.findDOMNode(one).classList.remove('slideOutUp')
    ReactDOM.findDOMNode(one).classList.add('slideInDown')
    ReactDOM.findDOMNode(two).classList.remove('slideInUp')
    ReactDOM.findDOMNode(two).classList.add('slideOutDown')
  }
  return (
    <div className={styles.normal}>
      <NavBar 
       style={{backgroundColor:'#2875d9',color:'#fff'}}
       mode="light"
       icon={<Icon type="left" size="lg" />}
       onLeftClick={() => {
        dispatch(routerRedux.push('/invests'))
       }}
      ><span style={{color:'#fff'}}>{title()}</span></NavBar>
      <div className={styles.content}>
        <PullToRefresh
         ref={el => one = el}
         className={styles.page}
         direction={"up"}
         indicator={{activate:' ',deactivate: ' ',finish:' '}}
         onRefresh={onOneRefresh}
        >
          <OnePageComponent />
        </PullToRefresh>
        <PullToRefresh
         ref={el => two = el}
         className={styles.page}
         style={{backgroundColor: 'blue',zIndex:'-1'}}
         direction={"down"}
         indicator={{activate:' ',deactivate: ' ',finish:' '}}
         onRefresh={onTwoRefresh}
        >
          {(()=>{return 'd'})()}
        </PullToRefresh>
      </div>
      <Button
      >{statusText(borrowStatus)}
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    borrowType, 
    borrowId, 
    depositoryId, 
    borrowStatus, 
  } = state.borrow
  return { 
    borrowType, 
    borrowId, 
    depositoryId, 
    borrowStatus, 
  };
}

export default connect(mapStateToProps)(Borrow);
