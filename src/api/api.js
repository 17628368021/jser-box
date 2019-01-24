import axios from 'axios';
var qs = require('qs');
let baseUrl_line = 'http://api.tdsc360.com/webapi'
let baseUrl_down = 'http://api.com/webapi'
var API = {
  recommond: (id) => axios.get(`${baseUrl_line}/recommend/${id}`),    // 获取推荐招标信息
  Biddinginfo: (type) => axios.get(`${baseUrl_line}/bids/list/${type}`),  // 获取首页招标信息
  Exhibition: () => axios.get(`${baseUrl_line}/common/exhibition`),  // 获取展会预告
  ArticleIndex: (id) => {
    return axios({
      method: 'get',
      url: `http://api.tdsc360.com/webapi/article/list/${id}`,
      transformRequest: [function (data) {
        return data;
      }],
      headers: {
        'Content-Type' : 'application/json'
      },
    }).then(res => res.data);
  },                                                                                     // 获取首页文章的接口
  getDetailBids: (id) => axios.get(`${baseUrl_line}/bids/detail/${id}`),   // 获取招标详情
  getDetailArticle: (id) => axios.get(`${baseUrl_line}/article/detail/${id}`), // 获取文章详情
  getTenderData: () => axios.get(`${baseUrl_line}/bids/expire`),     // 招标详情页，右侧招标公告
  getBidNature: () => axios.get(`${baseUrl_line}/common/bids/type`), // 获取招标性质
  releaseWholeGood: (data) => axios.post(`${baseUrl_line}/inquiry/whole`, data),
  authenInfo: (data) => axios.post(`${baseUrl_line}/user/companyinfo`, data),
  getAuthenInfo: () => axios.post(`${baseUrl_line}/user/getcompanyinfo`),
  getInfoList: () => axios.post(`${baseUrl_line}/user/getuserbids`),
  getCitys : () => axios.get(`${baseUrl_line}/common/citys`),
  getKEY_serach : (data) => axios.get(`${baseUrl_line}/common/seach`, {params: data}),
  categroy : () => axios.get(`${baseUrl_line}/common/bids/categroy`),
  exhibition_detail : (id) => axios.get(`${baseUrl_down}/common/exhibition/${id}`)
}
export default API
