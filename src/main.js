import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import components from '@/components';
// 一些移动端常用设置
import common_m from '@/assets/js/common_m';

common_m()

Vue.config.productionTip = false

//注入所有组件
components.install(Vue);

Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
