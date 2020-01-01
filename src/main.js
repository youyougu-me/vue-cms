
import Vue from 'vue'

import App from './App.vue'

//MInt-UI组件的导入与注册
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

//导入MUI包
import './lib/mui/css/mui.css'

var vm = new Vue({
  el: '#app',
  render: c => c(App)

})