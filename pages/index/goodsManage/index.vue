<template>
  <div class="goods-manage" v-loading="isLoading">
    <div class="util__content">
      <div class="util__card-list-title">商品列表</div>
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:left">
          <span>查询商品：</span>
          <span>
            <el-input style="width:300px" placeholder="请输入商品名称/分类名称" size="small" v-model="searchKey" @keyup.native.enter="searchFor" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchFor"></el-button>
            </el-input>
          </span>
          <el-button type="text" style="float: right; padding: 3px 0" icon="el-icon-document-add" @click="add()" >新增</el-button>
        </div>
        <div class="table">
          <el-table :data="goodsList" style="width: 100%" :default-sort="{prop: 'price', order: 'descending'}" empty-text="暂无数据">
            <el-table-column prop="goodsName" label="商品名称" width="180"></el-table-column>
            <el-table-column prop="price" label="商品价格(单位:元)" sortable width="160" align="center"></el-table-column>
            <el-table-column label="商品海报">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <el-link :href="scope.row.picUrl" type="danger" target="_blank">{{ scope.row.picUrl }}</el-link>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.picUrl }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="introduce" label="商品介绍" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sortName" label="商品分类" width="80"></el-table-column>
            <el-table-column label="轮播选择" align="center" width="80">
              <template slot-scope="scope">
                <el-switch @change="switchBanner(scope.row)" v-model="scope.row.bannerId" active-color="#13ce66" inactive-color="#bbbbbb"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="优惠设置" align="center" width="100">
              <template slot-scope="scope">
                <span class="settings-icon" v-if="!scope.row.discount_id" @click="addDiscount(scope.row)"><i class="el-icon-plus"></i></span>
                <span class="settings-icon" v-if="scope.row.discount_id" @click="editDiscount(scope.row)"><i class="el-icon-edit"></i></span>
                <span class="settings-icon" v-if="scope.row.discount_id" @click="deleteDiscount(scope.row)"><i class="el-icon-refresh"></i></span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="150">
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

    <!-- 新增限时优惠 -->
    <div class="add-discount-dialog">
      <el-dialog title="新增限时优惠" :visible.sync="discountVisible" width="40%">
        <el-form :model="discountForm" label-width="80px" size="small">
          <el-form-item label="优惠价格">
            <el-input v-model="discountForm.discountSum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="优惠时间" >
            <el-col :span="11">
              <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间" v-model="discountForm.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" v-model="discountForm.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="discountVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="saveDiscount()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增商品弹框 -->
    <div class="add-modal">
      <el-dialog title="商品信息" :visible.sync="dialogFormVisible" width="60%">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" >
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
          <el-form-item label="分类图标" prop="sortIcon">
            <el-input v-model="sortForm.sortIcon" size="small"></el-input>
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
import { mapMutations } from "vuex";
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
      discountVisible: false,
      isUpdate: false, // 确定是修改还是新增
      isLoading: true, // 默认显示loading
      goodsList: [],
      sortOptionList: [],
      sortForm: { sortName: "", sortIcon: "" },
      sortRules: {
        sortName: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        sortIcon: [
          { required: true, message: "请输入商品分类图标地址", trigger: "blur" }
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
      sortDialog: false, // 分类对话框
      discountForm: {
        discountSum: '', // 优惠金额
        startTime: '', // 优惠开始时间
        endTime: '', // 优惠结束时间
      },
      addRow: {}, // 添加优惠选中行
      isDisAddState: true, // 添加优惠
    }
  },
  mounted() {
    this.isLoading = true
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
    /* 查询商品 */
    searchFor() {
      this.pages.pageNum = 1
      this.getGoodsList()
    },
    
    /* 分页 */
    getGoodsList(){
      this.isLoading = true
      this.$axios.get('/getGoodsList',{params: {pageNum: this.pages.pageNum, pageSize: this.pages.pageSize, findName: this.searchKey}}).then(res=> {
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
        item.bannerId = item.banner_id === null ? false : true
        item.discountSum = item.discount_sum
        item.discountId = item.discount_id
        item.startTime = item.start_time
        item.endTime = item.end_time
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
        .post("/addCategory", { sortName: this.sortForm.sortName, sortIcon: this.sortForm.sortIcon })
        .then(res => {
          if (res.code === 200) {
            this.$message({ message: "新增分类成功", type: "success" });
            this.sortForm.sortName = "";
            this.sortForm.sortIcon = "";
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
    },
    switchBanner(row) {
      if (row.bannerId) {
        this.addBanner(row)
        return
      }
      this.deleteBanner(row)
    },
    /* 添加banner */
    addBanner(opt) {
      this.$axios.post('/addBanner',{id: opt.id}).then(res=>{
        if (res.code === 200) {
          this.goodsList.forEach(item=>{
            if (item.id === opt.id) {
              item.banner_id = res.data.bannerId
              item.bannerId = true
            }
          })
          this.$message({ message: "新增banner成功", type: "success" })
          return
        }
        this.$message({ message: "新增banner失败", type: "error" })
      })
    },
    /* 删除banner */
    deleteBanner(opt) {
      this.$axios.delete('/deleteBanner', {params: {bannerId: opt.banner_id}}).then(res=>{
        if (res.code === 200) {
          this.goodsList.forEach(item=>{
            if (item.id === opt.id) {
              item.banner_id = null
              item.bannerId = false
            }
          })
          this.$message({ message: "删除banner成功", type: "success" })
          return
        }
        this.$message({ message: "删除banner失败", type: "error" });
      })
    },
    /* 添加优惠 */
    addDiscount(row) {
      this.discountForm = {}
      this.addRow = row
      this.discountVisible = true
      this.isDisAddState = true
    },
    /* 修改优惠 */
    editDiscount(row) {
      this.discountForm = row
      this.discountVisible = true
      this.isDisAddState = false
    },
    saveDiscount() {
      this.$axios.post('/addDiscount',{id: this.addRow.id, ...this.discountForm}).then(res=>{
        this.discountVisible = false
        if (res.code === 200) {
          this.addDisToGoodList(res.data)
          this.$message({ message: "新增优惠成功", type: "success" })
          return
        }
        this.$message({ message: "新增优惠失败", type: "error" });
      })
    },
    updateDiscount() {
      this.$axios.put('/updateDiscount', {...this.discountForm}).then(res=>{
        this.discountVisible = false
        if (res.code === 200) {
          this.addDisToGoodList(this.discountForm)
          this.$message({ message: "修改优惠成功", type: "success" })
          return
        }
        this.$message({ message: "修改优惠失败", type: "error" });
      })
    },
    addDisToGoodList(opt) {
      this.goodsList.forEach(item=>{
        if (item.id === opt.id) {
          item.discountId = item.discount_id = opt.discountId
          item.startTime = item.start_time = opt.startTime
          item.endTime = item.end_time = opt.endTime
          item.discountSum = item.discount_sum = opt.discountSum
        }
      })
    },
    deleteDiscount(row) {
      this.$confirm('确定删除该优惠配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete('/deleteDiscount', {params: {discountId: row.discountId}}).then(res=> {
            if (res.code === 200) {
              this.addDisToGoodList({discountId: null,startTime: null, endTime: null, discountSum: null})
              this.$message({ type: 'success', message: '删除优惠成功!' });
              return
            }
            this.$message({ type: 'error', message: '删除优惠失败!' });
          })
        })
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/components/util.scss";
.goods-manage {
  .settings-icon {
    padding: 0 5px;
    color: #409eff;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
