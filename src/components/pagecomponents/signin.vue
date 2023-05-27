<template>
     <div  id="total">
 <!-- <Header></Header> -->
 <!-- <span style="text-align: center;font-size: larger;"> 注册界面</span> -->
<div  id="window" >
 
    <!-- <el-button type="success" icon="el-icon-check" circle  @click="appear"></el-button> -->
    <!-- <el-dialog :visible.sync="dialogVisible" title="用户登录"> -->
    <div id="smallwindow">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changepage">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  <!-- </el-dialog> -->
</div>
</div>



     </div>



</template>

<script>
import Header from '../smallcomponents/header.vue'
export default {
components:{
  Header
},

  data() {
    return {
      dialogVisible: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changepage(){
        this.$router.push('/home')
      },
    appear(){this.dialogVisible = true},
    login() {
      this.$refsform.validate((valid) => {
        if (valid) {
          // TODO: 在这里添加登录逻辑
          
          axios.post('/signin', {
            username: this.form.username,
            password: this.form.password
            
          }).then(response => {
            if (response.data === 1) {
              // 登录成功，跳转到 signup 组件
             console.log('登录成功') 
             localStorage.setItem('username', this.form.username)
             const username = localStorage.getItem('username');
             console.log(username);           
             this.$router.push('/home')
            } else {
              // 登录失败，显示错误消息
              this.$message.error('用户名或密码错误')
            }   
          }).catch(error => {
            console.error(error)
            this.$message.error('登录失败，请重试')
          })
          // this.dialogVisible = false
        } else {
          console.log('登录失败')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
 
 <style>
#total{
height: auto;

}
#window{
margin-top: 100px;
margin-left: 400px;
width: 500px;
height: 400px;
/* background-color: bisque; */
position: relative;
display: flex;
}
#smallwindow{
margin-top:100px;
margin-left: 20px;

}
</style>