<template>
  <div class="home">
    <router-link to="/create" class="my-link">创建问卷 </router-link>
    <router-link to="/login" class="my-link">填写问卷 </router-link>
    <router-link to="/result" class="my-link">填写情况</router-link>
    <router-view></router-view>
  </div>
</template>




<style>
.class {
  height: 1280px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>