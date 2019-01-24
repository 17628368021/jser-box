<template>
  <div>
    <ul class="enterprises-show-box">
      <li class="enterprises-item" v-for="(item, index) in 6" :key="index">
        <h1 class="company">程力专用汽车股份有限公司<span><i class="icon-vip"></i></span></h1>
        <p class="industry"><span class="head">所属行业：</span>桥梁工程</p>
        <p class="scope-operation"><span class="head">经营范围：</span>抑尘车,垃圾车,吸污车</p>
        <p class="postal-address"><span class="head">通讯地址：</span>湖北省随州市曾都区南郊程力汽车...</p>
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
  .enterprises-show-box{
    font-size: 0px;
    .enterprises-item{
      box-sizing: border-box;
      display: inline-block;
      width: 264px;
      margin-right: 44px;
      margin-bottom: 22px;
      font-size: 12px;
      &:nth-of-type(3n){
        margin-right: 0px;
      }
      .company{
        height: 20px;
        font-size: 16px;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover{
          color: #fb8800;
        }
      }
      .head{
        color: #999;
      }
      .industry,.scope-operation,.postal-address{
        line-height: 20px;
      }
      .scope-operation{

      }
      .postal-address{

      }
    }
  }
</style>