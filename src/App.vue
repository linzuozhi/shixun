<template>
  <div id="app" ref="vantaRef" >
    <!-- <Header></Header> -->
    <router-link to="/"></router-link>
    <router-view></router-view>
    <!-- <router-link to="/create" class="my-link">创建问卷 </router-link>
    
    <router-link to="/login" class="my-link">填写问卷 </router-link>
    <router-link to="/result" class="my-link">填写情况</router-link>
     <router-view></router-view> -->
   
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <button  class="btn">Add Div</button> -->
    <!-- <el-button  type="success" icon="el-icon-check" circle></el-button> -->
    <!-- <el-button @click="addDiv1" type="primary" >单选题</el-button>
    <el-button @click="addDiv2" type="primary">填空题</el-button>
    <el-button @click="addDiv3" type="primary">多选题</el-button> -->
    <!-- <div v-for="(div, index) in div1" :key="index" >
   
      <single></single>
    </div>
    <div v-for="(div, index) in div2" :key="index" >
     <fillin></fillin>
    </div>
    <div v-for="(div, index) in div3" :key="index" >
      <duoxuan></duoxuan>
    </div> -->
    
   
  </div>
</template>

<script>


import selectdiv from './components/smallcomponents/selectdiv.vue'
import xiala from './components/smallcomponents/xiala.vue'
import fillin from './components/smallcomponents/fillin.vue'
import single from './components/smallcomponents/single.vue'
import duoxuan from './components/smallcomponents/duoxuan.vue'
import Header from "./components/smallcomponents/header.vue"
import axios from 'axios'
export default {
  

  name: 'App',
  components: {
    
    selectdiv,
    xiala,
    fillin,
    single,
    duoxuan,
    Header,
  },
  beforeDestroy() {
    window.addEventListener('unload', this.handleUnload);
  },
  data() {
    return {
      // div1: [],
      
      // div2:[],
      // div3:[],
    }
  },
//  created(){
//   axios.get("http://localhost:8080/hello").then(function(response){console.log(response.data);})
 
//  },
  methods: {
    handleUnload() {
      localStorage.removeItem('link4usercheck');
    }

  }
}
</script>

<style>

#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* min-width: 800px; */
  min-height: 800px;
  /* background-image: url("@/assets/logo.png"); */
  background-size: cover;
  /* display:grid; */
  /* margin-top: 60px; */
  /* background-image: url("C:\Users\linzuozhi\Pictures\Feedback\{BE62AAEF-09EA-4E2D-9376-03B3E1DE4F57}\Capture001.png"); */
  /* display: grid;
  place-items: center;
  height: 0vh; */

}



</style>
