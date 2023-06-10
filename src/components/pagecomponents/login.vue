<template>
  <div>
    <Header></Header>
    <div id="biggestoflogin">
       <el-input v-model="inputLink" placeholder="请输入链接" style="width: 600px;"></el-input>
    <el-button type="primary" @click="submitLink" style="margin-left: 10px;">提交</el-button>
    <el-button type="primary" @click="submitData">完成填写</el-button>
  <div id="totaloflogin">
    
   
    <span>{{ this.title }}</span>
    <div v-for="(item, index) in jsonData.questionList" :key="index">

      <div v-if="item.questionType === 0" class="type1 typeofloginanswer">
        <p class="title">单选题：{{ item.title }} </p>
        <el-radio-group v-model="questiondata[index].selectedOptionIndex" class="radiogroup">
          <el-radio v-for="(option, i) in item.optionsof" :key="i" :label="i" class="radio-item"> {{ option }}
          </el-radio>
        </el-radio-group>
      </div>

      <div v-else-if="item.questionType ===2" class="type2 typeofloginanswer">
        <p class="title">填空题：{{ item.title }} </p>
        <el-input v-model="questiondata[index].description" :placeholder="item.description"
                  style="background-color: #FFFAFA;"></el-input>
      </div>

      <div v-if="item.questionType === 1" class="type3 typeofloginanswer">
        <p class="title"> 多选题：{{ item.title }} </p>
        <el-checkbox-group v-model="questiondata[index].selectedOptionIndex" class="checkboxgroup">
          <el-checkbox v-for="(option, i) in item.optionsof" :key="i" :label="i" class="checkbox-item">{{ option }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

    </div>
</div>
</div>
  </div>
</template>
<style>
#biggestoflogin{
/* background-color: #2c3e50; */
background-image: url("@/assets/image/valentin-bolder-BZOtLUdDcoU-unsplash.jpg");
background-size: cover;
min-height: 800px;

}
#totaloflogin {
  padding: 0;
  margin: 0 auto;
  height: auto;
 width: 612px;
 min-height: 800px;
  /* position: relative; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("@/assets/image/pexels-anete-lusina-16621377.jpg");
background-size: cover;
  border:3px solid rgb(208, 218, 220);
        box-shadow: 0 0 15px #0c0cd7;
        border-radius: 6px;
/* display: flex;
justify-content: center;
align-content: center; */
}
.typeofloginanswer{

  margin: 0 auto;
  margin-top: 8px;
  width: 600px;
  min-height:60px;
  
 
}
.type1 {
  background-color: #F0FFFF;
  
  border:1px solid rgb(208, 218, 220);
        box-shadow: 0 0 5px #F0FFFF;
        border-radius: 6px;

  

}

.type2 {
  background-color: #F0FFF0;
  border:1px solid rgb(208, 218, 220);
        box-shadow: 0 0 5px #F0FFF0;
        border-radius: 6px;
}

.type3 {
  background-color: #F8F8FF;
  border:1px solid rgb(208, 218, 220);
        box-shadow: 0 0 5px #F8F8FF;
        border-radius: 6px;


}

.radiogroup {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-left: 5px;

}

.checkboxgroup {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  
  margin-top: 10px;
  margin-left: 5px;

}

.title {
  margin-top: 5px;
  text-align: left;
  margin-left: 10px;
  /* text-decoration:underline */

}

.radio-item {
  display: flex;
  margin-bottom: 3px;

}
.checkbox-item {
  display: flex;
 

}
</style>


<script>
import axios from 'axios'
import Header from "../smallcomponents/header.vue"

export default {
 components: {
   Header
  }, 
  
  data() {
    return {
      inputLink: "",
      title: "",
      sendData: {
        id: "",
        title: "",
        description: "",
        questionList: []

      },
      questiondata: [],

      fillindata: {
        answer: "",
        id: "",
        questionType: "2",
        description: "",
        correctAnswer: ""
      },
      singledata: {
        id: "",
        questionType: "0",
        title: "",
        description: "",
        optionsof: [],
        selectedOptionIndex: [],
        answerIndex: -2,
      },
      duoxuandata: {
        id: "",
        questionType: "1",
        title: "",
        description: "",
        optionsof: [],
        selectedOptionIndex: [],
        answerOptionsIndex: [],
      },


      jsonData: {},

    };
  },

  mounted() {
    const link4usercheck = localStorage.getItem("link4usercheck");
    axios.post("http://localhost:9090/link", link4usercheck)
          .then(response => {
            if (response.data === 0) {
              alert('链接无效');
              this.inputValue = '';
            } else {
              this.jsonData = response.data;
              console.log(response.data);
              for (const item of this.jsonData.questionList) {
                if (item.questionType === 0) {
                  // 添加单选题对象
                  this.questiondata.push({
                    id: item.id,
                    questionType: "0",
                    title: "",
                    description: "",
                    optionsof: [],
                    selectedOptionIndex: [],
                    answerIndex: -2,
                  });
                } else if (item.questionType === 1) {
                  // 添加多选题对象
                  this.questiondata.push({
                    id: item.id,
                    questionType: "1",
                    title: "",
                    description: "",
                    optionsof: [],
                    selectedOptionIndex: [],
                    answerOptionsIndex: [],
                  });
                } else if (item.questionType === 2) {
                  // 添加填空题对象
                  this.questiondata.push({
                    id: item.id,
                    answer: "",
                    questionType: "2",
                    description: "",
                    correctAnswer: ""
                  });
                }
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
          localStorage.removeItem('link4usercheck');
  },

  methods: {
    handleUnload() {
      localStorage.removeItem('link4usercheck');
    },
    initSendData() {
      this.sendData.id = this.jsonData.id;
      this.sendData.title = this.jsonData.title;
      this.sendData.description = this.jsonData.description;
    },

    submitData() {
      this.initSendData();
      this.sendData.questionList = this.questiondata
      console.log(JSON.stringify(this.sendData));
      axios.post('http://localhost:9090/result', this.sendData)
          .then(response => {
            console.log(response.data)

          })
          .catch(error => {
            console.log(error)
          })
    },


    submitLink() {
      axios.post("http://localhost:9090/link", this.inputLink)
          .then(response => {
            if (response.data === 0) {
              alert('链接无效');
              this.inputValue = '';
            } else {
              this.jsonData = response.data;
              console.log(response.data);
              for (const item of this.jsonData.questionList) {
                if (item.questionType === 0) {
                  // 添加单选题对象
                  this.questiondata.push({
                    id: item.id,
                    questionType: "0",
                    title: "",
                    description: "",
                    optionsof: [],
                    selectedOptionIndex: [],
                    answerIndex: -2,
                  });
                } else if (item.questionType === 1) {
                  // 添加多选题对象
                  this.questiondata.push({
                    id: item.id,
                    questionType: "1",
                    title: "",
                    description: "",
                    optionsof: [],
                    selectedOptionIndex: [],
                    answerOptionsIndex: [],
                  });
                } else if (item.questionType === 2) {
                  // 添加填空题对象
                  this.questiondata.push({
                    id: item.id,
                    answer: "",
                    questionType: "2",
                    description: "",
                    correctAnswer: ""
                  });
                }
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    savesingledata(question, questionId, event) {
      this.questiondata[questionId] = question;
    },


    saveduoxuandata(question, questionId, event) {
      this.questiondata[questionId] = question;
    },

    savefillindata(question, questionId, event) {
      this.questiondata[questionId] = question;
    },

  },
}
</script>

