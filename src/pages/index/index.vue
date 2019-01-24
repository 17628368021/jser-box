<template>
  <div id="purchse-index">
    <v-header :state="headerState"></v-header>
    <div class="wholeClassify-warpper">
      <div class="w-container wholeClassify clearfix">
          <ul>
            <h4>招标</h4>
            <li>招标公告</li><li>招标预告</li><li>公告变更</li><li>招标答疑</li><li>招标文件</li><li>资审结果</li>
          </ul>   
          <ul class="supple">
            <h4>中标</h4>
            <li>中标信息</li><li>设计院中标</li><li>总承包中标</li>
          </ul>
          <ul class="supple">
            <h4>采购</h4>
            <li>政府采购</li><li>企业采购</li><li>工程建设</li>
          </ul>
          <ul>
            <h4>资讯</h4>
            <li>行业新闻</li><li>专家观点</li><li>政策法规</li><li>行业聚焦</li><li>资料下载</li><li>行情分析</li><li>项目新闻</li>
          </ul>
          <ul>
            <h4>服务</h4>
            <li>竞争对手监控</li><li>信息定制</li><li>招标代理</li><li>服务列表</li><li>业主监测</li><li>标书服务</li>
          </ul>
      </div>
    </div>
    <!-- 
      Banner and the categorization part that is useless  （Banner&&分类）
    -->
    <div class="banner-warpper w-container clearfix">
      <div class="menu-box fl">
        <div class="menu-item" @mouseover="showSubele(index)" @mouseout="hideSubele" v-for="(item, index) in categroy" :key="index">
          <div class="firstMenu">
            <h1 class="menu-item-title"><span class="bg"></span>{{item.title}}</h1>
            <div class="menu-item-class">
              <router-link to="#" v-for="(subitem,subindex) in item.data" @click.native="dumpQuery(subitem.title, 2)" :key="subindex" v-if="subindex<=3">{{subitem.title}}</router-link>
            </div>
          </div>
          <div class="secondMenu" v-show="menuIsShow === index">
            <div class="inner-box clearfix">
              <div class="single-item fl">
                <h3 class="single-item-title" v-for="(subitem,subindex) in item.data" :key="subindex">{{subitem.title}}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-box fl">
        <div class="broadcast">
          <el-carousel height="330px">
            <el-carousel-item v-for="(item, index) in recommend" :key="index">
              <img :src="item.cover" width="740" height="330" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="zore-divide">
          <p class="zore clearfix" v-for="(item, index) in areas[0]" :key="index">
            <span class="head fl">{{index}}</span>
            <ul class="fl">
              <li class="item" v-for="(country, index) in item" @click="dumpQuery(country, 2)" :key="index">{{country}}</li>
            </ul>
          </p>
        </div>
      </div>
      <div class="logInfo fl">
        <div class="logInfo-state">
          <!-- 登录板块 -->
          <loginPlate></loginPlate>
          <div class="tender-count clearfix">
            <div class="house-icon fl">
              <img src="./house.png" width="36" height="38" alt="">
            </div>
            <div class="hint fl">
              <p>今日发布招标</p>
              <p>{{tenderCount}}条</p>
            </div>
          </div>
        </div>
        <div class="adver">
          <img src="./advertisement-1.png" width="100%" alt="">
        </div>
      </div>
    </div>
    <!-- 
      Part of the main part------推荐招标 
    -->
    <div class="main-content w-container clearfix">
      <!-- 
        recommendation of bidding  （推荐招标） 
      -->
      <div class="selected-bidding w-container clearfix">
        <div class="selected-bidd-left fl">
          <div class="header clearfix">
            <span>最新招标</span>
            <div class="more-tender fr">
              <router-link to="/queryPurchase">更多采购</router-link>
            </div>
          </div>
          <ul class="latest-bidding" v-loading="latelyLoading">
            <router-link :to="{name:'bids',params:{id:item.id}}" v-for="(item, index) in latelyTender" :key="index" tag="li" class="item">
              <span class="address">[{{item.province}}]</span><span class="tit">{{item.title}}</span>
            </router-link>
          </ul>
        </div>
        <div class="selected-bidd-right fr">
          <div class="header clearfix">
            <div class="logo-head fl bg">
              推荐招标
            </div>
            <div class="more-tender fr">
              <router-link to="/moretender">更多</router-link>
            </div>
          </div>
          <ul class="recommend-tender">
            <li class="item clearfix" v-for="(item, index) in recommend" :key="index">
              <span class="tit fl"><router-link :to="{name:'bids',params:{id:item.id}}">{{item.title}}</router-link></span>
              <span class="date fr">{{item.created_at.split(' ')[0]}}</span>
              <span class="tag fl">{{item.categroy}}</span>
              <span class="address fr">{{item.province}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 
        And then there are some ads that don't exist at all （广告）
      -->
      <div class="marketing-adver clearfix">
        <div><img src="./advertisement-2.png" alt=""></div>
        <div><img src="./advertisement-3.png" alt=""></div>
      </div>
      <!-- 
        Bidding information   （招标信息） 
      -->
      <div class="tender-info">
        <tenderIndo @changeType="getType" :isLoading="isLoading" :types='tenderType' :policy="policy" :bids='tabbids'></tenderIndo>
      </div>
      <!-- 
        Electronic bidding process  （ 电子投标流程 ） 
      -->
      <tenderProcess></tenderProcess>
      <!-- 
        Bid publicity               中标公示 
      -->
      <div class="bid-publicity">
        <div class="bid-publicity-tit clearfix">
          <div class="logo-head bg fl">
            中标公示
          </div>
          <div class="more-tender fr">
            <router-link to="/queryPurchase">更多采购</router-link>
          </div>
        </div>
        <ul class="bid-publicity-warpper">
          <li v-for="(bid, index) in bideds" :key="index" class="bid-item">
            <h3 class="tit"><router-link :to="{name:'bids',params:{id:bid.id}}">{{bid.title}}</router-link></h3>
            <p class="code">项目编号：{{bid.number}}</p>
            <p class="company">{{bid.tendering_unit}}</p>
            <span class="bid-logo"></span>
          </li>
        </ul>
      </div>
      <!-- 
        And then there are some ads that don't exist at all （广告）
      -->
      <div class="marketing-adver clearfix">
        <div v-for="(item, index) in 7" :key="index" class="ad"><img src="./advertisement-4.png" alt=""></div>
      </div>
      <!-- 
        List of enterprises  企业名录 
      -->
      <div class="list-enterprises w-container clearfix">
        <div class="enterprises fl">
          <div class="header clearfix">
            <div class="logo-head fl bg">
              企业名录
            </div>
            <div class="more-tender fr">
              <router-link to="/moretender">更多</router-link>
            </div>
          </div>
          <div class="enterprises-show">
            <!-- 企业名录的条目 -->
            <enterprisesShow></enterprisesShow>
          </div>
        </div>
        <div class="download-bid fr">
          <div class="header">
          招标资料下载
          </div>
          <ul class="download-bid-info">
            <li v-for="(item, index) in 7" :key="index" class="clearfix">
              <h2 class="fl tit"><router-link to="detailNotice">张家港保税区产业发展与布局规划环评项目招标公告</router-link></h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 
      Business School     （商学院）
    -->
    <div class="Business">
      <smallbusinessSchool></smallbusinessSchool>
    </div>
    <!-- 
      Three big plates （三大板块） 
    -->
    <div class="threeBigPlates w-container m-b30 clearfix">
      <div class="technology fl">
        <div class="header clearfix">
          <div class="logo-head fl bg">
            技术标准
          </div>
          <div class="more-tender fr">
            <router-link to="/moretender">更多</router-link>
          </div>
        </div>
        <ul class="technology-info" v-if="technology.length>0">
          <li v-for="(item, index) in technology" :key="index" class="clearfix">
            <h2 class="fl tit"><router-link :to="{name:'newsDetail',params:{id:item.id}}">{{item.title}}</router-link></h2>
          </li>
        </ul>
        <div class="not-data" v-else-if="technology.length<=0">
          对不起，暂时没有数据
        </div>
      </div>
      <div class="document fl">
        <div class="header clearfix">
          <div class="logo-head fl bg">
            规范文件
          </div>
          <div class="more-tender fr">
            <router-link to="/moretender">更多</router-link>
          </div>
        </div>
        <ul class="technology-info" v-if="Standard.length>0">
          <li v-for="(item, index) in Standard" :key="index" class="clearfix">
            <h2 class="fl tit"><router-link :to="{name:'newsDetail',params:{id:item.id}}">{{item.title}}</router-link></h2>
          </li>
        </ul>
        <div class="not-data" v-else-if="technology.length<=0">
          对不起，暂时没有数据
        </div>
      </div>
      <div class="bidmethods fl">
        <div class="header clearfix">
          <div class="logo-head fl bg">
            招投方法
          </div>
          <div class="more-tender fr">
            <router-link to="/moretender">更多</router-link>
          </div>
        </div>
        <ul class="technology-info" v-if="method.length>0">
          <li v-for="(item, index) in method" :key="index" class="clearfix">
            <h2 class="fl tit"><router-link :to="{name:'newsDetail',params:{id:item.id}}">{{item.title}}</router-link></h2>
          </li>
        </ul>
        <div class="not-data" v-else-if="technology.length<=0">
          对不起，暂时没有数据
        </div>
      </div>
    </div>
    <!-- 
      And then there are some ads that don't exist at all （广告） 
    -->
    <div class="marketing-adver w-container clearfix">
      <div><img src="./advertisement-5.png" alt=""></div>
      <div><img src="./advertisement-6.png" alt=""></div>
    </div>
    <!-- 
      Industry News  &&  Market trend  &&  Exhibition Preview 
      行业快讯       &&  行情趋势       &&  展会预告
    -->
    <div class="industry-warpper w-container m-b30 clearfix">
      <div class="IndustryNews fl">
        <div class="header clearfix">
          <div class="logo-head fl bg">
            行业快讯
          </div>
          <div class="more-tender fr">
            <router-link to="/moretender">更多</router-link>
          </div>
        </div>
        <div class="content">          
          <div class="desc clearfix">
            <div class="postcard fl">
              <!-- <img src="./v1.png" alt=""> -->
              <img :src="recommondFlash.cover" alt="">
            </div>
            <div class="desc-text fl">
              <h1 class="tit">{{recommondFlash.title}}</h1>
              <p class="text">
                <router-link to="/detailIndustry">
                   {{recommondFlash.keywords}}... 
                   <span>[详细]</span>
                </router-link>
              </p>
            </div>
          </div>
          <ul class="entry">
            <li class="entry-item" v-for="(item, index) in newsflash" :key="index">
              <router-link :to="{name:'newsDetail',params:{id:item.id}}"><span class="tag">[行业]</span>{{item.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="Markettrend  fl">
        <div class="header clearfix">
          <div class="logo-head fl bg">
            行情趋势
          </div>
          <div class="more-tender fr">
            <router-link to="/moretender">更多</router-link>
          </div>
        </div>
        <div class="content">          
          <div class="desc clearfix">
            <div class="postcard fl">
              <img :src="recommondTrend.cover" alt="">
            </div>
            <div class="desc-text fl">
              <h1 class="tit">{{recommondTrend.title}}</h1>
              <p class="text">
                <router-link to="/detailIndustry">
                   {{recommondTrend.keywords}}... 
                   <span>[详细]</span>
                </router-link>
              </p>
            </div>
          </div>
          <ul class="entry">
            <li class="entry-item" v-for="(item, index) in trend" :key="index">
              <router-link :to="{name:'newsDetail',params:{id:item.id}}"><span class="tag">[行业]</span>{{item.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="ExhibitionPreview fl">
        <div class="header clearfix">
          <div class="logo-head fl bg">
            展会预告
          </div>
          <div class="more-tender fr">
            <router-link to="/exhibition">更多</router-link>
          </div>
        </div>
        <div class="content" v-if="exhibition.length>0">
          <div class="postcard">
            <img :src="exhibition[0].cover" alt="">
            <!-- <img src="./v3.png" alt=""> -->
          </div>
          <p class="tit">{{exhibition[0].title}}</p>
          <p class="desc"><router-link :to="{name:'detailsExhibi',params:{id:exhibition[0].correlation_id}}">{{exhibition[0].remarks}}...<span>[详细]</span></router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tenderIndo from '@/components/tenderInfo/tenderInfo';
import header from '@/components/herder/header';
import tenderProcess from '@/components/tenderProcess/tenderProcess';
import singleTender from '@/components/singleTender/singleTender.vue';
import mainTenderList from '../mainTenderList/mainTenderList'
import smallbusinessSchool from '@/components/smallbusinessSchool/smallbusinessSchool'
import loginPlate from '@/components/loginPlate/loginPlate'
import enterprisesShow from '@/components/enterprisesShow/enterprisesShow'
import {RECOMMEND, getDistricts, categroy, recommendIndex} from '../../api/indexReg.js'
import API from '../../api/api.js'
export default {
  data () {
    return {
        headerState: 1,
        latelyTender:[],//最新招标
        latelyLoading: true,
        bideds:[],
        techs:[
          {
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          },{
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          },{
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          },{
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          },{
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          },{
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          },{
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          },{
            tit:'《工程建设项目投标投诉这是个什么鬼啊没意思》机智的一批嘛巴巴试试的写',
            time: '2018-10-20'
          }
        ],
        menuIsShow: -1,
        areas: [],
        recommend: [],
        tenderCount: 1966,
        categroy: [],
        technology: [],
        tabbids:[],
        isLoading: true,
        tenderType: 1,
        policy: [],
        Standard: [],
        method: [],
        newsflash: [],
        trend:[],
        acticleModule: ['policy','technology','Standard','method','newsflash','trend'],
        articleTYPE: [9,5,6,3,1,2],
        exhibition: [],
        recommondFlash: {}, // 推荐行业快讯
        recommondTrend: {} // 推荐行业快讯
    };
  },
  components: {tenderIndo,'v-header':header, tenderProcess, singleTender, mainTenderList, smallbusinessSchool, loginPlate, enterprisesShow},

  computed: {
   
  },
  mounted () {
     /* API.getKEY_serach('化工设备').then(res => {
      console.log(res,'我是获取的key')
    }) */
  },
  methods: {
    // 显示与隐藏
    showSubele(index) {
      this.menuIsShow = index
    },
    hideSubele() {
      this.menuIsShow = -1
    },
    // 根据不同的type类型获取不同的数据
    getType(type) {
      // console.log(type)
      this.isLoading = true
      this.tabbids = []
      API.Biddinginfo(type).then(bid => {
        if (bid.data.code === 200) {
          this.isLoading = false
          this.tabbids = bid.data.data
          this.tenderType = type
          // console.log(bid)
        }else {
          this.isLoading = true
          setTimeout(()=>{
            this.isLoading = false
          },2000)
        }
      })
    },
    dumpQuery (key, type) {
      let data = {
        keyword: key,
        type: type
      }
      this.$router.push({ path: '/queryPurchase', query: data })
    }
  },
  created() {
    /* 行政区域 */
    getDistricts().then(res => {
      // console.log('获取行政区划',res)
      if(res.data.code === 200){
        this.areas = res.data.data;
      }
    })
    /* 菜单分类 */
    categroy().then(categroy => {
      this.categroy = categroy.data.data
    })
    /* 推荐招标 */
    API.recommond(27).then(res=>{
      let {code, data} = res.data
      console.log(data)
      if (code === 200) {
        this.recommend = data
        // console.log('this.recommend', this.recommend)
      }else {
        console.log('error   中标通知数据获取失败')
      }
    })
    /* 行业快讯 */
    API.recommond(28).then(res=>{
      let {code, data} = res.data
      if (code === 200) {
        // console.log(data,'---------------')
        this.recommondFlash = data[0]
        // console.log(this.recommondFlash)
      } else {
        console.log(`error   推荐行业快讯获取失败`)
      }
    })
    /* 行业趋势 */
    API.recommond(29).then(res=>{
      let {code, data} = res.data
      if (code === 200) {
        // console.log(data,'---------------')
        this.recommondTrend = data[0]
        // console.log(this.recommondFlash)
      } else {
        console.log(`error   推荐行业快讯获取失败`)
      }
    })
    /* 展会预告 */
    API.recommond(25).then(res=>{
      let {code, data} = res.data
      console.log('---------------',data)
      if (code === 200) {
        this.exhibition = data  
        // console.log('this.exhibition',this.exhibition)            
      }else{
        console.log('error   展会预告获取失败')
      }
    })
    /*   招标公告/最新招标   */
    API.Biddinginfo(1).then(bid => {
      if (bid.data.code === 200) {
        this.isLoading = false
        this.tabbids = bid.data.data
        this.latelyTender = bid.data.data
        this.latelyLoading = false
        // console.log('bid',bid)
      }else {
        this.isLoading = true
        this.latelyLoading = true
      }
    })
    /* 中标通知 */
    API.Biddinginfo(3).then(bideds => {
      // console.log('bideds',bideds)
      let {code, data} = bideds.data
      if (code === 200) {
        this.bideds = data
        // console.log('this.bideds', this.bideds)
      }else {
        console.log('error   中标通知数据获取失败')
      }
    })
    /* 展会预告 
    API.Exhibition().then( exhibi => {
      // console.log(exhibi)
      if (exhibi.data.code === 200) {
        this.exhibition = exhibi.data.data  
        // console.log('this.exhibition',this.exhibition)            
      }else{
        console.log('error   展会预告获取失败')
      }
    })*/
    /* 
      获取几大板块的数据
      9.法规 5.技术 6.规范文件 3.招投标法 1.行业快讯 2.行情趋势   ↓↓↓↓↓↓↓
    */
    var _that = this
    for(let i=0;i<=this.articleTYPE.length;i++){
      (function(a,plate){
        API.ArticleIndex(a).then(request_data =>{
        let { code, data } = request_data
        // console.log(code, data)
        if (code === 200) {
          _that[plate] = data
          // console.log(plate,'---------------',_that[plate])
        }else{
          _that[plate] = []
          // console.log(plate,'---------------',_that[plate])
        }
      })
      })(this.articleTYPE[i],this.acticleModule[i])
    }
  }
}
</script>

<style lang='less'>
  #purchse-index{
    width: 100%;
    background: #fff;
    &>a{
      color: #333;
    }
    .not-data{
      box-sizing: border-box;
      text-align: center;
      height: 100%;
      line-height: -1;
      padding-top: 23%;
      vertical-align: middle;
    }
    .wholeClassify-warpper{
      background-color: #f5f5f5;
      .wholeClassify{
        padding-top: 24px;
        padding-bottom: 24px;
        font-size: 0px;
        ul{
          box-sizing: border-box;
          font-size: 12px;
          width: 240px;
          float: left;
          &.supple{
            padding: 0 76px;
          }
          h4{
            text-align: center;
            font-size: 14px;
            margin-bottom: 16px;
          }
          li{
            height: 24px;
            display: inline-block;
            line-height: 24px;
            padding: 0 14px;
          }
        }
      }
    }
    .banner-warpper{
      position: relative;
      margin-top: 22px;
      .menu-box{
        position: relative;
        width: 210px;
        box-sizing: border-box;
        margin-right: 10px;
        border: 1px solid #efefef;
        min-height: 480px;
        padding: 16px 0px 6px 0px;
        z-index: 100;
        .menu-item{
          margin-bottom: 8px;
          .firstMenu{
            padding-left: 8px;
            &:hover{
              background-color: #efefef;
            }
            .menu-item-title{
              height: 22px;
              line-height: 22px;
              margin-bottom: 10px;
              font-size: 14px;
              color: #3455aa;
              .bg{
                display: inline-block;
                height: 22px;
                width: 22px;
                background: url(./super-icon.png) center no-repeat;
                background-position: 0 1px;
                margin-right: 10px;
                vertical-align: top;
              }
            }
            .menu-item-class{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &>a{
                font-size: 12px;
                margin-right: 4px;
                color: #999;
                &:hover{
                  color: #000;
                }
              }
            }
          }
          .secondMenu{
            box-sizing: border-box;
            position: absolute;
            width: 430px;
            min-height: 480px;
            background-color: #FDFDFF;
            border: 1px solid #efefef;
            top: -1px;
            left: 209px;
            z-index: 90;
            .inner-box{
              padding: 16px 10px 4px;
              .single-item{
                box-sizing: border-box;
                width: 184px;
                margin-right: 30px;
                margin-bottom: 20px;
                &:nth-of-type(2n){
                  margin-right: 0;
                } 
                .single-item-title{
                  margin-bottom: 12px;
                  font-size: 16px;
                  font-weight: 560;
                  color: #333;
                }
                .single-item-class{
                  font-size: 0px;
                  color: #383838;
                  .item{
                    display: inline-block;
                    line-height: 20px;
                    font-size: 12px;
                    margin-right: 6px;
                  } 
                }
              }
            }
          }
        }
      }
      .banner-box{
        width: 740px;
        box-sizing: border-box;
        margin-right: 10px;
        height: 480px;
        .broadcast{

        }
        .zore-divide{
          box-sizing: border-box;
          height: 150px;
          padding-top: 18px;
          font-size: 0px;
          border-bottom: 1px solid #eee;
          .zore{
            display: inline-block;
            font-size: 14px;
            width: 360px;
            margin-right: 10px;
            margin-bottom: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:last-child{
              margin-bottom: 0px;
            }
            .head{
              display: inline-block;
              width: 42px;
              height: 20px;
              line-height: 20px;
              margin-right: 14px;
              text-align: center;
              border-radius: 3px;
              background-color: #eee;
              font-size: 12px;
            }
            ul{
              font-size: 0px;
              .item{
                display: inline-block;
                line-height: 20px;
                margin-right: 10px;
                font-size: 14px;
                color: #3555a9;
                cursor: pointer;
                transition: all 0.5s;
                &:hover{
                  color: rgb(0, 0, 216);
                }
              }
            }
          }
        }
      }
      .logInfo{
        width: 230px;
        height: 480px;
        box-sizing: border-box;
        padding-top: 14px;
        border: 1px solid #efefef;
        .logInfo-state{
          padding: 0 10px;
          .tender-count{
            margin-left: 30px;
            margin-bottom: 12px;
            .house-icon{
              margin-right: 16px;
            }
            .hint{
              font-size: 12px;
              p{
                &:last-child{
                  margin-top: 6px;
                  font-size: 20px;
                  color: #f70;
                }
              }
            }
          }
        }
      }
    }
    .main-content{
      margin-top: 18px;
      
      .lately-tender{
        margin-bottom: 12px;
        .lately-tender-tit{
           display: flex;
           .line{
              flex:1;
              span{
                position: relative;
                display: block;
                width: 16px;
                top:11px;
                border-bottom: 3px solid #999;
              }
           }
           .text{
              margin: 0 22px;
              height: 26px;
              line-height: 26px;
              text-indent: 31px;
              font-size: 18px;
              font-weight: 700;
              background: url(./lately-tender.png) left no-repeat;
           }
        }
      }
      .selected-bidding{
        margin-bottom: 18px;
        .selected-bidd-left{
          box-sizing: border-box;
          width: 320px;
          height: 400px;
          padding: 0 10px;
          border: 1px solid #eee;
          .latest-bidding{
            padding: 10px 0px;
            overflow: hidden;
            .item{
              height: 34px;
              line-height: 34px;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
              cursor: pointer;
              &:hover{
                color: #f70;
              }
              .address{
                margin-right: 6px;
              }
              .tit{}
            }
          }
        }
        .selected-bidd-right{
          box-sizing: border-box;
          width: 860px;
          height: 400px;
          .bg{
             background-image:url(./tender-info-show.png);
          }
          .recommend-tender{
            padding-top: 10px;
            overflow: hidden;
            font-size: 0px;
            .item{
              display: inline-block;
              width: 394px;
              font-size: 12px;
              margin-right: 70px;
              margin-bottom: 20px;
              &:nth-of-type(2n){
                margin-right: 0px;
              }
              span{
                display: inline-block;
                line-height: 24px;
                vertical-align: middle;
                &.tit{
                  width: 310px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 14px;
                  color: #3555a9;
                  &>a{
                    color: #3555a9;
                  }
                }
                &.date,&.address{
                  font-size: 12px;
                  color: #999;
                }
                &.tag{
                  margin-top: 2px;
                  padding: 0 14px;
                  background-color: #fdeac9;
                  border-radius: 3px;
                  color: #4e3d20;
                  line-height: 20px;
                }
              }
            }
          }
        }
      }
      .marketing-adver{
        margin-bottom: 30px;
        div{
          float: left;
          margin-right: 8px;
          &.ad{
            margin-right: 35px;
          }
          &:last-child{
            margin: 0px;
          }
        }
      }
      .bid-publicity{
         margin-bottom: 32px;
         .bg{
           background-image: url(./bidpublicity.png);
         }
         .bid-publicity-tit{
          padding-left: 4px;
          margin-bottom: 16px;
          line-height: 28px;
        } 
        .bid-publicity-warpper{
          font-size: 0px;
          .bid-item{
            position: relative;
            display: inline-block;
            box-sizing: border-box;
            width: 292px;
            height: 130px;
            padding: 12px;
            margin-right: 10px;
            font-size: 16px;
            background-color: #fff;
            border: 1px solid #e6e6e6;
            &:last-child{
              margin-right: 0px;
            }
            .tit{
              height: 44px;
              line-height: 22px;
              overflow: hidden;
              text-overflow: ellipsis;
              &>a{
                color: #666;
                font-size: 14px;
              }
            }
            .code{
              height: 36px;
              line-height: 36px;
              color: #999999;
              font-size: 13px;
            }
            .company{
              height: 16px;
              line-height: 16px;
              font-size: 14px;
              overflow: hidden;
            }
            .bid-logo{
              display: inline-block;
              position: absolute;
              height: 33px;
              width: 42px;
              background: url(./bided.png) no-repeat;
              right: 70px;
              bottom: 12px;
            }
          }
        }
      }
      .list-enterprises{
        margin-bottom: 30px;
        .enterprises{
          width: 890px;
          height: 315px;
          overflow: hidden;
          .enterprises-show{
            padding-top: 20px;
          }
        }
        .download-bid{
          width: 272px;
          height: 315px;
          background-color: #fff;
          overflow: hidden;
          .download-bid-info{
            padding: 10px 10px;
            li{
              width: 230px;
              height: 34px;
              line-height: 34px;
              font-size: 14px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              list-style: normal;
              .tit{
                width: 274px;
                .address{
                  color: #fb8924;
                  margin-right: 6px;
                }
                &>a{
                  color: #333;
                }
              }
            }
          }
        }
      }
    }
    .threeBigPlates{
      &>div{
        box-sizing: border-box;
        width: 382px;
        height: 278px;
        margin-right: 27px;
        overflow: hidden;
        &:last-child{
          margin-right: 0;
        }
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
      .technology{
        .bg{
          background-image: url(./technology.png);
        }
      }
      .document{
        .bg{
          background-image: url(./Specificationdocument.png);
        }
      }
      .bidmethods{
        .bg{
          background-image: url(./Biddinmethod.png);
        }
      }
    }
    .marketing-adver{
      margin-bottom: 30px;
      div{
        float: left;
        margin-right: 8px;
        &.ad{
          margin-right: 35px;
        }
        &:last-child{
          margin: 0px;
        }
      }
    }
    .industry-warpper{
      &>div{
        box-shadow: border-box;
        width: 410px;
        height: 310px;
        margin-right: 40px;
        overflow: hidden;
        &:last-child{
          margin-right: 0px;
        }
      }
      .IndustryNews,.Markettrend{
        .content{
          padding-top: 20px;
          .desc{
            margin-bottom: 24px;
            .postcard{
              width: 140px;
              height: 92px;
              overflow: hidden;
              margin-right: 15px;
              img{
                width: 100%;
                height: 100%;
                vertical-align: top;
              }
            }
            .desc-text{
              width: 255px;
              .tit{
                height: 26px;
                line-height: 26px;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                margin-bottom: 6px;
              }
              .text{
                text-align: justify;
                line-height: 20px;
                max-height: 60px;
                text-indent: 8px;
                font-size: 12px;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
              }
            }
          }
          .entry{
            .entry-item{
              height: 30px;
              line-height: 30px;
              width: 100%;
              overflow: hidden;
              white-space: normal;  
              text-overflow: ellipsis;
              font-size: 14px;
              color: #666;
              span{
                color: #ff7700;
              }
            }
          }
        }
      }
      .IndustryNews{}
      .Markettrend{}
      .ExhibitionPreview{
        width: 272px;
        .content{
          padding-top: 20px;
          .postcard{
            width: 272px;
            height: 124px;
            overflow: hidden;
            margin-bottom: 20px;
            img{
              width: 272px;
            }
          }
          .tit{
            line-height: 20px;
            margin-bottom: 10px;
            overflow: hidden;
            white-space: normal;  
            text-overflow: ellipsis;
          }
          .desc{
            width: 100%;
            line-height: 20px;
            height: 42px;
            text-indent: 6px;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            &:hover a{
              color: #fd8900;
            }
          }
        }
      }
    }
  }
</style>