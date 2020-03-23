/*
 * @Author: yangj
 * @Date: 2020-03-18 16:06:18
 * @LastEditors: yangj
 */
import React, { Component } from 'react';
import './App.css';
import { query, add,del,register,login,change_password} from '../src/api/api';
class Index extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      addSqlParams:{ name: 'yj90', url: 'http://yj90.cn', alexa: '9999999', country: 'CN' },
      loginParams:{ password:'',account:'' },
      registerParams:{ user_name: '', password:'',account:'' },
      on_user:''//登录状态
    }
  }
  componentDidMount() {
    this.queryFun();
  }
  queryFun = () => {
    query().then(res => {
      console.log('query', res);
      this.setState({list:(res.data&&res.data.list)||[]})
    })
  }
  addFun = () => {
    let {addSqlParams}=this.state;
    add(addSqlParams).then(res => {
      console.log('add', res);
      this.queryFun()
    })
  }
  delFun = (id) => {
    del({id}).then(res => {
      console.log('add', res);
      this.queryFun()
    })
  }
  registerFun = () => {
    let {loginParams}=this.state;
    register(loginParams).then(res => {
      console.log('add', res);
    })
  }
  loginFun = () => {
    let {loginParams}=this.state;
    login(loginParams).then(res => {
      this.setState({on_user:res.data.user_name||''})
    })
  }
  changePassword=()=>{
    let {loginParams}=this.state;
    change_password(loginParams).then(res => {
      this.setState({loginParams:{ password:'',account:'' }});
    })
  }
  handleChange=(key,e)=>{
    console.log(e.target.value);
    let {addSqlParams}=this.state;
    addSqlParams[key]=e.target.value||'';
    this.setState({addSqlParams})
  }
  loginhandleChange=(key,e)=>{
    console.log(e.target.value);
    let {loginParams}=this.state;
    loginParams[key]=e.target.value||'';
    this.setState({loginParams})
  }
  registerhandleChange=(key,e)=>{
    console.log(e.target.value);
    let {registerParams}=this.state;
    registerParams[key]=e.target.value||'';
    this.setState({registerParams})
  }
  render() {
    let { list = [], addSqlParams,loginParams,registerParams,on_user} = this.state;
    return (
      <div className="App">
        <div>
          <div style={{marginBottom:'10px'}}>
            <input value={addSqlParams.name} onChange={this.handleChange.bind(this,'name')}/>
            <input value={addSqlParams.url} onChange={this.handleChange.bind(this,'url')}/>
            <input value={addSqlParams.alexa} onChange={this.handleChange.bind(this,'alexa')}/>
            <input value={addSqlParams.country} onChange={this.handleChange.bind(this,'country')}/>
            <button onClick={this.addFun}>add</button>
            <button onClick={this.registerFun}>registerFun</button>
          </div>
          <table border='1' style={{borderCollapse: 'collapse'}}>
            <tbody>
              <tr>
                <th>id</th>
                <th>名称</th>
                <th>地址</th>
                <th>排名</th>
                <th>国家</th>
                <th>操作</th>
              </tr>
              {list.length > 0 && list.map((item, index) => {
                return <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.url}</td>
                  <td>{item.alexa}</td>
                  <td>{item.country}</td>
                  <td><button onClick={this.delFun.bind(this,item.id)}>删除</button></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div>
          <p>注册</p>
          <div style={{marginBottom:'10px'}}>
            <input placeholder='账号' value={registerParams.account} onChange={this.registerhandleChange.bind(this,'account')}/>
            <input placeholder='密码' value={registerParams.password} onChange={this.registerhandleChange.bind(this,'password')}/>
            <input placeholder='用户名' value={registerParams.user_name} onChange={this.registerhandleChange.bind(this,'user_name')}/>
            <button onClick={this.registerFun}>register</button>
          </div>
        </div>
        <div>
          <p>登录(当前账号：{on_user?on_user:'未登录'})</p>
          <div style={{marginBottom:'10px'}}>
            <input placeholder='账号' value={loginParams.account} onChange={this.loginhandleChange.bind(this,'account')}/>
            <input placeholder='密码' value={loginParams.password} onChange={this.loginhandleChange.bind(this,'password')}/>
            <button onClick={this.loginFun}>login</button>
            <button onClick={this.changePassword}>change password</button>
          </div>
        </div>
      </div>
    )
  }
}
export default Index;
