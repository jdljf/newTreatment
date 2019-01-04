import Vue from 'vue'
import App from './App'
import device from './yidongshipei'
import './reset.css'
import './icon/iconfont.css'
import VueRouter from 'vue-router'
import routes from './router/router.js'
import store from './store/index'//引入store
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionutTip = false

const host = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'http:127.0.0.1:8888'
const instance = axios.create({
  baseURL: host
})

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('请求拦截', store.state)
    if (store.state.token) {
      config.headers.common['Authentication-Token'] = store.state.token
    }

    return config
  }, err => {
    return Promise.reject(err);
  })

// 添加应答拦截器
axios.interceptors.response.use(
  response => {
    console.log('应答拦截', response)
    return response
  },
  // 默认除了2xx之外都是错误的，就会走到这
  error => {
    console.log(error)
    if (error.response) {
      console.log(error.response)
      switch (error.response.status) {
        case 401:
          store.dispatch('UserLogout')  // 可能是token过期，清除它
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)
// 判断是否有上一页可以回退
Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}

Vue.use(VueAxios, axios)
Vue.use(Mint)

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  //获取store里面的token
  console.log('跳转前', to)
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {

    if (token) {
      console.log('有token');
      next();
    } else {
      console.log('没有token');
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  } else {
    next();
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

// router.beforeEach((to, from, next) => {
/* 路由发生变化修改页面meta */
// if(to.meta.content){
//   let head = document.getElementsByTagName('head');
//   let meta = document.createElement('meta');
//   meta.content = to.meta.content;
//   head[0].appendChild(meta)
// }
// /* 路由发生变化修改页面title */
// if (to.meta.title) {
//   document.title = to.meta.title;
// }
// next()

// })

Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  created() {
    this.checkDevice();
  },
  methods: {
    checkDevice() {
      const userAgentInfo = navigator.userAgent;
      const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          const myBody = document.getElementsByTagName("body")[0];
          myBody.style.overflowX = "hidden";
          myBody.style.minWidth = "";
          device(640, 640);
          const FastClick = require("fastclick");
          FastClick.attach(document.body);
          break;
        } else {
          const myBody = document.getElementsByTagName("body")[0];
          myBody.style.minWidth = "1300px";
        }
      }
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
