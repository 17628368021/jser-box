<template>
  <div class="newsDetail">
    <v-header :state="headerState"></v-header>
    <div class="w-container newsDetail-warpper clearfix">
      <div class="newsDetail-left fl"> 
        <div class="crumbs">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="align">
            <el-breadcrumb-item :to="{ name: 'index' }">招标网首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'rulesAregu'}">规章制度</el-breadcrumb-item>
            <el-breadcrumb-item>正文</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content">
          <h1 class="main-title">{{articleInfo.title}}--{{this.$route.params.id}}</h1>
          <p class="annotation">
            <span>时间：{{articleInfo.created_at}}</span>
            <span>发布：{{articleInfo.author}}</span>
          </p>
          <div class="abstract">
              工程建设项目招标投标活动投诉处理办法 (七部委11号令)
          </div>
          <span class="line"></span>
          <div class="article" v-html="articleInfo.contents">
            
          </div>
        </div>
      </div>
      <div class="newsDetail-right fr">
        <singleTender :latelyTender="latelyTender"></singleTender>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../../components/herder/header';
import singleTender from '../../components/singleTender/singleTender.vue';
import API from '../../api/api.js'
export default {
  data () {
    return {
      headerState: 1,
      latelyTender:[
        {
          title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
          itemcode:'JW-45-1820-20',
          existingEntry:140,
          releaseDate:'2018-5-20',
          remainingTime:1
        },{
          title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
          itemcode:'JW-45-1820-20',
          existingEntry:140,
          releaseDate:'2018-5-20',
          remainingTime:1
        },{
          title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
          itemcode:'JW-45-1820-20',
          existingEntry:140,
          releaseDate:'2018-5-20',
          remainingTime:1
        },{
          title:'中铁十八局公司西镇高速公路项目部采购橡胶管、PVC管物品',
          itemcode:'JW-45-1820-20',
          existingEntry:140,
          releaseDate:'2018-5-20',
          remainingTime:1
        }
      ],
      articleInfo: []
    };
  },
  components: { 'v-header':header,singleTender },

  computed: {},

  methods: {},
  mounted() {
    let id = this.$route.params.id;
    API.getDetailArticle(id).then( article => {
      let {code, data} = article.data
      if (code === 200) {
        this.articleInfo = data
        console.log(this.articleInfo,'~~~~~~~')
      } else {
        console.log(`error  id为${id}的文章详情信息获取失败`)
      }
    })
  }
}
</script>

<style lang='less'>
  .newsDetail{
    min-height: 1000px;
    background-color: #f6f6f6;
    padding-bottom: 30px;
    .newsDetail-warpper{
      margin-top: 30px;
      .newsDetail-left{
        position: relative;
        box-sizing: border-box;
        width: 888px;
        min-height: 1800px;
        background-color: #fff;
        padding: 0 26px;
        .line{
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: #ededed;
          left: 0px;
          top: 206px;
        }
        .crumbs{
          padding-left: 20px;
          height: 42px;
          line-height: 42px;
          background-color: #fff;
          border-bottom: 1px solid #eee;
          .align{
            line-height: 42px;
          }
        }
        .content{
          .main-title{
            margin-top: 20px;
            font-size: 24px;
            font-weight: 500;
          }
          .annotation{
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 12px;
            color: #666;
            margin-left: 10px;
            span{
              margin-right: 20px;
            }
          }
          .abstract{
            height: 50px;
            line-height: 50px;
            width: 100%;
            background-color: #f6f6f6;
            font-size: 12px;
            text-indent: 10px;
            margin-bottom:40px; 
          }
          .article{
            font-size: 16px;
            line-height: 30px;
          }
        }
      }
      .newsDetail-right{
        width: 292px;
      }
    }
  }
</style>