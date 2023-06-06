<template>
  <div id="home">
    <Header></Header>
    <div id="imageofhome">
     
    </div>
    <div>
   <router-link to="/create" class="link" id="create-link"> </router-link>
    
   <router-link to="/login" class="link" id="login-link"> </router-link>
    <router-link to="/result" class="link" id="result-link"></router-link>
    <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Header from "../smallcomponents/header.vue"

export default {
  components: {
   Header
  },
}
</script>



<style>

#imageofhome{

min-height: 350px;
  background-image: url("@/assets/image/Qstar.png"); 
  background-size: cover;
  margin: 0 auto;
}
.link{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin: 30px 60px;
  
  color: #333;
  min-width: 100px;
  min-height: 100px;
}
#create-link {
 
  background-image: url("@/assets/image/添加.png");
  
}

#create-link:hover {
  background-color: #ddd;
  /* font-size: 18px; */
}
#login-link {
 
  background-image: url("@/assets/image/填写.png");
 
}

#login-link:hover {
  background-color: #ddd;
  /* font-size: 18px; */
}
#result-link {
 
  background-image: url("@/assets/image/查看.png");
 
}

#result-link:hover {
  background-color: #ddd;
  /* font-size: 18px; */
}
</style>