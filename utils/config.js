let _ENV = 'dev';
let baseUrl;

if( _ENV == 'dev' ){
	baseUrl = 'http://m.web.local';
}else{
	baseUrl = 'http://boot.jeecg.org:8080/jeecg-boot';
}


let staticDomainURL = baseUrl+ '/static';

const configService = {
	baseUrl: baseUrl,
	staticDomainURL: staticDomainURL,
	os:(uni.getSystemInfoSync())['platform'],
	version:2021,
	USER_INFO_KEY:'user_info',
	ACCESS_TOKEN:'access-token'
};
export default configService

