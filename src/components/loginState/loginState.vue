<template>
  <div id="login-state" class="clearfix">
    <div class="inner-box w-container">
      <!-- 登录提示 -->
      <ul class="fl login-info">
        <li v-if="!istoken.isLogin">Hi，欢迎来到按钮招标网 <router-link to="/login" class="go-login" >去登录</router-link> <router-link to="/register">免费注册</router-link></li>
        <li v-if="istoken.isLogin">您好，<router-link to="/personalCenter" class="go-login">{{istoken.userName}}</router-link>，欢迎登录！ <span @click="loginOut" class="leave">[退出]</span></li>
      </ul>
      <!-- 服务热线 -->
      <ul class="fr other-services">
        <li class="phone-parchase"><i class="icon-device-phone"></i>手机采购</li>
        <li>服务热线：028-88881282、4000911080</li>
      </ul>
    </div>
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
        return {isLogin: true,userName: this.$store.getters.getName}
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
  #login-state{
    width: 100%;
    height: 40px;
    background-color: #efefef;
    .inner-box{
      .login-info,.other-services{
        font-size: 0px;
        li{
          display: inline-block;
          height: 40px;
          line-height: 40px;
          margin-right: 20px;
          font-size: 14px;
          color: #666;
          &:last-child{
            margin-right: 0px;
          }
          &.phone-parchase{
            cursor: pointer;
            .icon-device-phone{
              display: inline-block;
              line-height: 40px;
              vertical-align: top;
              font-size: 26px;
              color: #666;
            }
          }
          a{
            color: #666;
          }
          .go-login{
            color: #3477da;
          }
          .leave{
            transition: all 1s;
            cursor: pointer;
            &:hover{
              color: #3477da;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
</style>