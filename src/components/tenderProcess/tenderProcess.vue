<template>
  <div class="tender-process clearfix">
        <div class='samll-man fl'>
          <img src="./process.png" alt="">
          <div class="text">
            电子投标流程
          </div>
        </div>
        <ul class="process-item fl">
          <li class="clearfix">
            <div class="step-img fl"><img src="./step1.png" alt=""></div>
            <div class="step-explain fl">
              <h3 class="tit">在线注册</h3>
              <p class="text">免费快速注册，一步到位</p>
            </div>
          </li>
          <li>
            <div class="step-img fl"><img src="./step2.png" alt=""></div>
            <div class="step-explain fl">
              <h3 class="tit">在线报价</h3>
              <p class="text">找到需报名的公告，提交报价清单</p>
            </div>
          </li>
          <li>
            <div class="step-img fl"><img src="./step3.png" alt=""></div>
            <div class="step-explain fl">
              <h3 class="tit">线上投标</h3>
              <p class="text">下载招标信息，实现远程在线投递标书</p>
            </div>
          </li>
          <li>
            <div class="step-img fl"><img src="./step4.png" alt=""></div>
            <div class="step-explain fl">
              <h3 class="tit">开标</h3>
              <p class="text">支持远程异地开标，开标现场实时观看</p>
            </div>
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

  computed: {},

  methods: {}
}
</script>

<style lang='less'>
  .tender-process{
    padding: 12px 0;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    margin-bottom: 32px;
    .samll-man{
      padding: 24px 16px 24px 44px;
      border-right: 1px solid #e6e6e6;
      img{
        width: 64px;
        height: 64px;
        vertical-align: top;
      }
      .text{
        display: inline-block;
        margin-top: 10px;
        width: 60px;
        margin-left: 10px;
        font-size: 20px;
        color: #333;
      }
    }
    .process-item{
      margin-left: 34px;
      padding: 24px 0;
      font-size: 0px;
      li{
        display: inline-block;
        margin-right: 42px;
        .step-img{
          width: 64px;
          height: 64px;
          line-height: 64px;
          text-align: center;
          background-color: #f4f4f4;
          border-radius: 50%;
          img{
            vertical-align: middle;
          }
        }
        .step-explain{
          margin-left: 12px;
          .tit{
            margin-bottom: 8px;
            font-size: 18px;
            color: #333;
          }
          .text{
            width: 120px;
            height: 40px;
            line-height: 20px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
</style>