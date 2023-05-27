<template>
    <div class="center">
<!-- <input type="text" placeholder="请输入问题"> -->
<!-- <input type="text" placeholder="请输入问题提示"> -->
<el-input  placeholder="请输入问题" v-model=" fillinpac.title" ></el-input>
<el-input  placeholder="请输入答题提示（可空）" v-model=" fillinpac.description" @change="both"></el-input>
<!-- <el-button @click="submitFillinData"></el-button> -->
<!-- <HelloWorld></HelloWorld> -->
    <!-- <p>您输入的内容是：{{ inputValue }}</p> -->
<!-- <el-button  type="success" icon="el-icon-check" circle></el-button> -->
    </div>
</template>
<style>
.center{
height: 80px;
width: 600px;
background-color: white;
/* border: 1px solid black; */
margin: 10px;
/* border-radius: 18px; */
}

</style>
<script >
 import axios from 'axios'
export default {
    components:{},
    // props:{
    //     fillinpac:{ type:"2",
    //                 questionf: '',
    //                 hint:'',}
    // },
    // mounted(){
    //     this.fillinpac2=this.fillinpac
    // },
    data() {
    return {
 fillinpac:{id:'', 
 questionType:2,
 
 title: '',
 description:'',
 correctAnswer:''
},
       
    }
  },
  methods: {
    both(){
this.handleChange();
this.emitHandler();

    },
    handleChange() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        // 在最后一次change事件后触发@change事件
        this.$emit('change', this.inputValue);
      }, 10000);
    },
    emitHandler(){
        this.$emit('a',this.fillinpac)
        
    },
    submitFillinData() {
        console.log(this.fillinpac);
        axios.post('/login', this.fillinpac)
          .then(response => {
            console.log(response.data)
            // window.location.href = 'http://localhost:8081/login'
          })
          .catch(error => {
            console.log(error)
          })
      }
    
  }
}
</script>
<!-- <script>
import inputbox from './inputbox.vue'

export default {
  components: { inputbox },
    comments:{
        inputbox,
    },
}
</script> -->