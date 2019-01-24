<template>
  <div id="purchaseInfoQuery">
    <v-header :state="headerState"></v-header>
    <div class="w-container Info-query-warpper">
      <div class="query-tit">
        采购信息查询
      </div>
      <div class="all-class m-b20">
        <!-- 热门分类 -->
        <div class="hot-class" :style="{height:height1+'px'}" ref="hotClass">
          <el-button size="mini" type="text" class="drop-down" v-if="iscategroy" @click="dropDown('hotClass', 1)">
            {{dropDown1?'收起':'展开'}}<i class="el-icon-arrow-right" :class="dropDown1 ? 'rotate':'reserverRotate'"></i>
          </el-button>
          <el-row>
            <el-col :span="1" class="title">分类：</el-col>
            <el-col :span="20" class="item-warpper" ref="categroyHook">
              <ul class="categroy-box" ref="categroyitemHook">
                <li 
                  v-for="(item, index) in categroy" 
                  class="item categroyitem" 
                  @click="handelcategroy(item.title, index)" 
                  :class="{active:cateCurrent === index}" 
                  :key="index">
                  {{item.title}}
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <!-- 地区 -->
        <div class="group-company" :style="{height:height2+'px'}" ref="groupCompany">
          <el-button size="mini" type="text" class="drop-down" @click="dropDown('groupCompany', 2)">
            {{dropDown2?'收起':'展开'}}<i class="el-icon-arrow-right" :class="dropDown2 ? 'rotate':'reserverRotate'"></i>
          </el-button>
          <el-row>
            <el-col :span="1" class="title">地区：</el-col>
            <el-col :span="21" class="item-warpper">
              <ul class="province-box" :class="{havecity:isShowArea}">
                <li v-for="(item, index) in area" class="item" @click="citysCategroy(item.data,index,item.name)" :class="{active:provCurrent === index}"  :key="index">{{item.name}}</li>
              </ul>
              <ul ref="cityHook" class="city-box">
                <li v-for="(item, index) in subArea" class="item" :class="{active:cityCurrent === index}" @click="handelCity(item.name, index)" :key="index">{{item.name}}</li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <!-- 按时间分--> 
        <div class="Divide-by-time">
          <el-row>
            <el-col :span="1" class="title">时间：</el-col>
            <el-col :span="21" class="item-warpper">
              <ul class="by-time">
                <li v-for="(item, index) in date" :class="{active:dateCurrent === index}" @click="handelDate(item,index)" class="item" :key="index">{{item}}</li>
                <li class="item separate">|</li>
                <li class="item" @click="handelCustomTime" :class="{active:dateCurrent === 9}">自定义</li>
                <li class="item" v-if="isShowTime">
                  <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    format="yyyy 年 MM 月 dd 日"
                    range-separator="至"
                    size="mini"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="filter m-b20" v-if="selectCondition.length>0">
        <h5 class="fl filter-tit">筛选条件：</h5>
        <ul class="filter-box fl">
          <li class="filter-item" v-for="(item, index) in selectCondition" :key="index">{{item}}<i class="el-icon-circle-close-outline" @click="deleteCondition(index)"></i></li>
        </ul>
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
            width="800">
          </el-table-column>
          <el-table-column
            prop="dwtyoe"
            label="地区（城市）">
          </el-table-column>
          <el-table-column
            prop="time"
            width="100"
            label="发布时间">
          </el-table-column>  
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../../components/herder/header'
import API from '../../api/api.js'

export default {
  data () {
    return {
      headerState: 1,
      dropDown1: true,
      dropDown2: false,
      height1: null,
      height2: 38,
      categroy: [],
      iscategroy: true,
      area: [],
      subArea: [],
      isShowArea: false,
      provCurrent: -1,
      cateCurrent: -1,
      dateCurrent: -1,
      cityCurrent: -1,
      backupHeight: 0, 
      tableData: [{
        id: '1',
        name: '[询价]济南高铁表示我们济南高铁真的快飞快的那种快',
        queryid: 'HV15sd444421',
        ggtype: '询价',
        dwtyoe: '总公司',
        time: '2018-6-10'
      }],
      date: ['今天', '近三天', '近一周', '近一月', '近一年'],
      dateValue: [],
      isShowTime: false,
      selectCondition: []
    };
  },
  inject: ['reload'],
  components: { 'v-header':header },

  computed: {},
  watch: {
    subArea(val, old) {
      this.$nextTick(() => {
         /* console.log(this.$refs['groupCompany'].clientHeight)
         console.log('cityHook',this.$refs.cityHook.offsetHeight) */
         let cityHeight = this.$refs.cityHook.offsetHeight
         if (this.dropDown2 === false) {
           return
         } else {
           this.isShowArea = true
           this.height2 = this.backupHeight + cityHeight;
         }
      })
    },
  },
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    let query = to.query
    this.get_key_response(query)
    next()
  },
  methods: {
    tableHead() {
      return 'table-head';
    },
    dropDown(dom, n) {
      let height = this.$refs[dom].scrollHeight;
      let s = 'dropDown'+n
      let he = 'height' + n
      this[s] = !this[s]
      if (this[s]) {
        this[he] = height
        // 如果在每点击展开之前就点击了省份，那么展开之后获取的height就是包括了市区盒子的高度的，所以想要的要基础高度就得先减去市区盒子的高度
        this.backupHeight = height - this.$refs.cityHook.offsetHeight
      } else {
        this[he] = 38
      }
      // console.log('this.$refs[dom].scrollHeight', this.$refs[dom].scrollHeight,'this[he]',this[he])
    },
    citysCategroy(city, index, pro) {
      this.cityCurrent = -1
      this.provCurrent = index
      this.subArea = []
      this.subArea = city
      let condition = `省份：${pro}`
      this.showSelected(condition)
      let data = {
        city: pro,
        type: 2
      }
      this.$router.push({ path: '/queryPurchase', query: data })
    },
    handelcategroy(categroy, index) {
      // console.log(categroy,index)
      this.cateCurrent = index
      let condition = `分类：${categroy}`
      this.showSelected(condition)
      let data = {
        categroy: categroy,
        type: 2
      }
      this.$router.push({ path: '/queryPurchase', query: data })
    },
    handelCity(ci, index) {
      this.cityCurrent = index
      let condition = `市区：${ci}`
      this.showSelected(condition)
      let data = {
        city: ci,
        type: 2
      }
      this.$router.push({ path: '/queryPurchase', query: data })
    },
    handelDate(date, index) {
      this.dateCurrent = index
      let condition = `时间：${date}`
      this.showSelected(condition)
      let data = {
        time: date,
        type: 2
      }
      this.$router.push({ path: '/queryPurchase', query: data })
    },
    showSelected(sel) {
      if (this.selectCondition.length>0) {                              // 如果还没有数组中还没有条件的时候的判断
        if (this.selectCondition.indexOf(sel) === -1) {                 // 如果数组中没有新曾条件的处理
          var isAdd = true
          let splitSel = sel.split('：')[0]
          this.selectCondition.forEach((val, index) => {                // 循环数组，查找每个元素是属于哪个分类的
            if (val.split('：')[0] === '省份' && splitSel == '市区') {   // 如果要新增市区的时候，就得把省份的条件替换掉
              this.$set(this.selectCondition, index, sel)
              isAdd = false
            } else if(val.split('：')[0] === '市区' && splitSel == '省份') {
              this.$set(this.selectCondition, index, sel)
              isAdd = false
            }else {
              if (val.indexOf(splitSel) > -1 ) {      // 如果相同分类下的条件的处理   替换
                this.$set(this.selectCondition, index, sel)
                isAdd = false
              }
            }
          })
          if (isAdd) {                               // 如果上述循环条件中都不存在这个新增条件的时候就更新数组  push
            this.selectCondition.push(sel)
          }
        } else {
          // console.log(this.selectCondition)
        }
      } else {
        this.selectCondition.push(sel)
      }
      // console.log(this.selectCondition)
    },
    deleteCondition(index) {
      this.selectCondition.splice(index, 1)
    },
    handelCustomTime() {
      this.isShowTime = !this.isShowTime
      this.dateCurrent = 9
      let condition = `时间：自定义`
      let splitSel = condition.split('：')[0]
      if (this.selectCondition.length>0) {
        this.selectCondition.forEach((val, index) => {
          if (val.split('：')[0] === '时间') {   // 如果要新增市区的时候，就得把省份的条件替换掉
            this.$set(this.selectCondition, index, condition)
          }
        })
      }else {
        this.selectCondition.push(condition)
      }
    },
    // 获取分类
    getCategroy() {
      API.categroy().then(res => {
        let {code, data} = res.data
        if (code === 200) {
          this.categroy = data
        } else {
          console.log(`error   获取分类错误`)
        }
      })
    },
    // 获取区域
    getArea() {
      API.getCitys().then(res => {
        let {code, data} = res.data
        if (code === 200) {
          this.area = data
        } else {
          console.log(`error   获取省错误`)
        }
      })
    },
    // 发送请求 并 查询
    get_key_response(data) {
      API.getKEY_serach(data).then(res => {
        // let {code, data} = JSON.parse(res.data)
        // console.log(code,'             ', data)
        console.log('res', res)
      })
    }
  },
  mounted() {
    let ininHeight = this.$refs.hotClass.scrollHeight;
    this.height1 = ininHeight
  },
  created() {
    this.getCategroy() // 获取分类
    this.getArea()     // 获取区域
    let query = this.$route.query
    console.log(query)
    this.get_key_response(query)
    
  },
  beforeUpdate() {
    let totalHei = this.$refs.categroyHook.$el.clientWidth
    let subHei = this.$refs.categroyitemHook.offsetWidth
    if (subHei>0) {
      if (subHei < totalHei) {
        this.iscategroy = false
      } else {
        this.iscategroy = true
      }
    }
  }
}
</script>

<style lang='less'>
  #purchaseInfoQuery{
    min-height: 1000px;
    background-color: #f6f6f6;
    padding-bottom: 30px;
    .Info-query-warpper{
      margin-top: 30px;
      padding: 20px;
      background-color: #fff;
      .all-class{
        border: 1px solid #ebecec;
        background-color: #fff;
        font-size: 12px;
        border-radius: 4px;
        box-shadow: 0 2px 8px 0 rgba(7,17,27,.06);
        .title{
          line-height: 26px;
          text-align: right;
        }
        .item-warpper{
          padding-left: 20px;
          line-height: 26px;
          font-size: 0px;
          .categroy-box{
            display: inline-block;
          }
          .province-box{
            &.havecity{
              padding-bottom: 10px;
              border-bottom: 1px solid #f1f1f1;
            }
          }
          .city-box{
            padding-top: 10px;
            padding-bottom: 6px;
            .item{
              color: #2656ae;
            }
          }
          .item{
            display: inline-block;
            font-size: 12px;
            margin-right: 30px;
            color: #666;
            cursor: pointer;
            &:hover{
              color: #fd8900;
            }
            &.active{
              color: #fd8900;
            }
          }
        }
        .drop-down{
          position: absolute;
          right: 20px;
          top: 10px;
          z-index: 100;
          padding: 2px 0;
          .rotate{
            transition: all 0.3s;
            transform: rotate(90deg);
          }
          .reserverRotate{
            transition: all 0.3s;
            transform: rotate(0deg);
          }
        }
        .hot-class,.group-company{
          box-sizing: border-box;
          position: relative;
          padding: 6px 0;
          transition: all 0.3s;
          overflow: hidden;
          border-bottom: 1px solid #ebecec;
        }
        .Divide-by-time,.project-type{
          padding: 6px 0;
          height: 26px;
          line-height: 26px;
          border-bottom: 1px solid #ebecec;
        }
      }
      .query-tit{
        height: 25px;
        line-height: 25px;
        margin-bottom: 20px;
        font-size: 17px;
        font-weight: 600;
      }
      .filter{
        box-sizing: border-box;
        height: 42px;
        margin-bottom: 16px;
        // border: 1px solid #ebecec; 
        background-color: #fff;
        // box-shadow: 0 2px 8px 0 rgba(7,17,27,.06);
        .filter-tit{
          height: 42px;
          line-height: 42px;

        }
        .filter-box{
          font-size: 0px;
          padding: 6px 10px;
          .filter-item{
            box-sizing: border-box;
            position: relative;
            display: inline-block;
            font-size: 14px;
            line-height: 24px;
            padding: 2px 3px;
            padding-right: 6px;
            margin-right: 16px;
            color: #666;
            border: 1px solid #ebecec;
            border-radius: 4px;
            cursor: pointer;
            i{
              position: absolute;
              top: -6px;
              right: -6px;
              color: rgb(216, 83, 83);
              transition: all 0.25s;
              opacity: 0;
            }
            &:hover i {
              opacity: 1;
            }
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