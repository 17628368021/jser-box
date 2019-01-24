<template>
  <div class="infoList">
    <div class="crumbs m-b30">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="align">
        <el-breadcrumb-item :to="{ name: 'personalIndex' }">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>发布信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="infoList-warpper">
      <div class="single-info clearfix m-b20">
        <div class="tit">
          {{singleInfo.tit}}
        </div>
        <div class="address">
          所属地区：{{singleInfo.address}}
        </div>
        <div class="reTime">
          发布时间：{{singleInfo.reTime}}
        </div>
        <div class="report">
          <span class="peo">已报名<em class="red">{{singleInfo.peo}}</em>家</span><span class="surplus">剩余<em class="red">1</em>家<em class="red">8</em>小时</span>
        </div>
        <div class="type">
          信息类型：{{singleInfo.type}}
        </div>
        <div class="endTime">
          截止时间：{{singleInfo.endType}}
        </div>
      </div>
      <div class="single-info clearfix m-b20">
        <div class="tit">
          {{singleInfo.tit}}
        </div>
        <div class="address">
          所属地区：{{singleInfo.address}}
        </div>
        <div class="reTime">
          发布时间：{{singleInfo.reTime}}
        </div>
        <div class="report">
          <span class="peo">已报名<em class="red">{{singleInfo.peo}}</em>家</span><span class="surplus">剩余<em class="red">1</em>家<em class="red">8</em>小时</span>
        </div>
        <div class="type">
          信息类型：{{singleInfo.type}}
        </div>
        <div class="endTime">
          截止时间：{{singleInfo.endType}}
        </div>
      </div>
      <div class="single-info clearfix m-b20">
        <div class="tit">
          {{singleInfo.tit}}
        </div>
        <div class="address">
          所属地区：{{singleInfo.address}}
        </div>
        <div class="reTime">
          发布时间：{{singleInfo.reTime}}
        </div>
        <div class="report">
          <span class="peo">已报名<em class="red">{{singleInfo.peo}}</em>家</span><span class="surplus">剩余<em class="red">1</em>家<em class="red">8</em>小时</span>
        </div>
        <div class="type">
          信息类型：{{singleInfo.type}}
        </div>
        <div class="endTime">
          截止时间：{{singleInfo.endType}}
        </div>
      </div>
      <div class="single-info clearfix m-b20">
        <div class="tit">
          {{singleInfo.tit}}
        </div>
        <div class="address">
          所属地区：{{singleInfo.address}}
        </div>
        <div class="reTime">
          发布时间：{{singleInfo.reTime}}
        </div>
        <div class="report">
          <span class="peo">已报名<em class="red">{{singleInfo.peo}}</em>家</span><span class="surplus">剩余<em class="red">1</em>家<em class="red">8</em>小时</span>
        </div>
        <div class="type">
          信息类型：{{singleInfo.type}}
        </div>
        <div class="endTime">
          截止时间：{{singleInfo.endType}}
        </div>
      </div>
      <div class="single-info clearfix m-b20">
        <div class="tit">
          {{singleInfo.tit}}
        </div>
        <div class="address">
          所属地区：{{singleInfo.address}}
        </div>
        <div class="reTime">
          发布时间：{{singleInfo.reTime}}
        </div>
        <div class="report">
          <span class="peo">已报名<em class="red">{{singleInfo.peo}}</em>家</span><span class="surplus">剩余<em class="red">1</em>家<em class="red">8</em>小时</span>
        </div>
        <div class="type">
          信息类型：{{singleInfo.type}}
        </div>
        <div class="endTime">
          截止时间：{{singleInfo.endType}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../api/api.js";
export default {
  data () {
    return {
      singleInfo: {
        tit:　'智能化改造-机具端指令集交互标准',
        address: '北京',
        reTime: '2018/12/4',
        peo: 10,
        type: '加工/订制品',
        endType: '2018/6/26'
      }
    };
  },
  components: {},

  computed: {},

  methods: {},
  created() {
    API.getInfoList().then(res => {
      console.log('~~~~~~~~~~~~~~~~~', res)
    })
  }
}
</script>

<style lang='less'>
  .infoList{
    background-color: #fff;
    border-radius: 6px;
    min-height: 840px;
    padding-bottom: 30px;
    .crumbs{
      padding-left: 20px;
      height: 42px;
      line-height: 42px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      .align{
        line-height: 42px;
      }
    }
    .infoList-warpper{
      padding: 0 20px;
      .single-info{
        box-sizing: border-box;
        padding: 12px 16px;
        border: 1px solid #e4e4e4;
        font-size: 0px;
        div{
          display: inline-block;
          line-height: 30px;
          font-size: 12px;
        }
        .tit{
          width: 480px;
          font-size: 14px;
        }
        .address,.type{
          width: 270px;
        }
        .reTime,.endTime{
          width: 128px;
        }
        .report{
          width: 480px;
          em{
            font-size: 18px;
          }
          span{
            display: inline-block;
          }
          span.peo{
            margin-right: 72px;
          }
        }
      }
    }
  }
</style>