<template>
    <div id="create" >
     
      <!-- <el-button @click=" test" type="primary"  >check</el-button> -->
      <el-button @click="addDiv1" type="primary"  >单选题</el-button>
      <el-button @click="addDiv2" type="primary">填空题</el-button>
      <el-button @click="addDiv3" type="primary">多选题</el-button>
      <el-button @click="shanchu" type="primary">删除</el-button>
      <el-button @click="submitData" type="primary">完成</el-button>
      <!-- <div v-for="(div, index) in div1" :key="index" >
        
        <single class="putcen"></single>
      </div>
      <div v-for="(div, index) in div2" :key="index" >
       <fillin class="putcen"></fillin>
      </div>
      <div v-for="(div, index) in div3" :key="index" >
        <duoxuan class="putcen"></duoxuan>
      </div> -->
      <el-input v-model="title" id="titleinput"></el-input>
      <div v-for="(div, index) in divs" :key="index" class="putcen">
      <component :is="div" @a="trya" @b="trya" @c="trya"></component>
    </div>
     
    </div>

  </template>
  
  <script>

  import axios from 'axios'
  import selectdiv from '../smallcomponents/selectdiv.vue'
  import xiala from '../smallcomponents/xiala.vue'
import fillin from '../smallcomponents/fillin.vue'
import single from '../smallcomponents/single.vue'
import duoxuan from '../smallcomponents/duoxuan.vue'
  export default {
  //   mounted(){
  //     const state = JSON.stringify(this.$data);
  // localStorage.setItem('my-page-state', state);
  //   },
    components: {
     
      selectdiv,
      xiala,
      fillin,
      single,
      duoxuan,
    },
    data() {
      return {
        // div1: [],
        // div2:[],
        // div3:[],
        title:"",
        divs: [],
        record:"",
        questionnaire:{
          id:'',
          title:"",
          description:'',
          questionList:[],

        },
        form:[],
        numofques:''
        // test:"asfsdfsfss",
      }
    },
    methods: {
      trya(data){
        const isDuplicate = this.form.some((item) => JSON.stringify(item) === JSON.stringify(data));
  if (!isDuplicate) {
    this.form.push(data);
    const index = this.form.length - 1; // 获取刚加入的数据对象的索引
  data.id = index; 

  } else {
    const index = this.form.findIndex((item) => JSON.stringify(item) === JSON.stringify(data));
    if (index !== -1) {
      this.form.splice(index, 1, data);
    }
  }
        // this.form.push(data)
         
          
          },
          
      addDiv1() {
        this.divs.push('single')
       this.record += '1'
      },
      addDiv2() {
        this.fillinpac={ type:"2",
                    questionf: this.divs.length,
                    hint:'',}
        this.divs.push('fillin')
        this.record += '2'
      },
      addDiv3() {
        this.divs.push('duoxuan')
        this.record += '3'

      },
    //  test() {
    //   const input = this.$refs.fillin.questionf
    //   console.log(input)
    // },
      shanchu(){this.divs.pop()
      this.form.pop()
      },


      tijiao(){
        this.questionnaire.questionList=this.form
        console.log(JSON.stringify(this.questionnaire));},


tijiaoyuanxing(){
  console.log(this.form);
},

    //   saveJsonFile() {
    //   const jsonData = JSON.stringify(this.form);
    //   axios({
    //     method: 'post',
    //     url: 'file://D:/htmlproject/vueproject/shixun/src/assets/json/data.json',
    //     data: jsonData,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(response => console.log('Data saved to file successfully!'))
    //   .catch(error => console.error(error));
    // },

// {data: this.form}
      submitData() {
        this.questionnaire.questionList=this.form
      axios.post('http://localhost:9090/login', this.questionnaire,)
        .then(response => {
          let id = response.data
          // console.log(response.data)
          // console.log(id)
          localStorage.setItem('id', id)
          const qsid = localStorage.getItem('id');
          let link = "localhost:9090/login?id=" + qsid
             console.log(link);
          localStorage.setItem('link', link)
          this.$router.push('/share')

          // window.location.href = 'http://localhost:8081/login'
        })
        .catch(error => {
          console.log(error)
        })
    }
    
    
  
    }
  }
  </script>
  
  <style>
  #titleinput{
width: 600px;


  }
  .putcen{ 
    position: relative;
    left: 27%;
    /* display: grid;
  place-items: center;
  height: 0vh; */
}
  
  
  #create {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    /* display: grid;
    place-items: center;
    height: 0vh; */
    
  }
  </style>
  
   
 