<template>
  <div class="personalIndex">
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="align">
        <el-breadcrumb-item :to="{ name: 'personalIndex' }">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'personalIndex'}">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="baseInfo clearfix">
      <div class="photo fl">
        <img :src="baseUserInfo.avatar" width="100%" alt="">
      </div>
      <div class="mini-info fl">
        <div class="loginer entry">
          <div class="name common">{{baseUserInfo.nick_name}}<span style="font-size:12px;color:#737373">({{logged.type}})&emsp;Hi，欢迎登录！</span></div>
          <span class="modify common"><router-link to="/reviseInfo">修改资料</router-link></span>
        </div>
        <div class="grade entry">
          <div class="safety common">
            <span>安全等级：</span>
            <el-progress :text-inside="true" style="width:160px;" class="common" :stroke-width="18" :percentage="80" color="rgba(39, 135, 87, 0.7)"></el-progress>
          </div>
          <span class="common"><router-link to="/reviseInfo">提升等级</router-link></span>
        </div>
      </div>
    </div>
    <div class="newest-info clearfix">
      <div class="heads clearfix">
        <h4 class="fl">最新中标信息</h4>
        <span class="more"><router-link :to="{name:'moretender'}">查看更多</router-link></span>
      </div>
      <div class="content">
        <singleTender :latelyTender="latelyTender"></singleTender>
      </div>
    </div>
    <div class="shopping">
      <div class="heads clearfix">
        <h4 class="fl">询价采购</h4>
        <span class="more"><router-link :to="{name:'moretender'}">查看更多</router-link></span>
      </div>
      <div class="content notice clearfix">
        <ul>
          <li v-for="(notice, index) in notices" :key="index" class="clearfix notice-item">
            <h2 class="fl tit"><router-link to="detailNotice"><span class="address">[{{notice.address}}]</span>{{notice.title}}</router-link></h2>
            <span class="fl state">{{notice.state}}</span>
            <time class="fr time">{{notice.time}}</time>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import singleTender from '../singleTender/singleTender.vue';
export default {
  props: {
    baseUserInfo : {
      type : Object
    }
  },
  data () {
    return {
      logged: {
        name: '徐志摩',
        type: '个人'
      },
      latelyTender:[{
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
      notices: [
        {
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        },{
          address: '北京',
          title: '智能化改造-机具端指令集交互标准',
          state: '[进行中]',
          time: '2018/6/6'
        }
      ]
    };
  },
  components: { singleTender },

  computed: {},

  methods: {}
}
</script>

<style lang='less'>
  .personalIndex{
    // background-color: #f6f6f6;
    // min-height: 500px;
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
    .baseInfo{
      background-color: #fff;
      padding: 32px 0 30px 0;
      margin-bottom: 20px;
      .photo{
        padding: 0px 70px;
        height: 80px;
        width: 80px;
        overflow: hidden;
        img{
          border-radius:50%; 
        }
      }
      .mini-info{
        padding-left: 16px;
        border-left: 1px solid #eee;
        margin-bottom: 20px;
        .entry{
          height: 40px;
          line-height: 30px;
        }
        .loginer{
          .common{
            display: inline-block;
          }
          .name{
            font-size: 14px;
          }
          .modify{
            margin-left: 24px;
            background: url(./index-center.png) no-repeat left;
            text-indent: 22px;
            &>a{
              color: #2277e6;
            }
          }
        }
        .grade{
          .common{
            display: inline-block;
            &>a{
              color: #2277e6;
            }
          }
        }
      }
    }
    .newest-info{
      background-color: #fff;
      margin-bottom: 20px;
      .content{
        padding-left: 32px;
        padding-bottom: 10px;
      }
    }
    .shopping{
      background-color: #fff;
      margin-bottom: 20px;
      .content{
        &.notice{
          padding: 10px 18px;
          .notice-item{
            height: 34px;
            line-height: 34px;
            font-size: 14px;
            .tit{
              width: 560px;
              .address{
                color: #fb8924;
                margin-right: 6px;
              }
              &>a{
                color: #333;
              }
            }
            .time{
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
    }
    .heads{
      padding: 20px 0 20px 20px;
      border-bottom: 1px solid #eee;
      h4{
        margin-left: 20px;
        text-indent: 10px;
        font-size: 16px;
        border-left: 2px solid #db5a5a;
        color: #333;
      }
      .more{
        float: right;
        vertical-align: top;
        font-size: 14px;
        text-align: right;
        padding-right: 20px;
        &>a{
          color: #2277e6;
        }
      }
    }
  }
</style>