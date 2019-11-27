<template>
  <div class="goods-manage" v-loading="isLoading">
    <div class="util__content">
      <h5 style="text-align:left;padding-left:20px">商品列表</h5>
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:left">
          <span>查询商品：</span>
          <span>
            <el-input style="width:300px" placeholder="请输入内容" size="small" v-model="searchKey" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </span>
          <el-button type="text" style="float: right; padding: 3px 0" icon="el-icon-document-add" @click="add()" >新增</el-button>
        </div>
        <div class="table">
          <el-table :data="goodsList" style="width: 100%" :default-sort="{prop: 'price', order: 'descending'}" empty-text="暂无数据">
            <el-table-column prop="goodsName" label="商品名称" width="180"></el-table-column>
            <el-table-column prop="price" label="商品价格(单位:元)" sortable width="160" align="center"></el-table-column>
            <el-table-column prop="picUrl" label="商品海报" :show-overflow-tooltip="true" width="300"></el-table-column>
            <el-table-column prop="introduce" label="商品介绍" width="300" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sortName" label="商品分类" width="80"></el-table-column>
            <el-table-column align="right" width="180">
              <template slot="header" slot-scope="scope">
                <span>操作</span>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" round @click="editList(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" round @click="deleteList(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pages.pageNum" :page-size="pages.pageSize" layout="total, prev, pager, next" :total="pages.total"></el-pagination>
        </div>
      </el-card>
    </div>

    <!-- 新增商品弹框 -->
    <div class="add-modal">
      <el-dialog title="商品信息" :visible.sync="dialogFormVisible" width="60%">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="form.goodsName" size="small"></el-input>
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
                  <el-form-item label="商品分类" prop="sortId">
                    <el-select style="width:100%" size="small" v-model="form.sortId" placeholder="请选择商品分类" no-data-text="暂无数据，请先新增" >
                      <el-option :label="item.sort_name" :value="item.sort_id" v-for="item in sortOptionList" :key="item.sort_id" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-button @click="sortDialog=true" style="width:100%;margin-top:4px;" size="small" type="primary" icon="el-icon-plus" >新增分类</el-button>
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
          <el-button @click="resetForm" size="small">重置</el-button>
          <el-button type="primary" @click="save" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="add-sort-dialog">
      <el-dialog title="商品分类名称" width="40%" :visible.sync="sortDialog" :append-to-body="true">
        <el-form :model="sortForm" :rules="sortRules" ref="ruleSortForm" label-width="100px" class="demo-ruleForm" >
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
      pages: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      searchKey:'',
      dialogTableVisible: false,
      dialogFormVisible: false,
      isUpdate: false, // 确定是修改还是新增
      isLoading: true, // 默认显示loading
      goodsList: [],
      sortOptionList: [],
      sortForm: { sortName: "" },
      sortRules: {
        sortName: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      },
      form: {
        goodsName: "",
        price: null,
        picUrl: "",
        sortId: "",
        introduce: ""
      },
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 0.0, message: "价格不能低于0元", trigger: "blur" }
        ],
        picUrl: [
          {
            required: true,
            message: "请输入商品海报地址(来自百度图片)",
            trigger: "blur"
          }
        ],
        sortId: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        introduce: [
          { required: true, message: "请输入商品简介", trigger: "blur" },
          { min: 0, max: 255, message: "0到255个文字", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      sortDialog: false // 分类对话框
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getGoodsList()
      this.$axios.get("/getCategory").then(res => {
        if (res.code === 200) {
          this.sortOptionList = res.data
        }
      });
    },
    /**
     * 分页
     */
    getGoodsList(){
      this.isLoading = true
      this.$axios.get('/getGoodsList',{params: {pageNum: this.pages.pageNum, pageSize: this.pages.pageSize}}).then(res=> {
        if (res.code === 200) {
          this.goodsList = this.adapter(res.data.list)
          this.pages.total = res.data.total
          this.isLoading = false
        }
      })
    },
    /* 适配数据 */
    adapter(list) {
      let resp = JSON.parse(JSON.stringify(list))
      resp.forEach(item=>{
        item.goodsName = item.goods_name
        item.picUrl = item.pic_url
        item.sortId = item.sort_id
        item.sortName = item.sort_name
      })
      return resp
    },
    add() {
      this.dialogFormVisible = true
      this.isUpdate = false
      this.form = {}
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    addSort() {
      this.sortDialog = false;
      this.$axios
        .post("/addCategory", { sortName: this.sortForm.sortName })
        .then(res => {
          if (res.code === 200) {
            this.$message({ message: "新增分类成功", type: "success" });
            this.sortForm.sortName = "";
            this.sortOptionList.push(res.data);
            return;
          }
          this.$message({ message: "新增分类失败", type: "error" });
        });
    },
    save() {
      this.dialogFormVisible = false;
      if (this.isUpdate) {
        this.updateGoods()
        return
      }
      this.addGoods()
    },
    /**
     * 新增商品
     * @param {goodsName}
     * @param {price}
     * @param {picUrl}
     * @param {sortId}
     * @param {introduce}
     */
    addGoods() {
      this.$axios.post("/addGoods", this.form).then(res => {
        if (res.code === 200) {
          this.$message({ message: "新增商品成功", type: "success" });
          let resp = res.data
          this.sortOptionList.forEach(item=>{
            if (item.sort_id === resp.sortId) {
              resp.sortName = item.sort_name
            }
          })
          this.goodsList.push(resp)
          this.form = {
            goodsName: "",
            price: null,
            picUrl: "",
            sortId: "",
            introduce: ""
          };
          return;
        }
        this.$message({ message: "新增商品失败", type: "error" });
      });
    },
    editList(opt) {
      this.form = opt
      this.dialogFormVisible = true
      this.isUpdate = true
    },
    deleteList(opt) {
      this.$confirm('确定删除当前数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete('/deleteGoods', {params: {id: opt.id}}).then(res=>{
            if (res.code === 200) {
              this.$message({ type: 'success', message: '删除成功!' })
              this.delSelect(opt)
              return
            }
            this.$message({ type: 'error', message: '删除失败!' })
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })    
        })
    },
    /* 删除当前数据 */
    delSelect(opt) {
      for (let i = this.goodsList.length-1;i>=0;i--) {
        if (this.goodsList[i]['id'] === opt.id) {
          this.goodsList.splice(i, 1)
          return
        }
      }
    },
    /**
     * 修改商品
     * @param {goodsName}
     * @param {price}
     * @param {picUrl}
     * @param {sortId}
     * @param {introduce}
     * @param {id}
     */
    updateGoods() {
      this.$axios.post("/updateGoods", this.form).then(res => {
        if (res.code === 200) {
          this.$message({ message: "修改商品成功", type: "success" });
          this.form = {}
          return;
        }
        this.$message({ message: "修改商品失败", type: "error" });
      });
    },
    handleSizeChange() {

    },
    /* 分页 */
    handleCurrentChange(val) {
      this.pages.pageNum = val
      this.getGoodsList()
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/components/util.scss";
.goods-manage {
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix {
    font-size: 14px;
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
