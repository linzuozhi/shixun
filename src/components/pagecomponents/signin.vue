<template>
  <div id="total">

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
#total {
  height: auto;
}

#window {
  margin-top: 100px;
  margin-left: 400px;
  width: 500px;
  height: 400px;
  /* background-color: bisque; */
  position: relative;
  display: flex;
}

#smallwindow {
  margin-top: 100px;
  margin-left: 20px;
}
</style>