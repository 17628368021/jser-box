<template>
  <div id="detailsExhibi">
    <v-hearder :state="headerState"></v-hearder>
    <div class="w-container">
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="align">
          <el-breadcrumb-item :to="{ name: 'index' }">招标网首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'rulesAregu'}">规章制度</el-breadcrumb-item>
          <el-breadcrumb-item>正文</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="banner">
        <img src="./banner.jpg" width="100%" alt="">
      </div>
      <div class="main">
        <div class="main-show m-b20 clearfix">
          <h1 class="main-title">
            {{exhibi_single.title}}
          </h1>
          <div class="main-detail clearfix">
            <div class="notes-box fl">
              <p><span>展会名称：</span><span>{{exhibi_single.title}}</span></p>
              <p><span>开幕时间：</span><span>{{exhibi_single.start_time}}</span></p>
              <p><span>结束时间：</span><span>{{exhibi_single.end_time}}</span></p>
              <p><span>举办城市：</span><span>{{exhibi_single.province}}</span></p>
              <p><span>所属行业：</span><span>{{exhibi_single.categroy}}</span></p>
              <p><span>主办单位：</span><span>{{exhibi_single.host_unit}}</span></p>
              <p><span>承办单位：</span><span>{{exhibi_single.building_name}}</span></p>
            </div>
            <div class="main-detail-right fl clearfix">
              <div class="days fr">距离展会还剩20天</div>
              <div class="oprations">
                <p class="share">分享至：<i class="icon-weixin"></i><i class="icon-weibo"></i><i class="icon-QQzone"></i></p>
                <p>
                  <!-- <el-button>展位预定</el-button>
                  <el-button>搭建设计</el-button>
                  <el-button>酒店预定</el-button>
                  <el-button>在线咨询</el-button> -->
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-ex clearfix">
          <div class="detail-ex-left fl">
            <div class="detail-plate">
              <div class="head">
                展会详情
              </div>
              <div class="content" v-html="exhibi_single.contents">
                  
              </div>
            </div>
            <div class="detail-plate">
              <div class="head">
                展览范围
              </div>
              <div class="content" v-html="exhibi_single.scope">
                  
              </div>
            </div>
            <div class="detail-plate">
              <div class="head">
                参展费用
              </div>
              <div class="content" v-html="exhibi_single.scope">
              </div>
            </div>
          </div>
          <div class="detail-ex-right fr">
            <div class="lately-release m-b20">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  最新发布的节庆信息
                </div>
                <div class="more-tender fr">
                  <router-link to="/moretender">更多</router-link>
                </div>
              </div>
              <ul class="release-Tab">
                <li class="items">会展企业入驻</li>
                <li class="items">企业推广</li>
                <li class="items">会展服务商招标公告</li>
              </ul>
            </div>
            <div class="lately-release m-b20">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  按类型找节庆
                </div>
                <div class="more-tender fr">
                  <router-link to="/moretender">更多</router-link>
                </div>
              </div>
              <ul class="release-Tab">
                <li class="items">会展企业入驻</li>
                <li class="items">企业推广</li>
                <li class="items">会展服务商招标公告</li>
              </ul>
            </div>
            <div class="months m-b20">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  按月份找节庆
                </div>
                <div class="more-tender fr">
                  <router-link to="/moretender">更多</router-link>
                </div>
              </div>
              <ul class="months-Tab">
                <li v-for="(item, index) in 12" :key="index">一月</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from '@/components/herder/header'
import API from '../../api/api.js'

export default {
  data () {
    return {
      headerState: 1,
      id: 0,
      exhibi_single:{}
    };
  },
  components: { 'v-hearder':header },

  computed: {},

  methods: {},

  created() {
    this.id = this.$route.params.id;
    console.log(this.id)
    API.exhibition_detail(this.id).then( res => {
      let {code, data} = res.data
      if (code === 200) {
        this.exhibi_single = data[0]
      } else {
        console.log(`暂无信息`)
      }
    })
  }
}
</script>

<style lang='less'>
#detailsExhibi{
  .crumbs{
    padding-left: 20px;
    height: 42px;
    line-height: 42px;
    background-color: #fff;
    .align{
      line-height: 42px;
    }
  }
  .banner{
    height: 350px;
    margin-bottom: 50px;
  }
  .main{
    .main-title{
      height: 73px;
      line-height: 73px;
      text-align: center;
      font-size: 24px;
      background-color: #e8f2ff;
    }
    .main-show{
      .main-detail{
        box-sizing: border-box;
        padding: 45px 0 20px 54px;
        border: 1px solid #eee;
        border-top: none;
        .notes-box{
          width: 624px;
          p{
            line-height: 34px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            span:nth-of-type(2):hover{
              color: #257ef3;
            }
          }
        }
        .main-detail-right{
          width: 520px;
          .days{
            position: relative;
            width: 208px;
            height: 60px;
            line-height: 60px;
            background-color: #257ef3;
            font-size: 20px; 
            color: #fff;
            &::before{
              position: absolute;
              content: " ";
              border: 30px solid transparent;
              border-right-color: #257ef3;
              left: -60px;
            }
            &::after{
              position: absolute;
              content: " ";
              height: 12px;
              width: 12px;
              border-radius: 50%;
              background-color: #fff;
              top: 24px;
              right: 14px;
            }
          }
          .oprations{
            margin-top: 128px;
            .share{
              font-size: 14px;
              margin-bottom: 22px;
              i{
                cursor: pointer;
                margin-right: 6px;
              }
            }
          }
        }
      }
    }
    .detail-ex{
      .detail-ex-left{
        width: 860px;
        .detail-plate{
          margin-bottom: 20px;
          .head{
            line-height: 50px;
            height: 50px;
            background-color: #e8f2ff;
            padding-left: 15px;
            font-size: 16px;
          }
          .content{
            box-sizing: border-box;
            border: 1px solid #eee;
            border-top: 0px;
            padding: 50px 30px 30px;
            line-height: 34px;
            font-size: 14px;
            color: #666;
          }
        }
      }
      .detail-ex-right{
        width: 320px;
        &>div{
          box-sizing: border-box;
          display: inline-block;
          width: 100%;
          padding: 0 10px;
          border: 1px solid #eee;
        }
        .lately-release{
          .release-Tab{
            padding: 10px 10px 0;
            font-size: 0px;
            .items{
              line-height: 28px;
              margin-right: 45px;
              font-size: 14px;
              cursor: pointer;
              &:hover{
                color: #fd8f0f;
              }
            }
          }
        }
        .months{
          .months-Tab{
            padding-top: 24px;
            color: #333;
            font-size: 0px;
            li{
              margin-right: 40px;
              margin-bottom: 20px;
              display: inline-block;
              font-size: 14px;
              cursor: pointer;
              &:nth-of-type(4n){
                margin-right: 0;
              }
              &:hover{
                color: #fd8f0f;
              }
            }
          }
        }
      }
    }
  }
}
</style>