<!-- 登录页面 -->
<template>
  <el-row type="flex" justify="center" style="margin-top:100px">
    <el-col :span="8">
      <el-card>
        <h1>管理端登录</h1>
        <el-form ref="form" :model="admin">
          <el-form-item label="">
            <el-input v-model="admin.username" placeholder="请输入管理员账号" @keyup.native.enter="login"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input type="password" v-model="admin.password" placeholder="请输入密码" @keyup.native.enter="login"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btns" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { init as apiInit, login } from "../api/api";
import md5 from "js-md5";
export default {
  data() {
    return {
      admin: {
        username: "",
        password: ""
      }
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
  },

  mounted() {},

  methods: {
    login() {
      const admin = Object.assign({}, this.admin);
      admin.password = md5.hex(admin.password);
      login({ admin: JSON.stringify(admin) })
        .then(res => {
          localStorage.admin = JSON.stringify(res.resultParam);
          this.$message.success("登录成功");
          this.$router.push({ name: "welcome" });
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.btns {
  width: 100%;
}
</style>