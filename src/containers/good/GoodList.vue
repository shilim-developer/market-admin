<!-- 商品列表 -->
<template>
  <div>
    <!-- <el-menu :default-active="1" mode="horizontal">
            <el-menu-item index="1">待审核商品</el-menu-item>
        </el-menu> -->
    <div class="text-right">
      <el-input size="medium" style="width:300px" placeholder="请输入搜索内容" v-model="page.condition.keyword" @keyup.native.enter="handleCurrentChange(1)">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table :data="goodList" style="width: 100%" :header-cell-style="{textAlign:'center'}">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="text-left">
            <div>商品详情：</div>
            <div>{{scope.row.goodDescription}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="goodPics" label="图片" width="180">
        <template slot-scope="scope">
          <img class="good-pic" :src="scope.row.goodPics | imageUrlFormat">
        </template>
      </el-table-column>
      <el-table-column prop="goodName" label="名称">
      </el-table-column>
      <el-table-column prop="goodPrice" label="价格">
      </el-table-column>
      <el-table-column prop="goodCount" label="数量">
      </el-table-column>
      <el-table-column prop="fuser.username" label="卖家姓名">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status | goodStatusFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="pass(scope.row.gId)">通过</el-button>
          <el-button type="danger" size="small" @click="unpassDialogShow(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:20px;text-align:center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current" :page-sizes="[5,10, 20, 50]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>

    <!-- 拒绝留言start -->
    <el-dialog title="拒绝原因" :visible.sync="messageInputShow" width="50%">
      <el-input type="textarea" placeholder="请输入拒绝通过的原因" v-model="message.content" rows="5"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageInputShow = false">取 消</el-button>
        <el-button type="primary" @click="unpass">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拒绝留言end -->
  </div>
</template>

<script>
import {
  init as apiInit,
  getCheckGoodByPage,
  passCheck,
  unpassCheck,
  sendSystemMessage
} from "../../api/api";
export default {
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        pages: 0,
        total: 0,
        condition: {
          keyword: ""
        }
      },
      goodList: [],
      messageInputShow: false,
      message: {
        content: "",
        toUser: 0
      }
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getGoodList();
  },

  mounted() {},

  methods: {
    // 获取待审核商品列表
    getGoodList() {
      getCheckGoodByPage({ page: JSON.stringify(this.page) })
        .then(res => {
          this.goodList = res.resultParam.records;
          this.page.current = res.resultParam.current;
          this.page.pages = res.resultParam.pages;
          this.page.total = res.resultParam.total;
        })
        .catch(err => {});
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getGoodList();
    },
    // 换页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getGoodList();
    },
    // 通过审核
    pass(id) {
      this.$confirm("确认通过审核该商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          passCheck({ good: JSON.stringify({ gId: id }) })
            .then(res => {
              this.$message.success("审核通过成功");
              this.getGoodList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 不通过审核
    unpassDialogShow(item) {
      this.message.toUser = item.uId;
      sessionStorage.gId = item.gId;
      sessionStorage.goodName = item.goodName;
      this.messageInputShow = true;
    },
    unpass() {
      unpassCheck({ good: JSON.stringify({ gId: sessionStorage.gId }) })
        .then(res => {
          this.sendMessage();
          this.$message.success("拒绝审核通过成功");
          this.messageInputShow = false;
          this.getGoodList();
        })
        .catch(err => {});
    },
    // 发送系统消息
    sendMessage() {
      const sMessage = {
        ...this.message,
        content:
          '"' +
          sessionStorage.goodName +
          '"商品审核不通过,原因:\n' +
          this.message.content
      };
      sendSystemMessage({ message: JSON.stringify(sMessage) })
        .then(res => {
          this.message.toUser = 0;
          this.message.content = "";
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.good-pic {
  height: 60px;
}
</style>