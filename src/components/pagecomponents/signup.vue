<template>
  <div id="total">
    <div id="window">
      <div id="smallwindow">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import "@/assets/css/signinup.css";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度在6到20个字符之间",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    test() {
      alert("注册成功");
      this.$router.push("/signin");
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios
            .post("/signup", this.form)

            .then((response ) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

          
          this.$router.push("/signin");
          console.log("注册成功");
        } else {
          console.log("注册失败");
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
</style>