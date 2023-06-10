<template>
    <div style="height: 50px;   line-height: 50px;display: flex;background-color:rgb(245,255,250,0.5);;" >
        <div style="width: 200px;padding-left: 30px;font-weight: bold;color: black;cursor: pointer;font-family:'Courier New', Courier, monospace;font-size:xx-large;" @click=" returntohome ">QSTAR</div>
        <div style="flex: 1;"> </div>
        <div style="width: 100px;"> 

          <el-dropdown>
    <span class="el-dropdown-link">
      {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown" >
      <el-dropdown-item @click.native="changeToUserData">个人资料</el-dropdown-item>
      <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
          <!-- <el-dropdown id="xiala" >
    <span class="el-dropdown-link">{{ username }}</span>
   
      <el-dropdown-menu style="cursor: pointer;"  slot="dropdown">
        <el-dropdown-item  @click="test">personal data</el-dropdown-item>
        <el-dropdown-item>quit</el-dropdown-item>
       
      </el-dropdown-menu>
    
  </el-dropdown> -->
</div>

    </div>
</template>

<script>
export default {
    name:"Header",
data(){
return{
username:"",

}

},

methods:{

  returntohome(){
    const currentRoute = this.$route.path;
  if (currentRoute !== "/home") {
    this.$router.push("home");
  }
  },
  changeToUserData(){
    const currentRoute = this.$route.path; 
  if (currentRoute !== "/userdata") {
    this.$router.push("userdata");
  }
   
  },
  logout(){
    const username = localStorage.getItem("username");
  if (!username) {
    this.$message.error("当前未登录");
    const currentRoute = this.$route.path;
  if (currentRoute !== "/signin") {
    this.$router.push("signin");
  }
  } else {
    localStorage.setItem("username", "");
    this.$router.push("signin")
    location.reload();
  }
//     localStorage.setItem("username", "");
//  this.$router.push("signin")
//  location.reload();
  },
  test(){

    alert("test")
  },
changetouserdata(){
  this.$router.push('/userdata')
},

},

mounted(){
  this.username= localStorage.getItem('username');


},
}
</script>

<style>
#xiala{
    /* margin-top: 16px; */
    cursor: pointer;
}
</style>