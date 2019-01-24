<template>
  <div id="ex">
    <v-hearder :state="headerState"></v-hearder>
    <!-- banner -->
    <div class="banner"></div>
    <div class="main-content w-container clearfix">
      <!-- Brand exhibition (品牌展会) -->
      <div class="brand-ex common-ex">
        <div class="brand-ex-head common-head m-b30">
          <div class="line"></div>
          <div class="title">品牌展会</div>
          <div class="line"></div>
        </div>
        <div class="brand-ex-warpper common-ex-warpper clearfix">
          <div class="brand-ex-warpper-left common-ex-warpper-left fl">
            <div class="brand-left-tabs common-tabs clearfix">
              <ul class="tabs-box fl">
                <li v-for="(item, index) in tabsItem" :class="{active:index===tabsNum}" @click="tab(index,item)" class="tabs-item" :key="index">{{item}}</li>
              </ul>
              <div class="more-tender fr">
                <router-link to="/queryPurchase">更多采购</router-link>
              </div>
            </div>
            <div :class="item" class="all-left-common" v-for="(item, index) in tabsContainer" v-if="index === tabsNum" :key="index">
              <div class="common-ex-item" v-for="(item, index) in recommendExhibi" :key="index">
                <div class="common-ex-item-img">
                  <img :src="item.cover" width="100%" alt="">
                </div>
                <div class="common-ex-item-info">
                  <h4 class="title">{{item.title}}</h4>
                  <p class="clearfix states"><span class="fl">还剩<em class="day">15</em>天</span><span class="fr">1960人围观</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="brand-ex-warpper-right common-ex-warpper-right fr">
            <div class="ex-notice">
              <Extensibleplate tit="展会公告"></Extensibleplate>              
            </div>
            <div class="Information-nav">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  资讯导航
                </div>
                <div class="more-tender fr">
                  <router-link to="/moretender">更多</router-link>
                </div>
              </div>
              <ul class="navs">
                <li v-for="(item, index) in 12" :key="index">展会动态</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- china exhibition  (中国展会) -->
      <div class="china-ex common-ex">
        <div class="china-ex-head common-head m-b30">
          <div class="line"></div>
          <div class="title china-title">中国展会</div>
          <div class="line"></div>
        </div>
        <div class="china-ex-warpper clearfix">
          <div class="china-ex-warpper-left common-ex-warpper-left fl">
            <div class="china-left-tabs common-tabs clearfix">
              <ul class="tabs-box fl">
                <li v-for="(item, index) in chinaTabsItem" :class="{active:index===chinaTabsNum}" @click="chinatab(index,item)" class="tabs-item" :key="index">{{item}}</li>
              </ul>
              <div class="more-tender fr">
                <router-link to="/queryPurchase">更多采购</router-link>
              </div>
            </div>
            <div :class="item" class="all-left-common" v-for="(item, index) in chinatabsContainer" v-if="index === tabsNum" :key="index">
              <div class="common-ex-item" v-for="(item, index) in recommendExhibi" :key="index">
                <div class="common-ex-item-img">
                  <img :src="item.cover" width="100%" alt="">
                </div>
                <div class="common-ex-item-info">
                  <h4 class="title">{{item.title}}</h4>
                  <p class="clearfix states"><span class="fl">还剩<em class="day">15</em>天</span><span class="fr">1960人围观</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="china-ex-warpper-right common-ex-warpper-right fr">
            <div class="ex-notice">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  按区域找展会
                </div>
                <div class="more-tender fr">
                  <router-link to="/moretender">更多</router-link>
                </div>
              </div>
              <ul class="area">
                <li v-for="(item, index) in area" :key="index">{{item.name}}</li>
              </ul>
            </div>
            <div class="Information-nav">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  资讯导航
                </div>
                <div class="more-tender fr">
                  <router-link to="/moretender">更多</router-link>
                </div>
              </div>
              <ul class="navs">
                <li v-for="(item, index) in 12" :key="index">一月</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Service Alliance  (展会服务商联盟) -->
      <div class="service-alli common-ex clearfix">
        <div class="common-head m-b30 ser-tit">
          <div class="line"></div>
          <div class="title serviceTit">展会服务商联盟</div>
          <div class="line"></div>
        </div>
        <div class="service-alli-warpper common-ex-warpper clearfix">
          <div class="service-alli-warpper-left common-ex-warpper-left fl">
            <div class="common-tabs clearfix">
              <ul class="tabs-box fl">
                <li v-for="(item, index) in serTabsItem" :class="{active:index===serTabsNum}" @click="sertab(index,item)" class="tabs-item" :key="index">{{item}}</li>
              </ul>
              <div class="more-tender fr">
                <router-link to="/queryPurchase">更多采购</router-link>
              </div>
            </div>
            <div :class="item" class="all-left-common" v-for="(item, index) in serTabsContainer" v-if="index === serTabsNum" :key="index">
              <div class="common-ex-item" v-for="(item, index) in 8" :key="index">
                <div class="common-ex-item-img">
                  <img src="./station.png" width="100%" alt="">
                </div>
                <div class="common-ex-item-info">
                  <h4 class="title">2018盟享加中国特许加盟展(北京、上海、广州、南京、武汉)</h4>
                  <p class="clearfix states"><span class="fl">点击合作</span><span class="fr">1960人围观</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="service-alli-warpper-right fr">
            <div class="survey m-b20">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  联盟概况
                </div>
              </div>
              <ul class="survey-Tab">
                <li class="items">会展企业入驻</li>
                <li class="items">企业推广</li>
                <li class="items">会展服务商招标公告</li>
              </ul>
            </div>
            <div class="accession m-b20">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  最新加入
                </div>
              </div>
              <ul class="accession-tab">
                <li class="items">上海豪威展览服务有限公司</li>
                <li class="items">上海百贸展览有限公司</li>
                <li class="items">上海烜燊展览服务有限公司</li>
                <li class="items">上海敖广展览策划有限公司</li>
              </ul>
            </div>
            <div class="information">
              <div class="header clearfix">
                <div class="logo-head fl bg" style="text-indent:0px;">
                  联盟资讯
                </div>
              </div>
              <ul class="info-tab">
                <li class="items">南京会展经济研究会 致力发挥“智囊”作用</li>
                <li class="items">张庆瑄新当选为南京市会展行业协会第二届...</li>
                <li class="items">科隆展览官方对外声明</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Latest announcement (最新公布) -->
      <div class="Latest-ann">
        <div class="Latest-ann-head common-head m-b30">
          <div class="line"></div>
          <div class="title Latest-title">中国展会</div>
          <div class="line"></div>
        </div>
        <div class="Latest-ann-warpper">
          <div class="china-left-tabs common-tabs clearfix">
            <ul class="tabs-box fl">
              <li v-for="(item, index) in chinaTabsItem" :class="{active:index===chinaTabsNum}" @click="chinatab(index,item)" class="tabs-item" :key="index">{{item}}</li>
            </ul>
            <div class="more-tender fr">
              <router-link to="/queryPurchase">更多采购</router-link>
            </div>
          </div>
          <div class="all-latest-content">
            <div class="content-item" v-for="(item, index) in 8" :key="index">
              <h3 class="title">2019中国(雄安)城市给排水与处理技术装备博览会</h3>
              <p>开幕时间：<span>2019-04-10</span></p>
              <p>结束时间：<span>2019-04-12</span></p>
            </div>
          </div>
        </div>
      </div>
      <!--  Exhibitors （参展企业） -->
      <div class="exhibitors">
        <div class="header clearfix">
          <div class="logo-head fl bg">
            展会预告
          </div>
          <div class="more-tender fr">
            <router-link to="/moretender">更多</router-link>
          </div>
        </div>
        <ul class="exhibitors-content">
          <li v-for="(item, index) in 18" class="content-item" :key="index">
            <img src="./adver.png" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import header from '@/components/herder/header';
import Extensibleplate from '@/components/Extensibleplate/Extensibleplate'
import API from '../../api/api.js'
// import EnterprisesShow from '../../components/enterprisesShow/enterprisesShow'
export default {
  data () {
    return {
      headerState: 1,
      tabsItem: [ '推荐最具参展价值的展会',
      //  '展会认证说明', '展台搭建申请', '参展顾问服务'
      ],
      tabsContainer: ['recommend', 
      // 'explain', 'replay', 'adviser'
      ],
      chinaTabsItem: ['行业展会', 
      // '机械', '电子', '纺织', '通信', '汽车', '家居', '环保', '工艺', '房产', '旅游'
      ],
      chinatabsContainer:['industry-ex', 
      // 'mechanics', 'electronics', 'spin', 'signal-comm', 'car', 'Home-Furn', 'environmental','Technology','House-prop', 'Travel'
      ],
      serTabsItem:['服务商导航', 
      // '展览搭建', '会展主办', '海外组展', '展具租赁', '交通物流', '综合服务'
      ],
      serTabsContainer:['server-nav', 
      // 'exhi-bulid', 'Host', 'overseas', 'lease', 'logistics', 'comprehensive'
      ],
      tabsNum: 0,
      chinaTabsNum: 0,
      serTabsNum: 0,
      area: [],
      recommendExhibi: []
    };
  },
  components: {'v-hearder':header, Extensibleplate},

  computed: {},

  methods: {
    tab(index, item) {
       this.tabsNum = index
    },
    chinatab(index) {
      this.chinaTabsNum = index
    },
    sertab(index) {
      this.serTabsNum = index
    },
    getCity() {
      API.getCitys().then(res => {
        let {code, data} = res.data
        if (code === 200) {
          this.area = data
          
        }
      })
    },
    /* getExhibition() {
      API.Exhibition().then((res)=> {
        // console.log(res)
        let {code, data} = res.data
        if (code === 200) {
          this.recommendExhibi = data
          console.log(this.recommendExhibi)
        }else {
          console.log(`error 错误获取推荐展会`)
        }
      })
    }, */
    getRecommExhibition() {
      /* 展会预告 */
      API.recommond(25).then(res=>{
        let {code, data} = res.data
        console.log('---------------',data)
        if (code === 200) {
          this.recommendExhibi = data
          console.log('this.recommendExhibi',this.recommendExhibi)
        }else{
          console.log('error   展会预告获取失败')
        }
      })
    }
  },
  created() {
    this.getCity()
    this.getRecommExhibition()
  }
}
</script>

<style lang='less'>
#ex{
  width: 100%;
  background: #fff;
  .common-head{
    display: flex;
    .line{
      flex: 1;
      height: 1px;
      border-bottom: 1px dashed #bfbebe;
      margin-top: 11px;
    }
    .title{
      box-sizing: border-box;
      // flex: 0 0 200px;
      height: 24px;
      line-height: 24px;
      background: url(./brand.png) no-repeat;
      padding: 0 38px;
      background-position: 38px 0px;
      text-indent: 40px;
      font-size: 20px;
    }
  }
  .common-tabs{
    padding-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 20px;
    .tabs-box{
      font-size: 0px;
      .tabs-item{
        display: inline-block;
        font-size: 16px;
        margin-right: 30px;
        cursor: pointer;
        &.active{
          color: #2c81ef;
        }
        &:nth-last-child(1){
          margin-right: 0px;
        }
      }
    }
  }
  .all-left-common{
    .common-ex-item{
      box-sizing: border-box;
      display: inline-block;
      width: 200px;
      height: 234px;
      overflow: hidden;
      transition: all 0.5s;
      margin-right: 20px;
      margin-bottom: 12px;
      border-radius: 4px;
      &:nth-of-type(4n){
        margin-right: 0px;
      }
      &:hover{
        box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.2)
      }
      .common-ex-item-img{
        margin-bottom: 10px;
        width: 200px;
        height: 124px;
      }
      .common-ex-item-info{
        padding: 0 5px;
        font-size: 14px;
        .title{
          color: #333;
          line-height: 24px;
          height: 48px;
          margin-bottom: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .states{
          color: #666;
          line-height: 18px;
          .day{
            font-size: 18px;
            color: rgb(216, 79, 79);
          }
        }
      }
    }
  }
  .banner{
    height: 400px;
    background: url(./banner.png) left no-repeat;
    background-size: 100% 100%; 
    margin-bottom: 50px;
  }
  .main-content{
    .common-ex{
      margin-bottom: 50px;
      .brand-ex-head{}
      .china-ex-warpper,.common-ex-warpper{
        &>div{box-sizing: border-box;}
        .common-ex-warpper-left{
          width: 860px;   
          height: 545px;       
          overflow: hidden;
        }
        .common-ex-warpper-right{
          width: 320px;
          height: 545px;
          overflow: hidden;
          .ex-notice{
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            height: 332px;
            padding: 0 10px;
            margin-bottom: 20px;
            border: 1px solid #eee;
          }
          .Information-nav{
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            height: 190px;
            padding: 0 10px;
            border: 1px solid #eee;
            .navs{
              padding-top: 24px;
              color: #333;
              font-size: 0px;
              li{
                margin-right: 24px;
                margin-bottom: 20px;
                display: inline-block;
                font-size: 14px;
                cursor: pointer;
                &:nth-of-type(4n){
                  margin-right: 0;
                }
                &:hover{
                  color: #fd8f0f;
                }
              }
            }
          }
        }
      }
    }
    .china-ex{
      .china-ex-head{
        .china-title{
          background-image: url(./china_exhibition.png);
        }
      }
      .china-ex-warpper{
        .china-ex-warpper-left{}
        .china-ex-warpper-right{
          .area{
            color: #333;
            font-size: 0px;
            padding: 24px 6px 0px;
            li{
              display: inline-block;
              width: 57px;
              line-height: 35px;
              font-size: 14px;
              cursor: pointer;
              color: #2656ae;
              &:hover{
                color: #fd8f0f;
              }
            }
          }
          .navs{
            padding: 24px 17px 0px;
            li{
              width: 66px;
              margin: 0px !important;
              line-height: 34px;
              text-align: justify;
            }
          }
        }
      }
    }
    .service-alli{
      .serviceTit{
        background-image: url(./server.png);
      }
      .service-alli-warpper{
        .service-alli-warpper-right{
          width: 320px;
          &>div{
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            padding: 0 10px;
            border: 1px solid #eee;
          }
          .survey{
            height: 132px;
            .survey-Tab{
              padding: 10px 10px 0;
              font-size: 0px;
              .items{
                display: inline-block;
                line-height: 28px;
                margin-right: 45px;
                font-size: 14px;
                cursor: pointer;
                &:hover{
                  color: #fd8f0f;
                }
              }
            }
          }
          .accession,.information{
            height: 200px;
            .accession-tab,.info-tab{
              padding: 10px 10px 0;
              font-size: 0px;
              .items{
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                cursor: pointer;
                &:hover{
                  color: #fd8f0f;
                }
              }
            }
          }
          .information{
            height: 172px;
          }
        }
      }
    }
    .Latest-ann{
      .Latest-ann-head{
        .Latest-title{
          background-image: url(./lately.png);
        }
      }
      .Latest-ann-warpper{
        .all-latest-content{
          .content-item{
            display: inline-block;
            width: 248px;
            margin-right: 60px;
            margin-bottom: 25px;
            &:nth-of-type(4n) {
              margin-right: 0px;
            }
            .title{
              height: 56px;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 16px;
              cursor: pointer;
              &:hover{
                color: #fd8f0f;
              }
            }
            p{
              line-height: 24px;
              color: #999;
              font-size: 12px;
              span{
                color: #666;
              }
            }
          }
        }
      }
    }
    .exhibitors{
      .bg{
        background-image: url(./enterprise.png);
      }
      .exhibitors-content{
        padding: 40px 26px 0px;
        font-size: 0px;
        .content-item{
          width: 139px;
          margin-right:62px ;
          margin-bottom: 45px;
          display: inline-block;
          &:nth-of-type(6n){
            margin-right: 0px;
          }
        }
      }
    }
  }
}
</style>