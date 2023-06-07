<template>
  <div class="center">
    <el-button type="primary" @click="deleteSelf"></el-button>
    <el-input placeholder="请输入问题" v-model="fillinpac.title" @change="both"></el-input>
    <el-input
      placeholder="请输入答题提示（可空）"
      v-model="fillinpac.description"
      @change="both"
    ></el-input>
  </div>
</template>
<style>
.center {
  height: 80px;
  width: 600px;
  background-color:#F5F5F5;

  margin: 10px;
}
</style>
<script >
import axios from "axios";
export default {
  components: {},

  data() {
    return {
      fillinpac: {
        id: "",
        questionType: 2,

        title: "",
        description: "",
        correctAnswer: "",
      },
    };
  },
  methods: {
    deleteSelf() {
    // 发送删除事件，通知父组件删除对应的数据
    this.$emit('delete','' );
  },
    both() {
      this.handleChange();
      this.emitHandler();
    },
    handleChange() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        // 在最后一次change事件后触发@change事件
        this.$emit("change", this.inputValue);
      }, 10000);
    },
    emitHandler() {
      this.$emit("a", this.fillinpac);
    },
    submitFillinData() {
      console.log(this.fillinpac);
      axios
        .post("/login", this.fillinpac)
        .then((response) => {
          console.log(response.data);
          // window.location.href = 'http://localhost:8081/login'
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
