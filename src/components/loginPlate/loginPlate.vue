<template>
  <div>
    <div v-if="!istoken.isLogin">
      <div class="loginer clearfix">
        <div class="head-portrait fl">
          <img src="./timg.jpg" width="50" height="50" alt="">
        </div>
        <div class="hint fl">
          <p v-if="false">hi，您好</p>
          <p>您好，登录者</p>
          <p v-if="false">欢迎来到昂牛采购招标网。</p>
          <p class="leave"><span>退出</span></p>
        </div>
      </div>
      <div class="log-singn fl">
        <router-link to="/login"><i class="icon-lockin"></i>会员登录</router-link>
        <router-link to="/register"><i class="icon-signin"></i>免费注册</router-link>
      </div>
    </div>
    <div v-else-if="istoken.isLogin" class="logined">
      <div class="head-portrait">
        <!-- <img src="./timg.jpg" width="50" height="50" alt=""> -->
        <img :src="istoken.userName.avatar" width="50" height="50" alt="">
      </div>
      <div class="hint">
        <p>hi！您好，<router-link to="/personalCenter" class="go-login">{{istoken.userName.nick_name}}</router-link></p>
        <p class="leave"><span @click="loginOut">退出</span></p>
      </div>
    </div>
    <ul class="guarantee">
      <li>
        <img src="./merchant.png" width="48" height="48" alt="">
        <p>工商信息查询</p>
      </li>
      <li>
        <img src="./information.png" width="48" height="48" alt="">
        <p>企业资讯查询</p>
      </li>
      <li>
        <img src="./merchant.png" width="48" height="48" alt="">
        <p>工商信息查询</p>
      </li>
      <li>
        <img src="./information.png" width="48" height="48" alt="">
        <p>企业资讯查询</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  components: {},

  computed: {
    istoken() {
      if(this.$store.state.token){
        return {isLogin: true,userName: this.$store.getters.getAllUserInfo}
      }else {
        return {isLogin: false};
      }
    }
  },

  methods: {
    loginOut() {
      this.$store.commit('logout')
      this.$message({
          showClose: true,
          message: '退出成功',
          type: 'success'
      })
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang='less'>
  .loginer{
    margin-bottom: 12px;
    .head-portrait{
      width: 50px;
      height: 50px;
      margin-right: 10px;
      text-align: center;
      img{
        border-radius: 50%; 
      }
    }
    .hint{
      font-size: 12px;
      color: #999;
      margin-top: 8px;
      p{
        line-height: 18px;
        &.leave{
          text-indent: 20px;
        }
      }
    }
  }
  .logined{
   margin-bottom: 20px;
   .head-portrait{
      // margin-right: 10px;
      text-align: center;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%; 
      }
    }
    .hint{
      font-size: 12px;
      color: #999;
      margin-top: 8px;
      p{
        line-height: 18px;
        text-align: center;
        &.leave{
          // text-indent: 20px;
        }
      }
    }
  }
  .log-singn{
    font-size: 0px;
    margin-bottom: 20px;
    a{
      display: inline-block;
      width: 102px;
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      border: 1px solid #d1d1d1;
      text-align: center;
      &:last-child{
        border-left: 0px;
      }
      i{
        font-size: 14px;
        color: #f70;
        margin-right: 4px;
      }
    }
  }
  .guarantee{
    font-size: 0px;
    padding-left: 14px;
    li{
      display: inline-block;
      font-size: 12px;
      color: #3555a9;
      text-align: center;
      margin-right: 32px;
      margin-bottom: 24px;
      img{
        margin-bottom: 10px;
      }
      &:nth-of-type(2n){
        margin-right: 0px;
      }
    }
  }
</style>