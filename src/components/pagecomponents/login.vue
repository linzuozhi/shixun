<template>
  <div id="total">
    
    <el-input v-model="inputLink" placeholder="请输入链接"></el-input>
    <el-button type="primary" @click="submitLink">提交</el-button>
    <el-button type="primary" @click="submitData">完成填写</el-button>
    <span>{{ this.title }}</span>
    <div v-for="(item, index) in jsonData.questionList" :key="index">

      <div v-if="item.questionType === 0" class="type1">
        <p class="title">单选题：{{ item.title }} </p>
        <el-radio-group v-model="questiondata[index].selectedOptionIndex" class="radiogroup">
          <el-radio v-for="(option, i) in item.optionsof" :key="i" :label="i" class="radio-item"> {{ option }}
          </el-radio>
        </el-radio-group>
      </div>

      <div v-else-if="item.questionType ===2" class="type2">
        <p class="title">填空题：{{ item.title }} </p>
        <el-input v-model="questiondata[index].description" :placeholder="item.description"
                  style="background-color: #FFFAFA;"></el-input>
      </div>

      <div v-if="item.questionType === 1" class="type3">
        <p class="title"> 多选题：{{ item.title }} </p>
        <el-checkbox-group v-model="questiondata[index].selectedOptionIndex" class="checkboxgroup">
          <el-checkbox v-for="(option, i) in item.optionsof" :key="i" :label="i">{{ option }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

    </div>


  </div>
</template>
<script>
import axios from 'axios'

export default {
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

  },
  methods: {
    
    initSendData() {
      this.sendData.id = this.jsonData.id;
      this.sendData.title = this.jsonData.title;
      this.sendData.description = this.jsonData.description;
    },

    submitData() {
      this.initSendData();
      this.sendData.writedata = this.questiondata
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

<style>
#total {
  height: auto;
  width: 900px;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.type1 {
  background-color: #F0FFFF;
  position: relative;
  /* left: 0px; */
  /* align-items: center; */
  margin-left: 40%;
  border: #2c3e50 1px solid;
  border-radius: 4px
  /* display: flex; */
  /* align-items: flex-start; */

}

.type2 {
  background-color: #F0FFF0;
  position: relative;
  /* left: 0px; */
  /* align-items: center; */
  margin-left: 40%;
  border: #2c3e50 1px solid;
  border-radius: 4px
}

.type3 {
  background-color: #F8F8FF;
  position: relative;
  /* left: 0px; */
  /* align-items: center; */
  margin-left: 40%;
  border: #2c3e50 1px solid;
  border-radius: 4px


}

.radiogroup {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 5px;

}

.checkboxgroup {
  display: flex;
  justify-content: flex-start;
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
  margin-bottom: 10px;

}

</style>

