<template>
  <div id="total">
<div style="font-size: 75px;font-family: 'Courier New', Courier, monospace; margin-bottom: 30px;">Welcome to QSTAR</div>
    <div id="window">

      <div id="smallwindow">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button @click="changetosignup">注册</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
    <span></span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {},

  data() {
    return {
      test1: "Yonghuming",
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
      },
    };
  },
  methods: {
    changetosignup() {
      this.$router.push("/signup");
    },
    changepage() {
      this.$router.push("/home");
    },
    test() {
      console.log("登录成功");
      localStorage.setItem("username", this.form.username);
      const username = localStorage.getItem("username");
      console.log(username);
      this.$router.push("/home");
      location.reload();

    },
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {


          axios.post("http://localhost:9090/signin", {
            username: this.form.username,
            password: this.form.password,
          })
              .then((response) => {
                if (response.data === 1) {
                  
                  console.log("登录成功");
                  localStorage.setItem("username", this.form.username);
                  const username = localStorage.getItem("username");
                  console.log(username);
                  this.$router.push("/home");
                  location.reload();
                  
                } else {
                  this.$message.error("用户名或密码错误");
                }
              })
              .catch((error) => {
                console.error(error);
                this.$message.error("登录失败，请重试");
              });

        } else {
          console.log("登录失败");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#total {
  background-image: url("@/assets/image/sofa-7939061_1920.png"); 
  background-size: cover;
  height: 100%;
  width: 100%;
  min-height:800px;
  margin-top: 0;
  padding: 0;
}



#window {
  margin: 0 auto;
  width: 500px;
  height: 400px;
  background-color:  #F5F5F5;
  display: flex;
  justify-content: center;
  align-items: center;
  border:1px solid rgb(208, 218, 220);
        box-shadow: 0 0 10px #2094bb;
        border-radius: 22px;
        animation: floatUp 1s ease-in-out forwards;
        
}
@keyframes floatUp {
  0% {
    transform: translateY(20%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes divDisappear {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-20%);
    opacity: 0;
  }
}
#window:hover {
  
  box-shadow: 0 0 20px #2094bb;
}


</style>