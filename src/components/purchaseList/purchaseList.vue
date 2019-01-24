<template>
  <div class="purchaseList">
    <el-form ref='purchaseHook' :model="model" :rules="model.rules" status-ico class="demo-ruleForm">
      <el-table
        ref="multipleTable"
        :data="model.tableData"
        tooltip-effect="dark"
        style="width: 100%;border: 1px solid rgb(235, 238, 245);border-bottom:none;"
        @selection-change="handleSelectionChange"
        @select="singleSelected"
        show-file-list=true
        :header-cell-class-name="tableHead">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="商品名称"
          :render-header="labelzone1"
          width="280"
          prop="title"
          class-name="col">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.title'" :rules="model.rules.title">
              <el-input v-model="scope.row.title" size="small"></el-input>
            </el-form-item>
            <!-- <span class="tips" v-if="scope.row.validaAttr.msgTitle.isCorrect">{{scope.row.validaAttr.msgTitle.msg}}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="规格型号"
          :render-header="labelzone2"
          width="124"
          class-name="col">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.model'" :rules="model.rules.title">
              <el-input v-model="scope.row.model"  size="small"></el-input>
            </el-form-item>
            <!-- <span class="tips" v-if="scope.row.validaAttr.msgModel.isCorrect">{{scope.row.validaAttr.msgModel.msg}}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="品牌"
          :render-header="labelzone2"
          width="126"
          class-name="col"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.model'" :rules="model.rules.title">
              <el-input v-model="scope.row.brand"  size="small"></el-input>
            </el-form-item>
            <!-- <span class="tips" v-if="scope.row.validaAttr.msgBrand.isCorrect">{{scope.row.validaAttr.msgBrand.msg}}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="单位"
          :render-header="labelzone3"
          width="100"
          class-name="col"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.model'" :rules="model.rules.title">
              <el-input v-model="scope.row.unit" size="small"></el-input>
            </el-form-item>
            <!-- <span class="tips" v-if="scope.row.validaAttr.msgUnit.isCorrect">{{scope.row.validaAttr.msgUnit.msg}}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          width="80"
          class-name="col"
          :render-header="labelzone3"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.model'" :rules="model.rules.title">
              <el-input v-model="scope.row.number" size="small"></el-input>
            </el-form-item>
            <!-- <span class="tips" v-if="scope.row.validaAttr.msgNumber.isCorrect">{{scope.row.validaAttr.msgNumber.msg}}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="期望出货日期"
          width="150"
          class-name="col"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.model'" :rules="model.rules.title">
              <el-date-picker
                v-model="scope.row.ship_time"
                type="date"
                placeholder="选择日期"
                size="small"
                class="form-date"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <!-- <span class="tips" v-if="scope.row.validaAttr.msgShip_time.isCorrect">{{scope.row.validaAttr.msgShip_time.msg}}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          label="附件"
          width="180"
          class-name="col"
          :render-header="labelzone4"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :action="actionPath"
              :data="postData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleGoodSuccess"
              :before-remove="beforeRemove"
              :limit="1"
              size="small"
              :on-exceed="handleExceed"
              :before-upload="beforeGoodUpload"
            >
              <el-button size="small" type="primary" @click="getRow(scope.$index)">上传附件</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="50"
          class-name="col"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="delsingle" @click.prevent="deleteRow(scope.$index, model.tableData)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="add-goods">
      <el-button type="primary" icon="el-icon-plus" class="add-goods-btn" @click="addGoods">添加商品</el-button>
    </div>
    <div class="other-opra">
      <el-checkbox v-model='allChecked' class="check" @change="toggleSelection(model.tableData)">全选</el-checkbox>
      <el-button plain size="mini" @click="deleting">删除</el-button>
      <input type="file" @change="importFile(this)" id="imFile" style="display: none"
     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
      <el-button plain size="mini" @click="uploadFile">批量上传</el-button>
      <p class="down-tips">通过excel批量添加商品，<span class="downlode-excel">下载excel模板</span></p>
    </div>
    <div class="closing-date">
      <span class="title"><span style="color:red;">*</span> 截止日期：</span>
      <el-date-picker
        v-model="endDate"
        type="date"
        @blur="Verification_empty(endDate,msgEndData)"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        size="small"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <span class="tips" v-if="msgEndData.isCorrect">{{msgEndData.msg}}</span>
      <!-- <el-checkbox v-model="longTterm">长期</el-checkbox> -->
    </div>
    <el-row class="concats">
      <el-col class="name" :span="6">
        <span class="title">
        <span style="color:red;">*</span>联  系  人：</span>
        <el-input v-model="contacts" class="small" @blur="Verification_empty(contacts,msgContacts)" :class="{error_empty:msgContacts.isCorrect}" size="small" placeholder="请输入姓名"></el-input>
        <span class="tips" v-if="msgContacts.isCorrect">{{msgContacts.msg}}</span>
      </el-col>
      <el-col :span="6" class="name" :offset="1">
        <span class="title"><span style="color:red;">*</span>手 机 号：</span>
          <el-input v-model="telPhone" @blur="Verification_tel" size="small" class="small" :class="{error_empty:msgTelPhone.isCorrect}" placeholder="请输入手机号"></el-input>
        <span class="tips" v-if="msgTelPhone.isCorrect">{{msgTelPhone.msg}}</span>
      </el-col>
    </el-row>
    <!-- 提交按钮 -->
    <div class="submit">
      <el-button type="primary" class="pur-goods-sub" :loading="Sendin" @click="commitGoods('purchaseHook')">{{submitMsg}}</el-button>
    </div>
  </div>
</template>

<script>
import {genUpToken} from '../../common/js/uploadToken.js'
import formItemVue from 'element-ui/packages/form/src/form-item.vue';
var XLSX = require('xlsx')
export default {
  data () {
    var validaTitle = (rules, value, callback) => {
      console.log(value)
      if (!value) {
        callback(new Error('请输入商品名称！'))
      } else {
        callback()
      }
    }
    return {
      model:{
        rules:{
          title: [
            { required: true, validator: validaTitle, trigger:'blur' }
          ]
        },
        tableData: [
          {
            title: '',//商品名称
            model: '',//规格型号
            brand: '',//品牌
            unit: '',//单位
            number:'',//数量
            ship_time:'',//期望出货日期
            attach_file: '',//附件
          }
        ]
      },
      multipleSelection: [],
      allChecked: false,
      endDate:'',//截止时间
      msgEndData: {
        isCorrect: false,
        msg: '请选择截止日期'
      },
      contacts: '',//联系人
      msgContacts: {
        isCorrect: false,
        msg: '请输入联系人姓名'
      },
      telPhone:'',//联系人手机号
      msgTelPhone:{
        isCorrect: false,
        msg: '手机号不能为空'
      },
      actionPath: 'https://upload-z2.qiniup.com',
      qiniuaddr: 'http://pd0m09cgh.bkt.clouddn.com/',
      postData: {},
      rowIndex: '',
      goodsResult: [],
      Sendin: false,
      submitMsg: '提交',
      imFile: '',
    };
  },
  components: {  },

  computed: {
    
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    tableHead() {
      return 'table-head';
    },
    // 表头的样式
    labelzone1(h, { column, $index }) {
      return h(
        'p',{
          'class':'goods-name'
        },
        [
          h('em', '*', {
          }),
          [column.label],
          h('span','（限40个字符以内，如：金刚砂合金锉）',{
          
          })
        ]
      );
    },
    labelzone2(h, { column, $index }) {
      return h('p',{'class':'specifications'},
      [
        [column.label],
        h('span','(限20个字符)',{
        })
      ])
    },
    labelzone3(h, { column, $index }) {
      return h(
        'p',{
          'class':'goods-name'
        },
        [
          h('em', '*', {
          }),
          [column.label]
        ]
      );
    },
    labelzone4(h, { column, $index }) {
      return h('p',{'class':'specifications'},
      [
        [column.label],
        h('span','(仅限pdf、jpg格式不大于5M)',{
        })
      ])
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    beforeGoodUpload(file) {
      // console.log('上传之前的',file)
    },
    handleGoodSuccess(response, file, fileList) {
      let imageUrl = this.qiniuaddr+response.hash;
      // console.log('上传成功之后','\n','response:',response,'\n','file:', file, '\n','fileList:',fileList,'\n')
      var rowFile = imageUrl
      this.model.tableData[this.rowIndex].attach_file = rowFile
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    getRow(index) {
      this.rowIndex = index
    },
    // 单挑数据的删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 添加商品
    addGoods(){
      let newGood = {
        title: '',
        model: '',
        brand: '',
        unit: '',
        number:'',
        ship_time:'',
        attach_file: ''
      }
      this.model.tableData.push(newGood)
    },
    // 页脚的全选
    toggleSelection(rows) {
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row); 
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 删除选中
    deleting() {
      if(this.multipleSelection.length === 0){
        this.$message({
          message: '请至少选择一条数据哦。',
          type: 'warning'
        });
      }else{
        this.model.tableData.map((value, index)=>{
          this.multipleSelection.map((val, i)=>{
            if(this.model.tableData[index] === this.multipleSelection[i]){
              this.model.tableData.splice(index, 1)
            }
          })
        })
      }
    },
    // 单挑选中
    singleSelected(val, row) {
     
    },
    Verification_empty(val, content, context) {
      if(val === ''){
        content.isCorrect = true
        return false
      }else{
        content.isCorrect = false
        return true
      }
      if(context){
        setTimeout(()=>{
          content.isCorrect = false
        },4000)
      }
    },
    Verification_tel() {
      let REG = /^[1][3,4,5,7,8][0-9]{9}$/
      if(this.telPhone === ''){
        this.msgTelPhone.isCorrect = true;
        return false
      }else if(!REG.test(this.telPhone)) {
        this.msgTelPhone.isCorrect = true;
        this.msgTelPhone.msg = '请输入正确的手机号';
        return false
      }else {
        this.msgTelPhone.isCorrect = false;
        return true
      }
    },
    //提交数据
    commitGoods (formName) {
      if(this.multipleSelection.length<1){
        this.$message({
          message: '请至少选择一个商品哦',
          type: 'warning'
        });
      }else{
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证手机号
            var endDateResult = this.Verification_empty(this.endDate,this.msgEndData)
            var contactResult = this.Verification_empty(this.contacts,this.msgContacts)
            var telPhonResult = this.Verification_tel()
            // console.log(endDateResult,contactResult,telPhonResult)
            if(!endDateResult || !contactResult || !telPhonResult){
              console.log('我还能够进来')
              return
            }
            var data = {
              goods : this.model.tableData,
              cut_off_time : this.endDate,		//截止时间
              contacts_name :	this.contacts,	//联系人
              mobile	: this.telPhone	//联系人手机号
            }
            this.$http.post('http://api.com/webapi/inquiry/single',data).then( (res) => {
              console.log('提交后响应的数据', res)
              if(res.status === 200){
                this.Sendin = true
                this.submitMsg = '正在提交'
                console.log('提交后响应的数据', res)
                var serverInfo = res.data;
                if(serverInfo.code === 200){
                  this.Sendin = false
                  this.submitMsg = '提交成功'
                }else{
                  this.submitMsg = '重新提交'
                  this.Sendin = false
                  this.$message({
                    message: serverInfo.info,
                    type: 'warning'
                  });
                }
              }else {
                this.$message({
                  message: '抱歉，服务器开小差了',
                  type: 'warning'
                });
              }
            })
          } else {
            console.log(`submit error`)
            return
          }
        })
      }
    },
    uploadFile: function () { // 点击导入按钮
      this.imFile.click()
    },
    importFile: function () { // 导入excel
      // this.fullscreenLoading = true
      let obj = this.imFile
      /* 
        如果元素不存在就不在执行了
      */
      if (!obj.files) {   
        // this.fullscreenLoading = false
        return
      }
      var f = obj.files[0]
      var reader = new FileReader()
      let $t = this
      reader.onload = function (e) {
        var data = e.target.result
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary'
          })
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        console.log('我是读取出来的文件',json)
        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    analyzeData: function (data) {  // 此处可以解析导入数据
      return data
    },
    dealFile: function (data) {   // 处理导入的数据
      console.log('我就是excel数据',data)
      this.imFile.value = ''
      // this.fullscreenLoading = false
      if (data.length <= 0) {
        // this.errorDialog = true
        // this.errorMsg = '请导入正确信息'
        console.log('请导入正确信息~~~~~~~~~~~~~~~~~~')
      } else {
        this.model.tableData = data
        console.log('this.model.tableData',this.model.tableData)
      }
    }
  },
  created() {
    var token;
    var policy = {};
    var bucket = 'purchase';
    var AK ='gawZjtk00TrJ9Di6AkTOSQluYytRdPgW-y8F1T5L';
    var SK = 'wpA9kYSwIU3aTWABLXRQ3rAaK3vTTYTcz8uzFn7b';
    var deadline = Math.round(new Date().getTime() / 1000) + 3600;
    policy.scope = bucket;
    policy.deadline = deadline;
    token=genUpToken(AK, SK, policy);
    this.postData.token=token;
    // console.log('token',this.postData)
  },
  mounted() {
    this.imFile = document.getElementById('imFile')
  }
}
</script>

<style lang='less'>
  .purchaseList{
    .table-head{
      background-color: #f2f1f1!important;
      // height: 72px;
      padding: 6px 0 !important;
    }
    .col{
      padding-right: 10px;  
      padding-bottom:0px;
      & .el-form-item{
        margin-bottom: 16px;
      }
      & .el-form-item__content{
        line-height: 32px;
      }
    }
    .goods-name{
      em{
        color: red;
        vertical-align: bottom;
        line-height: 19px;
      }
      span{
        color: #8e8d8d;
        font-size: 12px;
      }
    }
    .specifications{
      span{
        display: inline-block;
          color: #8e8d8d;
        font-size: 12px;
      }
    }
    .form-date{
      width: 100%;
      input{
        padding-right: 10px;
      }
    }
    .delsingle{
      color: #2C81EF;
      cursor: pointer;
      &:hover{
        text-decoration: underline
      }
    }
    .add-goods{
      width: 100%;
      margin-top: 12px;
      .add-goods-btn{
        width: 100%;
        height: 46px;
        font-size: 16px;
      }
    }
    .other-opra{
      width: 100%;
      box-sizing: border-box;
      height: 44px;
      line-height: 44px;
      padding-left: 22px;
      margin-top: 10px;
      background-color: #f2f1f1;
      .check{
        margin-right: 28px;
      }
      .down-tips{
        display: inline-block;
        margin-left: 25px;
        font-size: 12px;
        color: #666;
        .downlode-excel{
          color: #2C81EF;
          cursor: pointer;
        }
      }
    }
    .title{
      font-size: 12px;
      text-align: justify;
      text-align-last: justify;
      color: #666;
      span{
        color: #ff0303;
      }
    }
    .closing-date{
      position: relative;
      margin-top: 20px;
      padding-left: 16px;
      &>.tips{
        bottom: -16px;
        left: 90px;
      }
    }
    .concats{
      padding: 20px 0;
      padding-left: 16px;
      border-bottom: 1px solid rgb(235, 238, 245);
      .small{
        width: 72%;
      }
      .name{
        position: relative;
        &>.tips{
          left: 66px;
          bottom: -16px;
        }
      }
    }
    .submit{
      width: 140px;
      margin: 20px auto 0px;
      .pur-goods-sub{
        width: 140px;
        height: 50px;
      }
    }
    .error_empty .el-input__inner{
      border-color: #f56c6c;
      transition: all 0.75s;
    }
    .tips{
      position: absolute;
      color: #f56c6c;
      font-size: 12px;
      bottom: 0px;
      left: 12px;
      transition: all 0.75s;
    }
  }
</style>