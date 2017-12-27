import React, { Component } from 'react';
import { Flex, List } from 'antd-mobile';
import styles from './Invests.less'

const Item = List.Item;

class Selectool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      load: false,
      cur: 0,
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
    }
  }
  componentWillMount(){
    let { index, dispatch } = this.props
    dispatch({
      type: 'invests/condition',
      payload: { index }
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
      })
    }
    if (curindex !== index) {
      this.setState({
        visible: false,
      })
    }
  }
  itemClick = (i) => {
    let { dispatch } = this.props
    let array = [...this.state.options]
    array[this.state.cur].ed = i
    this.setState({
      visible: false,
      options: array
    }, () => {
      dispatch({
        type: this.state.visible ? 'invests/showMask' : 'invests/hideMask'
      })
    })
  }
  optionClick = (i) => {
    let { dispatch } = this.props
    this.setState({
      visible: i === this.state.cur ? !this.state.visible : true,
      cur: i
    }, () => {
      dispatch({
        type: this.state.visible ? 'invests/showMask' : 'invests/hideMask'
      })
    })
  }
  render () {
    return (
      <div style={{position:'relative',zIndex: '2'}}>
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
      </div>
    )
  }
}

export default Selectool;