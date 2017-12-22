import React from 'react';
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { TabBar } from 'antd-mobile';

function Footer({ dispatch, location }) {
  return (
    <div>
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#fe6f07"
      barTintColor="white"
    >
      <TabBar.Item
        title="首页"
        key="home"
        icon={<div style={{
          width: '.4rem',
          height: '.4rem',
          background: 'url(src/assets/ficon1.png) center center /  .4rem .4rem no-repeat' }}
        />
        }
        selectedIcon={<div style={{
          width: '.4rem',
          height: '.4rem',
          background: 'url(src/assets/ficon4.png) center center /  .4rem .4rem no-repeat' }}
        />
        }
        selected={location.pathname===''||location.pathname==='/'}
        onPress={() => {dispatch(routerRedux.push('/'))}}
      >
      </TabBar.Item>
      <TabBar.Item
        title="投资"
        key="invest"
        icon={<div style={{
          width: '.4rem',
          height: '.4rem',
          background: 'url(src/assets/ficon2.png) center center /  .4rem .4rem no-repeat' }}
        />
        }
        selectedIcon={<div style={{
          width: '.4rem',
          height: '.4rem',
          background: 'url(src/assets/ficon5.png) center center /  .4rem .4rem no-repeat' }}
        />
        }
        selected={location.pathname==='/invests'}
        onPress={() => {dispatch(routerRedux.push('/invests'))}}
      >
      </TabBar.Item>
      <TabBar.Item
        title="我的"
        key="me"
        icon={<div style={{
          width: '.4rem',
          height: '.4rem',
          background: 'url(src/assets/ficon3.png) center center /  .4rem .4rem no-repeat' }}
        />
        }
        selectedIcon={<div style={{
          width: '.4rem',
          height: '.4rem',
          background: 'url(src/assets/ficon6.png) center center /  .4rem .4rem no-repeat' }}
        />
        }
        selected={location.pathname==='me'}
      >
      </TabBar.Item>
    </TabBar>
  </div>
  );
}

export default connect()(Footer);