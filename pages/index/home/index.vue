<template>
  <div class="home">
    <div class="home_setting"></div>
    <div>
      <div></div>
      <div></div>
    </div>
      <!-- <div>服务端渲染：{{title}}</div> -->
  </div>
</template>
<script>
export default {
  // async asyncData({ params, $axios }) {
  //   const { data } = await $axios.post(`/postData`, {id: 123,name: 'ceshi'});
  //   console.log(data);
  //   return { title: data.data.title };
  // }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/style/style.scss";
.home{
  background-color: $main-bg;
  .home_setting{
    width: 99%;
    margin: auto;
    height: 300px;
    margin-top: 31px;
    background-color: $common-color;
    box-shadow: 1px 5px 6px $shaow-color;
    -webkit-box-shadow: 1px 5px 6px $shaow-color;
    -moz-box-shadow: 1px 5px 6px $shaow-color;
  }
}
</style>