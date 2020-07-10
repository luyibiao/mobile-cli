<template>
  <div class="app-content">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view class="router-view"/>
    </keep-alive>
    <router-view v-else class="router-view" />
  </div>
</template>

<style lang="scss">
.app-content {
  height: 100%;
  .router-view {
    height: 100%;
    background-color: #f6f5f5;
  }
}
</style>