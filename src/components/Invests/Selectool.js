import React, { Component } from 'react';
import { Flex, List } from 'antd-mobile';
import { fetchInvestsCondition } from '../../services'

const Item = List.Item;
const options = [
          {
              ed:0,
              data:[{
                  name:'全部产品',
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
      ]
class Selectool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      cur: 0,
      options: options
    }
  }
  componentWillMount () {
    const { type } = this.props
    fetchInvestsCondition({ type }).then(data => {
      let array = options.map((ii, i) => {
          if (i === 0) {
            ii.data = data.data.data.list
          }
          return ii
        })
      this.setState({
        options: array
      })
      console.log(type)
    })
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation()
    this.setState({
      visible: true
    })
  }
  hideModelHandler = () => {
    this.setState({
      visible: false
    })
  }
  itemClick = (i) => {
    let array = this.state.options.concat([])
    array[this.state.cur].ed = i
    console.log(i,this.state.cur,array)
    this.setState({
      options: array
    })
  }
  render () {
    return (
      <div>
        <Flex style={{height: '.6rem'}}>
          {this.state.options.map((ii, i) => (
            <Flex.Item 
             key={i}
             onClick={() => {
              console.log(this.state)
              this.setState({
                cur: i
              })
             }}
            >
              {ii.data[ii.ed].text || ii.data[ii.ed].name}
            </Flex.Item>
          ))}
        </Flex>
        <List>
          {this.state.options[this.state.cur].data.map((ii, i) => (
            <Item
             key={i}
             arrow="horizontal"
             onClick={() => {
              this.itemClick(i)
             }}
            >
              {ii.name}
            </Item>
          ))
          }
        </List>
      </div>
    )
  }
}

export default Selectool;