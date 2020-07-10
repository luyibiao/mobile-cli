<template>
  <div id="app">
    <my-content />
  </div>
</template>

<script>
import('./assets/scss/reset.css');
import('./assets/scss/base.scss');
import('./assets/scss/common.scss');
import myContent from './views/app/content'
export default {
  components: {
    myContent
  },
  created() {
     //在页面加载时读取sessionStorage里的状态信息 
    if (sessionStorage.getItem("this.$store") && process.env.NODE_ENV === 'production') {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("this.$store"))))
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", ()=>{
      sessionStorage.setItem("this.$store",JSON.stringify(this.$store.state));
    });
    // 苹果手机执行下列方法
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("this.$store",JSON.stringify(this.$store.state))
    }, false);

    //如果页面包含 uiPopup的标记 则认为是在弹穿页面刷新，回退一步
    /uiPopup/ig.test(location.href) && history.back();
  },
}
</script>
<style lang="scss">
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';
html, body{
    @include inlineBox($display: block);
    overflow: hidden;
    line-height: 1em;
  }
  body {
    font-size: 14px;
  }
  #app {
    @include inlineBox($display: block);
    background: $bg-normal;
    overflow: hidden;
  }
</style>
