<!-- 分类列表 -->
<template>
  <div>
    <div class="text-left">
      <el-button type="primary" size="medium" @click="addClassify">新增分类</el-button>
      <el-input class="float-right" size="medium" style="width:300px" placeholder="请输入搜索内容" v-model="page.condition.keyword" @keyup.native.enter="handleCurrentChange(1)">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table :data="classifyList" style="width: 100%" :header-cell-style="{textAlign:'center'}">
      <el-table-column prop="classifyName" label="分类名称" align="left">
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editClassify(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteClassify(scope.row.cId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:20px;text-align:center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current" :page-sizes="[5,10, 20, 50]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  init as apiInit,
  getClassifyByPage,
  addClassify,
  updateClassify,
  deleteClassify
} from "../../api/api";
export default {
  data() {
    return {
      classifyList: [],
      page: {
        current: 1,
        size: 10,
        pages: 0,
        total: 0,
        condition: {
          keyword: ""
        }
      }
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getClassifyList();
  },

  mounted() {},

  methods: {
    // 获取分类列表
    getClassifyList() {
      getClassifyByPage({ page: JSON.stringify(this.page) })
        .then(res => {
          this.classifyList = res.resultParam.records;
          this.page.current = res.resultParam.current;
          this.page.pages = res.resultParam.pages;
          this.page.total = res.resultParam.total;
        })
        .catch(err => {});
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getClassifyList();
    },
    // 换页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getClassifyList();
    },
    // 新增分类
    addClassify() {
      this.$prompt("请输入分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          addClassify({ classify: JSON.stringify({ classifyName: value }) })
            .then(res => {
              this.$message.success("新增成功");
              this.getClassifyList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 编辑分类
    editClassify(classify) {
      this.$prompt("请修改分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: classify.classifyName
      })
        .then(({ value }) => {
          classify.classifyName = value;
          updateClassify({ classify: JSON.stringify(classify) })
            .then(res => {
              this.$message.success("编辑成功");
              this.getClassifyList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 删除
    deleteClassify(id) {
      this.$confirm("确认删除该分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteClassify({ classifies: JSON.stringify([{ cId: id }]) })
            .then(res => {
              this.$message.success("删除成功");
              this.getClassifyList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
</style>