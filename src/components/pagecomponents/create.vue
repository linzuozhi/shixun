<template>
  <div id="create">
    <div>
      <el-button type="primary" @click="addDiv1">单选题</el-button>
      <el-button type="primary" @click="addDiv2">填空题</el-button>
      <el-button type="primary" @click="addDiv3">多选题</el-button>
      <el-button type="primary" @click="shanchu">删除</el-button>
      <el-button type="primary" @click="submitData">完成</el-button>
    </div>

    <el-input
        id="titleinput"
        v-model="questionnaire.title"
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
      console.log(JSON.stringify(this.form));
    },
    trya(data) {
      const isDuplicate = this.form.some(
          (item) => JSON.stringify(item) === JSON.stringify(data)
      );
      if (!isDuplicate) {
        this.form.push(data);
        const index = this.form.length - 1;
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

    },
    addDiv2() {
      this.fillinpac = {type: "2", questionf: this.divs.length, hint: ""};
      this.divs.push("fillin");

    },
    addDiv3() {
      this.divs.push("duoxuan");

    },

    shanchu() {
      this.divs.pop();
      this.form.pop();
    },

    submitData() {
      this.questionnaire.questionList = this.form;
      axios
          .post("http://localhost:9090/create", this.questionnaire)
          .then((response) => {
            let id = response.data;

            localStorage.setItem("id", id);
            const qsid = localStorage.getItem("id");
            const username = localStorage.getItem("username");
            let link = "localhost:9090/login?id=" + qsid + "&username=" + username;
            console.log(link);
            localStorage.setItem("link", link);
            this.$alert("问卷链接为：" + link, "分享问卷", {
              confirmButtonText: "复制链接",
              callback: () => {
                this.$copyText(link)

                this.$router.push("login");

                // 在这里处理复制链接的逻辑
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });

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
  /* margin-top: 60px; */
  /* display: flex;  */
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
  
   
 