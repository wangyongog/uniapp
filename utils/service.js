import Request from '@/utils/luch-request/index.js'
import {ACCESS_TOKEN} from '@/utils/constants.js'
import configService from '@/utils/config.js'
import store from '@/store/index.js';
import tip from '@/utils/tip.js'
import helper from '@/utils/helper.js'
let apiUrl = configService.baseUrl;

const getTokenStorage = () => {
	let token = ''
	try{
		token = uni.getStorageSync(ACCESS_TOKEN)
	}catch(e){
		//TODO handle the exception
		console.log("getTokenStorage",token)
	}
	return token
}

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
  config.baseURL = apiUrl/* 根域名不同 */
  config.header = {
    ...config.header
  }
  config.custom = {
      loading: true // 默认有loading
  }
  return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
    config.header = {
        ...config.header,
        HTTP_X_REQUESTED_WITH: 'xmlhttprequest',
        'X-Access-Token':getTokenStorage(),
        'Content-Type': 'application/json;charset=UTF-8'
    }
    // 演示custom 用处
    if (config.custom.loading) {
        uni.showLoading()
    }
    return config
}, (config) => {
    return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
    // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //   return Promise.reject(response)
    // }
    if (response.config.custom.loading) {
        uni.hideLoading()
    }
    return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
    console.log("请求错误做点什么",response);
    if (response.config.custom.loading) {
        uni.hideLoading()
    }
    if (response) {
        let data = response.data
        const token = uni.getStorageSync(ACCESS_TOKEN)
        console.log("------异常响应------",token)
        console.log("------异常响应------",response.statusCode)
        switch (response.statusCode) {
            case 403:
                tip.error('拒绝访问');
                break
            case 500:
                if(!token){
                    let timeout=setTimeout(tip.alert('登录已过期'), 1000);
                    store.dispatch('Logout').then(() => {
                        clearTimeout(timeout)
                        window.location.reload()
                    })
                }
                break
            case 404:
                break
            case 504:
                break
            case 401:
                if (token) {
                    /* store.dispatch('Logout').then(() => {
                       setTimeout(() => {
                         window.location.reload()
                       }, 1500)
                     }) */
                }
                break
            default:
                tip.error({
                    duration: 0,
                    forbidClick: true,
                    message: data.msg
                });
                break
        }
    }
    return Promise.reject(response)
})
// 单接口不想要loading
//http.get('user/list', {custom: {loading: false}})
//http.post('user/list', {}, {custom: {loading: false}})
/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

export {
  http
}
