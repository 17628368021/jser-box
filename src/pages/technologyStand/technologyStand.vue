<template>
  <div id="technologyStand">
    <v-header :state="headerState"></v-header>
    <div class="w-container technology-warpper">
      <div class="tech-tit">
        技术标准查询
      </div>
      <div class="filter-query">
        <el-form :inline="true" :model="technologyKey" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="technologyKey.key" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按条件搜索 -->
      <div class="filter-condition">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              筛选条件
            </template>
            <div class="term">
              <span class="title">分类：</span>
              <ul class="condition">
                <li v-for="(item, index) in filter" :key="index">{{item}}</li>
              </ul>
            </div>
            <div class="term">
              <span class="title">部门：</span>
              <ul class="condition">
                <li v-for="(item, index) in filter" :key="index">{{item}}</li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 查询结果 -->
      <div class="query-result">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;border: 1px solid rgb(235, 238, 245);border-bottom:none;"
          :header-cell-class-name="tableHead">
          <el-table-column
            prop="date"
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="公告名称"
            width="624">
          </el-table-column>
          <el-table-column
            prop="queryid"
            label="所属类别"
            width="160">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="说明"
            width="160">
          </el-table-column>
          <el-table-column
            prop="time"
            label="发布时间">
          </el-table-column>  
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../../components/herder/header';
export default {
  data () {
    return {
      headerState: 1,
      technologyKey: {
        key: ''
      },
      filter: ['全部','招标','竞争性谈判','单一来源'],
      tableData: 
        [
          {
            id: '1',
            name: '[询价]济南高铁表示我们济南高铁真的快飞快的那种快',
            queryid: 'HV15sd444421',
            ggtype: '询价',
            desc: '铁道标准',
            time: '2018-6-10'
          }
        ]
    };
  },
  components: { 'v-header':header },

  computed: {},

  methods: {
    onSubmit() {

    },
    tableHead() {
      return 'table-head';
    }
  }
}
</script>

<style lang='less'>
  #technologyStand{
    min-height: 1000px;
    background-color: #f6f6f6;
    padding-bottom: 30px;
    .technology-warpper{
      margin-top: 30px;
      padding: 20px;
      background-color: #fff;
      .tech-tit{
        height: 25px;
        line-height: 25px;
        margin-bottom: 20px;
        font-size: 17px;
        font-weight: 600;
      }
      .filter-query{
        margin-bottom: 20px;
      }
      .filter-condition{
        margin-bottom: 20px;
        .el-collapse{
          border: 1px solid #ebeef5;
        }
        .el-collapse-item__header{
          background-color: #f2f1f1;
          padding-left: 6px;
        }
        .el-collapse-item__content{
          padding-bottom: 0px;
        }
        .term{
          height: 38px;
          line-height: 38px;
          border-bottom: 1px solid #ebeef5;
          &:last-child{
            border-bottom: none;
          }
          .title{
            box-sizing: border-box;
            display: inline-block;
            width: 50px;
            padding-left: 8px;
            text-align: justify;
            text-align-last: justify;
          }
        }
        .condition{
          display: inline-block;
          font-size: 0px;
          li{
            display: inline-block;
            font-size: 14px;
            margin-right: 26px;
          }
        }
      }
      .query-result{
        min-height: 500px;
        .table-head{
          background-color: #f2f1f1!important;
          height: 40px;
          padding: 6px 0;
        }
      }
    }
  }
</style>