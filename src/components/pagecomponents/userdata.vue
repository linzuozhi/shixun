<template>
  <div>
    <Header></Header>

    <div class="wrapper">
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <el-menu :default-active="activeName" @select="handleSelect">
          <el-menu-item index="created">
            <i class="el-icon-document"></i>
            <span slot="title">已创建问卷</span>
          </el-menu-item>
          <el-menu-item index="filled">
            <i class="el-icon-edit"></i>
            <span slot="title">已填写问卷</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧内容 -->
      <el-main>
        <!-- 已创建问卷 -->
        <div v-if="activeName === 'created'" class="section">
          <div v-for="(item, index) in userdata.quescreated" :key="index">
            <h2>{{ item.title }}</h2>
            <h2>id:{{ item.id }}</h2>
            <div class="numbers"></div>

            <el-button type="danger" @click="delquestionnaire(item.id)">删除</el-button>
            <el-button @click="getresult(item.id)">查看结果</el-button>
          </div>
        </div>

        <!-- 已填写问卷 -->
        <div v-if="activeName === 'filled'" class="section">
          <div v-for="(item, index) in userdata.quesanswered" :key="index">
            <h2>{{ item.title }}</h2>
            <h2>id:{{ item.id }}</h2>
            <div class="numbers"></div>
            <el-button @click="getresult(item.id)">查看</el-button>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import Header from "../smallcomponents/header.vue";
export default {
  components: {
    Header,
  },

  mounted() {
    const username = localStorage.getItem("username");
    console.log(username);
    axios
      .post("http://localhost:9090/getuserdata", username)
      .then((response) => {
        if (response.data === 0) {
          alert("获取用户信息失败");
        } else {
          this.userdata = response.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  data() {
    return {
      createdCount: {
        type: Number,
        required: true,
      },
      filledCount: {
        type: Number,
        required: true,
      },
      userdata: {
        username: "",

        quescreated: [],
        quesanswered: [],
      },
      activeName: "created",
    };
  },
  methods: {
    getresult(id) {
     

      let link4usercheck =
        "localhost:9090/login?id=" + id + "&username=" + this.userdata.username;
      localStorage.setItem("link4usercheck", link4usercheck);
      this.$router.push("login");
    },
    handleSelect(name) {
      this.activeName = name;
    },
    delquestionnaire(id){
        let link4usercheck =
        "localhost:9090/login?id=" + id + "&username=" + this.userdata.username;
        axios
      .post("http://localhost:9090/delete", id)
      .then((response) => {
        this.$message.success('删除成功')
        location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>
  
  <style scoped>
.wrapper {
  display: flex;
  min-height: 800px;
}
.el-aside {
  background-color: #f5f5f5;
  padding: 20px;
}
.el-main {
  margin-left: 20px;
  padding: 20px;
}
.section {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.section h2 {
  margin-top: 0;
}
.section .numbers {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>