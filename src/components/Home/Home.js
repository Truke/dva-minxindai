import React from 'react';
import { connect } from 'dva';
import { Carousel, Grid, WhiteSpace, List, Flex, Button } from 'antd-mobile';
import styles from './Home.less';

const Item = List.Item;
const Brief = Item.Brief;

function Home({ dispatch, banners, list, loading }) {
  const grids = [{
      icon: 'src/assets/s_icon1.png',
      text: '新手引导'
    }, {
      icon: 'src/assets/s_icon2.png',
      text: '优选标'
    }, {
      icon: 'src/assets/s_icon3.png',
      text: '下载APP'
    }, {
      icon: 'src/assets/s_icon4.png',
      text: '邀请好友'
    }]
  function gridClick (el, index) {
    console.log(el, index)
  }
  function imgLoad(e, i){
   i === 0 && (e.target.parentNode.parentNode.parentNode.style.height = '3.6rem')
  }
  return (
    <div className={styles.home}>
      <Carousel
        autoplay={false}
        infinite
        style={{height: '3.6rem'}}
      >
        {banners.map((ii, i) => (
          <a
            key={i}
            href={ii.hypeLink}
            style={{display: 'inline-block', width: '100%', height: '3.6rem'}}
          >
            <img
              src={ii.url}
              alt={ii.title}
              onLoad={e => imgLoad(e, i)}
            />
          </a>
        ))}
      </Carousel>
      <WhiteSpace size="sm" />
      <Grid
       data={grids}
       hasLine={false} 
       onClick={gridClick}
       renderItem={dataItem => (
        <div style={{ padding: '.2rem' }}>
          <img src={dataItem.icon} style={{ width: '1rem', height: '1rem' }} alt="" />
          <div style={{ color: '#888', fontSize: '12px', marginTop: '0.2rem' }}>
            <span>{dataItem.text}</span>
          </div>
        </div>
       )}
      />
      <WhiteSpace size="sm" />
      <List className="my-list">
        {
          list.map((ii, i) => {
            ii.annualRate = (ii.annualRate * 100).toFixed(2)
            return (
              <Item
                key={i}
                multipleLine
                onClick={() => {}}
              >
                {ii.highTitle}
                <Brief>
                  <Flex>
                    <Flex.Item><strong>{ii.annualRate}%</strong></Flex.Item>
                    <Flex.Item>项目期限 {ii.loanPeriod}个月</Flex.Item>
                  </Flex>
                  <Flex>
                    <Flex.Item>协议年化利率</Flex.Item>
                    <Flex.Item>可投金额 {ii.remainingCapital}元</Flex.Item>
                  </Flex>
                  <WhiteSpace size="lg" />
                  <Button style={{color: '#fff', backgroundColor: '#fe6f07',border:'none'}}>立即抢投</Button>
                </Brief>
              </Item>
            )
          })
        }
      </List>
      <WhiteSpace size="xl" />
      <div>市场有风险  投资需谨慎</div>
      <WhiteSpace size="xl" />
    </div>
  );
}

function mapStateToProps(state) {
  const { banners, list } = state.home;
  return {
    banners,
    list,
  };
}

export default connect(mapStateToProps)(Home);
