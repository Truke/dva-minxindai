import React from 'react';
import { InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

class MoneyKeyForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'number',
    }
  }
  onBlur = (e) => {
    this.props.dispatch({
      type: 'willmoney',
      payload: {
        amount: e
      }
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div style={{width:'70%',margin:'0 auto'}}>
        <InputItem
          type={type}
          placeholder="请输入金额"
          ref={el => this.customFocusInst = el}
          clear
          onBlur={this.onBlur}
        >我要投</InputItem>
        <div style={{textAlign:'center',color:'#666',lineHeight:'.44rem',padding:'.2rem 0 .4rem 0'}}>
          <span style={{fontSize:'.42rem',color:'#fdae3b'}}>0</span><br/>预期收益（元）
        </div>
      </div>
    );
  }
}

export default createForm()(MoneyKeyForm);
