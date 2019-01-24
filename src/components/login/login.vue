<template>
  <div id="login">
    <v-header :state='headerState'></v-header>
    <!-- 登录主要版快 -->
    <div class="login-warpper clearfix">
      <div class="w-container">
        <div class="login-form fr">
          <!-- 登录标题 -->
          <div class="login-head">
            <h1>登录&nbsp;<span>每天更新50000条招标信息</span></h1>
          </div>
          <el-form 
           :model="ruleFormLogin" 
           status-icon 
           :rules="rulesLogin" 
           ref="ruleFormLogin" 
           label-width="0" 
           size='44px' 
           class="demo-ruleForm form-warpper"
          >
            <el-form-item prop="uName">
              <el-input 
               type="text"
               v-model="ruleFormLogin.uName" 
               placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
               type="password"
               v-model="ruleFormLogin.pass"
               placeholder="密码"
               auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="verifCode" class="verif-Code">
              <el-input
               type="text"
               v-model="ruleFormLogin.verifCode"
               auto-complete="off"
               placeholder="验证码"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <div class="code" @click.prevent="changeCode('ruleFormLogin')" ref="codeHook" title="点击，换一张">
              <canvas id="loginCode" width="96" height="44" alt="对不起！您的浏览器版本过低" ></canvas>
            </div>
            <!-- 登录按钮 -->
            <el-form-item style="margin-bottom:15px;">
              <el-button class="login-btn" type="primary" @click="submitForm('ruleFormLogin')">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="reg-link clearfix">
            如果还没有创建账号，<router-link to="/register">点击这里</router-link>创建一个新的账号
            <router-link to="/safe" class="fr">忘记密码？</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 流程 -->
    <div class="process w-container">
      <tenderProcess></tenderProcess>
    </div>
  </div>
</template>

<script>
import header from "../herder/header";
import tenderProcess from "../tenderProcess/tenderProcess";
import VerificationCode from "../../common/js/VerificationCode.js"
import {Login} from "../../api/indexReg.js"
// import API from "../../api/api.js"
export default {
  data() {
    var validateUname = (rule, value, callback) => {
      let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      }else if (!uPattern.test(value)) {
        callback(new Error("用户名必须为4-16位的英文与数字"));
      }else {
        callback ()
      }
    };
    var validatePass = (rule, value, callback) => {
      // let pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.loginCode === 422) {
        callback(new Error("密码错误，请重新输入"));
        this.loginCode = 200
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      let lowerVal = value.toLowerCase();
      if (value === "") {
        callback(new Error("请输入验证码"));
      }else if(lowerVal !== this.verifCode) {
        callback(new Error("请输入正确的验证码"));
      }else {
        callback();
      }
    }
    return {
      headerState: 2,
      ruleFormLogin: {
        uName: '',
        pass: '',
        verifCode:''
      },
      rulesLogin: {
        pass: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
        uName: [
          { required: true,validator: validateUname, trigger: 'blur' }
        ],
        verifCode: [
          { required: true,validator: validateCode, trigger: 'blur' }
        ]
      },
      loginCode: 200
    };
  },
  components: { "v-header": header, tenderProcess },

  computed: {},

  methods: {
    submitForm(formName) {
      // valid为一个boolean值， object为未通过验证的字段
      this.$refs[formName].validate((valid,object) => {
        if (valid) {
          var data = {
            mobile: this.ruleFormLogin.uName,
            password: this.ruleFormLogin.pass
          }
          // var qs = require('qs');
          Login(data).then((res)=>{
            // console.log('所有响应数据：',res)
            let loginfo = res.data;
            console.log('所有用户信息',loginfo)
            if (loginfo.code === 200) {
              if(loginfo.data.status === 1){
                console.log('具体信息 ',loginfo.data)
                this.$store.commit('login', { userinfo:loginfo.data,token: loginfo.data.auth_token }) // 将 token 写入到vuex中
                this.$store.dispatch('getUserInfo')
                this.$message({
                  message: '登录成功！',
                  type: 'success'
                })
                let redirect = decodeURIComponent(this.$route.query.redirect || '/'); //保存路径
                setTimeout(()=>{
                  this.$router.push( { path: redirect } )
                },1000)   // 跳转页面
              }
            } else if (loginfo.code === 422){  // 密码错误的逻辑
              this.loginCode = 422
              this.$refs[formName].validateField('pass',(error) => {})
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeCode(formName) {
      VerificationCode('loginCode');
      this.verifCode = VerificationCode('loginCode').toLowerCase();
      this.$refs[formName].validateField('verifCode',(error) => {})
    }
  },
  mounted(){
    VerificationCode('loginCode');
    this.verifCode = VerificationCode('loginCode').toLowerCase();
  },
  created() {
    // console.log(API,'---------------------')
  }
};
</script>


<style lang='less'>
#login {
  .login-warpper {
    // min-width: 1595px;
    width: 100%;
    height: 600px;
    background: url(./login-banner.png) center no-repeat;
    // background-attachment: fixed;
    background-size: cover;
    .login-form {
      position: relative;
      box-sizing: border-box;
      top: 110px;
      width: 460px;
      height: 380px;
      padding: 10px;
      background-color: #ffffff;
      border: 1px solid #eee;
      border-radius: 4px;
      box-shadow: 0 4px 8px 0 rgba(7,17,27,.05);
      .login-head{
        height: 50px;
        line-height: 42px;
        vertical-align: top;
        font-size: 18px;
        padding-left: 10px;
        border-bottom: 1px solid #eee;
        span{
          font-size: 14px;
          color: #999;
        }
        
      }
      .form-warpper{
        margin: 20px 10px 0;
        input{
          height: 44px;
          line-height: 44px;
        }
        .verif-Code{
          display: inline-block;
          width: 300px;
          margin-right: 16px;
        }
        .code{
          display: inline-block;
          width: 96px;
          height: 44px;
          line-height: 44px;
          background-color:#eee; 
          vertical-align: top;
          cursor: pointer;
        }
        .login-btn{
          width: 100%;
          height: 44px;
        }
      }
      .reg-link{
        padding: 0 10px;
        font-size: 12px;
        &>a{
          color: #1d8ffe;
        }
      }
    }
  }
  .process{
      margin: 80px auto;
    }
}
</style>