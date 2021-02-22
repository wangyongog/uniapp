import { http } from '@/utils/service.js'
import config from '@/utils/config.js';
const apiService = {
    /**
     * 登录
     */
    login(params, option) {
        return http.post('/login/index.html',params,option);
    },
    /**
     * 手机号码登录
     */
    phoneNoLogin(params) {
    },
    /**
     * 退出
     */
    logout(params) {
        return http.post('/sys/logout',params);
    },
    // 局部修改配置，局部配置优先级高于全局配置
    // http.get('/user/login', {
    //     params: {userName: 'name', password: '123456'}, /* 会加在url上 */
    //     header: {}, /* 会与全局header合并，如有同名属性，局部覆盖全局 */
    //     dataType: 'json',
    //     // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    //     custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    //     // #ifndef MP-ALIPAY || APP-PLUS
    //     responseType: 'text',
    //     // #endif
    //     // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
    //     timeout: 30000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
    //     // #endif
    //     // #ifdef APP-PLUS
    //     sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
    //     // #endif
    //     // #ifdef H5
    //     withCredentials: false, // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
    //     // #endif
    //     // 返回当前请求的task, options。请勿在此处修改options。非必填
    //     getTask: (task, options) => {
    //         // setTimeout(() => {
    //         //   task.abort()
    //         // }, 500)
    //     },
    //     // 自定义验证器。statusCode必存在。非必填
    //     validateStatus: function validateStatus(statusCode) {
    //         return statusCode >= 200 && statusCode < 300
    //     }
    // }).then(res => {
    //
    // }).catch(err => {
    //
    // })

    // http.post('/user/login', {userName: 'name', password: '123456'}, {
    //     params: {}, /* 会加在url上 */
    //     header: {}, /* 会与全局header合并，如有同名属性，局部覆盖全局 */
    //     dataType: 'json',
    //     // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    //     custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    //     // #ifndef MP-ALIPAY || APP-PLUS
    //     responseType: 'text',
    //     // #endif
    //     // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
    //     timeout: 30000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
    //     // #endif
    //     // #ifdef APP-PLUS
    //     sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
    //     // #endif
    //     // #ifdef H5
    //     withCredentials: false, // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
    //     // #endif
    //     // 返回当前请求的task, options。请勿在此处修改options。非必填
    //     getTask: (task, options) => {
    //         // setTimeout(() => {
    //         //   task.abort()
    //         // }, 500)
    //     },
    //     // 自定义验证器。statusCode必存在。非必填
    //     validateStatus: function validateStatus(statusCode) {
    //         return statusCode >= 200 && statusCode < 300
    //     }
    // }).then(res => {
    //
    // }).catch(err => {
    //
    // })


    // http.upload('api/upload/img', {
    //     params: {}, /* 会加在url上 */
    //     // #ifdef APP-PLUS || H5
    //     files: [], // 需要上传的文件列表。使用 files 时，filePath 和 name 不生效。App、H5（ 2.6.15+）
    //     // #endif
    //     // #ifdef MP-ALIPAY
    //     fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
    //     // #endif
    //     filePath: '', // 要上传文件资源的路径。
    //     // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    //     custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    //     name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
    //     // #ifdef H5 || APP-PLUS
    //     timeout: 3000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)
    //     // #endif
    //     header: {},  /* 会与全局header合并，如有同名属性，局部覆盖全局 */
    //     formData: {}, // HTTP 请求中其他额外的 form data
    //     // 返回当前请求的task, options。请勿在此处修改options。非必填
    //     getTask: (task, options) => {
    //         // task.onProgressUpdate((res) => {
    //         //   console.log('上传进度' + res.progress);
    //         //   console.log('已经上传的数据长度' + res.totalBytesSent);
    //         //   console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
    //         //
    //         //   // 测试条件，取消上传任务。
    //         //   if (res.progress > 50) {
    //         //     uploadTask.abort();
    //         //   }
    //         // });
    //     }
    // }).then(res => {
    //     // 返回的res.data 已经进行JSON.parse
    // }).catch(err => {
    //
    // })
};

export default apiService;