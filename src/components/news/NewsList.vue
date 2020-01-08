<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h4>{{item.title}}</h4>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time | dataFormat}}</span>
              <span>点击:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status == 0) {
          this.newslist = result.body.message;
          //倒序一下
          this.newslist = this.newslist.reverse();
        } else {
          Toast({
            message: "获取新闻列表数据失败",
            position: "top",
            duration: 5000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-ellipsis {
  display: flex;
  justify-content: space-between;
  color: #226aff;
  font-size: 10px;
}
.mui-media-body h4 {
  font-size: 16px;
}
</style>