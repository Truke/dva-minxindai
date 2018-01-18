import React from 'react';
import { connect } from 'dva';
import { Flex, WhiteSpace, List } from 'antd-mobile';
import WaterWave from './WaterWave'
import MoneyKeyForm from './MoneyKeyForm'
import styles from './OnePage.less';

function OnePage({dispatch, info}) {
  function cantou(v) {
    return v
  }
  return (
    <div className={styles.normal}>
      <div className={styles.cont}>
        <Flex>
          <Flex.Item className={styles.cell}>
            <strong>{info.annualRate}</strong>%<br/>协议出借利率
          </Flex.Item>
          <Flex.Item className={styles.cell}>
            <strong>{info.loanPeriod}</strong>个{info.loanPeriodType===0?'月':info.loanPeriodType===1?'日':''}<br/>投资期限
          </Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex>
          <Flex.Item>
            <div className={styles.wavebox}>
              <WaterWave title=" " percent={info.investPercentInt}/>
            </div>
          </Flex.Item>
          <Flex.Item className={styles.waveright}>
            <span>10000</span> / {info.amount||info.planAmount} <br/>可投金额 / 总金额（元）
          </Flex.Item>
        </Flex>
        <MoneyKeyForm dispatch={dispatch}/>
      </div>
      <WhiteSpace size="lg" />
      <div className={styles.infoBox}>
        <List>
          <List.Item>
            <span>项目名称</span>扩大经营
          </List.Item>
          <List.Item>
            <span>起投金额</span>50元
          </List.Item>
          <List.Item>
            <span>项目结束时间</span>50元
          </List.Item>
          <List.Item>
            <span>项目开始时间</span>50元
          </List.Item>
          <List.Item>
            <span>还款方式</span>50元
          </List.Item>
          <List.Item>
            <span>预计计息日</span>放款指令执行日
          </List.Item>
        </List>
      </div>
      <div style={{ padding: 5, textAlign: 'center' }}>上滑查看更多详情</div>
    </div>
  );
}

function mapStateToProps(state) {
  const { info } = state.borrow;
  console.log(1,info)
  return {
    info,
  };
}

export default connect(mapStateToProps)(OnePage);
