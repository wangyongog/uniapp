import configService from '@/utils/config.js'
import store from '@/store/index.js';
/**
 * Request 0.0.8
 * @Class uni-app request网络请求库
 * @Author lu-ch
 * @Date 2019-07-25
 * @Email webwork.s@qq.com
 * http://ext.dcloud.net.cn/plugin?id=392
 * **/
class Request {
  config = {
    baseUrl: '',
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text'
  }
  static posUrl (url) { /* 判断url是否为绝对路径 */
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }
  interceptor = {
    request: (f) => {
      if (f) {
        this.requestBeforeFun = f
      }
    },
    response: (f) => {
      if (f) {
        this.requestComFun = f
      }
    }
  }
  static requestBeforeFun (config) {
    return config
  }
  static requestComFun (response) {
    return response
  }
  setConfig (f) {
    this.config = f(this.config)
  }
  request (options = {}) {
    options.baseUrl = this.config.baseUrl
    options.dataType = options.dataType || this.config.dataType
    options.responseType = options.responseType || this.config.responseType
    options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)

    options.data = options.data || {}
    options.header = options.header || this.config.header
    options.method = options.method || this.config.method
    return new Promise((resolve, reject) => {
      let next = true
      let _config = null
      options.complete = (response) => {
        let statusCode = response.statusCode
        response.config = _config
        response = this.requestComFun(response)
        if (statusCode === 200) { // 成功
          resolve(response)
        } else {
          reject(response)
        }
      }
      let cancel = (t = 'handle cancel', config = options) => {
        let err = {
          errMsg: t,
          config: config
        }
        reject(err)
        next = false
      }
      _config = { ...this.requestBeforeFun(options, cancel) }
      if (!next) return
      uni.request(_config)
    })
  }
  get (url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'GET',
      ...options
    })
  }
  post (url, data, options = {}) {
    console.log(333)
    return this.request({
      url,
      data,
      method: 'POST',
      ...options
    })
  }
}

const http = new Request();

/* 设置全局配置 */
http.setConfig((config) => {
	/* 根域名不同 */
	config.baseUrl = configService.baseUrl;
	config.header = {
		 //Authorization: '',
        HTTP_X_REQUESTED_WITH: 'xmlhttprequest',
	}
	return config
})

/* 请求之前拦截器 */
http.interceptor.request((config, cancel) => {
	//config.header.ChannelAppId = 1
	return config;
})

/* 请求之后拦截器 */
// 必须使用异步函数，注意
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  return response
}, (response) => {
  // 请求错误做点什么
  console.log("请求错误做点什么",response);
  if (response) {
    let data = response.data
    const token = uni.getStorageSync(ACCESS_TOKEN)
    console.log("------异常响应------",token)
    console.log("------异常响应------",data.status)
    switch (data.status) {
      case 403:
        tip.error('拒绝访问');
        break
      case 500:
        if(!token || data.message=="Token失效，请重新登录"){
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
  return response
})

export default http


