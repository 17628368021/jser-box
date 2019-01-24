<template>
  <div id="app">
    <!-- 我是登录状态 -->
    <login-state></login-state>
    <!-- 我是头部 -->
    <!-- <v-header v-if="$route.path ==='/index'"></v-header> -->
    <div class="content">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import loginState from './components/loginState/loginState';
import header from './components/herder/header';
import footer from './components/footer/footer';
export default {
  data () {
    return {
      isRouterAlive: true
    };
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {loginState,'v-header':header,'v-footer':footer},

  computed: {},
  
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  },
  created() {
  } 
}
</script>

<style lang='less'>
@import '../static/css/reset.css';
.header{
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
}
.more-tender{
  text-align: right;
  &>a{
    display: inline-block;
    font-size: 14px;
    color: #2c81ef;
    background: url(/static/img/jump-more.png) right no-repeat;
    padding-right: 16px;
  }
}
.logo-head{
  background-repeat: no-repeat;
  background-position: left center;
  text-indent: 30px;
  font-size: 22px;
  font-weight: 545;
}
</style>