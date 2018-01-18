import React from 'react';
import { connect } from 'dva'
import { Tabs, PullToRefresh } from 'antd-mobile'
import styles from './TwoPage.less';

function TwoBody(props) {
  return (
    <PullToRefresh
     direction={"down"}
     indicator={{activate:' ',deactivate: ' ',finish:' '}}
     onRefresh={props.onTwoRefresh}
    >
     {props.children} 
    </PullToRefresh>
  )
}

function TwoPage({dispatch, tabslist, onTwoRefresh}) {
  
  return (
    <div className={styles.normal}>
      <Tabs tabs={tabslist}
       initialPage={0}
       swipeable={false}
       style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
      >
        {
          tabslist.map((e, i) => (
            <TwoBody onTwoRefresh={onTwoRefresh} key={i}>
              {(() => {
                if (i === 0) {
                  return <div>1111</div>
                } else if (i === 1) {
                  if (tabslist.length === 2) {
                    return <div>基本信息</div>
                  } else {
                    return <div>借款人信息</div>
                  }
                } else if (i === 2) {
                    return <div>投资记录</div>
                }
              })()}
            </TwoBody>
          ))
        }
        
      </Tabs>
    </div>
  );
}

function mapStateToProps (state, props) {
  console.log(props)
  const { tabslist, onTwoRefresh } = props
  return {
    tabslist,
    onTwoRefresh,
  }
}

export default connect(mapStateToProps)(TwoPage);
