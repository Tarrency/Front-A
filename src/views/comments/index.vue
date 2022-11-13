<template>
  <div class="app-container">
    舆情分析结果
    <div class="name">商品名称： {{ name }}</div>
    <div v-if="result">情感分析结果</div>
    <el-button type="primary" @click="handlFlask(name)" :disabled="result">
      开启情感分析
    </el-button>
    <el-table :data="list" border>
      <el-table-column label="用户" prop="wbname"> </el-table-column>
      <el-table-column label="评价" prop="wb"> </el-table-column>
      <!-- <el-table-column label="种类" prop="jdbrand"> </el-table-column> -->
      <!-- <el-table-column label="款式" prop="jdkind"> </el-table-column> -->
      <!-- <el-table-column label="评价" prop="wb"> </el-table-column> -->
      <el-table-column label="时间" prop="wbtime"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCommentList } from "@/api/crawler.js";
import { getWBNLP } from "@/api/nlp.js";

export default {
  name: "ClipboardDemo",
  data() {
    return {
      list: null,
      name: null,
      NLP: null,
      result: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          getCommentList({ product: query.product }).then((res) => {
            this.name = query.product;
            this.list = res.data;
            // 是否情感分析过
            if (this.list[0].wbscore) {
              // 分析过,显示结果
              this.result = true;
              // 数据处理，画表格
            }
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    handlFlask(name) {
      getWBNLP({ product: name }).then((res) => {
        this.result = true;
        this.NLP = res.data;
      });
    },
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