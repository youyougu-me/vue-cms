

## 这是一个 Vue-cms 移动端项目 
## Vue+Mint-UI+MUI+Node.js+MySQL
## 项目内容及功能:新闻列表,新闻详情,新闻评论,商品列表

## 项目怎么运行呢?
### 一,前端
 1. cnpm i 安装项目依赖包
 2. 配置 服务器及端口(package.json文件以及port.js文件),详情见<其它服务器调试步骤.md>
 3. npm run dev 启动项目
### 二，后端
 1. 启动SQL服务器
 2. 配置监听地址,具体见服务端README.md文件



## 以下是页面的制作步骤,接口的制作步骤未写====================
## 制作首页App组件
1. 完成header区域,使用的是Mint-UI中的Header组件
2. 制作底部的Tabbar 区域,使用的是MUI 的Tabbar.html
 + 购物车那里需要用到MUI扩展的字体图标
 + 那么就需要自己新增两个扩展的类 mui-icon-extra mui-icon-extra-cart
 + 并在main.js中引入扩展的css文件和字体图标文件,这两个文件在工具包的example文佳夹下
3. 要在中间区域放置一个 router-view 来展示 底部tabbar路由链接 所匹配到的组件

## 改造tabbar 为 router-link,并设置路由高亮

## 点击tabbar 中的路由链接,展示对应的路由组件

## 制作Home轮播图,也是用的Mint-UI组件,初始高度为0,记得自己设置
 1. 通过vue-resource来获取数据
 2. 在main.js里面导入路由,并Vue.use.这样就可以在任何的.vue组件里发送ajax请求了
 3. 把获取到的数据保存在home组件data里的lunbotulist中
 4. 用v-for把数据装到录播图上面,数据是组件created的时候就会获取

## 制作九宫格
1. 九宫格来自MUI
2. 修改改图标,以及导入的图片大小


## 路由重定向
1. npm run dev 进入的是根路径,也就是index.HTML页面,最初始的,并未加载组件
   只有头尾,没有身体部分.需要点击底部路由才会加载
2. 加一个路由匹配,/的时候重定向到/home

## 实现组件切换时的动画效果
1. 只有App组件中的身体才有切换动画,所以给它加transition标签,再在此组件的style标签中加两组动画的类
2. 加上之后会发现有三个问题  1.下个组件进入的时候头部和底部会跑,出现了滚动条 2.要进来那个元素从下往上跳动
3. 3.没有实现从右侧进入从左侧消失 
## 分析动画bug解决
1. 因为另一个组件刚进入时是放在页面右边,准备进来,这个时候页面变宽,就出现滚动条.
   采用《transition mode="out-in"》给动画标签加修饰不能解决,因为这个的效果是第一个完全消失,
   第二个才进来,页面不流畅.我们要做到的是一边进来,一边消失.解决:给《div class="app-container"》
   加个类 overflow-x:hidden,y轴不能加,因为需要滚动.
2. 给v-leave-to加上 position:absolute
3. 改变过度两组类名.v-enter:transform:translateX(100%)
   v-leave-to:transform:translateX(-100%)

## 改造新闻资讯的路由链接
1. '/home/newslist'这个对应的并不就是说是子组件

## 新闻资讯点进去 newslist组件页面
1. 绘制页面
 + MUI example里面的media代码段
 + 有个地方 采用CSS3的弹性布局
2. vue-resource向接口发请求获取数据存在data里.然后v-for循环渲染数据
 + 为了使新闻列表的最后d(底部)一项可以展现出来,需要给最大的app-container加padding-bottom
 + 从数据把把时间字符串拿出来之后,渲染页面时需要用到全局过滤器格式化时间.这里用moment插件,需要npm下载引用

 ## 新闻列表详情
 1. /home/newsinfo/13 一个路由对应一个组件 路由传参,这样使得单个路由可变=>单个组件也可变
 2. 改造新闻列表页,为每一项添加router-link标签 《router-link :to="'/home/newsInfo/'+item.id"》
 3. 创建新闻详情页组件 创建路由规则把两者对应起来
 4. 新闻详情页通过 $route.params.id拿到路由传递过来的数据为自己所用
 5. 写新闻详情页组件
  + 自己写布局 先布局再用数据来填充
  + vue-resource 发请求获取数据
  + 要想图片类起作用 得去掉scoped

 ## 抽离评论子组件,在任何一个组件当中都可以用
 1. 新建comment.vue ,并进行布局
  + 加载评论数据
  + 当我组件一被加载出来的时候就会执行自己的生命周期
  + 资讯id是由父组件传值传过来
 2. 父组件引入子组件
  + 在父组件件中引入 .vue子组件
  + 子组件需要挂载到父组件的 components 节点上 并起个名字
  + 把名字以标签的形式 放到父组件上  
 3. 实现评论子组件的加载更多功能
  + 给加载更多点击绑定事件
  + 事件让评论页码加一 然后发ajax去取数据 再把取到的和前面的拼接起来 送给data重新渲染即可

 ## 父组件里有组件的页面
 1. 当其被加载的时候一下子发了两个请求,父组件会有一个,子组件会有一个
 2. 父组件与子组件发送的请求相互不干扰,获取到的数据也相互不干扰
 3. comment评论子组件发请求需要的参数 this.artid this.pageindex
 4. 所以只要传给它的这两个参数是一样的,则得到的数据也是一样
 5. 至于请求的路径前缀需要与后端约定好
   

