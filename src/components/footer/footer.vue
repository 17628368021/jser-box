<template>
  <div id="footer">
    <div class="back">
      <div class="w-container copyright-warpper">
        <!-- 底部左侧版权信息 -->
        <div class="copyright-left fl">
          <div class="copyright">
            <p>铁路商城：铁路专用器具平台_100%品质保证，超低折扣，品类齐全，正品行货，全国联保。</p>
            <p>全球领先的铁路专业用品网上购物中心。超过100万种商品在线热销&emsp;Power by<a href="http://tdsc360.com">tdsc360.com</a>&emsp;Copyright©蜀ICP备16032302号-1</p>
            <p>投诉与建议：contact@tdsc360.com&emsp;技术支持：admin@tdsc360.com</p>
          </div>
          <ul class="statement">
            <li><img src="./footer_1.png" width="108" height="40"></li>
            <li><img src="./footer_2.png" width="112" height="40"></li>
            <li><img src="./footer_3.png" width="112" height="40"></li>
            <li><img src="./footer_4.png" width="112" height="40"></li>
            <li><img src="./footer_5.png" width="106" height="40"></li>
          </ul>
        </div>
        <!-- 底部右侧二维码 -->
        <div class="QRcode">
          <div>
            <p>微信公众号</p>
            <img src="./footer_weixin.png" width="114" height="114" alt="">
          </div>
          <div>
            <p>移动端浏览</p>
            <img src='./footer_mobile.png' width="114" height="114" alt="">
          </div>
        </div>
      </div>
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
  #footer{
    width: 100%;
    background: #f2f1f1;
    .back{
      background: #1a1c1e;
      .copyright-warpper{
        padding: 36px 0 20px 0;
        .copyright-left{
          width: 862px;
          .copyright{
            color: #71767d;
            p{
              height: 24px;
              line-height: 24px;
              font-size: 12px;
            }
          }
          .statement{
            margin-top: 32px;
            font-size: 0px;
            li{
              display: inline-block;
              margin-right: 20px;
            }
          }
        }
        .QRcode{
          font-size: 0px;
          div{
            display: inline-block;
            p{
              font-size: 14px;
              color: #fff;
              margin-bottom: 14px;
            }
            width: 114px;
            margin-left: 54px;
          }
        }
      }
    }
  }
</style>