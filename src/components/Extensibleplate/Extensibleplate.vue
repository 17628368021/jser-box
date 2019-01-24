<template>
  <div id="Extensibleplate">
    <div class="header clearfix">
      <div class="logo-head fl bg" style="text-indent:0px;">
        {{tit}}
      </div>
      <div class="more-tender fr">
        <router-link to="/moretender">更多</router-link>
      </div>
    </div>
    <ul class="technology-info">
      <li v-for="(item, index) in data" :key="index" class="clearfix">
        <h2 class="fl tit"><router-link :to="{name:'newsDetail',params:{id:item.id}}">{{item.title}}</router-link></h2>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tit: {
      type: String
    },
    data: {
      type : Array,
      default:()=>{
        return [
          {id: 6, title: "招标代理机构中选候选人公示", categroy: "招投标法", created_at: "2018-08-10 12:00:55"},
          {id: 6, title: "招标代理机构中选候选人公示", categroy: "招投标法", created_at: "2018-08-10 12:00:55"},
        ]
      }
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
  #Extensibleplate{
    ul{
      padding: 14px 6px 10px 0;
      li{
        position: relative;
        text-indent: 18px;
        height: 30px;
        line-height: 30px;
        h2{
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &>a{
            color: #333;
            &:hover{
              color:#fd8900;;
            }
          }
        }
        &::before{
          content: ' ';
          font-size: 0px;
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: #d2d2d2;
          top: 12px;
        }
      }
    }
  }
</style>