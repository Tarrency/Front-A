<template>
  <div class="app-container">
    <div class="center">
      <el-input
        v-model="inputData"
        placeholder="请输入商品名称"
        v-if="!crawVisible"
      />
      <el-button type="primary" @click="handleCrawler(inputData)">
        开始爬虫
      </el-button>
    </div>
    {{ list }}
    <el-dialog :visible.sync="dialogVisible" title="已爬虫提示">
      该商品已有评价，确定重录入吗
      <div style="display: flex">
        <el-button type="info" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
    <!-- 进度条 下面是所有录入的商品列表 -->
    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import { crawler, getProductList } from "@/api/crawler.js";
// import clip from "@/utils/clipboard"; // use clipboard directly
// import clipboard from "@/directive/clipboard/index.js"; // use clipboard by v-directive

export default {
  name: "ClipboardDemo",
  // directives: {
  //   clipboard,
  // },
  data() {
    return {
      // activeName: "directly",
      inputData: "",
      list: null,
      dialogVisible: false,
    };
  },
  methods: {
    handleCrawler(product) {
      // 前端判断商品是否存在，modal框是否重新爬
      getProductList({ product }).then((res) => {
        // list = res.data;
        if (!res.data.length) {
          crawler({ product }).then((res) => {
            console.log("res", res);
            // 路由跳转到商品详情页
            this.$router.push({ path: "/detail", query: {product, through: 'product'} });
          });
        }
      });
    },
    // handleCopy(text, event) {
    //   clip(text, event);
    // },
    // clipboardSuccess() {
    //   this.$message({
    //     message: "Copy successfully",
    //     type: "success",
    //     duration: 1500,
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  .center {
    position: absolute;
    width: 600px;
    height: 36px;
    top: calc(50% - 18px);
    left: calc(50% - 300px);
    display: flex;
  }
}
</style>