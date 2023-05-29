<template>
<div id="total">
  <el-input v-model="inputLink" placeholder="请输入链接"></el-input>
    <el-button type="primary" @click="submitLink">提交</el-button>
    <el-button type="primary" @click="submitData">完成填写</el-button>

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



  
</div>
</template>
<script>
 import axios from 'axios'

export default {
  data() {
    return {
      inputLink:"",
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

     
     jsonData: {},
 
    };
  },
  
  mounted() {
    const jsonString = '{"id":"","title":"","description":"","questionList":[{"id":0,"questionType":0,"title":"单选","optionsof":["单选1","单选2"]},{"id":1,"questionType":2,"title":"填空","description":"填空","correctAnswer":""},{"id":2,"questionType":1,"title":"多选","optionsof":["多选1","多选2","多选3"]}]}'


this.jsonData = JSON.parse(jsonString);
  },
  methods: {
   
   

     submitData(){
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

    savesingledata(questionId, event) {
      this.singledata.id = questionId
     this.questiondata[questionId]=this.singledata
     
  
  },

  saveduoxuandata(questionId, event) {
      this.duoxuandata.id = questionId
     this.questiondata[questionId]=this.duoxuandata
     
   
  },

    savefillindata(questionId, event) {
      this.fillindata.id = questionId
     this.questiondata[questionId]=this.fillindata
     
  
  },
 
  submitLink() {
    

      this.$http.post("localhost:9090/link", this.inputLink)
        .then(response => {
          if (response.data === 0) {
            alert('链接无效');
            this.inputValue = '';
          } else {
            const linkString = response.data
this.jsonData = JSON.parse(linkString);
           
          }
        })
        .catch(error => {
          console.error(error);
        });
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

