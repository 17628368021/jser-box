<template>
  <div id="tenderInfo" class="clearfix">
    <div class="info-left fl clearfix">
      <ul class="tabs">
        <div class="logo-head bg fl">
          招标信息
        </div>
        <li v-for="(item, index) in tabs" :key="index" :class="{active:index===tabsNum}" @click="tab(index,item)">{{item}}</li>
        <li class="more-tender fr">
          <router-link to="/queryPurchase">更多采购</router-link>
        </li>
      </ul>
      <div v-for="(className, index) in tabContents" :key="index" :class="className"  v-loading="isLoading" v-show="index === tabsNum">
        <ul v-if="bids.length>0">
          <li v-for="(notice, index) in bids" :key="index" class="clearfix notice-item">
            <h2 class="fl tit"><router-link :to="{name:'bids',params:{id:notice.id}}">{{notice.title}}</router-link></h2>
            <span class="fl state">{{notice.province}}</span>
            <time class="fr time">{{notice.created_at.split(" ")[0]}}</time>
          </li>
        </ul>
        <div v-else-if="bids.length<=0">
          空空如也~~
        </div>
      </div>
    </div>
    <div class="info-right fr">
      <div class="header">
        国家法规政策
      </div>
      <ul class="inquiry-info" v-loading="policyComputed">
        <!-- <li v-for="(item, index) in singleInfo.notices" :key="index" class="clearfix"> -->
        <li v-for="(item, index) in policy" :key="index"  class="clearfix">
          <h2 class="fl tit"><router-link :to="{name:'newsDetail',params:{id:item.id}}">{{item.title}}</router-link></h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getTenderInfo} from '@/api/indexReg.js'
export default {
  props:{
    bids:{
      type: Array,
      default: []
    },
    isLoading:{
      type: Boolean,
      default: false
    },
    types:{
      type: Number,
      default: 1
    },
    policy:{
      type: Array,
    }
  },
  data () {
    return {
      tabs: ['招标公告','招标预告','招标变更',"拟建项目",'询价采购'],
      tabContents: ['notices','preview','change','proposed','shopping'],
      tabsNum: 0,
      type: 1
    }
  },
  components: {},

  computed: {
    policyComputed(){
      if (this.policy) {
        return false
      }else{
        setTimeout(()=>{
          return false
        },4000)
      }
    }
  },
  created() {

  },
  methods: {
    tab(index, item) {
       this.tabsNum = index
      if (item === '招标公告') {
        this.type = 1
      }else if (item === '招标预告') {
        this.type = 2
      }else if (item === '招标变更') {
        this.type = 4
      }else if (item === '拟建项目') {
        this.type = 6
      }else if (item === '询价采购') {
        this.type = 5
      }
      if (this.types === this.type) {
        console.log('相同数据，不必重发')
        return
      }else {
        this.$emit('changeType',this.type)
      }
    }
  },
  created() {
    
  },
  mounted() {
    // console.log(this.$data);
  }
}
</script>

<style lang='less'>
  #tenderInfo{
    margin-bottom: 32px;
    color: #333;
    .info-left{
      width: 890px;
      height: 360px;
      // border: 1px solid #e6e6e6;
      background-color: #fff;
      overflow: hidden;
      .tabs{
        border-bottom: 1px solid #e6e6e6;
        font-size: 0px;
        .bg{
          background-image: url(./lately-tender.png);
          line-height: 49px;
        }
        li{
          display: inline-block;
          width: 104px;
          height: 49px;
          line-height: 49px;
          margin-right: 24px;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          &.active{
            color: #3888EF;
          }
        }
      }
      .notices,.preview,.change,.proposed,.shopping{
        padding: 10px 18px;
        overflow: hidden;
        height: 320px;
        .notice-item{
          position: relative;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          &::before{
            content: ' ';
            font-size: 0px;
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: #d2d2d2;
            top: 12px;
            left: -14px;
          }
          .tit{
            width: 560px;
            .address{
              color: #fb8924;
              margin-right: 6px;
            }
            &:hover a{
              color: #fb8924;
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
    .info-right{
      width: 270px;
      height: 350px;
      // border: 1px solid #e6e6e6;
      background-color: #fff;
      .header{
        height: 49px;
        line-height: 49px;
        padding-left: 15px;
        border-bottom: 1px solid #e6e6e6;
      }
      .inquiry-info{
        padding: 10px 15px 10px 0;
        height: 320px;
        li{
          position: relative;
          width: 230px;
          height: 34px;
          line-height: 34px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-indent: 15px;
          .tit{
            width: 274px;
            // overflow: hidden;
            // text-overflow: ellipsis;
            .address{
              color: #fb8924;
              margin-right: 6px;
            }
            &>a{
              color: #333;
            }
          }
          &::before{
            content: ' ';
            font-size: 0px;
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: #d2d2d2;
            top: 14px;
            left: 0px;
            z-index: 99;
          }
        }
      }
    }
  }
</style>