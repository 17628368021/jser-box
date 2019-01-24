<template>
  <div class="basicInfo">
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="align">
        <el-breadcrumb-item :to="{ name: 'personalIndex' }">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>基础信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="basic-edit-box">
      <div class="header">
        基础信息
      </div>
      <div class="show-personal-info">
        <el-form ref="baseInfoFormHook" :model="baseInfoForm" :rules="baseRules" label-width="100px" status-ico class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="baseInfoForm.name" placeholder="真实姓名" class="phone-box"></el-input>
          </el-form-item>
          <el-form-item label="头像：" label-width='100px' class="photo-term">
            <el-upload
              class="photo-uploader"
              ref="avatarHook"
              :action="actionPath"
              :data="updata"
              :auto-upload="false"
              :show-file-list="false"
              :limit='1'
              :on-change="changeAvatar"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="baseInfoForm.imageUrl" :src="baseInfoForm.imageUrl" class="photo">
            </el-upload>
          </el-form-item>

          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="baseInfoForm.phone" class="phone-box" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item label="用户名：" prop="uname">
            <el-input v-model="baseInfoForm.uname" class="name-box" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="所在地：" prop="defaultsAREA">
            <el-cascader
              :options="area"
              :props="props"
              v-model="baseInfoForm.defaultsAREA"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="baseInfoForm.address" class="adderss-box" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="baseInfoForm.value" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('baseInfoFormHook')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {getCitys,changeBaseInfo} from '../../api/indexReg.js'
// import {genUpToken} from '../../common/js/uploadToken.js'
import getToken from '../../common/js/uploadedQINIU.js'
export default {
  props: {
    area: {
      type: Array
    }
  },
  data () {
    var validateUname = (rules, value, callback) => {
      let regUname = /^[\u4E00-\u9FA5]{2,4}$/;
      if (!value) {
        callback(new Error('请填写您的姓名'));
      }else if (!regUname.test(value)) {
        callback(new Error("请填写您的真实姓名"));
      }else {
        callback()
      }
    }
    var validatePhone = (rules, value, callback) => {
      let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if(value === ''){
        callback (new Error("请输入手机号"))
      }else if (!regPhone.test(value)) {
        callback(new Error("请输入正确的手机号"));
      }else{
        callback ();
      }
    }
    var validateNetname = (rules, value, callback) => {
      let regNetname = /^[0-9a-zA-Z\u4E00-\u9FA5]{2,10}$/;
      if(value === ''){
        callback (new Error("请输入用户名"))
      }else if (!regNetname.test(value)) {
        callback(new Error("请输入正确的用户名"));
      }else{
        callback ();
      }
    }
    var validateCity = (rules, value, callback) => {
      if(value.length<3){
        callback (new Error("请选择完整省市区"))
      }else{
        callback ();
      }
    }
    var validateAddress = (rules, value, callback) => {
      if(value === ''){
        callback (new Error("请填写详细地址"))
      }else{
        callback ();
      }
    }
    return {
      baseInfoForm: {
        uname: '',        // 网名
        phone: '',       // 电话
        name: '',        // 姓名
        address: '',     // 地址
        imageUrl: '',    // 头像
        value: '',      // 用户类型
        defaultsAREA: [],// 省市区
      },
      typeOptions: [     // 用户类型选择
        {
          value: '0',
          label: '造价人员'
        }, {
          value: '1',
          label: '物资采购人员'
        }, {
          value: '2',
          label: '设计/技术人员'
        }, {
          value: '3',
          label: '企业'
        }
      ],
      //area: [], // 省市区
      props: {  // 省市区字段规定
        value: 'id',
        label: 'name',
        children: 'data'
      },
      fileHash: '',
      actionPath: 'https://upload-z2.qiniup.com', // 上传文件地址
      qiniuaddr: 'http://pd0m09cgh.bkt.clouddn.com/', // 图片的外链地址
      updata:{}, // token 上传头像所携带的token
      baseRules: {
        name: [
          { required: true, validator: validateUname, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        uname: [
          { required: true, validator: validateNetname, trigger: 'blur' }
        ],
        defaultsAREA: [
          { required: true, validator: validateCity, trigger: 'change' }
        ],
        address: [
          { required: true, validator: validateAddress, trigger: 'blur' }
        ]
      },
      isUpload: false
    };
  },
  components: {},

  computed: {
    baseUserInfo () {
      return this.$store.getters.getAllUserInfo
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs.avatarHook.submit()
      console.log(this.isUpload,'!!!!!!!!')
      if (this.isUpload === false) {
        this.handleSubmit('baseInfoFormHook')
      } else {
        var timer = setInterval(()=>{
          if (this.fileHash) {
            clearInterval(timer)
            this.handleSubmit('baseInfoFormHook')
          }else {
            console.log('11111')
          }
        },10)
      }
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var changeData = {
            nick_name: this.baseInfoForm.uname,  // 网名
            mobile: this.baseInfoForm.phone,       // 电话
            real_name : this.baseInfoForm.name,        // 姓名
            address : this.baseInfoForm.address,     // 地址
            avatar : this.baseInfoForm.imageUrl,    // 头像
            user_type : this.baseInfoForm.value,     // 用户类型
            province : this.baseInfoForm.defaultsAREA[0],
            city : this.baseInfoForm.defaultsAREA[1],
            district : this.baseInfoForm.defaultsAREA[2]
          }
          // console.log(changeData,'~~~~~~~~~~~~~~~~~~~~')
          changeBaseInfo(changeData).then((res)=>{
            console.log(res)
            if (res.data.code === 200) {
              this.$message({
                message: '恭喜你，信息修改成功。',
                type: 'success'
              })
            }
            // 更新用户信息
            setTimeout(()=>{
              this.$store.dispatch('getUserInfo')
            },1000)
          })
        }else {
          console.log('submit error!')
          return false;
        }
      })
    },
    // 未上传===> 实时预览
    changeAvatar(file, fileList) {
      let url = this.baseInfoForm.imageUrl
      console.log(url,'111')
      this.isUpload = true
      console.log(this.isUpload,'~~~~')
      if (url.search(this.qiniuaddr) > -1) {
        return
      }else{
        this.baseInfoForm.imageUrl = file.url
      }
      // this.baseInfoForm.imageUrl = file.url
     
    },
    handleAvatarSuccess(res, file) {
      this.baseUserInfo.imageUrl = ''
      let imageUrl = this.qiniuaddr+res.hash;
      this.fileHash = res.hash;
      // console.log('上传成功之后','\n','response:',response,'\n','file:', file, '\n','fileList:',fileList,'\n')
      this.baseInfoForm.imageUrl = imageUrl
      this.isUpload = false
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      const isPNG = file.type === 'image/png';
      const isJPG = file.type === 'image/jpg';
      const isJPEG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isJPG && !isJPEG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG || isJPEG || isPNG && isLt2M;
    }
  },
  created () {
    this.baseInfoForm.uname = this.baseUserInfo.nick_name
    this.baseInfoForm.imageUrl = this.baseUserInfo.avatar
    this.baseInfoForm.name = this.baseUserInfo.real_name
    this.baseInfoForm.address = this.baseUserInfo.address
    this.baseInfoForm.phone = this.baseUserInfo.mobile
    this.baseInfoForm.value = this.baseUserInfo.user_type.toString()
    this.baseInfoForm.defaultsAREA.push(parseInt(this.baseUserInfo.province)) 
    this.baseInfoForm.defaultsAREA.push(parseInt(this.baseUserInfo.city))
    this.baseInfoForm.defaultsAREA.push(parseInt(this.baseUserInfo.district))
    // 获取token
    this.updata.token = getToken();
  }
}
</script>

<style lang='less'>
  .basicInfo{
    background-color: #fff;
    border-radius: 6px;
    min-height: 840px;
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
    .basic-edit-box{
      padding: 30px 20px 0;
      .header{
        height: 40px;
        line-height: 40px;
        background-color: #eee;
        text-indent: 10px;
      }
      .show-personal-info{
        margin-top: 28px;
        padding: 0 25px;
        .photo-term{
          label{
            line-height: 102px;
          }
        }
        .photo-uploader{
          width: 100px;
          height: 100px;
          padding: 4px;
          border: 1px dashed #d9d9d9;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover{
            border-color:  #409EFF;
          }
          .photo{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: block;
          }
        }
        .phone-box,.name-box,.adderss-box{
          width: 242px;
        }
      }
    }
  }
</style>