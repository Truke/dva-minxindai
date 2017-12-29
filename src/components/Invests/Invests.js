import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile'
import styles from './Invests.less';
import SelectoolComponent from './Selectool'

function Invests({ dispatch, tabs, index }) {

  function tabClick(tab, i) {
    if (i !== index) {
      dispatch({
        type: 'invests/saveindex',
        payload: { index: i }
      })
    }
  }
  return (
    <div className={styles.normal}>
      <Tabs tabs={tabs}
       initialPage={index}
       swipeable={false}
       onTabClick={(tab, i) => { 
        console.log(tab, '** ',i)
        tabClick(tab, i)
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
  const { tabs, index } = state.invests;
  return {
    tabs,
    index,
  };
}

export default connect(mapStateToProps)(Invests);
