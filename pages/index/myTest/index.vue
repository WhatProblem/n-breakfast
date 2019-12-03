<template>
    <div class="my-test">
        <el-input v-model="id"></el-input>
        <el-button @click="login">登录</el-button>
        <el-button @click="addFav">收藏</el-button>
        <hr>
        <el-input v-model="goodsId"></el-input>
        <el-button @click="goodsDetail">商品详情</el-button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: null,
            goodsId: null
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
        }
    }
}
</script>
