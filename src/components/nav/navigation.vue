<template>
  <div>
    <ul class="navigation-menu fl">
      <li><router-link to="/index">首页</router-link></li>
      <li><router-link to="/mainTendering">招标</router-link></li>
      <!-- <li><router-link to="/inquiryInfo">询价</router-link></li> -->
      <li><router-link to="/consultingCenter">咨询中心</router-link></li>
      <li><router-link to="/exhibition">展会</router-link></li>
      <li><router-link to="/integralMall">积分商城</router-link></li>
      <li><router-link to="/businessSchool">商学院</router-link></li>
      <li><a href="http://www.tdsc360.com/mall/">去采购</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tenderCount:98921
    };
  },
  components: {
    
  },

  computed: {
    
  },

  methods: {

  }
}
</script>

<style lang='less'>
      .navigation-menu{
        // padding-left: 40px;
        font-size: 0px;
        li{
          display: inline-block;
          // margin-right: 66px;
          font-size: 16px;
          &>a{
            display: block;
            height: 42px;
            padding: 0 32px;
            line-height: 42px;
            color: #fff;
            &.active{
              // color: #fb8924;
              background-color: #0c5ac0;
              // border-bottom:1px solid #fb8924;
            }
          }
          &:last-child{
            margin-right: 0px;
          }
        }
      }
      .navigation-menu-2{
        .navigation-menu{
          padding-left: 40px;
          font-size: 0px;
          li{
            display: inline-block;
            margin-right: 66px;
            font-size: 16px;
            &>a{
              display: block;
              height: 36px;
              padding: 0;
              line-height: 36px;
              color: #333;
              &.active{
                color: #fb8924;
                border-bottom:1px solid #fb8924;
              }
            }
            &:last-child{
              margin-right: 0px;
            }
          }
        }
      }
</style>