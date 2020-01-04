
//导入路由
import VueRouter from 'vue-router'

//导入Tabbar的4个组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'


//创建路由对象
var router = new VueRouter({
  routes: [
    // {
    //   path:'/account',
    //   component:account,
    //   children:[
    //     //子路由前面不带/
    //     {path:'login',component:login},
    //     {path:'register',component:register}
    //   ]

    // },
    // {path:'/goodslist',component:goodslist}
    {path:'/',redirect:'/home'},
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer }
  ],
  linkActiveClass: 'mui-active'
})

//把路由对象暴露出去
export default router