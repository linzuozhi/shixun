<template>
  <div id="create">
    <div>
      <el-button @click="addDiv1" type="primary">单选题</el-button>
      <el-button @click="addDiv2" type="primary">填空题</el-button>
      <el-button @click="addDiv3" type="primary">多选题</el-button>
      <el-button @click="shanchu" type="primary">删除</el-button>
      <el-button @click="submitData" type="primary">完成</el-button>
    </div>

    <el-input
      v-model="questionnaire.title"
      id="titleinput"
      placeholder="请输入问卷标题"
    ></el-input>
    <div v-for="(div, index) in divs" :key="index" class="putcen">
      <component :is="div" @a="trya" @b="trya" @c="trya"></component>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import selectdiv from "../smallcomponents/selectdiv.vue";
import xiala from "../smallcomponents/xiala.vue";
import fillin from "../smallcomponents/fillin.vue";
import single from "../smallcomponents/single.vue";
import duoxuan from "../smallcomponents/duoxuan.vue";
export default {
  components: {
    selectdiv,
    xiala,
    fillin,
    single,
    duoxuan,
  },
  data() {
    return {
      divs: [],

      questionnaire: {
        id: "",
        title: "",
        description: "",
        questionList: [],
      },
      form: [],
    };
  },
  methods: {
    test() {
      alert("localhost:9090/login?id=1685325215406");
      this.$router.push("/login");
    },
    trya(data) {
      const isDuplicate = this.form.some(
        (item) => JSON.stringify(item) === JSON.stringify(data)
      );
      if (!isDuplicate) {
        this.form.push(data);
        const index = this.form.length - 1; // 获取刚加入的数据对象的索引
        data.id = index;
      } else {
        const index = this.form.findIndex(
          (item) => JSON.stringify(item) === JSON.stringify(data)
        );
        if (index !== -1) {
          this.form.splice(index, 1, data);
        }
      }
    },

    addDiv1() {
      this.divs.push("single");
      this.record += "1";
    },
    addDiv2() {
      this.fillinpac = { type: "2", questionf: this.divs.length, hint: "" };
      this.divs.push("fillin");
      this.record += "2";
    },
    addDiv3() {
      this.divs.push("duoxuan");
      this.record += "3";
    },

    shanchu() {
      this.divs.pop();
      this.form.pop();
    },

    submitData() {
      this.questionnaire.questionList = this.form;
      axios
        .post("http://localhost:9090/login", this.questionnaire)
        .then((response) => {
          let id = response.data;
          // console.log(response.data)
          // console.log(id)
          localStorage.setItem("id", id);
          const qsid = localStorage.getItem("id");
          const username = localStorage.getItem("username");
          let link = "localhost:9090/login?id=" + qsid+ "&username=" + username;
          console.log(link);
          localStorage.setItem("link", link);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/login");
    },
  },
};
</script>
  
  <style>
#titleinput {
  width: 600px;
}
.putcen {
  position: relative;
  left: 27%;
}

#create {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* display: flex;  */
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
  
   
 