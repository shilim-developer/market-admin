import Vue from 'vue';

// 图片地址过滤器
Vue.filter('imageUrlFormat', (value) => {
    if (value && value.indexOf('market_upload') >= 0) {
        return '/' + value;
    } else {
        return value;
    }
});

// 时间过滤器
Vue.filter('dateFormat', (value) => {
    let output = value;
    const time = new Date(value);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    const add0 = (m) => { return m < 10 ? '0' + m : m };
    output = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    return output;
});

// 商品状态过滤器
Vue.filter('goodStatusFormat', (value) => {
    let output = '';
    switch (value) {
        case 0:
            output = '待审核';
            break;
        case 1:
            output = '上架中';
            break;
        case 2:
            output = '审核未通过';
            break;
        case 3:
            output = '已下架';
            break;
    }
    return output;
});

// 订单状态过滤器
Vue.filter('orderStatusFormat', (value) => {
    let output = '';
    switch (value) {
        case 0:
            output = '待付款';
            break;
        case 1:
            output = '待发货';
            break;
        case 2:
            output = '待收货';
            break;
        case 2:
            output = '已完成';
            break;
    }
    return output;
});

// 消息状态过滤器
Vue.filter('messageStatusFormat', (value) => {
    let output = '';
    switch (value) {
        case 0:
            output = '未读';
            break;
        case 1:
            output = '已读';
            break;
    }
    return output;
});
