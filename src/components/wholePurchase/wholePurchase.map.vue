<template>
  <div class="wholePurchase">
    <div class="solution-type clearfix">
      <div class="title fl"><span class="red">*</span>解决方案类型：</div>
      <ul class="solution fr">
        <li v-for="(type, index) in types" class="solution-item" :class="{active:index === currentindex}" :key="index" @click="handelCurrent(index)">
          <img src="./type.png" width="100%" height="100%" />
          <div class="tagging">
            {{type}}
          </div>
        </li>
      </ul>
    </div>
    <div class="demand-describe clearfix">
      <div class="title fl"><span class="red">*</span>需求详情描述：</div>
      <div class="fl" style="width:938px;">
        <el-input
          type="textarea"
          style="height:200px;"
          :autosize="{ minRows: 9}"
          placeholder="请输入内容"
          v-model="describe">
        </el-input>
      </div>
    </div>
    <div class="add-attachment">
      <div class="title fl">添加附件：</div>
      <div class="upload-attach">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList">
           <el-button plain size="small" icon="el-icon-upload2">上传pdf、jpg等</el-button>
          <span slot="tip" style="margin-left:16px;" class="el-upload__tip">详细阐述解决方案的需求背景和情况说明</span>
        </el-upload>
      </div>
      <div class="upload-excel">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileListExcel">
           <el-button plain size="small" icon="el-icon-upload2">上传Excel</el-button>
          <span slot="tip" style="margin-left:16px;" class="el-upload__tip">通过excel上传商品需求,<a href="javascript:;">下载excel模板</a></span>
        </el-upload>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="submit">
      <el-button type="primary" class="pur-goods-sub">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      types: ['金属材料','机械设备、零件','电料、电工器材','仪表仪器','工、磨、刀、量、横'],
      currentindex: 0,
      describe: '',
      fileList: [],
      fileListExcel: []
    };
  },
  components: {},

  computed: {},

  methods: {
    handelCurrent(index) {
      this.currentindex = index
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    }
  }
}
</script>

<style lang='less'>
  .wholePurchase{
    .title{
      width: 124px;
      font-size: 14px;
      text-align: right;
    }
    .solution-type{
      margin-bottom: 18px;
      .solution{
        font-size: 0px;
        .solution-item{
          display: inline-block;
          position: relative;
          box-sizing: border-box;
          width: 180px;
          margin-right: 10px;
          font-size: 14px;
          &:last-child{
            margin-right: 0px;
          }
          .tagging{
            position: absolute;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: rgba(0, 0, 0, 0.4);
            color: #fff;
            text-align: center;
            bottom: 0px;
          }
          &.active{
            border: 1px solid #2c81ef;
          }
        }
      }
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
    .submit{
      width: 140px;
      margin: 20px auto 0px;
      .pur-goods-sub{
        width: 140px;
        height: 50px;
      }
    }
  }
</style>