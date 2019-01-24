<template>
  <div id="register">
    <v-header :state='headerState'></v-header>
    <div class="reg-container">
      <el-form :label-position="labelPosition" status-icon :rules="rulesRge" ref="formLabelReg" label-width="80px" :model="formLabelAlign">
        <el-form-item label="请输入你的手机号" prop="phone" ref="formPhoneHook">
          <el-input v-model="formLabelAlign.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <aliSlide @slideVerti="slideVerti" :isReload="isReload"></aliSlide>
        <el-form-item label="短信验证码" prop="checkSMS">
          <el-row>
            <el-col :span="16">
              <el-input v-model="formLabelAlign.SMSCode" :disabled="smsInputDisable" @blur="checkedSMSCodeMethod('formLabelReg')" placeholder="请输入短信验证码"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button class="getCodeMsg" :disabled="smsBtnDisable" @click="sendMsg('formLabelReg')">{{msg}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="密码（由6-12位数字、字母和符号组成）" prop="pass">
          <el-input type="password" v-model="formLabelAlign.pass" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="formLabelAlign.checkPass" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item class="protocol">
          <el-checkbox v-model="checked">同时开立您的账户，我同意：</el-checkbox>
          <p><router-link to="/protocol">-遵守昂牛招标网会员协议</router-link></p>
          <p>-希望收到会员相关服务的电邮</p>
        </el-form-item>
        <el-form-item style="margin-top:30px;">
          <el-button class="login-btn" type="primary" @click="submit('formLabelReg')">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import header from "../herder/header";
import {regSMS,regsiter,checkedSMScode} from "../../api/indexReg.js"
import aliSlide from "@/components/aliSlide/aliSlide"

export default {
  data () {
    var validatePhone = (rules, value, callback) => {
      let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if(value === ''){
        callback (new Error("请输入手机号"))
      }else if (!regPhone.test(value)) {
        callback(new Error("请输入正确的手机号"));
      }else if(this.smsInfoCode === 422){
        callback(new Error("手机号码已存在，请重新填写"))
        this.smsInfoCode = 200
      }else{
        callback ();
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formLabelAlign.checkPass !== '') {
          this.$refs.formLabelReg.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formLabelAlign.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateSMScode = (rule, value, callback) => {
      var val = this.formLabelAlign.SMSCode
        // console.log(this.SMScheckedState.code === 422)
        if (val === '') {
          callback(new Error('请输入短信验证码'));
        } else if (this.SMScheckedState.code === 422 ) {
          callback(new Error(this.SMScheckedState.info));
        } else if (this.SMScheckedState.code === 404 ) {
          callback(new Error(this.SMScheckedState.info));
        } else if (this.SMScheckedState.code === 400 ) {
          callback(new Error(this.SMScheckedState.info));
        } else if (this.SMScheckedState.code === 500 ) {
          callback(new Error(this.SMScheckedState.info));
        } else {
          callback();
        }
    }
    return {
      headerState: 3,
      second: 60,
      msg: '获取验证码',
      labelPosition: 'top',
      formLabelAlign: {
        phone: '',
        SMSCode: '',
        pass: '',
        checkPass: ''
      },
      checked: false,
      smsBtnDisable: true,
      smsInputDisable: true,
      smsInfoCode: 200,
      isReload: false,
      SMScheckedState: {},
      rulesRge: {
        phone: [
          { required: true,validator: validatePhone, trigger: 'blur' }
        ],
        pass: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true,validator: validatePass2, trigger: 'blur' }
        ],
        checkSMS: [
          { required: true,validator: validateSMScode, trigger: null }
        ]
      }
    };
  },
  components: { "v-header": header, aliSlide },

  computed: {},

  methods: {
    sendMsg(formName) {
      this.smsInfoCode = 200
      let data = {
        mobile: this.formLabelAlign.phone,
        type: 1
      }
      this.$refs[formName].validateField('phone',(error,B) => {
        regSMS(data).then((res)=>{
          // console.log('信息',res);
          var that = this
          let smsInfo = res.data
          this.smsInfoCode = smsInfo.code
          if (smsInfo.code === 200) {
            var timer = setInterval(function() {
              that.second--
              that.smsBtnDisable = true
              that.smsInputDisable = false
              if (that.second >= 0) {
                that.msg = '还剩余' + that.second + '秒'
              } else {
                that.msg = '重新发送短信'
                clearInterval(timer)
                that.second = 60
                that.smsBtnDisable = false
              }
            }, 1000)
          }else if (smsInfo.code === 422) {
            // this.$message.error('手机号码已存在，请选择其他号码');
            // this.$refs.formPhoneHook.resetField()
            this.$refs[formName].validateField('phone')
            this.isReload = true;
          }
        }).catch(() => {
          this.$message.error('服务器错误')
        })
      })
    },
    submit(formName){
        this.$refs[formName].validate((valid) => {
          if(this.checked){
            var data = {
              mobile: this.formLabelAlign.phone,
              password: this.formLabelAlign.pass,
              password_confirmation: this.formLabelAlign.checkPass,
              code: 123456,
              user_type: 0,
            }
            // console.log(data);
            if (valid) {
              regsiter(data).then((res)=>{
                this.$message({
                  message: '恭喜你注册成功！',
                  type: 'success'
                });
                setTimeout(()=>{
                  this.$router.push({
                    path: '/login'
                  })
                },2000)
              })
              .catch(() => {
                console.log(error)
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          }else{
            this.$message.error('请同意昂牛采购协议并细心阅读');
          }
        })
    },
    slideVerti(){
      this.smsBtnDisable = !this.smsBtnDisable;
    },
    checkedSMSCodeMethod(formName) {
      if(this.formLabelAlign.phone !== '' && this.formLabelAlign.SMSCode !== ''){
        var SMSdata = {
          mobile : this.formLabelAlign.phone,
          code : this.formLabelAlign.SMSCode,
          type : 1
        }
        checkedSMScode(SMSdata).then((res)=>{
          var SMScheckedState = res.data;
          this.SMScheckedState = SMScheckedState;
          // console.log(this.SMScheckedState,"+++++++++++++++++++++++")
          this.$refs[formName].validateField('checkSMS')
        })
      }
    }
  }
}
</script>

<style lang='less'>
  #register{
    .reg-container{
      width: 402px;
      margin: 60px auto 50px;
      .protocol{
        .el-checkbox{
          font-size: 12px;
          line-height: 16px;
          height: 16px;
        }
        p{
          text-indent: 22px;
          font-size: 12px;
          line-height: 16px;
          a{
            color: #2c86fd;
          }
        }
      }
      .login-btn{
        width: 100%;
      }
    }
  }
</style>