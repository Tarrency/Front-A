<template>
  <div class="app-container">
    <el-input
      v-model="inputData"
      placeholder="根据商品名称搜索"
      style="width: 400px; max-width: 100%"
    />
    <el-button type="primary" @click="handleCopy(inputData, $event)">
      搜索
    </el-button>
    <!-- <aside>
      The guide page is useful for some people who entered the project for the first time. You can briefly introduce the
      features of the project. Demo is based on
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
    </aside>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      Show Guide
    </el-button> -->
  </div>
</template>

<script>
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import steps from "./steps";

export default {
  name: "Guide",
  data() {
    return {
      driver: null,
    };
  },
  mounted() {
    this.driver = new Driver();
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    },
  },
};
</script>
