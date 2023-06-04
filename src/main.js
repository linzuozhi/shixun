import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router  from './router/index.js'
import axios from 'axios'
import './assets/css/global.css'
import echarts from "echarts";
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
