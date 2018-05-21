<!-- 首页 -->
<template>
  <div>
    <el-row type="flex" class="classify">
      <div :class="{'active':classifyId ===0}" @click="classifyChoose(0)">推荐</div>
      <div v-for="item in classifyList" :key="item.cId" :class="{'active':classifyId ===item.cId}" @click="classifyChoose(item.cId)">{{item.classifyName}}</div>
    </el-row>
    <el-row type="flex" justify="start" class="row">
      <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }" v-for="(item,index) in goodList" :key="item.gId" :class="{'no-left':index%4==0}">
        <router-link :to="{ name: 'goodDetail', params: { id: item.gId }}" target="_blank">
          <img :src="item.goodPics | imageUrlFormat" class="image">
        </router-link>
        <div style="padding: 14px;">
          <span>{{item.goodName}}</span>
          <el-row type="flex" justify="space-between">
            <div class="price">¥ {{item.goodPrice}}</div>
            <div class="btn-box">
              <router-link :to="{ name: 'orderCheck', params: { id: item.gId }}" target="_blank">
                <el-button type="primary" size="small">购买</el-button>
              </router-link>
            </div>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <div style="text-align:center" v-show="goodList.length>0">
      <el-pagination background layout="prev, pager, next" :page-size="page.size" :total="page.total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  init as apiInit,
  getAllClassify,
  getPageGoodByClassify
} from "../api/api";
export default {
  data() {
    return {
      classifyList: [], //分类列表
      classifyId: 0, //选中分类id
      page: {
        current: 1,
        size: 10,
        pages: 0,
        total: 0
      },
      goodList: []
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getClassifyList();
    this.getGoodListByPage();
  },

  mounted() {},

  methods: {
    // 获取分类列表
    getClassifyList() {
      getAllClassify()
        .then(res => {
          this.classifyList = res.resultParam;
        })
        .catch(err => {});
    },
    // 分类选择
    classifyChoose(id) {
      this.classifyId = id;
      this.page.current = 1;
      this.getGoodListByPage();
    },
    // 根据分类id获取商品
    getGoodListByPage() {
      getPageGoodByClassify({
        page: JSON.stringify(this.page),
        good: JSON.stringify({ cId: this.classifyId })
      })
        .then(res => {
          this.goodList = res.resultParam.records;
          this.page.total = res.resultParam.total;
          this.page.pages = res.resultParam.pages;
        })
        .catch(err => {});
    },
    // 换页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getGoodListByPage();
    }
  }
};
</script>
<style scoped>
/* 分类 */
.classify {
  margin-bottom: 20px;
  color: #888888;
}
.classify div {
  padding: 10px 20px;
  padding-left: 0px;
  cursor: pointer;
}
.classify .active {
  color: rgb(64, 158, 255);
}

/* 卡片 */
.row {
  flex-wrap: wrap;
}
.card {
  width: 255px;
  margin-left: 40px;
  margin-bottom: 40px;
}
.card.no-left {
  margin-left: 0;
}
.image {
  width: 100%;
}
.price {
  padding-top: 10px;
  color: red;
  font-size: 20px;
}
</style>