import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile'
import styles from './Invests.less';
import SelectoolComponent from './Selectool'

function Invests({ dispatch, tabs }) {

  return (
    <div className={styles.normal}>
      <Tabs tabs={tabs}
       initialPage={1}
       onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
       style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
      >
        {tabs.map((ii, i) => (
          <div className={styles.cont} key={+new Date()+i}>
            <SelectoolComponent type={ii.type} key={i}>
              test
            </SelectoolComponent>
          </div>
        ))}
      </Tabs>
    </div>
  );
}

function mapStateToProps(state) {
  const { tabs, list } = state.invests;
  return {
    tabs,
    list,
  };
}

export default connect(mapStateToProps)(Invests);
