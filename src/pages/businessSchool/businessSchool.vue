<template>
  <div id="businessSchool">
    <v-header :state="headerState"></v-header>
    <div class="banner m-b20">
      <button class="study">开始学习</button>
    </div>
    <div class="curriculum w-container m-b30 clearfix">
      <div class="curriculum-item fl" v-for="(item, index) in 4" :key="index">
        <router-link to="./#" class="item-box">
          <img src="./curriculum.png" width="100%" alt="">
        </router-link>
      </div>
    </div>
    <!-- 招标视频 -->
    <div class="video m-b20 w-container">
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
    <!-- 招标视频 -->
    <div class="video m-b20 w-container">
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
    <!-- 招标视频 -->
    <div class="video m-b20 w-container">
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
    <!-- 线下培训 -->
    <div class="offline-training w-container">
      <div class="header clearfix" style="border-bottom:0px;">
        <div class="logo-head fl bg" style="text-indent:0px;">
          线下培训
        </div>
        <div class="more-tender fr">
          <router-link to="/moretender">更多</router-link>
        </div>
      </div>
      <div class="training">
        <div class="place" v-for="(item, i) in 4" :key="i">
          <p class="country">广州</p>
          <div class="line-box">
            <span class="line"></span>
            <span class="position"></span>
            <span class="line"></span>
          </div>
          <div class="time">2018-07-16 09:00:00</div>
          <p class="theme">商家成长计划之《商业升级》229期箱包行业广州站</p>
          <p class="enrollbtn"><button>立即报名</button></p>
          <p class="count"><span class="orange">46</span>人报名</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from '@/components/herder/header';
export default {
  data () {
    return {
      headerState: 1,
    };
  },
  components: { 'v-header':header },

  computed: {},

  methods: {}
}
</script>

<style lang='less'>
  #businessSchool{
    width: 100%;
    background-color: #fff;
    .banner{
      position: relative;
      width: 100%;
      height: 520px;
      background: url(./banner.png) center no-repeat;
      .study{
        position: absolute;
        width: 138px;
        height: 44px;
        line-height: 38px;
        border: 2px solid #fff;
        font-size: 20px;
        color: #fff;
        background-color: transparent;
        text-align: center;
        left: 50%;
        transform: translate(-50% ,0);
        bottom: 70px;
        outline: none;
        cursor: pointer;
      }
    }
    .curriculum{
      .curriculum-item{
        margin-right: 18px;
        &:last-child{
          margin-right: 0;
        }
        .item-box{
          display: inline-block;
          width: 286px;
          height: 170px;
        }
      }
    }
    .video{
      .video-warpper{
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
    .offline-training{
      margin-bottom: 40px;
      .training{
        .place{
          display: inline-block;
          box-sizing: border-box;
          width: 300px;
          padding-top: 36px;
          padding-bottom: 10px;
          .country{
            font-size: 26px;
            color: #2277e6;
            text-align: center;
          }
          .line-box{
            display: flex;
            width: 100%;
            height: 20px;
            margin: 15px 0;
            .line{
              flex: 1;
              height:1px;
              border-bottom: 1px dashed #eee;
              margin-top: 8px;
            }
            .position{
              flex: 0 0 70px;
              height: 20px;
              background: url(./position_03.png) center center no-repeat;
            }
          }
          .time{
            margin-bottom: 16px;
            text-align: center;
            font-size: 16px;
            color: #999;
          }
          .theme{
            margin: 0 40px;
            line-height: 24px;
            height: 48px;
            overflow: hidden;
            margin-bottom: 28px;
          }
          .enrollbtn{
            text-align: center;
            button{
              width: 100px;
              height: 32px;
              background-color: #2277e6;
              color: #fff;
              border-radius: 3px;
              text-align: center;
              line-height: 28px;
              border: none;
              outline: none;
              margin-bottom: 12px;
            }
          }
          .count{
            text-align: center;
          }
        }
      }
    }
  }
</style>