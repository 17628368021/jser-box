<template>
  <div class="businessSchool">
    <div class="head"><img src="./Bachelorhat.png" alt=""><span>商学院</span></div>
    <div class="w-container content">
      <ul class="business">
        <li class="Subject">
          <div class="show"><img src="./business-i1.png" width="100%" height="auto" alt="">
            <span>赚钱的商铺<br>这些都少不了</span>
          </div>
          <div class="describe clearfix">
            <span class="fl">
              讲师：张三飞
            </span>
            <span class="fr playback">
              <img src="./Playback.png" width="100%" alt="">
              <span>9660</span>
            </span>
          </div>
        </li>
        <li class="Subject">
          <div class="show"><img src="./business-i2.png" width="100%" height="auto" alt="">
            <!-- <span>新手如何通过活动获取流量</span> -->
          </div>
          <div class="describe clearfix">
            <span class="fl">
              讲师：张三飞
            </span>
            <span class="fr playback">
              <img src="./Playback.png" width="100%" alt="">
              <span>9660</span>
            </span>
          </div>
        </li>
        <li class="Subject">
          <div class="show"><img src="./business-i3.png" width="100%" height="auto" alt="">
            <!-- <span>玩法介绍</span> -->
          </div>
          <div class="describe clearfix">
            <span class="fl">
              讲师：张三飞
            </span>
            <span class="fr playback">
              <img src="./Playback.png" width="100%" alt="">
              <span>9660</span>
            </span>
          </div>
        </li>
        <li class="Subject">
          <div class="show"><img src="./business-i4.png" width="100%" height="auto" alt="">
            <!-- <span>做好客户售后<br>提升销售转化</span> -->
          </div>
          <div class="describe clearfix">
            <span class="fl">
              讲师：张三飞
            </span>
            <span class="fr playback">
              <img src="./Playback.png" width="100%" alt="">
              <span>9660</span>
            </span>
          </div>
        </li>
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

  computed: {},

  methods: {}
}
</script>

<style lang='less'>
  .businessSchool{
    height: 540px;
    background: url(./businessBG.png) no-repeat center;
    background-position: 100%;
    position: relative;
    margin-bottom: 20px;
    .head{
      position: absolute;
      top: 70px;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 34px;
      font-size: 30px;
      color: #fff;
      img{
        vertical-align: top;
        margin-right: 8px;
      }
    }
    .content{
      height: inherit;
      .business{
        position: relative;
        top: 176px;
        font-size: 0px;
        .Subject{
          display: inline-block;
          width: 280px;
          height: 250px;
          margin-right: 26px;
          border-radius: 6px;
          font-size: 14px;
          overflow: hidden;
          transition: all 0.5s;
          &:hover{
            box-shadow: 0px 8px 16px 0 rgba(255, 255, 255, 0.2);
          }
          &:last-child{
            margin-right: 0px;
          }
          .show{
            width: 100%;
            height: 190px;
            position: relative;
            span{
              position: absolute;
              width: 130px;
              top: 40px;
              left: 20px;
              line-height: 24px;
              font-size: 18px;
              font-weight: 600;
              color: #fff;
            }
          }
          .describe{
            box-sizing: border-box;
            height: 60px;
            padding: 22px 16px 0;
            background-color: #fff;
            .playback{
              img{
                vertical-align: top;
                width: 28px;
                height: 16px;
                margin-right: 4px;
              }
              color: #fd8900;
            }
          }
        }
      }
    }
  }
</style>