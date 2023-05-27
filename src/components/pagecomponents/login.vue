<template>
<div id="total">
 <el-button @click="submitData"></el-button>



  <div v-for="(item, index) in jsonData.questionList" :key="index" >
    
  <div v-if="item.questionType === 0" class="type1">
    <p  class="title">题目：{{ item.title }}    </p>
  <el-radio-group  v-model="singledata.chosed" class="radiogroup" >
      <el-radio v-for="(option, i) in item.optionsof" :key="i" :label="i"  class="radio-item" @change="savesingledata(item.id, $event)"> {{ option }}</el-radio>
    </el-radio-group>
  </div>



  <div v-else-if="item.questionType ===2" class="type2">
   <p class="title">填空题：{{ item.title }}    </p>
   <el-input  :placeholder="item.description" style="background-color: #FFFAFA;" v-model="fillindata.fillinanswer"  @change="savefillindata(item.id, $event)"></el-input>
    
  </div>



  <div v-if="item.questionType === 1" class="type3">
    <p  class="title" > 多选题：{{ item.title }}     </p>
    <el-checkbox-group v-model="duoxuandata.chosed" class="checkboxgroup">
        <el-checkbox v-for="(option, i) in item.optionsof" :key="i" :label="i"  @change="saveduoxuandata(item.id, $event)">{{ option }}</el-checkbox>
      </el-checkbox-group>
    
  </div>

</div>

  <!-- <el-radio v-model="radio" label="1" @click="ss">备选项</el-radio>
  <el-radio v-model="radio" label="2" @click="ss">备选项</el-radio>
<button @click="ss"></button>
  <div v-for="(data4test, index) in data4tests" :key="index">
      <div v-if="data4tests[index].type === 1">{{ data4tests[index].questiond }}</div>
      <p v-else-if="data4tests[index].type === 2">{{ data4tests[index].questionf }}</p>
   
    </div> -->

  
</div>
</template>
<script>
 import axios from 'axios'
// import data from '@/assets/json/data.json'
export default {
  data() {
    return {
      sendData:{
      id:"",
      username:"",
      writedata:[]

      },
      questiondata:[],

     fillindata:{
      id:"",
      fillinanswer:''
     },

     singledata:{
      id:"",
      chosed:[]

     },

     duoxuandata:{
    id:"",
    chosed:[],
     },

     jsonData1:{
      id:"",
     title:"",
     description:"",
     questionList:[{id:0,questionType:0,title:"单选",optionsof:["单选选项","单选选项2"]},{id:1,questionType:2,title:"太难控",description:"额",correctAnswer:""},{id:2,questionType:1,title:"多选",optionsof:["多选"]}]},

     jsonData: {},

 
    };
  },
  // mounted() {
  //   this.loadJsonFile();
  // },
  mounted() {
    const jsonString = '{"id":"","title":"","description":"","questionList":[{"id":0,"questionType":0,"title":"单选","optionsof":["单选","单选2"]},{"id":1,"questionType":2,"title":"11","description":"11","correctAnswer":""},{"id":2,"questionType":1,"title":"多选","optionsof":["多选","多选2","多选3"]}]}'


    this.jsonData = JSON.parse(jsonString);
    console.log(this.jsonData.questionList[0].id);
  },
  methods: {
    test(){ 
      console.log(JSON.stringify(this.sendData));
      // console.log(JSON.stringify(this.questiondata));
// console.log(JSON.stringify(this.singledata));
// console.log(JSON.stringify(this.duoxuandata));
// console.log(JSON.stringify(this.checkList));
// console.log(JSON.stringify(this.duoxuandata.chosed));
    },
   
     submitData(){
  this.sendData.writedata = this.questiondata
  console.log(JSON.stringify(this.sendData));
  axios.post('http://localhost:9090/result', this.sendData)
        .then(response => {
          console.log(response.data)
          // window.location.href = 'http://localhost:8081/login'
        })
        .catch(error => {
          console.log(error)
        })
     },

    savesingledata(questionId, event) {
      this.singledata.id = questionId
     this.questiondata[questionId]=this.singledata
     
    // console.log(event.target.value); 
    // 访问输入框的值
    // 其他处理逻辑...
  },

  saveduoxuandata(questionId, event) {
      this.duoxuandata.id = questionId
     this.questiondata[questionId]=this.duoxuandata
     
   
  },

    savefillindata(questionId, event) {
      this.fillindata.id = questionId
     this.questiondata[questionId]=this.fillindata
     
    // console.log(event.target.value); // 访问输入框的值
    // 其他处理逻辑...
  },
 
    
    
    
  },
}
</script>

<style>
#total{
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
.type1{
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
.type2{
background-color: #F0FFF0;
  position: relative;
/* left: 0px; */
/* align-items: center; */
margin-left: 40%;
border: #2c3e50 1px solid;
border-radius: 4px
}
.type3{
  background-color: #F8F8FF;
  position: relative;
/* left: 0px; */
/* align-items: center; */
margin-left: 40%;
border: #2c3e50 1px solid;
border-radius: 4px


}
.radiogroup{
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 5px;

}
.checkboxgroup{
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 5px;

}
.title{
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

