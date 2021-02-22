export default class helper {
    static checkUrl (url) { /* 判断url是否为绝对路径 */
        return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
    }
}

