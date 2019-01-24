<template>
  <div>
    <div id="no-captcha" class="nc-container"></div> 
    <Slide :jsUrl="loadUrl" ref="slideHook"></Slide>
  </div>
</template>

<script>
import Slide from "./Slide"
export default {
  props:{
    isReload:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      'appKey':'FFFF0N00000000006684',
      'modelName':'no-captcha',
      'nc_token':null,
      'lang':'cn',
      NC_Opt:null,
      // Url:'https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012'
    };
  },
  components: { Slide },
  watch: {
    // 如果账号已存在就重置滑块
    isReload: function(){
      if(this.isReload){
        this.$nextTick(()=>{
          this.init();
          this.$emit('slideVerti')
        })
      }else{
      }
    }
  },
  computed: {
    loadUrl() {
      return 'https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012'
    }
  },
  mounted() {
    var that = this
    //有效果
    setTimeout(function(){
      that.init();
    },800)
    // that.init();
  },
  methods: {
    init(){
      var self = this;
      this.nc_token = [this.appKey, (new Date()).getTime(), Math.random()].join(':');
      this.NC_Opt = {
        renderTo: "#no-captcha",
        appkey: self.appKey,
        scene: "nc_register",
        token: self.nc_token,
        customWidth: 300,
        trans:{"key1":"code300"},
        is_Opt: 0,
        language: self.lang,
        isEnabled: true,
        timeout: 3000,
        times:5,
        apimap: {},   
        callback: function (data) { 
            // window.console && console.log(self.nc_token)
            // window.console && console.log(data.csessionid)
            // window.console && console.log(data.sig)
            console.log(data)
            //将这三个参数在这里回调服务器的接口，进行服务器的验证
            if(data.value === 'pass'){
              self.$emit('slideVerti')
            }
        }
      }
      self.generarte();        
    },
    generarte(){
        var nc = new noCaptcha(this.NC_Opt)
        nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        });
        console.log(this.isReload)
        if(this.isReload){
          console.log(this.isReload)
          nc.reload()
        }
    }
  },
  created() {
  }
}
</script>

<style lang='less'>
.nc-container .nc_wrapper{
  width: 402px !important;
}
.nc-container #nc_1_wrapper, .nc-container.tb-login #nc_1_wrapper{
  width: 402px !important;
}
.nc-container #nc_2_wrapper, .nc-container.tb-login #nc_2_wrapper{
  width: 402px !important;
}
.nc-container #nc_3_wrapper, .nc-container.tb-login #nc_3_wrapper{
  width: 402px !important;
}
</style>