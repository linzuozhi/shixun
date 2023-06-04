<template>
<div id="total">
  <el-input v-model="inputLink" placeholder="请输入链接"></el-input>
    <el-button type="primary" @click="submitLink">提交</el-button>
    <el-button type="primary" @click="submitData">完成填写</el-button>
<span >{{ this.title }}</span>
  <div v-for="(item, index) in jsonData.questionList" :key="index" >
    
  <div v-if="item.questionType === 0" class="type1">
    <p  class="title">单选题：{{ item.title }}    </p>
  <el-radio-group  v-model="questiondata[index].chosed" class="radiogroup" >
      <el-radio v-for="(option, i) in item.optionsof" :key="i" :label="i"  class="radio-item" > {{ option }}</el-radio>
    </el-radio-group>
  </div>

  <div v-else-if="item.questionType ===2" class="type2">
   <p class="title">填空题：{{ item.title }}    </p>
   <el-input  :placeholder="item.description" style="background-color: #FFFAFA;" v-model="questiondata[index].fillinanswer"  ></el-input>    
  </div>

  <div v-if="item.questionType === 1" class="type3">
    <p  class="title" > 多选题：{{ item.title }}     </p>
    <el-checkbox-group v-model="questiondata[index].chosed" class="checkboxgroup">
        <el-checkbox v-for="(option, i) in item.optionsof" :key="i" :label="i" >{{ option }}</el-checkbox>
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
      title:"",
      sendData:{
      id:"",
      username:"",
      writedata:[]

      },
      questiondata:[],

data4test:[],

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
    const jsonString = '{"id":"123","title":"问卷标题","description":"","questionList":[{"id":0,"questionType":0,"title":"单选","optionsof":["单选1","单选2"]},{"id":1,"questionType":2,"title":"填空","description":"填空","correctAnswer":""},{"id":2,"questionType":1,"title":"多选","optionsof":["多选1","多选2","多选3"]},{"id":3,"questionType":0,"title":"单选2","optionsof":["单选12","单选22"]},{"id":4,"questionType":2,"title":"填空2","description":"填空2","correctAnswer":""},{"id":5,"questionType":1,"title":"多选2","optionsof":["多选12","多选22","多选32"]}]}'


this.jsonData = JSON.parse(jsonString);
this.sendData.id=this.jsonData.id;
this.title =this.jsonData.title;
for (const item of this.jsonData.questionList) {
    if (item.questionType === 0) {
      // 添加单选题对象
      this.questiondata.push({
        id: item.id,
        chosed: []
      });
    } else if (item.questionType === 1) {
      // 添加多选题对象
      this.questiondata.push({
        id: item.id,
        chosed: []
      });
    } else if (item.questionType === 2) {
      // 添加填空题对象
      this.questiondata.push({
        id: item.id,
        fillinanswer: ''
      });
    }
  }
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

    
 
  submitLink() {
    

      axios.post("localhost:9090/link", this.inputLink)
        .then(response => {
          if (response.data === 0) {
            alert('链接无效');
            this.inputValue = '';
          } else {
            const linkString = response.data
this.jsonData = JSON.parse(linkString);
for (const item of this.jsonData.questionList) {
    if (item.questionType === 0) {
      // 添加单选题对象
      this.questiondata.push({
        id: item.id,
        chosed: []
      });
    } else if (item.questionType === 1) {
      // 添加多选题对象
      this.questiondata.push({
        id: item.id,
        chosed: []
      });
    } else if (item.questionType === 2) {
      // 添加填空题对象
      this.questiondata.push({
        id: item.id,
        fillinanswer: ''
      });
    }
  }
          }
        })
        .catch(error => {
          console.error(error);
        });
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

