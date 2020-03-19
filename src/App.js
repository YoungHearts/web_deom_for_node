/*
 * @Author: yangj
 * @Date: 2020-03-18 16:06:18
 * @LastEditors: yangj
 */
import React, { Component } from 'react';
import './App.css';
import { query, add,del} from '../src/api/api';
class Index extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      addSqlParams:{ name: 'yj90', url: 'http://yj90.cn', alexa: '9999999', country: 'CN' }
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
  handleChange=(key,e)=>{
    console.log(e.target.value);
    let {addSqlParams}=this.state;
    addSqlParams[key]=e.target.value||'';
    this.setState({addSqlParams})
  }
  render() {
    let { list = [], addSqlParams} = this.state;
    return (
      <div className="App">
        <div>
          <div style={{marginBottom:'10px'}}>
            <input value={addSqlParams.name} onChange={this.handleChange.bind(this,'name')}/>
            <input value={addSqlParams.url} onChange={this.handleChange.bind(this,'url')}/>
            <input value={addSqlParams.alexa} onChange={this.handleChange.bind(this,'alexa')}/>
            <input value={addSqlParams.country} onChange={this.handleChange.bind(this,'country')}/>
            <button onClick={this.addFun}>add</button>
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
      </div>
    )
  }
}
export default Index;
