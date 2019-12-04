<template>
    <div class="my-test">
        <el-input v-model="id" placeholder="商品id"></el-input>
        <el-button @click="login">登录</el-button>
        <el-button @click="addFav">收藏</el-button>
        <hr>
        <el-input v-model="goodsId" placeholder="商品goodsId"></el-input>
        <el-button @click="goodsDetail">商品详情</el-button>
        <el-input v-model="goodsNum" placeholder="收藏的商品数量"></el-input>
        <el-button @click="addCart">添加到购物车</el-button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: null,
            goodsId: null,
            goodsNum: null
        }
    },
    methods: {
        login() {
            this.$axios.post('/app/login', {userName: 'ws1234',password: '123456'}).then(res=>{
                console.log(res)
            })
        },
        addFav() {
            this.$axios.post('/app/addOrDelFav', {id: this.id, status: 1}).then(res=>{
                console.log(res)
            })
        },
        goodsDetail() {
            this.$axios.get('/app/goodsDetail', {params: {id: this.goodsId}}).then(res=>{
                console.log(res)
            })
        },
        addCart() {
            this.$axios.post('/app/addOrDelCart', {id: this.goodsId, status: 3, goodsNum: this.goodsNum}).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
