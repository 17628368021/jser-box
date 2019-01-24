<template>
  <div class="releaseInfo clearfix">
    <div class="crumbs m-b30">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="align">
        <el-breadcrumb-item :to="{ name: 'personalIndex' }">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>发布信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="edit-warpper clearfix">
      <el-form ref="releaseHook" :model="releaseInfo" :rules="releaseRlues" class="demo-ruleForm" status-icon  label-width="100px">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="releaseInfo.title" class="common-width" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="摘要：" prop="remarks">
          <el-input v-model="releaseInfo.remarks" class="common-width" placeholder="请输入摘要"></el-input>
        </el-form-item>
        <el-form-item label="商品编码：" prop="number">
          <el-input v-model="releaseInfo.number" class="common-width" placeholder="请输入商品编码"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contacts">
          <el-input v-model="releaseInfo.contacts" class="common-width" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="mobile">
          <el-input v-model="releaseInfo.mobile" class="common-width" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="省市区：">
          <el-cascader
              :options="area"
              :props="areaprops"
              v-model="defaultCity"
              change-on-select
              @blur="areaupid"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="分类：">
          <el-cascader
              :options="categroy"
              :props="props"
              change-on-select
              v-model="defaultscategroy"
              @change="upid"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="类型：">
          <el-cascader
            :options="typeOption"
            :props="typeprops"
            change-on-select
            v-model="defaultbidstype"
            @change="typeupid"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="内容详情：" class="editor-box">
          <quill-editor
            v-model="releaseInfo.contents" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" 
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <div>
          <!-- {{releaseInfo.contents}} -->
        </div>
        <el-form-item class="save-btn">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import {releaseInfo,categroy} from '../../api/indexReg.js'
import API from '../../api/api.js'
export default {
  props:{
    area:{
      type:Array
    }
  },
  data () {
    var validateTitle = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品名称'))
      }else {
        callback()
      }
    }
    var validateNum = (rules, value, callback) => {
      var regCode = /^[A-Za-z0-9]{6,13}$/
      if (value === '') {
        callback(new Error('请输入商品编码'))
      }else if(!regCode.test(value)) {
        callback(new Error('只允许输入数字和字母，长度为6-13个字符'))
      }else {
        callback()
      }
    }
    var validateRemarks = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入摘要'))
      }else {
        callback()
      }
    }
    var validateContact = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系人姓名'))
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
    return {
      releaseInfo:{
        title: '', // 招标标题
        number: '', // 招标编号
        categroy_id: '', //	招标分类id
        bids_type: '', // 招标性质id
        contents: '', // 招标内容
        remarks: '', // 备注（摘要）
        contacts: '', // 联系人
        mobile: '' , // 联系电话
        province : '',
        city: '',
        district : ''
      },
      categoryOption: [
        {
          value: '选项1',
          label: '房屋建筑'
        }, {
          value: '选项2',
          label: '化学工业'
        }
      ],
      typeOption: [],
      editorOption: {
        formula: true,
        theme: 'snow',
        modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block',],
              [{ 'header': 1 }, { 'header': 2 },{ 'header': 3 }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }], 
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['image'],
              ['clean']
            ]
        }
      },
      releaseRlues:{
        title:[
          { required: true,validator: validateTitle, trigger: 'blur' }
        ],
        number:[
          { required: true,validator: validateNum, trigger: 'blur' }
        ],
        remarks:[
          { validator: validateRemarks, trigger: 'blur' }
        ],
        contacts:[
          { required: true,validator: validateContact, trigger: 'blur' }
        ],
        mobile: [
          { required: true,validator: validatePhone, trigger: 'blur' }
        ]
      },
      categroy:[],
      props:{
        value: 'id',
        label: 'title',
        children: 'data'
      },
      defaultscategroy: [],
      defaultbidstype: [],
      defaultCity: [],
      typeprops:{
        value: 'id',
        label: 'title',
        children: 'children'
      },
      areaprops:{ // 省市区字段规定
        value: 'id',
        label: 'name',
        children: 'data'
      }
    };
  },
  components: { quillEditor },

  computed: {
  },

  methods: {
    onEditorBlur() {//失去焦点事件
    },
    onEditorFocus() {//获得焦点事件
    },
    onEditorChange() {//内容改变事件
    },
    upid() {
      if (this.defaultscategroy) {
        this.releaseInfo.categroy_id = this.defaultscategroy[this.defaultscategroy.length-1]
      }
    },
    typeupid() {
      if (this.defaultscategroy) {
        this.releaseInfo.bids_type = this.defaultbidstype[this.defaultbidstype.length-1]
      }
    },
    areaupid () {
      if (this.defaultCity) {
        this.releaseInfo.province = this.defaultCity[0]
        this.releaseInfo.city = this.defaultCity[1]
        if (this.defaultCity.length > 2) {
          this.releaseInfo.district = this.defaultCity[2]
        }else{
          console.log(`没有区县`)
        }
      }
    },
    onSubmit() {
      let data = this.releaseInfo
      console.log('data', data)
      this.$refs.releaseHook.validate( (valid) => {
        if (valid) {
          releaseInfo(data).then(res=>{
            console.log(res)
            if (res.data.code === 200) {
              this.$message({
                type:'success',
                message: res.data.msg
              })
              this.$refs.releaseHook.resetFields();
              console.log(this.releaseInfo)
            }else{
              this.$message({
                type:'warning',
                message: res.data.msg
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }else {
          console.log('submit error')
          return
        }
      })
    }
  },
  created() {
    categroy().then(categroy => {
      this.categroy = categroy.data.data
    })
    API.getBidNature().then(res =>{
      let {code, data} = res.data
      if (code === 200) {
        this.typeOption = data
      } else {
        console.log(`error type获取失败`)
      }
    })
  }
}
</script>

<style lang='less'>
  .releaseInfo{
    background-color: #fff;
    border-radius: 6px;
    padding-bottom: 30px;
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
    .edit-warpper{
      padding: 0 20px;
      height: 100%;
      .editor-box{
        .el-form-item__content{
          line-height: 1;
        }
        .ql-container{
           height:  160px;
        }
        .ql-snow{
          /* .ql-formats{
            button,select{
              position: relative;
            }
          } */
          /* .ql-bold::before{
            position: absolute;
            font-size: 12px;
            content: '加粗';
            top: -30px;
            left: 0%;
            width: 32px;
            background-color: #000;
            color: #fff;
          } */
        }
      }
      .save-btn{
        position: relative;
      }
    }
    .common-width{
      width: 300px;
    }
  }
</style>