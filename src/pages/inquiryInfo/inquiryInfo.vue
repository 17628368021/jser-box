<template>
  <div id="inquiry">
    <!-- <v-header></v-header> -->
    <div class="">
      <h1 class="titHead">请填写您的需求</h1>
      <div class="inquiry-container">
        <ul class="tabs">
          <li v-for="(tab, index) in pitabs" class="tab" :class="{active:index===pitabsNum}" :key="index" @click="tabs(index,tab.component)">{{tab.tit}}</li>
        </ul>
        <transition name="">
          <keep-alive>
            <component :is="comp"></component>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/herder/header";
import PurchaseList from "@/components//purchaseList/purchaseList"
import WholePurchase from "@/components//wholePurchase/wholePurchase"
export default {
  data () {
    return {
      pitabs: [{tit:'采购清单询价',component:'PurchaseList'},{tit:'整体采购询价',component:'wholePurchase'}],
      pitabsNum:0,
      comp:'PurchaseList',
      fs: ''
    }
  },
  components: { "v-header": header, PurchaseList, WholePurchase},

  computed: {},

  methods: {
     tabs(index,com) {
      this.pitabsNum = index;
      this.comp = com;
    }
  }
}
</script>

<style lang='less'>
  #inquiry{
    min-height: 500px;
    background-color: #fff;
    padding: 0 10px;
    padding-bottom: 30px;
    .titHead{
      padding: 30px 0 20px;
      font-size: 18px;
    }
    .inquiry-container{
      .tabs{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        .tab{
          width: 532px;
          height: 40px;
          line-height: 40px;
          background: #F2F1F1;
          font-size: 18px;
          color: #666;
          border-radius: 4px; 
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          &.active{
            position: relative;
            background: #2C81EF;
            color: #fff;
            &::after{
              position: absolute;
              border: 10px solid transparent;
              border-top-color:#2C81EF; 
              content: " ";
              left: 50%;
              bottom: -20px;
            }
          }
        }
      }
    }
  }
</style>