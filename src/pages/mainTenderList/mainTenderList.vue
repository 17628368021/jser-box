<template>
  <div id="show-all-tender">
    <v-header :state="headerState"></v-header>
    <div class="w-container main-tendex-wapper">
      <div class="tender-num">共<span class="count">777777</span>件相关产品</div>
      <div class="all-class">
        <!-- 热门分类 -->
        <div class="hot-class" :style="{height:height1+'px'}" ref="hotClass">
          <el-button size="mini" type="text" class="drop-down" @click="dropDown('hotClass', dropDown1, height1,1)">
            {{dropDown1?'收起':'展开'}}<i class="el-icon-arrow-right" :class="dropDown1 ? 'rotate':'reserverRotate'"></i>
          </el-button>
          <el-row>
            <el-col :span="2" class="title">热门分类:</el-col>
            <el-col :span="16" class="item-warpper">
              <ul>
                <li v-for="(item, index) in classes" class="item" :key="index">{{item}}</li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <!-- 集团公司 -->
        <div class="group-company" :style="{height:height2+'px'}" ref="groupCompany">
          <el-button size="mini" type="text" class="drop-down" @click="dropDown('groupCompany', dropDown2, height2,2)">
            {{dropDown2?'收起':'展开'}}<i class="el-icon-arrow-right" :class="dropDown2 ? 'rotate':'reserverRotate'"></i>
          </el-button>
          <el-row>
            <el-col :span="2" class="title">集团公司:</el-col>
            <el-col :span="16" class="item-warpper">
              <ul>
                <li v-for="(item, index) in classes" class="item" :key="index">{{item}}</li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <!-- 物料行数 -->
        <div class="Material-num">
          <el-row>
            <el-col :span="2" class="title">物料行数:</el-col>
            <el-col :span="16" class="item-warpper">
              <ul>
                <li v-for="(item, index) in MaterialNum" class="item" :key="index">{{item}}</li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <!-- 项目类型 -->
        <div class="project-type">
          <el-row>
            <el-col :span="2" class="title">项目类型:</el-col>
            <el-col :span="16" class="item-warpper">
              <ul>
                <li v-for="(item, index) in projectType" class="item" :key="index">{{item}}</li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="filter">
        <ul class="filter-warpper">
          <li class="filter-item">
            <el-select v-model="value7" placeholder="请选择" class="seat">
              <el-option-group
                v-for="group in options3"
                :key="group.label"
                :label="group.label" style="width:300px">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" style="width:200px">
                </el-option>
              </el-option-group>
            </el-select>
          </li>
          <li class="filter-item">
            <el-select v-model="value" placeholder="请选择" class="seat">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li class="filter-item havepadd">报价条数</li>
          <li class="filter-item havepadd">信息发布时间</li>
          <li class="filter-item havepadd">信息截止时间</li>
        </ul>
      </div>
      <div class="tender-show-list">
        <singleTender :latelyTender="latelyTender"></singleTender>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../../components/herder/header';
import singleTender from '../../components/singleTender/singleTender.vue';
export default {
  data () {
    return {
      headerState: 1,
      classes: [
        '铰链接','电线、电缆','建筑、建材','管道、水管','建墙材料','不想写了','狗屁玩意',
        '铰链接','电线、电缆','建筑、建材','管道、水管','建墙材料','不想写了','狗屁玩意',
        '铰链接','电线、电缆','建筑、建材','管道、水管','建墙材料','不想写了','狗屁玩意',
        '铰链接','电线、电缆','建筑、建材','管道、水管','建墙材料','不想写了','狗屁玩意',
        '铰链接','电线、电缆','建筑、建材','管道、水管','建墙材料','不想写了','狗屁玩意',
      ],
      MaterialNum:['1行','2-5行','6行以上'],
      projectType:['公路','铁路','市政','轨道','铁路','建筑'],
      dropDown1: true,
      dropDown2: false,
      height1: null,
      height2: 26,
      options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        value7: '',
        options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        latelyTender:[
          {
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          },{
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          },{
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          },{
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          },{
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          },{
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          },{
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          },{
            title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
            itemcode:'JW-45-1820-20',
            existingEntry:140,
            releaseDate:'2018-5-20',
            remainingTime:1
          }
        ],
    };
  },
  components: { 'v-header':header, singleTender },

  computed: {
    
  },

  methods: {
    dropDown(dom, state, h, n) {
      let height = this.$refs[dom].scrollHeight;
      let s = 'dropDown'+n
      let he = 'height' + n
      this[s] = !state
      if (this[he]<=26) {
        this[he] = height
      }else{
        this[he] = 26
      }
    }
  },
  created() {
    
  },
  mounted() {
    let ininHeight = this.$refs.hotClass.scrollHeight;
    this.height1 = ininHeight;
  }
}
</script>

<style lang='less'>
  #show-all-tender{
    min-height: 1000px;
    background-color: #f6f6f6;
    .main-tendex-wapper{
      color: #727272;
      &>a{
        color: #727272;
      }
      margin-top: 40px;
      .tender-num{
        text-align: right;
        font-size: 14px;
        .count{
          color: #fb8924;
        }
      }
      .all-class{
        border: 1px solid #ebecec;
        background-color: #fff;
        font-size: 12px;
        border-radius: 4px;
        box-shadow: 0 2px 8px 0 rgba(7,17,27,.06);
        .title{
          text-align: right;
        }
        .item-warpper{
          padding-left: 20px;
          font-size: 0px;
          .item{
            display: inline-block;
            font-size: 12px;
            margin-right: 30px;
          }
        }
        .drop-down{
          position: absolute;
          right: 20px;
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
          position: relative;
          padding: 6px 0;
          line-height: 26px;
          transition: all 0.5s;
          overflow: hidden;
          border-bottom: 1px solid #ebecec;
        }
        .Material-num,.project-type{
          padding: 6px 0;
          height: 26px;
          line-height: 26px;
          border-bottom: 1px solid #ebecec;
        }
      }
      .filter{
        box-sizing: border-box;
        height: 42px;
        margin-top: 24px;
        border: 1px solid #ebecec;
        background-color: #fff;
        box-shadow: 0 2px 8px 0 rgba(7,17,27,.06);
        .filter-warpper{
          font-size: 0px;
          .filter-item{
            display: inline-block;
            border-right: 1px solid #ebecec;
            &.havepadd{
              line-height: 40px;
              padding: 0 20px;
               font-size: 14px;
              cursor: pointer;
            }
            .seat{
              // height: 40px;
              input{
                border: none;
                height: 40px;
                width: 120px;
              }
            }
          }
        }
      }
      .tender-show-list{
        margin-top: 30px;
      }
    }
  }
</style>