import Vue from 'vue'
import App from './App'
import device from './yidongshipei'
import './reset.css'
import './icon/iconfont.css'
import VueRouter from 'vue-router'
import routes from './router/router.js'
import Vuex from 'vuex'
import axios from 'axios'

Vue.config.productionutTip = false

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面meta */
	if(to.meta.content){
	  let head = document.getElementsByTagName('head');
	  let meta = document.createElement('meta');
	  meta.content = to.meta.content;
	  head[0].appendChild(meta)
	}
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
	  document.title = to.meta.title;
	}
	next()
})

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
  render: h => h(App)
}).$mount("#app");
