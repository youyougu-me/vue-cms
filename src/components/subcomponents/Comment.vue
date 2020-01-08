<template>
  <div class="cmt-container">
    <h3 class="cmt-title">发表评论</h3>
    <hr />
    <textarea placeholder="发表你的评论(最多150字)" maxlength="150" class="cmt-box"></textarea>
    <mt-button size="large" type="primary">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in commentslist" :key="item.add_time">
        <div
          class="cmt-name"
        >第{{i+1}}楼&nbsp;&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;&nbsp;发表时间:{{item.add_time|dataFormat}}</div>
        <div class="cmt-text">{{item.content=='undefined'?'此用户懒,什么都没说':item.content}}</div>
      </div>
    </div>
    <mt-button plain size="large" type="danger" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
// SELECT * FROM 3artid1 WHERE `id` >= 3 AND `id` <= 5
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      commentslist: [],
      pageindex: 1
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // console.log(this.artid);父亲传过来的文章id
      var url =
        "api/getcomments/" + this.artid + "?pageindex=" + this.pageindex;
      this.$http.get(url).then(result => {
        if (result.body.status == 0) {
          this.commentslist = result.body.message;
          this.commentslist = this.commentslist.reverse();
        } else {
          Toast("获取评论数据失败");
        }
      });
    },
    getMore() {
      this.pageindex = this.pageindex + 1;
      var url =
        "api/getcomments/" + this.artid + "?pageindex=" + this.pageindex;
      this.$http.get(url).then(result => {
        if (result.body.status == 0) {
          var commentslist2 = result.body.message;
          commentslist2 = commentslist2.reverse();
          this.commentslist = this.commentslist.concat(commentslist2);
        } else {
          Toast("获取更多评论数据失败");
        }
      });
    }
  },
  props: ["artid"]
};
</script>


<style lang="scss" scoped>
// 写样式的时候千万小心,因为这个子组件被父组件所引用
//意思就是这个子组件的类处于父组件的类中,那么子组件中的tile和父组件中的title就可能同时被选中
//所以这种会被别人引用的子组件的任何个类名都要特别
.cmt-container {
  .cmt-title {
    font-size: 18px;
  }
  .cmt-box {
    font-size: 14px;
    height: 80px;
    margin: 0;
  }
  .cmt-list {
    margin-bottom: 5px;
    .cmt-item {
      font-size: 14px;
      .cmt-name {
        background-color: #ccc;
        color: #000;
        margin: 5px 0;
        line-height: 30px;
      }
      .cmt-text {
        color: #000;
        text-indent: 2em;
      }
    }
  }
}
</style>