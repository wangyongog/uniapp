import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api.js"
import configService from "@/utils/config.js"
import { ACCESS_TOKEN,USER_INFO } from "@/utils/constants"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        userid: 0,
        user: {}
    },
    mutations:{
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERINFO: (state, userinfo) => {
            state.userinfo = userinfo
        },
        SET_USERID: (state, userid) => {
            state.userid = userid
        },
    },
    modules:{},
    actions:{
        // 登录
        mLogin({ commit }, userInfo) {
            console.log("Login",userInfo)
            return new Promise((resolve, reject) => {
                console.log(userInfo)
                api.login(userInfo).then(response => {
                    console.log(response)
                    if(response.data.status ==1){
                        const result = response.data.data
                         uni.setStorageSync(ACCESS_TOKEN,result.hash);
                         uni.setStorageSync(USER_INFO,result);
                         commit('SET_TOKEN', result.hash)
                         commit('SET_USERID', result.uid)
                         commit('SET_USERINFO', result)
                        resolve(response)
                    }else{
                        resolve(response)
                    }
                }).catch(error => {
                    console.log("catch===>response",response)
                    reject(error)
                })
            })
        },
        // 登出
        Logout({ commit, state }) {
            console.log("Logout",userInfo)
            return new Promise((resolve) => {
                let logoutToken = state.token;
                commit('SET_TOKEN', '')
                commit('SET_USERID', 0)
                commit('SET_USERINFO', {})
                uni.removeStorageSync(ACCESS_TOKEN)
                api.logout(logoutToken).then(() => {
                    resolve()
                }).catch(() => {
                    resolve()
                })
            })
        },
    },
    getters:{
        token: state => state.token,
        user: state => {state.user=uni.getStorageSync(USER_INFO); return state.user},
        userid:state => {state.userid=uni.getStorageSync(USER_INFO).uid; return state.userid},
    }
})