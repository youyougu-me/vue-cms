//由于webpack是基于Node构建的
var path=require('path')
//这是个插件。在内存中搞一个html，并注入bundle.js
//如果要配置插件，需要在导出的对象中挂载plugins节点
var htmlWebpackPlugin=require('html-webpack-plugin')
//这个插件是属于这个打包对象的（main.js）,就是说在打包的
//同时，帮我把index也弄到内存中去
//这里的路径之所以不完整，因为vue-loader是在node_modules
//文件中的，可以省略前面的目录
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//当运行webpack 或者webpack-dev-server时，
//发现没有跟入口文件和出口文件，就会自动去找
//配置文件（webpack知道它在哪里）
module.exports={
  entry:path.join(__dirname,'./src/main.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  plugins:[//所有webpack插件的配置节点
    new htmlWebpackPlugin({
    template:path.join(__dirname,'./src/index.html'),
    filename:'index.html'
    }),
    new VueLoaderPlugin()

  ],
  module:{//配置所有第三方loader模块的
    rules:[//第三方模块的匹配规则
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      //处理图片路径的loader
      {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=550&name=[hash:8]-[name].[ext]'},
      {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件的loader(加载程序)
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
      //上面是配置Babel来转换高级的ES6语法
      {test:/\.vue$/,use:'vue-loader'} //处理.vue文件的loader
    ]

  },
  resolve:{
    alias:{//修改Vue被导入时候的包的路径
      // "vue$":"vue/dist/vue.js"
      //再在配置文件中加一个节点，表示：如果在import或者require的时候以$结尾，
      //则加载后面的文件
    }
  }
}