import axios from 'axios';
var qs = require('qs');

export const getTenderInfo = data => axios.get('http://api.tdsc360.com/webapi/bids/list/' + data)

export const Login = data => axios.post('http://api.tdsc360.com/webapi/user/login',qs.stringify(data))

export const regSMS = data => axios.post('http://api.tdsc360.com/webapi/sms/sendcode', data)

export const regsiter = data => axios.post('http://api.tdsc360.com/webapi/user/register', data)

export const checkedSMScode = data => axios.post('http://api.tdsc360.com/webapi/sms/checkcode', data)

export const getUserInfo = data => axios.get('http://api.tdsc360.com/webapi/user/userinfo', data)

export const getCitys = () => axios.get('http://api.tdsc360.com/webapi/common/citys')

export const changeBaseInfo = (data) => axios.post('http://api.com/webapi/user/baseinfo', data)

export const releaseInfo = (data) => axios.post('http://api.com/webapi/user/sendbids', data)

export const recommendIndex = () => axios.get('http://api.tdsc360.com/webapi/bids/recommend/92')

export const getDistricts = () => axios.get('http://api.tdsc360.com/webapi/common/districts')

// export const RECOMMEND = (data) => axios.post('http://api.tdsc360.com/webapi/index/list', data)

export const categroy = () => axios.get('http://api.tdsc360.com/webapi/common/bids/categroy')


