import axios from 'axios';
import env from '../../config/dev.env';

const baseURL = env === 'development'
    ? 'market/'
    : env === 'production'
        ? '/market/'
        : '/market/';
const http = axios;
const qs = require('qs');
http.defaults.baseURL = baseURL;
// http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data)
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 返回状态判断(添加响应拦截器)
http.interceptors.response.use((res) => {
    // // 对响应数据做些事
    if (res.data.serviceResult === 1) {
        return res.data;
    } else if (res.data.serviceResult === 2) {
        _this.$message.warning(res.data.resultInfo);
        return Promise.reject(res);
    }
    else if (res.data.serviceResult === 4) {
        _this.$message.warning(res.data.resultInfo);
        _this.$router.push({ name: 'login' });
        return Promise.reject(res);
    }
    // } else if (res.data.serviceResult === 2) {
    //     //     _this.$Notice.error({
    //     //         title: '失败',
    //     //         desc: '请检查表单是否填写正确'
    //     //     });
    // } else if (res.data.serviceResult === 2) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '请检查表单是否填写正确'
    //     });
    //     return Promise.reject(res);
    // } else if (res.data.serviceResult === 102) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '账号不存在'
    //     });
    // } else if (res.data.serviceResult === 103) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '密码不正确'
    //     });
    // } else if (res.data.serviceResult === 104) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '命名重复'
    //     });
    // } else {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '系统繁忙,请稍后重试'
    //     });
    // }
    return Promise.reject(res);
}, (error) => {
    _this.$message.error('系统繁忙,请稍后重试');
    return Promise.reject(error);
});

// init
let _this = null;
export const init = (vm) => { _this = vm; };

// admin
export const login = (data, options) => http.post('admin/login.do', data, options);
export const getAdminInfo = (options) => http.post('admin/getAdminInfo.do', options);

// classify
export const getAllClassify = (data,options) => http.post('classify/getAllClassify.do',data, options);
export const getClassifyByPage = (data,options) => http.post('classify/admin/getClassifyByPage.do',data, options);
export const updateClassify = (data,options) => http.post('classify/admin/updateClassify.do',data, options);
export const addClassify = (data,options) => http.post('classify/admin/addClassify.do',data, options);

// good
export const addGood = (data, options) => http.post('good/addGood.do', data, options);
export const updateGood = (data, options) => http.post('good/updateGood.do', data, options);
export const deleteGood = (data, options) => http.post('good/deleteGood.do', data, options);
export const getGoodByPage = (data, options) => http.post('good/user/getGoodByPage.do', data, options);
export const getGoodById = (data, options) => http.post('good/getGoodById.do', data, options);

export const getCheckGoodByPage = (data, options) => http.post('good/admin/getCheckGoodByPage.do', data, options);
export const passCheck = (data, options) => http.post('good/admin/passCheck.do', data, options);
export const unpassCheck = (data, options) => http.post('good/admin/unpassCheck.do', data, options);

// order
export const addOrder = (data, options) => http.post('order/addOrder.do', data, options);
export const getOrderByPage = (data, options) => http.post('order/getPageOrderByBuyUserId.do', data, options);

// message
export const sendSystemMessage = (data, options) => http.post('message/admin/sendSystemMessage.do', data, options);

