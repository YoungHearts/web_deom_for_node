/*
 * @Author: yangj
 * @Date: 2020-03-18 16:26:54
 * @LastEditors: yangj
 */
import { request } from '../utils/request';

const query=(data)=> {
  return request({
    url: 'api/query',
    method: 'get',
    data,
    isLoading:true
  });
}
const add=(data)=> {
  return request({
    url: 'api/add',
    method: 'post',
    data,
  });
}
const del=(data)=> {
  return request({
    url: 'api/delete',
    method: 'delete',
    data,
  });
}
const register=(data)=> {
  return request({
    url: 'user/register',
    method: 'post',
    data,
  });
}
const login=(data)=> {
  return request({
    url: 'user/login',
    method: 'post',
    data,
  });
}
const change_password=(data)=> {
  return request({
    url: 'user/change_password',
    method: 'post',
    data,
  });
}
export{query,add,del,register,login,change_password}