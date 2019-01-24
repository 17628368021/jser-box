// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';      // 在引用“饿了么”UI的时候  同时需要引入饿了么UI的css
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios/http'
import VueQuillEditor from 'vue-quill-editor'   // vue的一个插件  （富文本编辑器）
import store from './store/store.js'        //vuex
import * as qiniu from 'qiniu-js'           // 七牛云  云端上传

// 引入富文本编辑器的公共样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.prototype.$http = axios           // 需要在vue实例的原型上面挂载axios  使用到全局
import './common/less/index.less';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
