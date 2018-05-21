<!-- 主要页面 -->
<template>
  <el-container style="height:100%">
    <el-header class="header">
      <el-dropdown>
        <div class="head-box">
          <span>{{admin.username || '管理员'}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="{name:'information'}">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>消息</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container style="height:100%">
      <el-aside width="200px">
        <el-menu class="menu" :router="true">
          <el-menu-item index="/classifyList">
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/goodList">
            <span slot="title">商品审核</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        username: ""
      }
    };
  },

  components: {},

  computed: {},

  created() {
    localStorage.admin ? (this.admin = JSON.parse(localStorage.admin)) : "";
    console.log(this.admin);
  },

  mounted() {},

  methods: {}
};
</script>
<style scoped>
.header {
  width: 100%;
  text-align: center;
  background: #409eff;
  line-height: 60px;
  color: #ffffff;
  text-align: right;
}
.head-box {
  color: #ffffff;
}
/* 去掉菜单下划线 */
a {
  text-decoration: none;
}
.menu {
  height: 100%;
}
</style>