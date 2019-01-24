<template>
  <div class="authenInfo m-b30" v-loading='isLoding' element-loading-text="拼命加载中">
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="align">
        <el-breadcrumb-item :to="{ name: 'personalIndex' }">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>认证信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="auth-edit-box">
      <div class="header">
        基础信息
      </div>
      <div class="basic-show">
        <el-form ref="authForm_hook" :model="authForm" :rules="authFormRules" label-width="214px">
          <el-form-item label="公司名称" prop="company_name">
            <el-input class="common-width" v-model="authForm.company_name" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="法定发表人姓名：" prop="legal_person">
            <el-input class="common-width" v-model="authForm.legal_person" placeholder="请输入法定代表人姓名"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span slot="label">法定发表人身份证电子版：<em class="orange">（正反面）</em></span>
            <el-upload
              :action="actionPath"
              :data="updata"
              list-type="picture-card"
              :on-success="handleIDCARDsuccess"
              :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :limit="2"
              :file-list="fileList"
              :on-remove="handleRemove">
              <!-- <img v-if="authForm.identity_card_front" :src="authForm.identity_card_front" class="avatar"> -->
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="营业执照注册地址：" prop="address">
            <el-input class="common-width" v-model="authForm.address" placeholder="请输入营业执照注册地址"></el-input>
          </el-form-item>
          <el-form-item label="营业执照登记机关：" prop="registration_authority">
            <el-input class="common-width" v-model="authForm.registration_authority" placeholder="请输入营业执照登记机关"></el-input>
          </el-form-item>
          <div class="header m-b20">
            普通营业执照
          </div>
          <el-form-item label="组织机构代卖：" prop="organization_code">
            <el-input class="common-width" v-model="authForm.organization_code" placeholder="请输入组织机构代买"></el-input>
          </el-form-item>
          <el-form-item label="税务人识别号：" prop="taxpayer_qualification_code">
            <el-input class="common-width" v-model="authForm.taxpayer_qualification_code" placeholder="请输入税务人识别号"></el-input>
          </el-form-item>
          <el-form-item label="注册号（营业执照号）：" prop="business_license_number">
            <el-input class="common-width" v-model="authForm.business_license_number" placeholder="请输入注册号（营业执照号）"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span slot="label">营业执照副本电子版：</span>
            <el-upload
              :action="actionPath"
              :data="updata"
              list-type="picture-card"
              :limit="1"
              :on-success="handleLicenseSuccess"
              :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList_licence"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="">
            <span slot="label">纳税人资格证电子版：</span>
            <el-upload
              :action="actionPath"
              :data="updata"
              :on-success="handleTaxpayerSuccess"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :file-list="fileList_Taxpayer"
              :on-exceed="handleExceed"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="">
            <span slot="label">组织机构代码证电子版：</span>
            <el-upload
              :action="actionPath"
              :data="updata"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleOrganizationSuccess"
              :on-exceed="handleExceed"
              :limit="1"
              :file-list="fileList_Organization"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <div class="header m-b20">
            三证合一
          </div>
          <el-form-item label="统一社会信用代码：" prop="credit_code">
            <el-input class="common-width" v-model="authForm.credit_code" placeholder="请输入统一社会信用代码"></el-input>
          </el-form-item>
          <div class="header m-b20">
            其他信息
          </div>
          <el-form-item label="注册资本：" prop="capital">
            <el-input class="common-width" v-model="authForm.capital" placeholder="请输入金额（单位：万元）"></el-input>
          </el-form-item>
          <el-form-item label="币种：" prop="regunit">
            <el-input class="common-width" v-model="authForm.regunit" placeholder="请输入货币种类"></el-input>
          </el-form-item>
          <el-form-item label="成立日期：" prop="regyear">
            <el-date-picker
              v-model="authForm.regyear"
              class="common-width"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="营业期限：" prop="endyear">
            <el-date-picker
              v-model="authForm.endyear"
              class="common-width"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系电话：" prop="telephone">
            <el-input class="common-width" v-model="authForm.telephone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="企业电子邮箱：" prop="mail">
            <el-input class="common-width" v-model="authForm.mail" placeholder="请输入企业电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="企业传真：" prop="fax">
            <el-input class="common-width" v-model="authForm.fax" placeholder="请输入企业传值号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit('authForm_hook')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../api/api.js";
import getToken from "../../common/js/uploadedQINIU.js";
export default {
  data() {
    return {
      authForm: {
        company_name: "",                       //true	string	//公司名称
        legal_person: "",                       //true	string	//法定代表人
        identity_card_front: "",                //true	file	//法定代表人身份证电子版(正面)
        identity_card_back: "",                 //true	file	//法定代表人身份证电子版(反面)
        address: "",                            //true	string	//营业执照注册地址
        registration_authority: "",             //true	string	//营业执照登记机关
        taxpayer_qualification_code: "",        //false	string	//税务人识别号
        business_license_number: "",            //false	string	//营业执照号码

        business_licence_copy: "",              //true	file	//营业执照副本电子版
        taxpayer_qualification_certificate: "", //true	file	//纳税人资格证电子版
        organization_code: "",	                //false	string	组织机构代码
        organization_code_picture: "",          //false	file	  //组织机构代码证电子版

        credit_code: "",                        //false	string	//统一社会信用代码
        capital: "",                            //true	number	//注册资本
        regunit: "",                            //true	string	//注册币种
        regyear: "",                            //true	date	//注册年份
        endyear: "",                            //true	date	//营业期限
        fax: "",                                //false	string	//公司传真
        telephone: "",                          //true	string	//联系电话
        mail: ""                                //true	string	//企业电子邮箱
      },
      dialogVisible: false,
      actionPath: "https://upload-z2.qiniup.com", // 上传文件地址
      qiniuaddr: "http://pd0m09cgh.bkt.clouddn.com/", // 图片的外链地址
      updata: {},
      dialogImageUrl: '',
      fileList: [],
      fileList_licence: [],
      fileList_Taxpayer : [],
      fileList_Organization : [],
      authFormRules:{
        company_name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        legal_person: [{ required: true, message: '请输入法定代表人', trigger: 'blur' }],
        address: [{ required: true, message: '请输入营业执照注册地址', trigger: 'blur' }],
        registration_authority: [{ required: true, message: '请输入营业执照登记机关', trigger: 'blur' }],
        taxpayer_qualification_code: [{ required: false, message: '请输入税务人识别号', trigger: 'blur' }],
        business_license_number: [{ required: false, message: '请输入营业执照号码', trigger: 'blur' }],
        credit_code: [{ required: false, message: '请输入统一社会信用代码', trigger: 'blur' }],
        capital: [{ required: true, message: '请输入注册资本', trigger: 'blur' }],
        regunit: [{ required: true, message: '请输入注册币种', trigger: 'blur' }],
        regyear: [{ required: true, message: '请输入注册年份', trigger: 'change' }],
        endyear: [{ required: true, message: '请输入营业期限', trigger: 'change' }],
        fax: [{ required: false, message: '请输入公司传真', trigger: 'blur' }],
        telephone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        mail: [{ required: true, message: '请输入企业电子邮箱', trigger: 'blur' }]
      },
      isLoding: true
    };
  },
  components: {},

  computed: {},
  mounted(){
    /* console.log('1')
    console.log('this.$data',this.$data) */
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // console.log(this.dialogImageUrl,'~~~~~~~')
      this.dialogVisible = true;
    },
    handleIDCARDsuccess(res, file, fileList) {
      /* console.log('res----------',res)
      console.log('file---------',file)*/
      console.log('fileList-----',fileList) 
      if (res.hash) {
        let imgUrl = this.qiniuaddr+res.hash;
        if (fileList.length > 0 && fileList.length === 1) {
          this.authForm.identity_card_front = imgUrl
        } else if (fileList.length === 2) {
          this.authForm.identity_card_back = imgUrl
        }
      }
      console.log(this.authForm.identity_card_front,'----',this.authForm.identity_card_back)
    },
    handleLicenseSuccess(res, file, fileList) {
      if (res.hash) {
        let imgUrl = this.qiniuaddr+res.hash;
        this.authForm.business_licence_copy = imgUrl
      }
    },
    handleTaxpayerSuccess(res, file, fileList) {
      if (res.hash) {
        let imgUrl = this.qiniuaddr+res.hash;
        this.authForm.taxpayer_qualification_certificate = imgUrl
      }
    },
    handleOrganizationSuccess(res, file, fileList) {
      if (res.hash) {
        let imgUrl = this.qiniuaddr+res.hash;
        this.authForm.organization_code_picture = imgUrl
      }
    },
    handleExceed(files, fileList) {
      // console.log(files,'-----', fileList)
      this.$message.warning(`当前限制选择 ${fileList.length} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleSubmit(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          let data = this.authForm
          console.log('=======>',this.authForm)
          API.authenInfo(data).then(res => {
            console.log(res)
            // this.getAuthenInfo_post()
          })
        } else {
          console.log('submit error!')
          return false;
        }
      })
    },
    getAuthenInfo_post() {
      API.getAuthenInfo().then(res => {
        console.log('获取认证信息',res)
        let {code, data} = res.data
        if (code === 200) {
          this.authForm = data
          this.isLoding = false
          this.fileList =[
            { url: data.identity_card_front },
            { url: data.identity_card_back }
          ]
          this.fileList_licence = [
            { url: data.business_licence_copy }
          ]
          this.fileList_Taxpayer = [
            { url: data.taxpayer_qualification_certificate }
          ]
          this.fileList_Organization = [
            { url:data.organization_code_picture }
          ]
        }else {
          this.authForm = {}
          this.isLoding = false
        }
      })
    }
  },
  created() {
    // 获取token
    this.updata.token = getToken();
    this.getAuthenInfo_post()
  }
};
</script>

<style lang='less'>
.authenInfo {
  background-color: #fff;
  border-radius: 6px;
  min-height: 840px;
  padding-bottom: 30px;
  .el-loading-spinner{
    top: 10% !important;
  }
  .crumbs {
    padding-left: 20px;
    height: 42px;
    line-height: 42px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .align {
      line-height: 42px;
    }
  }
  .auth-edit-box {
    padding: 30px 20px 0;
    .header {
      height: 40px;
      line-height: 40px;
      background-color: #eee;
      text-indent: 10px;
    }
    .basic-show {
      padding: 30px 6px 0;
      .common-width {
        width: 300px;
      }
    }
  }
}
</style>