<template>
  <div id="consultingCenter">
    <v-header :state="headerState"></v-header>
    <div class="w-container clearfix">
      <div class="consultingCenter-banner m-b20 clearfix">
        <div class="banner fl">
          <img src="./banner.jpg" width="100%" alt="">
        </div>
        <div class="consulting-service fr">
          <div class="service">
            <div class="head">
              资讯服务
            </div>
            <ul class="items">
              <li v-for="(item, index) in informationService" class="item" :key="index" @mouseenter="changebg(item.imgs)" @mouseleave ="recoverybg(item.imgs)">
                <div><img :src="'/static/img/'+item.imgs+'.png'" alt=""></div>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
          <div class="ad">
            <img src="./advertisiment.png" alt="">
          </div>
        </div>
      </div>
      <!-- 招标视频 -->
      <div class="video">
        <div class="header clearfix" style="border-bottom:0px;">
          <div class="logo-head fl bg" style="text-indent:0px;">
            招标视频
          </div>
          <div class="more-tender fr">
            <router-link to="/moretender">更多</router-link>
          </div>
        </div>
        <!-- 视频列表 -->
        <div class="video-warpper"> 
          <ul class="vider-box">
            <li class="video-item" v-for="(v, i) in 4" :key="i">
              <router-link class="item m-b20" to="./#">
                <img src="./business-i3.png" width="100%" alt="">
                <div class="mask"></div>
                <i class="play"></i>
              </router-link>
              <div class="title-video">
                <h6 class="tit">商家成长计划之《商业升级》229期</h6>
                <p class="desc">还在勉强维持生计</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 最新发布  Latest release -->
      <div class="latest-release clearfix">
        <div class="latest-release-left fl">
          <h1 class="Headlines">
            最新发布
            <div class="more-tender fr">
              <router-link to="/moretender">更多</router-link>
            </div>
          </h1>
          <div class="release-box m-b20">
            <div class="release-item clearfix" v-for="(v, i) in 4" :key="i">
              <h3 class="head"><span class="tag">资讯</span>智能绿色环保 科技创新让包装行业更有“内涵”<span class="date fr">2018-07-18 09:48:05</span></h3>
              <p class="Preface">
                智能绿色环保是转型发展方向科技创新让包装行业更有“内涵”经济日报·中国经济网记者杨阳腾近年来，我国包装行业取得了长足发展，
                2013年至2017年，包装工业年均复合增长率达16%。但是从品种、质量、新品研发能力以及经济效益等方面看
              </p>
            </div>
          </div>
          <div class="Summary-articles">
            <div>
              <Extensibleplate tit='政策法规'></Extensibleplate>
            </div>
            <div>
              <Extensibleplate tit='招标投法'></Extensibleplate>
            </div>
            <div>
              <Extensibleplate tit='技术标准'></Extensibleplate>
            </div>
            <div>
              <Extensibleplate tit='铁总规范文件'></Extensibleplate>
            </div>
          </div>
        </div>
        <div class="latest-release-right fr">
          <div class="quotations-analysis">
            <Extensibleplate tit="行情分析"></Extensibleplate>
          </div>
          <div class="Downloading-bids">
            <Extensibleplate tit="标书下载"></Extensibleplate>
          </div>
          <div class="lately-bid">
            <Extensibleplate tit="最新招标"></Extensibleplate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from '@/components/herder/header';
import Extensibleplate from '@/components/Extensibleplate/Extensibleplate';
export default {
  data () {
    return {
      headerState: 1,
      informationService: {
        file:{imgs:'file',name: '铁总规范文件'},
        hammer: {imgs: 'hammer', name: '国家政策法规'},
        standard: {imgs: 'standard', name: '铁道技术标准'},
        rule: {imgs: 'rule', name: '行业规章制度'}
      },
      bg: ''
    };
  },
  components: { 'v-header':header, Extensibleplate },

  computed: {},

  methods: {
    changebg(it) {
      this.bg = it;
      this.informationService[it].imgs = 'b-'+it;
    },
    recoverybg(){
      this.informationService[this.bg].imgs = this.bg;
    }
  }
}
</script>

<style lang='less'>
  #consultingCenter{
    width: 100%;
    background-color: #fff;
    min-height: 2000px;
    &>a{
      color: #333;
    }
    .consultingCenter-banner{
      margin-top: 20px;
      .banner{
        width: 960px;
        height: 330px;
      }
      .consulting-service{
        width: 230px;
        height: 330px;
        .service{
          width: 230px;
          height: 218px;
          border: 1px solid #eee;
          margin-bottom: 8px;
          .head{
            height: 35px;
            line-height: 35px;
            text-indent: 6px;
            background-color: #f4f4f4;
            color: #666;
          }
          .items{
            padding: 0px 22px;
            margin-top: 30px;
            font-size: 0px;
            .item{
              display: inline-block;
              margin-right: 42px;
              margin-bottom: 22px;
              font-size: 12px;
              color: #666;
              cursor: pointer;
              &:nth-of-type(2n){
                margin-right: 0;
              }
              div{
                text-align: center;
                margin-bottom: 8px;
              }
            }
          }
        }
      }
    }
    .video{
      .video-warpper{
        margin-bottom: 50px;
        .vider-box{
          padding-bottom: 6px;
          font-size: 0px;
          .video-item{
            width: 280px;
            display: inline-block;
            margin-right: 26px;
            border-radius: 6px; 
            overflow: hidden;
            &:last-child{
              margin-right: 0;
            }
            .item{
              display: inline-block;
              position: relative;
              width: 280px;
              height: 190px;
              border-radius:6px;
              overflow: hidden;
              &:hover .play{
                opacity: 1;
                transform: scale(1);
              }
              &:hover .mask{
                opacity: 0.4;
              }
              .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transition: all 0.3s ease-out;
                opacity: 0;
                background: #000;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                &:hover{
                  opacity: 0.4;
                }
              }
              .play{
                opacity: 0;
                filter: alpha(opacity=0);
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                margin: -25px 0 0 -25px;
                background: url(./play-icon.png) no-repeat;
                transform: scale(2);
                backface-visibility: hidden;
                transition: all ease-out 250ms;
              }
            }
            .title-video{
              .tit{
                font-size: 16px;
                margin-bottom: 4px;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .desc{
                font-size: 12px;
                color: #999;
              }
            }
          }
        }
      }
    }
    .latest-release{
      .latest-release-left{
        width: 872px;
        min-height: 224px;
        
        overflow: hidden;
        .Headlines{
          height: 46px;
          line-height: 46px;
          padding: 0 6px;
          background-color: #e4eaf2;
        }
        .release-box{
          max-height: 710px;
          .release-item{
             box-sizing: border-box;
             height: 177px;
             padding-top: 50px;
             padding-left: 16px;
             padding-right: 16px;
             border-bottom: 1px solid #eee;
             &:hover{
               background-color: #f7f7f7;
             }
             .head{
               font-size: 16px;
               cursor: pointer;
               .tag{
                 display: inline-block;
                 width: 42px;
                 height: 20px;
                 line-height: 20px;
                 font-size: 12px;
                 text-align: center;
                 background-color: #8cb4ff;
                 margin-right: 8px;
                 color: #fff;
               }
               .date{
                 font-size: 12px;
               }
             }
             .Preface{
               cursor: pointer;
               margin-top: 10px;
               line-height: 26px;
               color: #666;
               font-size: 14px;
             }
          }
        }
        .Summary-articles{
          &>div{
            box-sizing: border-box;
            display: inline-block;
            width: 430px;
            height: 294px;
            padding: 0 10px;
            margin-right: 7px;
            margin-bottom: 20px;
            border: 1px solid #eee;
            &:nth-of-type(2n){
              margin-right: 0px;
            }
          }
        }
      }
      .latest-release-right{
        width: 320px;
        &>div{
          box-sizing: border-box;
          border: 1px solid #eee;
          margin-bottom: 10px;
          padding: 0 10px;
        }
        .quotations-analysis{
          padding: 0 10px;
          height: 400px;
        }
        .Downloading-bids{
          height: 320px;
        }
        .lately-bid{
          height: 400px;
        }
      }
    }
  }
</style>