//导入vue
import Vue from 'vue'

//导入App根组件
import App from './App.vue'


//MInt-UI组件的导入与注册
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)
//Mint-UI轮播图
import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
//Toast导入(为什么Toast在这里引入无效,因为Toadt的官方引入说明没有 像轮播图一样要注册到Vue身上)
//Toat是导入了直接用,所以Toast哪里导入哪里用.而轮播图注册到Vue身上,在.vue文件都可以用
//import { Toast } from "mint-ui"
//Vue.component(Toast)
//导入按钮
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);


//导入MUI包
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

//导入Vue-resource
import VueResource from 'vue-resource'
//安装了就可以在任意.vue文件发AJAX请求了
Vue.use(VueResource)

//配置根路径
//如果我们通过全局配置了，请求的数据接口根域名，则在每次
//单独发起http请求的时候，请求的路径应该以相对路径开头（不加/）
//服务器配置文件导入
import host from '../port.js'
// console.log(host.host)
// console.log(host.port)
//注册到Vue身上则在每个.vue文件都应该可以用哦
// this.$http.get("api/getlunbo").then(result => {
Vue.http.options.root = "http://"+host.host+":"+host.port+"/";


//全局启用：表示以哪种表单数据类型提交过去 
Vue.http.options.emulateHTTP = true;

//定义全局的时间过滤器
//导入格式化时间插件
import moment from 'moment'
//两个参数,第一个参数是管道符前面那个参数,第二个参数是默认的时间格式(给个默认值,也可以自己传)
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

var vm = new Vue({
  el: '#app',
  render: c => c(App),
  router
})