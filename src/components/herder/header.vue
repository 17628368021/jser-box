<template>
  <div id="header">
    <!-- 我是搜索 -->
    <div class="w-container  clearfix">
      <!-- logo部分 -->
      <div class="logo-warpper fl">
        <a class="logo" href="/index"><img src="./parchase_logo.png" width="100%" height="100%"/></a>
      </div>
      <!-- 搜索框 -->
      <div class="search-warpper fl" v-if="state === 1">
        <div class="search">
          <div class="condition-selected">
            <span class="search-toggle">{{condition}}<i class="el-icon-arrow-down" @click="isShow = !isShow"></i></span>
            <ul class="tabs-select" v-if="isShow">
              <li v-for="(item, index) in searchArray" @click="toggleTabs(item)" class="tabs-item" :key="index">{{item}}</li>
            </ul>
          </div>
          <input type="text" class="search-text" v-model="keyword" placeholder="请输入关键字"/>
          <input type="button" class="search-btn" @click="search_key" value="搜索">
        </div>
      </div>
      <!-- 去发布招标 -->
      <div class="release-tender fr" v-if="state === 1">
        <div class="release-btn">
          <i class="icon-emi-fly"></i>
          <span>发布招标</span>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="popular fl"  v-if="state === 1">
        <span class="text fl">热门搜索：</span>
        <ul class="search-item fl">
          <li v-for="(item,index) in popularSearch" :key="index">
            <router-link to="">{{item}}</router-link>
          </li>
        </ul>
      </div>
      <div class="login-state clearfix fr" v-if="state === 2">
        <navigation class="navigation-menu-2"></navigation>
      </div>
      <div class="register-state fl" v-if="state === 3">
        <span>用户注册</span>
      </div>
      <div class="fr gologin" v-if="state === 3">
        已有账号，立即<router-link to="/login">登录</router-link>
      </div>
      <div class="fl memeber-center clearfix"  v-if="state === 4">
      <span class="fl">用户中心</span>
      <div class="search fr">
        <input type="text" class="search-text" v-model="keyword" placeholder="请输入关键字"/>
        <button class="search-btn"><i class="el-icon-search"></i></button>
      </div>  
    </div>
    </div>
    <!-- 我是导航 -->
    <div id="navigation-bar" class="clearfix" v-if="state === 1">
      <div class="w-container navigation-info clearfix">
          <navigation></navigation>
      </div>
    </div>
  </div>
</template>

<script>

import navigation from '../nav/navigation';
import API from '../../api/api.js'
export default {
  props:{
    state: {
      type: Number,
      default: 1,
    }
  },
  data () {
    return {
      tenderCount: 1520321,
      keyword:'',
      'popularSearch':['MOMO整合方案','防雾霾面罩','WD40','背挂式零件盒','不锈钢六角螺栓'],
      searchArray: ['文章', '招标', '展会', '商品'],
      isShow: false,
      condition: '文章'
    };
  },
  inject: ['reload'],
  components: {navigation},

  computed: {},

  methods: {
    toggleTabs(item) {
      this.condition = item
      this.isShow = false
    },
    search_key() {
      let type = 1
      if (this.condition === '文章') {
        type = 1
      }else if (this.condition === '招标') {
        type = 2
      }else if (this.condition === '展会') {
        type = 3
      }else if (this.condition === '商品') {
        type = 4
      }
      let data = {
        keyword: this.keyword,
        type: type
      }
      // console.log(data)
      this.$router.push({ path: '/queryPurchase', query: data })
    }
  }
}
</script>

<style lang='less'>
  #header{
    width: 100%;
    background-color: #fff;
    box-shadow:0 25px 23px -37px rgba(0, 0, 0, 0.8);
    .logo-warpper{
      width: 338px;
      height: 60px;
      padding: 30px 0;
      .logo{
        display: inline-block;
        width: 256px;
        height: 60px;
        margin-right: 82px;
      }
    }
    .login-state{
      padding-top: 40px;
      padding-right: 6px;
    }
    .register-state{
      line-height: 120px;
      margin-left: -56px;
      font-size: 20px;
      color: #666;
    }
    .gologin{
      padding-top: 95px;
      font-size: 14px;
      &>a{
        color: #297ae3;
      }
    }
    .memeber-center{
      margin-left: -56px;
      width: 912px;
      span{
        display: block;
        padding-top: 48px;
        font-size: 20px;
        color: #333;
      }
      .search{
        padding-top: 40px;
        .search-text{
          box-sizing: border-box;
          float: left;
          width: 312px;
          height: 40px;
          padding: 10px;
          border: 1px solid #ddd;
          outline: none;
          &:focus{
            border:  1px solid #297ae3;
          }
        }
        .search-btn{
          box-sizing: border-box;
          width: 44px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #2c81ef;
          border:  1px solid #297ae3;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          outline: none;
        }
      }
    }
    .search-warpper{
      margin-top: 28px;
      .search{
        width: 620px;
        height: 40px;
        position: relative;
        .condition-selected{
          position: absolute;
          z-index: 99;
          line-height: 40px;
          width: 52px;
          top: 0px;
          left: 0px;
          // text-indent: 8px;
          color: #999;
          font-size: 12px;
          .search-toggle{
            display:block;
            width: 100%;
            text-indent: 8px;
            i{
              margin-left: -4px;
              cursor: pointer;
            }
          }
          .tabs-select{
            position: absolute;
            background: #fff;
            border: 1px solid #999;
            width: 50px;
            text-align: center;
            line-height: 26px;
            top: 39px;
            .tabs-item{
              cursor: pointer;
              &:hover{
                background: #f1f1f1;
              }
            }
          }
        }
        .search-text{
          box-sizing: border-box;
          position: relative;
          float: left;
          width: 520px;
          height: 40px;
          padding: 10px;
          padding-left: 50px;
          border: 1px solid #297ae3;
          outline: none;
        }
        .search-btn{
          box-sizing: border-box;
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #2c81ef;
          border:  1px solid #297ae3;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .release-tender{
      margin-top: 28px;
      margin-left: 80px;
      .release-btn{
        box-sizing: border-box;
        width: 160px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #f0f0f0;
        text-align: center;
        font-size: 14px;
        color: #fb8924;
        cursor: pointer;
      }
    }
    .popular{
      margin-top: 12px;
      .text{
        margin-right: 8px;
        color: #999;
        font-size: 12px;
      }
      .search-item{
        font-size: 0px;
        li{
          display: inline-block;
          margin-right: 8px;
          font-size: 12px;
          color: #999;
          &.hotwords{
            color: #fb8924;
          }
        }
      }
    }
    #navigation-bar{
      width: 100%;
      background: #2277e6;
      .navigation-info{
        // padding: 10px 0 12px;
        font-weight: 600;
        /* .tender-count{
          .count{
            color: #333;
            font-size: 16px;
          }
          height: 36px;
          line-height: 36px;
          color: #666;
          font-size: 14px;
          margin-right: 12px;
        } */
      }
    } 
  }

</style>