import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'dva/router';
import { Flex, Icon, Progress, List, WhiteSpace, PullToRefresh, ListView } from 'antd-mobile';
import styles from './Invests.less'
import { fetchInvestsCondition, fetchInvestsList } from '../../services'

const Item = List.Item;
const Brief = Item.Brief;
const pageSize = 10

function MyBody(props) {
  return (
    <div className="am-list-body2">
      {props.children}
    </div>
  );
}

class Selectool extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    
    let s = JSON.parse(props.storage[props.index] || '{}')
    this._scrollTop = s && s._scrollTop || 0
    this._data = s && s._data || []
    this.initialListSize = s && s._data && s._data.length > 10 ? s._data.length : 10
    s && s.state && (s.state.dataSource = dataSource.cloneWithRows(this._data))
    this.state = Object.assign({
      visible: false,
      cur: 0,
      pageNo: 1,
      options: [
          {
              ed:0,
              data:[{
                  name: '全部产品',
                  code: '0'
              }]
          },{
              ed:0,
              data:[{
                  name: '不限',
                  text:'利率',
                  code: '0'
              },{
                  name: '5%以上',
                  code: '1'
              },{
                  name: '10%以上',
                  code: '2'
              }]
          },{
              ed:0,
              data:[{
                  name: '不限',
                  text:'期限',
                  code: '0'
              }, {
                  name: '短期',
                  code: '1'
              }, {
                  name: '3-6个月',
                  code: '2'
              }, {
                  name: '7-9个月',
                  code: '3'
              }, {
                name: '10-12个月',
                code: '4'
              }, {
                name: '13个月以上',
                code: '5'
              }]
          },{
              ed:0,
              data:[{
                 name: '不限',
                 text:'还款方式',
                  code: '0'
              }, {
                  name: '等额本息',
                  code: '1'
              }, {
                  name: '先息后本',
                  code: '2'
              }, {
                  name: '到期本息',
                  code: '3'
              }]
          }  
      ],
      dataSource,
      totalCount: 0,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight * 4.95 / 6,
    },s && s.state || {})
  }
  componentWillMount () {
    let { storage, index } = this.props
    let s = JSON.parse(storage[index] || '{}')
    this._isMounted = true
    this.setState({
      isLoading: false
    })
    if (!(s && s.state && !s.state.refreshing)) {
      this.genCondition()
    }
  }
  componentWillUnmount () {
    let { index, dispatch } = this.props
    this._isMounted = false
    this._scrollTop = ReactDOM.findDOMNode(this.lv).scrollTop
    dispatch({
      type: 'invests/savestorage',
      payload: {
        storage: JSON.stringify({
                  _data: this._data,
                  state: this.state,
                  _scrollTop: this._scrollTop,
                }),
        index,
      }
    })
  }
  componentDidMount () {
    this.lv.scrollTo(0, this._scrollTop)
  }
  componentWillReceiveProps(props) {
    let { curindex, index } = props
    if (curindex !== index) {
      this.setState({
        visible: false,
      })
    }
  }
  genCondition = () => {
    let { cond } = this.props
    fetchInvestsCondition({
      type: cond
    }).then((res) => {
      if (this._isMounted && res.data.result === 1 && res.data.data.result === '1') {
        let [...array] = this.state.options
        array[0].data = res.data.data.list || []
        this.setState({
          options: array
        }, () => {
          this.genData()
        })
      }
    })
  }
  genData = () => {
    let { type } = this.props
    fetchInvestsList({
      borrowType: type === 3 ? 2 : type,
      bType: this.state.options[0].data[this.state.options[0].ed].code,
      rate: this.state.options[1].data[this.state.options[1].ed].code,
      loanPeriod: this.state.options[2].data[this.state.options[2].ed].code,
      backway: this.state.options[3].data[this.state.options[3].ed].code,
      pageNo: this.state.pageNo,
      pageSize,
      userId: '',
      isVip: type === 3 ? 2 : 0,
    }).then((res) => {
      if (this._isMounted) {
        this.setState({ refreshing: false, isLoading: false });
        if (res.data.result === 1) {
          this._data = this._data.concat(res.data.data.list);
          this.setState({
            refreshing: false,
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(this._data),
            totalCount: res.data.data.totalCount,
          })
        }
      }
    })
  }
  onRefresh = () => {
    this._data = []
    this.setState({ 
      pageNo: 1,
      totalCount: 0,
      refreshing: true, 
      isLoading: true,
    }, () => {
      this.genData()
    })
  }
  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    if (this.state.dataSource._cachedRowCount < this.state.totalCount) {
      this.setState({
        pageNo: this.state.pageNo + 1,
        isLoading: true,
      }, () => {
        this.genData()
      })
    }
  }
  itemClick = (i) => {
    let array = [...this.state.options]
    array[this.state.cur].ed = i
    this.setState({
      visible: false,
      options: array
    }, () => {
      this.lv.scrollTo(0, 0)
      this._data = []
      this.setState({
        pageNo: 1,
        totalCount: 0
      }, () => {
        this.genData()
      })
    })
  }
  optionClick = (i) => {
    this.setState({
      visible: i === this.state.cur ? !this.state.visible : true,
      cur: i
    })
  }
  
  render () {
    const Cell = (props) => {
      let str = ''
      switch(props.status){
        case 2: 
          str = `${props.amount.toLocaleString()}<br/>可认购金额（元）`
        break
        case 6:
          str = `<img src="src/assets/c-icon_ymb.png" style="width:60px;height:auto" alt="已满标" />` 
        break
        case 7:
          str = `<img src="src/assets/c-icon_hkz.png" style="width:60px;height:auto" alt="还款中" />`
        break
        case 9:
          str = `<img src="src/assets/c-icon_ywc.png" style="width:60px;height:auto" alt="已完成" />`
        break
        default: 
          str = ''
      }
      return <div style={{textAlign:'right'}} dangerouslySetInnerHTML={{__html: str}} />;
    }
    const row = (rowData, sectionID, rowID) => {
      if (!rowData) return ''
      rowData.annualRate2 = (rowData.annualRate * 100).toFixed(2)
      return (
        <Link className={styles.link} to={'/invests/'+rowData.borrowId}>
          <Item
            key={rowID}
            multipleLine
            className={styles.linkitem}
            onClick={() => {}}
          >          
            <Brief style={{fontSize:'.26rem'}}>
              <div className={styles.itemtitle}>{rowData.title}</div>
              <Flex style={{textAlign: 'center'}}>
                <Flex.Item style={{textAlign: 'left'}}><span style={{color:'#f74c31',lineHeight:'.75',paddingLeft:'.24rem'}}><big style={{fontSize:'.4rem'}}>{rowData.annualRate2}</big>%</span><br/>协议年化利率</Flex.Item>
                <Flex.Item>{rowData.loanPeriod}个月<br/>期限</Flex.Item>
                <Flex.Item>
                  <Cell status={rowData.status} amount={rowData.canInvestAmount} />
                </Flex.Item>
              </Flex>
            </Brief>
            {rowData.investPercentInt<100?<div className={styles.showInfo}>
              <div className={styles.progress}><Progress percent={rowData.investPercentInt} position="normal" /></div>
              <div className={styles.progresstxt}>{rowData.investPercentInt}%</div>
            </div>:''}
          </Item>
          <WhiteSpace size="md" />
        </Link>
      );
    };
    return (
      <div className={styles.selcont} style={{position:'relative',zIndex: '2'}}>
        <Flex style={{height: '.8rem',textAlign:'center'}}>
          {this.state.options.map((ii, i) => (
            <Flex.Item 
             key={i}
             onClick={() => {
              this.optionClick(i)
             }}
            >
             <span className={i === this.state.cur && this.state.visible ? styles.seled : ''} style={{verticalAlign:'middle'}}>{ii.data[ii.ed].text || ii.data[ii.ed].name}</span>
             <Icon className={i === this.state.cur && this.state.visible ? styles.seledI : ''} type="down" size="xxs" style={{verticalAlign:'middle'}} />
            </Flex.Item>
          ))}
        </Flex>
        <List className={styles.selarea} style={{'display':this.state.visible ? 'block' : 'none'}}>
          {this.state.options[this.state.cur].data.map((ii, i) => (
            <Item
             key={i}
             arrow="horizontal"
             onClick={() => {
              this.itemClick(i)
             }}
            >
              <span className={i === this.state.options[this.state.cur].ed ? styles.seled : ''}>{ii.name}</span>
            </Item>
          ))
          }
        </List>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          initialListSize={this.initialListSize}
          renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
            {(this.state.refreshing || this.state.isLoading || this._data.length < this.state.totalCount ? '拼命加载中...' : '没有更多数据啦~')}
          </div>)}
          renderBodyComponent={() => <MyBody />}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={5}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={200}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
        />
        <div className={styles.mask} style={{'display': this.state.visible ? 'block' : 'none'}} onClick={()=>{this.setState({visible:false})}}></div>
      </div>
    )
  }
}

export default Selectool;