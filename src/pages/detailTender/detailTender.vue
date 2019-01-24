<template>
  <div class="detailTender">
    <!-- 头部 -->
    <v-header :state="headerState"></v-header>
    <!-- 主要内容 -->
    <div class="w-container detailTender-warpper clearfix">
      <!-- 左边 -->
      <div class="detailTender-left fl">
        <!-- <el-button type="primary" class="offer" plain>立即报价</el-button> -->
        <h1 class="head-tlt">
          {{detailInfo.title}}
        </h1>
        <div class="details">
          <p class="term">
            <span class="title">询价单编号：</span>
            <span>{{detailInfo.number}}</span>
          </p>
          <p class="term">
            <span class="title">询价时间：</span>
            <span>{{detailInfo.start_time}}</span>
          </p>
          <p class="term">
            <span class="title">报价截止日期：</span>
            <span>{{detailInfo.end_time}}</span>
          </p>
          <p class="term">
            <span class="title">招标类型：</span>
            <span>{{detailInfo.categroy}}</span>
          </p>
          <p class="term">
            <span class="title">招标性质：</span>
            <span>{{detailInfo.bids_type}}</span>
          </p>
          <p class="term">
            <span class="title">期望收货日期： </span>
            <span>{{detailInfo.created_at}}</span>
          </p>
          <!-- <p class="term">
            <span class="title">交货期：</span>
            <span>{{detailInfo.deliveryTime}}</span>
          </p> -->
          <p class="term">
            <span class="title">联系人：</span>
            <span v-html="detailInfo.contacts"></span>
            <!-- <span v-if="loginstate">***<span style="color:#fb8924;">登录后可见</span></span> -->
          </p>
          <p class="term">
            <span class="title">联系电话：</span>
            <span v-html="detailInfo.mobile"></span>
          </p>

        </div>
        <div class="line"></div>
        <div class="article" v-html="detailInfo.contents">
        </div>
      </div>
      <!-- 右边 -->
      <div class="detailTender-right fr">
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
      latelyTender:[],
      detailInfo: {},
      loginstate: true,
      receivedCount: 11
    };
  },
  components: { 'v-header':header,singleTender },

  computed: {
    isLogin () {
      if (this.$store.state.token) {
        return true
      } else {
        return false
      }
    }
  },
  updated(){
    // this.getDETAIL()
  },
  mounted() {
    // this.getDETAIL()
  },
  methods: {
    getDETAIL() {
      let id = this.$route.params.id
      API.getDetailBids(id).then( detail => {
        let {code, data} = detail.data
        if (code === 200) {
          this.detailInfo = data
          console.log(this.detailInfo,'~~~~~~~')
        } else {
          console.log(`error  id为${id}的招标详情信息获取失败`)
        }
      })
    }
  },
  created() {
    this.getDETAIL()
    // 右侧招标信息
    API.getTenderData().then( tender => {
      console.log('右侧信息', tender)
      let {code, data} = tender.data
      if (code === 200) {
        this.latelyTender = data
      } else {
        console.log(`error 获取右侧信息失败`)
      }
    })
  }
}
</script>

<style lang='less'>
 .detailTender{
  min-height: 1000px;
  background-color: #f6f6f6;
  padding-bottom: 30px;
  .detailTender-warpper{
    margin-top: 30px;
    .detailTender-left{
      position: relative;
      width: 888px;
      box-sizing: border-box;
      padding: 0 30px;
      background-color: #fff;
      box-shadow: 1px 5px 11px rgba(0, 0, 0, 0.1);
      .line{
        height: 1px;
        contain: '';
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
      }
      .article{
        font-size: 16px;
        line-height: 30px;
      }
      .offer{
        position: absolute;
        top: 178px;
        right: 30px;
      }
      .head-tlt{
        height: 30px;
        line-height: 30px;
        margin: 24px 0 30px 0;
        font-size: 22px;
        font-weight: 500;
        text-indent: 12px;
        border-left: 5px solid #2c81ef;
      }
      .details{
        margin-bottom: 32px;
        font-size: 14px;
        .term{
          height: 32px;
          line-height: 32px;
          .title{
            display: inline-block;
            width: 120px;
            text-align: left;
          }
        }
      }
      .not-log{
        text-align: center;
        line-height: 150px;
        color: #666;
        .lock{
          display: inline-block;
          vertical-align: top;
        }
      }
    }
    .detailTender-right{
      width: 292px;
      box-sizing: border-box;
    }
  }
 }

</style>