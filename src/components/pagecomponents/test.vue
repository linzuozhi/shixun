

<template>
    <div id="create">
      <div>
        <el-button type="primary" @click="addDiv1">单选题</el-button>
        <el-button type="primary" @click="addDiv2">填空题</el-button>
        <el-button type="primary" @click="addDiv3">多选题</el-button>
        <el-button type="primary" @click="shanchu">删除</el-button>
        <el-button type="primary" @click="test">完成</el-button>
        <el-button type="primary" @click="preview">预览</el-button>
  
      </div>
  
      <el-input
          id="titleinput"
          v-model="questionnaire.title"
          placeholder="请输入问卷标题"
      ></el-input>
      <div v-for="(div, index) in divs" :key="index" class="putcen">
        <component :is="div" @a="trya" @b="trya" @c="trya" @delete="deleteData(index)"></component>
      </div>
  
  
  <!-- 以下为预览部分 -->
  
      <el-dialog :visible.sync="previewDialogVisible" title="预览问卷" class="eldialog">
        <div v-for="(item, index) in this.form" :key="index">
          <div v-if="item.questionType === 0" class="type1">
            <p class="title">单选题：{{ item.title }} </p>
            <el-radio-group
             
              class="radiogroup"
            >
              <el-radio
                v-for="(option, i) in item.optionsof"
                :key="i"
                :label="i"
                class="radio-item"
                >{{ option }}</el-radio
              >
            </el-radio-group>
          </div>
  
          <div v-else-if="item.questionType ===2" class="type2">
            <p class="title">填空题：{{ item.title }} </p>
            <el-input
              
              :placeholder="item.description"
              style="background-color: #FFFAFA;"
            ></el-input>
          </div>
  
          <div v-if="item.questionType === 1" class="type3">
            <p class="title"> 多选题：{{ item.title }} </p>
            <el-checkbox-group
            
              class="checkboxgroup"
            >
              <el-checkbox
                v-for="(option, i) in item.optionsof"
                :key="i"
                :label="i"
                >{{ option }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="previewDialogVisible = false"
            >关闭</el-button
          >
        </div>
      </el-dialog>
  
  
  
  
  
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import selectdiv from "../smallcomponents/selectdiv.vue";
  import xiala from "../smallcomponents/xiala.vue";
  import fillin from "../smallcomponents/fillin.vue";
  import single from "../smallcomponents/single.vue";
  import duoxuan from "../smallcomponents/duoxuan.vue";
  import Vue from 'vue';
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
        previewDialogVisible: false,
        
        questionnaire: {
          id: "",
          title: "",
          description: "",
          questionList: [],
        },
        jsonData: {
        
        },
        form: [],
      };
    },
    methods: {
      test(){
        console.log(JSON.stringify(this.form));
      },
    
      deleteData(index) {
  
        // let n = this.form[index].id
        console.log(index);
        let n =this.form[index].id
        // console.log(n);
        console.log(JSON.stringify(this.form[index].id));
        // this.deleteEventEmitted = true
        Vue.delete(this.form, n);
        Vue.delete(this.divs, n);
      this.form.splice(index, 1);
      this.divs.splice(index, 1);
    },
     preview() {
        this.questionnaire.questionList = this.form;
       this.previewDialogVisible = true;
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
       
        this.divs.push("fillin");
  
      },
      addDiv3() {
        this.divs.push("duoxuan");
  
      },
  
      shanchu() {
        this.divs.pop();
        this.form.pop();
      },
  
    //   submitData() {
    //     this.questionnaire.questionList = this.form;
    //     axios
    //         .post("http://localhost:9090/create", this.questionnaire)
    //         .then((response) => {
    //           let id = response.data;
  
    //           localStorage.setItem("id", id);
    //           const qsid = localStorage.getItem("id");
    //           const username = localStorage.getItem("username");
    //           let link = "localhost:9090/login?id=" + qsid + "&username=" + username;
    //           console.log(link);
    //           localStorage.setItem("link", link);
    //           this.$alert("问卷链接为：" + link, "分享问卷", {
    //             confirmButtonText: "复制链接",
    //             callback: () => {
    //               this.$copyText(link)
  
    //               this.$router.push("login");
  
    //               // 在这里处理复制链接的逻辑
    //             }
    //           });
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
  
    //   },
    },
  };
  </script>
  
  <style>
  .eldialog{
  display: flex;
  height: auto;
  width: 80%;
  text-align: center;
  align-items: center;
  }
  
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
    
     
   