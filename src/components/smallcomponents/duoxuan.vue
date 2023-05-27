
  <template>
    <div class="container">
      <div class="header">
        
        <input type="text" placeholder="请输入问题"  class="shuru" v-model="duoxuanpac.title">
        <!-- <button @click="addCheckbox" class="btn">添加选项</button> -->
        <el-button @click="addCheckbox" type="primary" class="elebtn" >添加选项</el-button>
        <el-button @click="delCheckbox" type="primary" class="elebtn" >删除选项</el-button>
        <!-- <el-button @click="submitDuoxuanData" type="primary" class="elebtn" >p</el-button> -->

      </div>
      <div class="content">
        <div v-for="(option, index) in options" :key="index">
          <input type="checkbox" :id="'option-' + index"  class="posi">
          <label :for="'option-' + index">
            <input type="text" placeholder="请输入选项(多选)" v-model="option.text"  class="shuru,posi" @change="save(index)">
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script >
   import axios from 'axios'
  export default {
    data() {
      return {
        options: [],
        duoxuanpac:{
           id:"",
          questionType:1,
        title:'',
          optionsof:[],
          
        }
      }
    },
    methods: {
      together(){ 
        this.save()
        this.emitHandler()
        
      },
      emitHandler(){ 
        
        
      },
      addCheckbox() {
        this.options.push({ text: '' })
      },
      save(index){
       this.duoxuanpac.optionsof[index]=this.options[index].text
       if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        // 在最后一次change事件后触发@change事件
        this.$emit('change', this.inputValue);
      }, 10000);
       this.$emit('b',this.duoxuanpac)
      //  console.log(this.duoxuanpac.xuanxiang);
      //  console.log(this.duoxuanpac);
      },
      delCheckbox(){this.options.pop()},
      submitDuoxuanData() {
        console.log(this.duoxuanpac);
        axios.post('/login', this.duoxuanpac)
          .then(response => {
            console.log(response.data)
            // window.location.href = 'http://localhost:8081/login'
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    
  }
  </script>
  
  <style>
  .container {
    width: 600px;
    height: auto;
    background-color: #fff;
    /* border: 1px solid #ccc; */
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .content {
    overflow-y: auto;
    max-height: 60px;
  }
  
  .content input[type="checkbox"] {
    margin-right: 10px;
  }
.shuru{
border: 1px solid #ccc; /* 修改边框样式 */
  background-color: #f5f5f5; /* 修改背景色 */
  border-radius: 5px; /* 添加圆角效果 */
  padding: 10px; /* 添加内边距 */
  font-size: 16px; /* 修改字体大小 */
  font-family: Arial, sans-serif; /* 修改字体 */
position: relative;
left: 20%;


}

.btn{


  /* background-color: #007bff00;  */
  /* color: #fff; */
  padding: 10px; /* 添加内边距 */
  border: none; /* 去掉边框 */
  border-radius: 5px; /* 添加圆角效果 */
  font-size: 16px; /* 修改字体大小 */
  font-family: Arial, sans-serif; 
  cursor: pointer; /* 添加鼠标指针效果 */
}
.btn:hover {
  background-color: #0069d9;
}
.elebtn{
  position: relative;
 left: 20%;
}
.posi{
  position: relative;
}
  </style>