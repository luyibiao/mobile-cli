<template>
  <div class="home">
    ....
    <button @click="aa">点击 </button>
    <div></div>
  </div>
</template>

<script>
import main from '../components/main'
export default {
  created() {
    // this.$dialogs(main)
    console.log(this)
  },
  methods: {
    aa() {
      this.$dialogs(main)
    }
  },
}
</script>