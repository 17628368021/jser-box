<template>
  <div id="mainTendering">
    <v-header :state="headerState"></v-header>
    <div class="w-container banner m-b20 clearfix">
      <div class="statistics-warpper fl">
        <div class="current-entry">
          <h5 class="title">截止目前共入驻</h5>
          <div class="amount">
            <span class="num" v-for="(item, index) in [4,5,4,1,7]" :key="index">{{item}}</span>家机构
          </div>
        </div>
        <div class="three-notices">
          <div class="notices">招标项目<span>123456</span>个</div>
          <div class="notices">已中标<span>52413</span>个</div>
          <div class="notices">招标公告<span>5984210</span>个</div>
        </div>
      </div>
      <div class="broadcast-warpper fl">
        <el-carousel height="330px">
          <el-carousel-item v-for="(item, index) in recommend" :key="index">
            <!-- <h3>{{ item }}</h3> -->
            <img :src="item.cover" width="740" height="330" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="login-phate-warpper fl">
        <loginPlate></loginPlate>
      </div>
    </div>
    <div class="lately-tendering-warpper w-container m-b20 clearfix">
      <div class="lately-tendering-tab fl">
        <ul class="tabs">
          <div class="logo-head bg fl">
            最新招标
          </div>
          <li v-for="(item, index) in tabs" :key="index" :class="{active:index===tabsNum}" @click="tab(index)">{{item}}</li>
          <li class="more-tender fr">
            <router-link to="/queryPurchase">更多采购</router-link>
          </li>
        </ul>
        <div class="item-box" v-for="(item, index) in tabs" :key="index" v-show="index === tabsNum">
          <el-table
            :data="tabbids"
            style="width: 100%"
            stripe
            row-class-name="col"
            :header-cell-class-name="tableHead">
            <el-table-column
              prop="date"
              label="发布时间"
              width="140">
              <template slot-scope="scope">
                <span>{{scope.row.date}}分钟前</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="项目名称"
              show-overflow-tooltip
              width="320">
              <template slot-scope="scope">
                <router-link :to="{name:'bids',params:{id:scope.row.id}}">{{scope.row.title}}分钟前</router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="DaysRemaining"
              label="投标截止时间"
              width="160">
              <template slot-scope="scope">
                <span>还剩<span style="color:#f70">{{scope.row.DaysRemaining}}</span>天</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="province"
              label="所在地"
              width="140">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span style="color:#3555a9">我要投标</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="lately-plate fl">
        <div class="lately">
          <div class="header clearfix">
            <div class="logo-head fl bg" style="text-indent:0px;">
              最新招标
            </div>
            <div class="more-tender fr">
              <router-link to="/moretender">更多</router-link>
            </div>
          </div>
          <ul class="latest-bidding" v-loading="latelyLoading">
            <router-link :to="{name:'bids',params:{id:'00'}}" v-for="(item, index) in latelyTender" :key="index" tag="li" class="item">
              <span class="address">[{{item.province}}]</span><span class="tit">{{item.title}}</span>
            </router-link>
          </ul>
        </div>
        <div class="download">
          <div class="header clearfix">
            <div class="logo-head fl bg" style="text-indent:0px;">
              招标资料下载
            </div>
            <div class="more-tender fr">
              <router-link to="/moretender">更多</router-link>
            </div>
          </div>
          <ul class="">
            <li v-for="(item, index) in 7" :key="index" class="clearfix">
              <h2 class="fl tit"><router-link to="detailNotice">张家港保税区产业发展与布局规划环评项目招标公告</router-link></h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 
      And then there are some ads that don't exist at all （广告）
    -->
    <div class="marketing-adver w-container clearfix">
      <div><img src="./advertisement-2.png" alt=""></div>
      <div><img src="./advertisement-3.png" alt=""></div>
    </div>
    <!-- 
      Bid publicity   (中标公示)
     -->
     <div class="bid-publicity w-container">
        <div class="bid-publicity-tit clearfix">
          <div class="logo-head bg fl">
            中标公示
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
      <div class="marketing-adver w-container clearfix">
        <div v-for="(item, index) in 7" :key="index" class="ad"><img src="./advertisement-4.png" alt=""></div>
      </div>
      <!-- 
        List of enterprises  企业名录 
       -->
       <div class="list-enterprises w-container clearfix">
         <div class="enterprises fl">
           <div class="header clearfix">
            <div class="logo-head fl bg" style="text-indent:0px;">
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
         <div class="Bidding-method fr">
           <Extensibleplate tit="招投标法" :data="methods"></Extensibleplate>
         </div>
       </div>
  </div>
</template>

<script>
import header from '@/components/herder/header';
import loginPlate from '@/components/loginPlate/loginPlate'
import Extensibleplate from '@/components/Extensibleplate/Extensibleplate'
import enterprisesShow from '@/components/enterprisesShow/enterprisesShow'
import API from '../../api/api.js'
export default {
  data () {
    return {
      headerState: 1,
      tabs: ['招标公告','变更公告','中标结果公告'],
      tabsNum: 0,
      tableData2: [{
        date: '59',
        address: '桐乡市高级中学选修大楼室外附属工程asdasdad...',
        DaysRemaining: 18,
        ad: '湖北襄阳'
      },{
        date: '59',
        address: '桐乡市高级中学选修大楼室外附属工程asdasdad...',
        DaysRemaining: 18,
        ad: '湖北襄阳'
      },{
        date: '59',
        address: '桐乡市高级中学选修大楼室外附属工程asdasdad...',
        DaysRemaining: 18,
        ad: '湖北襄阳'
      },{
        date: '59',
        address: '桐乡市高级中学选修大楼室外附属工程asdasdad...',
        DaysRemaining: 18,
        ad: '湖北襄阳'
      },{
        date: '59',
        address: '桐乡市高级中学选修大楼室外附属工程asdasdad...',
        DaysRemaining: 18,
        ad: '湖北襄阳'
      }],
      latelyTender: [],
      latelyLoading: true,
      bideds: [],
      methods: [],
      types: 0,
      isLoading: true,
      tabbids: [],
      recommend: []
    };
  },
  components: { 'v-header':header, loginPlate, Extensibleplate, enterprisesShow },

  computed: {},

  methods: {
    tab(index){
      this.tabsNum = index;
      let type = 1;
      if (index === 0) {
        type = 1
      }else if(index === 1){
        type = 4
      }else if (index === 2) {
        type = 3
      }
      this.getType(type)
    },
    tableHead() {
      return 'table-Head';
    },
    // 近期招标的获取
    getLatelyData() {
      /* 招标公告/最新招标 */
      API.Biddinginfo(1).then(bid => {
        let {code, data} = bid.data
        if (code === 200) {
          this.latelyTender = data
          this.latelyLoading = false
          // console.log('bid',bid)
        }else {
          this.latelyLoading = true
        }
      })
    },
    // 中标公示
    getBidPub () {
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
    },
    // 招投标法
    getMethods (a) {
      API.ArticleIndex(a).then(request_data =>{
        let { code, data } = request_data
        console.log(request_data)
        if (code === 200) {
          this.methods = data
        }else{
          console.log(`error 获取招标投法失败`)
        }
      })
    },
    // banner 的获取
    getBanner () {
      API.recommond(27).then(res=>{
        let {code, data} = res.data
        if (code === 200) {
          this.recommend = data
        }else {
          console.log('error   中标通知数据获取失败')
        }
      })
    },
    // 根据不同的type类型获取不同的数据
    getType(type) {
      // console.log(type)
      this.isLoading = true
      this.tabbids = []
      API.Biddinginfo(type).then(bid => {
        let {code, data} = bid.data
        if (code === 200) {
          this.isLoading = false
          this.tabbids = data
          // console.log(bid)
        }else {
          this.isLoading = true
          setTimeout(()=>{
            this.isLoading = false
          },2000)
        }
      })
    },
  },
  mounted() {
    this.getLatelyData()
    this.getBidPub()
    this.getMethods(3)
    this.getBanner()

    /*   招标公告/最新招标   */
    API.Biddinginfo(1).then(bid => {
      if (bid.data.code === 200) {
        this.isLoading = false
        this.tabbids = bid.data.data
        // console.log('bid',bid)
      }else {
        this.isLoading = true
      }
    })
  }
}
</script>

<style lang='less'>
  #mainTendering{
    width: 100%;
    background-color: #Fff;
    height: 2000px;
    &>a{
      color: #333;
    }
    .banner{
      margin-top: 20px;
      &>div{
        height: 330px;
        box-sizing: border-box;
        margin-right: 10px;
        &:last-child{
          margin-right: 0;
        }
      }
      .statistics-warpper{
        width: 210px;
        border: 1px solid #e8e8e8;
        .current-entry{
          padding: 30px 18px 25px;
          border-bottom: 1px solid #e8e8e8;
          font-size: 16px;
          color:#000;
          .title{
            text-align: center;
            margin-bottom: 28px;
          }
          .amount{
            font-size: 14px;
            .num{
              display: inline-block;
              width: 20px;
              height: 28px;
              line-height: 28px;
              background-color: #e7e7e7;
              margin-right: 6px;
              text-align: center;
            }
          }
        }
        .three-notices{
          padding: 14px 9px;
          font-size: 16px;
          .notices{
            box-sizing: border-box;
            width: 190px;
            height: 46px;
            line-height: 46px;
            margin-bottom: 18px;
            padding-left: 28px;
            background-color: #f3f3f3;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:last-child{
              margin-bottom: 0px;
            }
            span{
              color: #f70;
            }
          }
        }
      }
      .broadcast-warpper{
        width: 740px;
      }
      .login-phate-warpper{
        width: 230px;
        padding: 18px 10px 0;
      }
    }
    .lately-tendering-warpper{
      &>div{
        box-sizing: border-box;
        height: 730px;
      }
      .lately-tendering-tab{
        width: 870px;
        border: 1px solid #eee;
        margin-right: 10px;
        .tabs{
          border-bottom: 1px solid #e6e6e6;
          font-size: 0px;
          .bg{
            // background-image: url(./lately-tender.png);
            line-height: 55px;
          }
          li{
            display: inline-block;
            width: 104px;
            height: 55px;
            line-height: 49px;
            margin-right: 24px;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            &.active{
              color: #3888EF;
            }
          }
        }
        .item-box{
          .table-Head{
            height: 46px;
            background-color: #e4eaf2;
          }
          .col{
            height: 48px;
          }
        }
      }
      .lately-plate{
        width: 320px;
        &>div{
          box-sizing: border-box;
          padding: 0 8px;
          border: 1px solid #eee;
          overflow: hidden;
        }
        .lately{
          height: 400px;
          margin-bottom: 9px;
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
        .download{
          height: 320px;
          ul{
            padding: 14px 6px 10px 0;
            li{
              position: relative;
              text-indent: 18px;
              height: 32px;
              line-height: 32px;
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
    }
    .Bidding-method{
      width: 272px;
      height: 315px;
      overflow: hidden;
    }
  }
</style>