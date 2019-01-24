<template>
  <div class="wholePurchase">
    <div class="solution-type clearfix">
      <el-form :model="wholeForm"  ref="wholeGoodsHook" :rules="baseRules" label-width="124px" class="demo-ruleForm" status-ico>
        <el-form-item label="解决方案类型：">
          <el-cascader
            :options="typeOption"
            :props="typeprops"
            change-on-select
            v-model="defaultbidstype"
            @change="typeupid"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="需求详情描述：" prop="description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 9}"
            placeholder="请输入内容"
            v-model="wholeForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label="添加附件：">
          <el-upload
            ref="uploads"
            class="upload-demo"
            style="width:400px"
            :action="actionPath"
            :data="updata"
            :auto-upload="false"
            :on-change="handleChange"
            :on-success="handleEnclosureSuccess"
            :before-upload="beforeEnclosureUpload"
            :file-list="fileList">
            <el-button plain size="small" icon="el-icon-upload2">上传pdf、jpg等</el-button>
            <span slot="tip" style="margin-left:16px;" class="el-upload__tip">详细阐述解决方案的需求背景和情况说明</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="截止日期：">
          <el-date-picker
            v-model="wholeForm.cut_off_time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            size="small"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系人：" prop="contacts_name">
          <el-input v-model="wholeForm.contacts_name" class="small"  size="small" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="mobile">
          <el-input v-model="wholeForm.mobile" size="small" class="small" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('wholeGoodsHook')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import API from '../../api/api.js'
import getToken from '../../common/js/uploadedQINIU.js'
export default {
  data () {
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
    var validateType = (rules, value, callback) => {
      if(value === ''){
        callback (new Error("请选择方案类型"))
      }else{
        callback ();
      }
    }
    return {
      wholeForm:{
        categroy_id: '',
        description: '',
        attach_file: [],
        cut_off_time: '',
        contacts_name: '',
        mobile: ''
      },
      fileList: [],
      typeOption: [],
      defaultbidstype: ['招标公告'],
      typeprops:{
        value: 'id',
        label: 'title',
        children: 'children'
      },
      actionPath: 'https://upload-z2.qiniup.com', // 上传文件地址
      qiniuaddr: 'http://pd0m09cgh.bkt.clouddn.com/', // 图片的外链地址
      updata:{},
      baseRules: {
        description: [
          { required: true, message: '请填写描述信息', trigger: 'blur' }
        ],
        contacts_name: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true,validator: validatePhone, trigger: 'blur' }
        ],
        categroy_id: [
          { required: true,validator: validateType, trigger: 'change' }
        ]
      },
      fileHash: ''
    }
  },
  components: {},

  computed: {},

  methods: {
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    handleEnclosureSuccess(res, file, fileList) {
      this.fileHash = ''
      let imageUrl = this.qiniuaddr+res.hash;
      // console.log('上传成功之后','\n','response:',res,'\n','file:', file, '\n','fileList:',fileList,'\n')
      if (res.hash) {
        this.fileHash = res.hash
        console.log('success---1',this.fileHash)
        this.wholeForm.attach_file.push(imageUrl)
      }else{
        console.log(`error $(file.name)上传错误`)
      }
      this.handleSubmit('wholeGoodsHook')
      // this.handleSubmit('baseInfoFormHook')
    },
    beforeEnclosureUpload(file) {
      console.log(file)
      const isPNG = file.type === 'image/png';
      const isJPG = file.type === 'image/jpg';
      const isJPEG = file.type === 'image/jpeg';
      const isPDF = file.type === 'image/pdf';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isJPEG && !isPDF) {
        this.$message.error('上传头像图片只能是 JPG/PNG/JPEG/PDF 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isJPEG || isPNG || isPDF) && isLt2M;
    },
    typeupid() {
      if (this.defaultbidstype) {
        this.wholeForm.categroy_id = this.defaultbidstype[this.defaultbidstype.length-1]
      }
    },
    submit(formName) {
      let _that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit().then(function(data){
            if (data) {
               API.releaseWholeGood(_that.wholeForm).then((res)=>{
                 console.log(res)
                if (res.data.code === 200) {
                  _that.$message({
                    message: '恭喜你，信息修改成功。',
                    type: 'success'
                  })
                } else {
                  _that.$message({
                    message: res.data.msg,
                    type: 'warning'
                  })
                }
              })
            }
          })
        }else {
          console.log('submit error!')
          return false;
        }
      })
    },
    handleSubmit() {
      let _that = this
      var promise = new Promise(function(resolve, reject){
        _that.$refs.uploads.submit()
        setTimeout(()=>{
          resolve(_that.fileHash)
        },300)
      })
      return promise
    },
  },
  created () {
    // 获取分类
    API.getBidNature().then(res =>{
      let {code, data} = res.data
      if (code === 200) {
        this.typeOption = data
      } else {
        console.log(`error type获取失败`)
      }
    })
    // 获取token
    this.updata.token = getToken();
  }
}
</script>

<style lang='less'>
  .wholePurchase{
    .title{
      width: 124px;
      font-size: 14px;
      display: inline-block;
      text-align: right;
    }
    .solution-type{
      margin-bottom: 18px;
    }
    .demand-describe{
      margin-bottom: 20px;
    }
    .add-attachment{
      padding-bottom: 20px;
      border-bottom: 1px solid rgb(235, 238, 245);
      .upload-excel{
        margin-left: 124px;
        margin-top: 20px;
        a{
          color: #2c81ef;
        }
      }
    }
    .small{
      width: 220px;
    }
  }
</style>