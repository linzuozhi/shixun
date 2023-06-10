<template>
  <div> <Header></Header>
  <div id="allofcreate">
   
  <div id="create">
    
    <div id="btngroupofcreate">
     
      <el-button type="primary" @click="addDiv1" key="btn1">单选题</el-button>
      <el-button type="primary" @click="addDiv2" key="btn2">填空题</el-button>
      <el-button type="primary" @click="addDiv3" key="btn3">多选题</el-button>
      <el-button type="primary" @click="shanchu" key="btn4">删除</el-button>
       <el-button type="primary" @click="preview" key="btn5">预览</el-button>
       <el-button type="primary" @click="submitData" key="btn6">完成</el-button>
      
<el-input
        id="titleinput"
        v-model="questionnaire.title"
        placeholder="请输入问卷标题"
    ></el-input>
    <el-input
        id="titleinput"
        v-model="questionnaire.permissionCode"
        placeholder="请输入权限码（权限码用于后续查看问卷填写结果，请谨慎设置）"
    ></el-input>
    
    </div>

   
    <div v-for="(div, index) in divs" :key="index" class="comofcreate">
      <component :is="div" @a="trya" @b="trya" @c="trya" @delete="deleteData(index)"></component>
    </div>


<!-- 以下为预览部分 -->

    <el-dialog :visible.sync="previewDialogVisible" title="预览问卷" class="eldialog">
      <div v-for="(item, index) in this.form" :key="index">
        <div v-if="item.questionType === 0" class="type1pre preofcreate">
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

        <div v-else-if="item.questionType ===2" class="type2pre preofcreate">
          <p class="title">填空题：{{ item.title }} </p>
          <el-input
            
            :placeholder="item.description"
            style="background-color: #FFFAFA;"
          ></el-input>
        </div>

        <div v-if="item.questionType === 1" class="type3pre preofcreate">
          <p class="title"> 多选题：{{ item.title }} </p>
          <el-checkbox-group
          v-model="ddd"
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
  </div>
  </div>
</template>
 <style>

#allofcreate{
  background-image: url("@/assets/image/ice.jpg"); 
  background-size: cover;
/* background-color: aquamarine; */

/* display: flex;
justify-content: center;


  place-items: center;
   */
min-height: 800px;
}
#btngroupofcreate{
  margin:0 auto;

}
.preofcreate{

  margin:0 auto;
}
.comofcreate{
padding: 0;
margin:0 auto;
background-color: aqua;
animation: floatUp 1s ease-in-out forwards;

}
.eldialog{
display: flex;
height: auto;
width: 80%;
text-align: center;
justify-content: center;
align-items: center;
margin:0 auto;
}

#titleinput {
  width: 600px;
}



#create {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  
  /* color: #2c3e50; */
  margin:0 auto;
  /* display: flex;  */
  flex-wrap: wrap;

  align-content: center;

  width: 620px;
  min-height: 800px;
  background-image: url("@/assets/image/冰雪.jpg"); 
  background-size: cover;
  /* background-color: black; */
 
}
.type1pre {
  background-color: #F0FFFF;
  /* position: relative;
  
  margin-left: 40%; */
  border: #2c3e50 1px solid;
  border-radius: 4px
  

}

.type2pre {
  background-color: #F0FFF0;
  /* position: relative;
 
  margin-left: 40%; */
  border: #2c3e50 1px solid;
  border-radius: 4px
}

.type3pre {
  background-color: #F8F8FF;
  /* position: relative;
 
  margin-left: 40%; */
  border: #2c3e50 1px solid;
  border-radius: 4px


}

</style>
   
 
<script>
import axios from "axios";
import selectdiv from "../smallcomponents/selectdiv.vue";
import xiala from "../smallcomponents/xiala.vue";
import fillin from "../smallcomponents/fillin.vue";
import single from "../smallcomponents/single.vue";
import duoxuan from "../smallcomponents/duoxuan.vue";
import Vue from 'vue';
import Header from "../smallcomponents/header.vue"

export default {
  components: {
    selectdiv,
    xiala,
    fillin,
    single,
    duoxuan,
    Header,
    
  },
  
  data() {
    return {
    sss:"",
      divs: [],
      previewDialogVisible: false,
      ddd:[],
      
      questionnaire: {
        id: "",
        title: "",
        description: "",
        permissionCode:"",
        questionList: [],
      },
      jsonData: {
      
      },
      form: [],
    };
  },
  methods: {
    test(){
      console.log(JSON.stringify(this.divs));
      console.log(JSON.stringify(this.form));

    },
    deleteData(index) {
     
      // console.log(n);
      // this.form[n]=null
      // this.divs[n]=""
      console.log(index);
      this.divs.splice(index, 1);
       this.form.splice(index, 1);      
      // Vue.delete(this.form, this.sss);
      // Vue.delete(this.divs, this.sss);
   


   
   
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
addp1(){
  this.divs.push('<p>1</p>');
},
addp2(){
  this.divs.push('<p>2</p>');
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


 