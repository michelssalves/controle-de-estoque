<template>
  <div>

    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import NavBar from './views/NavBar.vue';
export default {
  components:{
    NavBar
  }
}
</script>