<template>
  <div class="goods-manage">
    <div class="util__content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button type="text" style="float: right; padding: 3px 0" icon="el-icon-document-add" @click="add()">新增</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
      </el-card>
    </div>

    <!-- 新增商品弹框 -->
    <div class="add-modal">
      <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="form.price" type="number" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品海报" prop="picUrl">
                <el-input v-model="form.picUrl" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="18">
                  <el-form-item label="商品分类" prop="sortId" >
                    <el-select style="width:100%" size="small" v-model="form.sortId" placeholder="请选择活动区域">
                      <el-option label="分类1" value="shanghai"></el-option>
                      <el-option label="分类2" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-button @click="sortDialog=true" style="width:100%;margin-top:4px;" size="small" type="primary" icon="el-icon-plus">新增分类</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="商品简介" prop="introduce">
              <el-input type="textarea" v-model="form.introduce"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="add-sort-dialog">
      <el-dialog title="商品分类名称" width="40%" :visible.sync="sortDialog" :append-to-body="true">
        <el-form :model="sortForm" :rules="sortRules" ref="ruleSortForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="sortName">
            <el-input v-model="sortForm.sortName" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="sortDialog=false">取消</el-button>
          <el-button type="primary" @click="addSort">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      sortForm: {sortName: ''},
      sortRules: {
        sortName: [
          { required: true, message: '请输入商品分类名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 0.00, message: '价格不能低于0元', trigger: 'blur' }
        ],
        picUrl: [
          { required: true, message: '请输入商品海报地址(来自百度图片)', trigger: 'blur' }
        ],
        sortId: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入商品简介', trigger: 'blur' },
          { min: 0, max: 255, message: '0到255个文字', trigger: 'blur' }
        ],
      },
      formLabelWidth: "120px",
      sortDialog: false, // 分类对话框
    };
  },
  methods: {
    add() {
      this.dialogFormVisible = true
      this.$axios.get('/getTest').then(res=>{
        console.log(res)
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    addSort() {
      this.sortDialog = false
      console.log(this.sortForm.sortName)
      this.$axios.post('/addCategory',{sortName: this.sortForm.sortName}).then(res=>{
        this.sortForm.sortName = ''
        console.log(res)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/components/util.scss";
.goods-manage {
  height: 1000px;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .el-card,
  .box-card {
    width: 100%;
  }










.el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}

  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
}
</style>
