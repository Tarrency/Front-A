<template>
  <el-form>
    <el-form-item label="姓名">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model.trim="user.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          password: "",
        };
      },
    },
  },
  methods: {
    submit() {
      this.$message({
        message: "User information has been updated successfully",
        type: "success",
        duration: 5 * 1000,
      });
    },
  },
};
</script>
