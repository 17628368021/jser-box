/* 
  "vuex" ------Created by superman on 18/7/24
*/
import Vuex from 'vuex'
import Vue from 'vue'
import {getUserInfo} from '../api/indexReg'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginuser:{},
    token: null,
    userInfo: {}
  },
  getters: {
    getName : state => {
      return state.userInfo.nick_name
    },
    getAllUserInfo : state => {
      if (state.token) {
        return state.userInfo
      }
    }
  },
  mutations: {
    login: (state,data) => {
      // localStorage.token = data.token;
      let loginInfo = JSON.stringify(data.userinfo)
      sessionStorage.loginuser = loginInfo
      sessionStorage.token = data.token
      state.loginuser = data.userinfo
      state.token = data.token
    },
    logout: (state) => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loginuser')
      sessionStorage.removeItem('userInfo')
      state.token = null
      state.loginuser = {}
      state.userInfo = {}
    },
    saveLogInfo: (state, data) => {
      let userinfo = JSON.stringify(data)
      sessionStorage.userInfo = userinfo
      state.userInfo = data
    }
  },
  actions: {
    getUserInfo (context) {
      if (context.state.token) {
        getUserInfo().then((res)=>{
          // console.log('vuex打印的用户信息：', res.data.data)
          if(res.status === 200){
            context.commit('saveLogInfo',res.data.data)
          }
        })
      } else {
        console.log('No token has been found!!!')
      }
    }
  }
})