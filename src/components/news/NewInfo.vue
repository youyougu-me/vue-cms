<template>
  <div class="NewInfon-container">
    <h3 class="title">{{newinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{newinfo.add_time| dataFormat}}</span>
      <span>点击:{{newinfo.click}}次</span>
    </p>
    <hr />
    <!-- html也会覆盖，但是它会带标签渲染 -->
    <div class="content" v-html="newinfo.content"></div>
    <!-- 评论区 -->
    <!-- 由于评论那边需要资讯的id 所以需要从这边传过去 -->
    <comment-box :artid="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
//引入评论子组件
import Comment from '../subcomponents/Comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newinfo: {}
    };
  },
  created() {
    this.getNewInfo();
  },
  methods: {
    getNewInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.newinfo = result.body.message[0];
        } else {
          Toast({
            message: "获取新闻列表数据失败",
            position: "top",
            duration: 5000
          });
        }
      });
    }
  },
  components:{
    'comment-box':Comment
  }
};
</script>

<style lang="scss" >
// 要想图片width:100%起作用,就必须去掉scoped
//这里因为 .NewInfon-container包裹所有类名
//那么在解析的时候子类的前缀都会有父类名 所以不会污染其它组件 只有此组件有这个前缀
.NewInfon-container {
  padding: 0px 5px;
  .title {
    font-size: 16px;
    color: red;
    text-align: center;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    color: #226aff;
    font-size: 10px;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
</style>