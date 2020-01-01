

import VueRouter from 'vue-router'



// import account from './main/Account.vue'



//创建路由对象
var router =new VueRouter({
  routes:[
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
  ]
})

//把路由对象暴露出去
export default router