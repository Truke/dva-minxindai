import React, { Component } from 'react';
import { Flex, List, ListView } from 'antd-mobile';
import styles from './Invests.less'
import { fetchInvestsList } from '../../services'

const Item = List.Item;
const Brief = Item.Brief;

let pageNo = 1
let pageSize = 10

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
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
    this._data = []
    this.state = {
      visible: false,
      cur: 0,
      load: false,
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
      isLoading: true,
      height: document.documentElement.clientHeight * 4.95 / 6,
    }
  }
  componentWillMount() {
    let { index, dispatch } = this.props
    dispatch({
      type: 'invests/condition',
      payload: { index: index }
    })
  }
  componentWillReceiveProps(props) {
    let { curindex, index, data } = props

    if (!this.state.load && data.length) {
      let [...array] = this.state.options
      array[0].data = data
      this.setState({
        load: true,
        options: array
      }, () => {
        this.genData()
      })
    }
    if (curindex !== index) {
      this.setState({
        visible: false,
      })
    }
  }
  genData = () => {
    let { type } = this.props
    fetchInvestsList({
      borrowType: type === 3 ? 2 : type,
      bType: this.state.options[0].data[this.state.options[0].ed].code,
      rate: this.state.options[1].data[this.state.options[0].ed].code,
      loanPeriod: this.state.options[2].data[this.state.options[0].ed].code,
      backway: this.state.options[3].data[this.state.options[0].ed].code,
      pageNo,
      pageSize,
      userId: '',
      isVip: type === 3 ? 2 : 0,
    }).then((res) => {
      this.setState({ isLoading: false });
      if (res.data.result === 1) {
        this._data = this._data.concat(res.data.data.list);
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(this._data),
          totalCount: res.data.data.totalCount,
        })
      }
    })
  }
  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    if (this.state.dataSource._cachedRowCount < this.state.totalCount) {
      this.genData(++pageNo);
    }
  }
  itemClick = (i) => {
    let array = [...this.state.options]
    array[this.state.cur].ed = i
    this.setState({
      visible: false,
      options: array
    }, () => {
      this._data = []
      pageNo = 1
      this.genData()
    })
  }
  optionClick = (i) => {
    this.setState({
      visible: i === this.state.cur ? !this.state.visible : true,
      cur: i
    })
  }
  
  render () {
    const row = (rowData, sectionID, rowID) => {
      rowData.annualRate2 = (rowData.annualRate * 100).toFixed(2)
      return (
        <Item
          key={rowID}
          multipleLine
          onClick={() => {}}
        >
          <div className={styles.itemtitle}>{rowData.title}</div>
          <Flex style={{textAlign: 'center'}}>
            <Flex.Item><strong>{rowData.annualRate2}%</strong><br/><Brief>协议年化利率</Brief></Flex.Item>
            <Flex.Item>{rowData.loanPeriod}个月<br/><Brief>期限</Brief></Flex.Item>
            <Flex.Item>
              {rowData.status}
            </Flex.Item>
          </Flex>
        </Item>
      );
    };
    return (
      <div className={styles.selcont} style={{position:'relative',zIndex: '2'}}>
        <Flex style={{height: '.6rem',textAlign:'center'}}>
          {this.state.options.map((ii, i) => (
            <Flex.Item 
             key={i}
             onClick={() => {
              this.optionClick(i)
             }}
            >
             <span className={i === this.state.cur && this.state.visible ? styles.seled : ''}>{ii.data[ii.ed].text || ii.data[ii.ed].name}</span>
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
          initialListSize={10}
          renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
            {this.state.isLoading ? '拼命加载中...' : (this._data.length < this.state.totalCount ? '拼命加载中...' : '没有更多数据啦~')}
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
        />
        <div className={styles.mask} style={{'display': this.state.visible ? 'block' : 'none'}} onClick={()=>{this.setState({visible:false})}}></div>
      </div>
    )
  }
}

export default Selectool;