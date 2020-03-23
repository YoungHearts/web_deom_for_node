/*
 * @Author: yangj
 * @Date: 2020-03-18 16:27:05
 * @LastEditors: yangj
 */
import axios from 'axios'

const request = axios.create({
  // baseURL,
  timeout: 30000 // request timeout
})
const baseURL=`http://localhost:81/`
// request interceptor
request.interceptors.request.use(
  config => {
    let {url}=config||{};
    config.url=`${baseURL}${url}`;
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response =>{
    let{status,data={},statusText}=response||{};
    if(status===200){
      if(data.code===200){
        return Promise.resolve(data);
      }else{
        alert(data.msg||'server error');
        return Promise.reject(data);
      }
    }else{
      alert(statusText||'server error');
      return Promise.reject(data);
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)


  }
)

export  {request};