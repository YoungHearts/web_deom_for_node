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
export{query,add,del}