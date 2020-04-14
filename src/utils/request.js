import axios from 'axios';
import qs from 'qs';
import { Message,Loading } from 'element-ui';

let loading;

// 加载动画
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中',
        background: 'rgba(0,0,0,0.7)'
    });
}

function endLoading() {
  loading.close();
}


/** **** 创建axios实例 ***** */
const request = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 5000, // 请求超时时间
});


/** **** request拦截器==>对请求参数做处理 ***** */
request.interceptors.request.use((config) => {
  // 加载动画
    startLoading();

  config.method === 'post'
    ? config.data = qs.stringify({ ...config.data })
    : config.params = { ...config.params };
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config;
}, (error) => { // 请求错误处理
  Promise.reject(error);
});


/** **** respone拦截器==>对响应做处理 ***** */
request.interceptors.response.use(
  (response) => { // 成功请求到数据
    // 结束加载
    endLoading();
    if (response.data.status === 200) {
      return response.data;
    }
  },
  (error) => { // 响应错误处理
    console.log('error');
    // console.log(error);
    // console.log(JSON.stringify(error));

    const text = JSON.parse(JSON.stringify(error)).response.status === 404
      ? '404'
      : '网络异常，请重试';
      Message.error(text);

    return Promise.reject(error);
  },
);
export default request;
