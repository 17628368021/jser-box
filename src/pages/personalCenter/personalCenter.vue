<template>
  <div id="personalCenter" class="clearfix">
    <v-header :state="headerState"></v-header>
    <div class="w-container main-box">
      <div class="nav-bar fl" ref="nacbarHook" v-show="true">
        <div class="info-admin-box">
          <h5 class="title">信息管理</h5>
          <ul class="term">
            <router-link to="/personalCenter/basicInfo" class="item" tag="li">基础信息</router-link>
            <router-link to="/personalCenter/authenInfo" class="item" exact tag="li">认证信息</router-link>
          </ul>
        </div>
        <div class="purinfo-admin-box">
          <h5 class="title">采购信息管理</h5>
          <ul class="term">
            <router-link to="/personalCenter/releaseInfo"  class="item" tag="li">发布信息</router-link>
            <router-link to="/personalCenter/inquiryInfo"  class="item" tag="li">采购</router-link>
            <router-link to="/personalCenter/infoList"  class="item" tag="li">信息列表</router-link>
          </ul>
        </div>
      </div>
      <div class="content-warpper fl" :class="{stretching:isStretching}">
        <router-view :baseUserInfo='baseUserInfo' :area="area"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../../components/herder/header';
import API from '../../api/api.js'
export default {
  data () {
    return {
      headerState: 4,
      h: 960,
      isStretching: false,
      area : []
    };
  },
  components: { 'v-header':header, },

  computed: {
    baseUserInfo () {
      return this.$store.getters.getAllUserInfo
    }
  },

  methods: {},
  created(){
    // console.log(this.$route.path)
    /* start----------------------↓↓↓↓↓↓↓↓↓↓  */
      // 当页面为采购的时候  需要改变的布局逻辑
    if(this.$route.path === '/personalCenter/inquiryInfo'){
      this.isStretching = true;
    }
    this.$router.beforeResolve((to, from, next)=>{
      if(to.name === 'inquiryInfo'){
        this.isStretching = true;
        next()
      }else{
        this.isStretching = false;
        next()
      }
    })
    /* ↑↑↑↑↑↑↑↑↑--------------------------end */

    /* start----------------------↓↓↓↓↓↓↓↓↓↓  */
    //  获取省市区！
    API.getCitys().then(area => {
      // console.log('area>>>>>>>>>>', area)  
      let {code, data} = area.data
      if (code === 200) {
        this.area = data
        // console.log(this.area)
      } else {
        console.log('省市区获取失败')
      }
      /* this.area = area.data.data */
    })

    /* ↑↑↑↑↑↑↑↑↑↑-------------------------end */
  }
}
</script>

<style lang='less'>
  #personalCenter{
    width: 100%;
    background-color: #f2f1f1;
    min-height: 1000px;
    height: auto;;
    .main-box{
      position: relative;
      margin-top: 20px;
      .nav-bar{
        width: 210px;
        min-height: 370px;    
        box-sizing: border-box;
        box-shadow: 0 3px 8px 2px rgba(211, 211, 211, 0.45);
        border-radius: 5px;
        background-color: #fff;
        margin-right: 10px;
        .info-admin-box,.purinfo-admin-box{
          border-bottom: 1px solid #e4e4e4;
          padding-top: 13px;
          & a{
            color: #333;
          }
          .title{
            background: url(./infoAdmin.png) no-repeat left;
            text-indent: 22px;
            margin: 0 14px;
            height: 22px;
            line-height: 22px;
            color: #939cad;
            margin-bottom: 20px;
          }
          .term{
            margin-bottom: 18px;
            list-style: none;
            .item{
              height: 32px;
              line-height: 32px;
              padding-left: 28px;
              cursor: pointer;
              &:hover{
                color: #2277e6;
              }
              &.active{
                border-left: 3px solid#2277e6;
                background-color: #f6f6f6;
              }
            }
          }
        }
        .purinfo-admin-box{
          .title{
            background: url(./carticon.png) no-repeat left;
          }
        }
      }
      .content-warpper{
        width: 960px;
        border-radius: 6px;
        box-shadow: 0 2px 8px 0 rgba(7,17,27,.06);
        box-sizing: border-box;
        overflow: hidden;
        margin-bottom: 30px;
        // min-height: 500px;
        // background-color: #fff;
        &.stretching{
          position: absolute;
          left: 220px;
          width: 1152px;
        }
      }
    }
  }
</style>