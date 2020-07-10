<template>
  <van-dialog
    v-model="visible"
    :show-confirm-button="showConfirmButton"
    :show-cancel-button="showCancelButton" 
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText" 
    :title="title"
    :get-container="'body'" 
    :class="classes"
  >
    <div class="dialog__content">

      <slot >这是一段信息</slot>
    </div>
    <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons" v-if="isShowBtn">
      <slot name="footer">
          <van-button class="van-button van-button--default van-button--large van-dialog__cancel" @click="onCancel">取 消</van-button>
          <van-button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" @click="onSubmit">确 定</van-button>
      </slot>
    </div>
  </van-dialog>
</template>
<script>
export default {
  name: "ui-popup",
  props: {
    value: {
      type: null
    },
    title: {
      type: String
    },
    //显示确认按钮
    showConfirmButton: {
      type: Boolean,
      default: false
    },
    //显示取消按钮
    showCancelButton: {
      type: Boolean,
      default: false
    },
    //显示取消按钮
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    //显示取消按钮
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    //是否是popup
    isPopup: {
      type: Boolean,
      default: true
    },
    // 是否显示按钮
    isShowBtn: {
      type: Boolean,
      default: true
    },
    // 是否撑满全屏
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    visible: {
      get: function() {
        return this.$parent.visible;
      },
      set: function(v) {
        this.$parent.reject(this.value);
      }
    },
    classes() {
      return [
        this.isPopup && 'isPopup',
        this.isFullScreen && 'isFullScreen'
      ]
    }
  },
  methods: {
    onCancel() {
      history.back();
      this.$emit('onCancel', this.value)
    },
    onSubmit() {
      history.back();
      this.$emit('onSubmit', this.value)
    },
    onback(e){
      console.log(e,'eeeees', this.$el)
      document.body.contains(this.$el) &&  this.$parent.closed();
    },
    pushState(){
      let times = new Date().getTime();
      let temp
      if (/uiPopup/ig.test(location.href)) {
        temp = ''
      } else {
        temp = /\?/ig.test(location.href) ? `&uiPopup=${times}`: `?&uiPopup=${times}`;
      }
      if (this.$router.mode == 'hash') {
        window.history.pushState({status: 0} ,'' , location.href + temp); 
      } else {
        location.hash = temp;
      }
    }
  },
  created() {
    if (this.$router.mode == 'hash') {
      setTimeout(_ => {
        window.onpopstate = this.onback;
      }, 100)
    } else {
       window.onhashchange = this.onback
    }
    this.pushState();
  },
  mounted() {
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/variable.scss";
@import "~@/assets/scss/mixin.scss";
.van-dialog{
  max-width: 100%;
  max-height: 100%;
  .dialog__content{
    padding: 0.6667rem;
    max-height: 16.6667rem;
    overflow: scroll;
  }
  &.isFullScreen {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 0;
    transform: translate3d(0, 0, 0);
    .van-dialog__content {
      height: 100%;
    }
    .dialog__content {
      padding: 0;
      max-height: none;
      height: 100%;
    }
  }
}
</style>