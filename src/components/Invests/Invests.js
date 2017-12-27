import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile'
import styles from './Invests.less';
import SelectoolComponent from './Selectool'

function Invests({ dispatch, tabs, index, mask }) {
  function maskClick(){
    dispatch({
      type: 'invests/hideMask'
    })
  }
  function tabClick(tab, index) {
    dispatch({
      type: 'invests/saveindex',
      payload: { index }
    })
    if (mask) {
      dispatch({
        type: 'invests/hideMask'
      })
    }
  }
  return (
    <div className={styles.normal}>
      <div className={styles.mask} style={{'display': mask ? 'block' : 'none'}} onClick={maskClick}></div>
      <Tabs tabs={tabs}
       initialPage={index}
       onTabClick={(tab, index) => { 
        tabClick(tab, index)
       }}
       style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
      >
        {tabs.map((ii, i) => (
          <div className={styles.cont} key={i}>
            <SelectoolComponent {...ii} curindex={index} index={i} dispatch={dispatch}>
              
            </SelectoolComponent>
          </div>
        ))}
      </Tabs>
    </div>
  );
}

function mapStateToProps(state) {
  const { tabs, index, mask } = state.invests;
  return {
    tabs,
    index,
    mask,
  };
}

export default connect(mapStateToProps)(Invests);
