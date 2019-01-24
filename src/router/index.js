import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

import Index from '../pages/index/index.vue';
import moretender from '../pages/mainTenderList/mainTenderList.vue';
import Login from '@/components/login/login.vue';
import Register from '@/components/register/register.vue';
import InquiryInfo from '../pages/inquiryInfo/inquiryInfo.vue';
import DetailTender from '../pages/detailTender/detailTender.vue';
import PurchaseInfoQuery from '../pages/purchaseInfoQuery/purchaseInfoQuery.vue';
import TechnologyStand from '../pages/technologyStand/technologyStand.vue';
import RuleAregu from '../pages/rulesAregu/rulesAregu.vue';
import PersonalCenter from '../pages/personalCenter/personalCenter.vue';
import PersonalIndex from '@/components/personalIndex/personalIndex.vue';
import BasicInfo from '@/components/basicInfo/basicInfo.vue';
import AuthenInfo from '@/components/authenInfo/authenInfo.vue';
import ReleaseInfo from '@/components/releaseInfo/releaseInfo.vue';
import InfoList from '@/components/infoList/infoList.vue';
import NewsDetail from '../pages/newsDetail/newsDetail.vue';
import MainTendering from '../pages/MainTendering/mainTendering.vue';
import IntegralMall from '../pages/integralMall/integralMall.vue';
import BusinessSchool from '../pages/businessSchool/businessSchool.vue';
import ConsultingCenter from '../pages/consultingCenter/consultingCenter.vue';
import purchaseList from '@/components/purchaseList/purchaseList.vue';
// import XLSX from '@/components/purchaseList/xlsx.vue';
const Exhibition = resolve => require(['../pages/Exhibition/exhibition.vue'], resolve)
const DetailsExhibi = resolve => require(['../pages/detailsExhibi/detailsExhibi.vue'], resolve)

Vue.use(Router)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path: 'moretender',
        component: moretender
      }
    ]
  },
  {
    path: '/MainTendering',
    name: 'MainTendering',
    component: MainTendering
  },
  {
    path: '/integralMall',
    name: 'integralMall',
    component: IntegralMall
  },
  {
    path: '/businessSchool',
    name: 'businessSchool',
    component: BusinessSchool
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/moretender',
    name: 'moretender',
    component: moretender
  },
  {
    path: '/detailbids/:id',
    name: 'bids',
    component: DetailTender,
    alias: 'bids'
  },
  {
    path: '/queryPurchase',
    name: 'queryPurchase',
    component: PurchaseInfoQuery
  },
  {
    path: '/technicalStandard',
    name: 'technologyStand',
    component: TechnologyStand
  },
  {
    path: '/consultingCenter',
    name: 'ConsultingCenter',
    component: ConsultingCenter
  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    meta: {requireAuth: false,},
    component: PersonalCenter,
    children: [
      {
        path: '',
        name: 'personalIndex',
        meta: {requireAuth: false,},
        component: PersonalIndex
      },
      {
        path: 'basicInfo',
        name: 'basicInfo',
        meta: {requireAuth: false,},
        component: BasicInfo
      },
      {
        path: 'authenInfo',
        name: 'authenInfo',
        meta: {requireAuth: false,},
        component: AuthenInfo
      },
      {
        path: 'releaseInfo',
        name: 'releaseInfo',
        meta: {requireAuth: false,},
        component: ReleaseInfo
      },
      {
        path: 'infoList',
        name: 'infoList',
        meta: {requireAuth: false,},
        component: InfoList
      },
      {
        path: 'inquiryInfo',
        name: 'inquiryInfo',
        meta: {requireAuth: false,},
        component: InquiryInfo
      },
    ]
  },
  {
    path: '/newsDetail/:id',
    name: 'newsDetail',
    component: NewsDetail
  },
  /* {
    path: '/xlsx',
    component: XLSX
  } */
  {
    path: '/exhibition',
    name: 'exhibition',
    component: Exhibition
  },
  {
    path: '/detailsExhibi',
    name: 'detailsExhibi',
    component: DetailsExhibi
  }
]

// 页面刷新时，重新赋值token
if(window.sessionStorage.getItem('token')){
  let USERINFO = JSON.parse(window.sessionStorage.getItem('loginuser'))
  let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
  store.commit( 'login', {token : window.sessionStorage.getItem('token'),userinfo:USERINFO} )
  store.commit( 'saveLogInfo', userInfo )
}

const router = new Router({
  mode: 'history',
  linkActiveClass :'active',
  // linkExactActiveClass: 'current',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else{
    next();
  }
})

export default router;