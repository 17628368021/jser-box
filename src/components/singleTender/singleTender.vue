<template>
  <div class="lately-tender">
    <ul class="lately-tender-warpper">
      <li class="item" v-for="(item,index) in latelyTender" :key="index">
        <h1 class="title"><router-link :to="{name:'bids',params:{id:item.id}}">{{item.title}}</router-link></h1>
        <p class="itemcode"><span>项目编号:</span>{{item.number}}</p>
        <p class="existingEntry"><span class="head">已有报价:</span>{{item.existingEntry}}条</p>
        <p class="releaseDate"><span class="head">发布时间:</span>{{item.created_at}}</p>
        <p class="remainingTime"><span class="head">剩余时间:</span><em>{{item.day}}</em>天</p>
        <div class="offer">
          <router-link to="/offer">立即报价</router-link>
        </div>
        <span class="hot" v-show="false"><img src="./hot.png" /></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    latelyTender:{
      type: Array
    }
  },
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
  .lately-tender-warpper{
    margin: 0px 0;
    font-size: 0;
    .item{
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: 292px;
      height: 200px;
      padding: 7px;
      border: 1px solid #e4e4e4;
      font-size: 14px;
      margin: 0 10px 10px 0;
      background: #fff;
      box-shadow: 0 4px 8px 0 rgba(7,17,27,.05);
      transition: all 0.3s;
      &:nth-last-of-type(4n+1){
        margin-right: 0px;
      }
      .title{
        margin-top: 4px;
        height: 48px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        &>a{
          color: #333;
        }
      }
      .itemcode{
        margin-top: 8px;
        height: 24px;
        line-height: 24px;
        padding-bottom: 7px;
        border-bottom: 1px solid #e9e9e9;
        font-size: 12px;
      }
      .existingEntry{
        margin-top: 12px;
      }
      p{
        line-height: 24px;
        .head{
          color: #b6b6b6;
        }
        em{
          font-style:normal;
          color: #fb8924;
        }
      }
      .offer{
        display: none;
        position: absolute;
        width: 100%;
        bottom: -60px;
        left: -1px;
        text-align: center;
        background: #fff;
        border: 1px solid #e6e6e6;
        border-top: none; 
        z-index: 60;
        transition: all 0.3s;
        box-shadow: 0 4px 8px 0 rgba(7,17,27,.05);
        &>a{
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          padding: 20px 100px;
          font-size: 18px;
          color: #3888ef;
          
        }
      }
      &:hover{
        box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
      }
      &:hover .offer{
        display: block;
        box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
      }
      .hot{
        position: absolute;
        top: -13px;
        right: -2px;
      }
    }
  }
</style>
