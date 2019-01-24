<template>
  <div id="rulesAregu">
    <v-header :state="headerState"></v-header>
    <div class="w-container rulesAregu-warpper">
      <ul class="tabs">
        <li class="tabs-item">国家政策法规</li>
        <li class="tabs-item">铁总规范文件</li>
      </ul>
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
            <template slot-scope="scope">
              <router-link to="/newsDetail">{{scope.row.name}}</router-link>
            </template>
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
    tableHead() {
      return
    }
  }
}
</script>

<style lang='less'>
  #rulesAregu{
    min-height: 1000px;
    background-color: #f6f6f6;
    padding-bottom: 30px;
    .rulesAregu-warpper{
      margin-top: 30px;
      padding: 20px;
      background-color: #fff;
      .tabs{
        margin-bottom: 20px;
        font-size: 0px;
        .tabs-item{
          display: inline-block;
          height: 25px;
          line-height: 25px;
          font-size: 16px;
          font-weight: 600;
          margin-right: 60px;
          cursor: pointer;
          &.active{
            color: #2c81ef;
          }
        }
      }
    }
  }
</style>