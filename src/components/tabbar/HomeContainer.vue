<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotulist" :key="item.img">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../lib/images/1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      //用来保存获取到的数据,因为是个数组
      lunbotulist: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getlunbo").then(result => {
        if (result.body.status == 0) {
          this.lunbotulist = result.body.message;
        } else {
          Toast({
            message: "获取轮播图数据失败",
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
// 轮播图
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    // 写了&就是交集选择器,不写&就是后代选择器
    &:nth-child(1) {
      background-color: #fff;
    }
    &:nth-child(2) {
      background-color: #fff;
    }
    &:nth-child(3) {
      background-color: #fff;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

//九宫格
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}

//当然这里也可以写成包含关系
//那你对比上下两个类名,类名也得包含
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>