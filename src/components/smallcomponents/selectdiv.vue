<template>
    <div class="center">
<!-- <xiala></xiala> -->
<!-- <el-button  type="success" icon="el-icon-check" circle></el-button> -->
<el-input  placeholder="请输入问题"></el-input>
<!-- <el-button @click="addOption">添加选项</el-button>
    <div v-for="(option, index) in options" :key="index" class="option-row">
      <el-radio v-model="option.value" :label="option.label">{{ option.label }}</el-radio>
      <el-input v-model="option.inputValue" placeholder="请输入选项"></el-input>
    </div> -->
    </div>
</template>


<style>
.center{
height: auto;
width: 600px;
background-color: white;
border: 1px solid black;
/* position: absolute; */
/* left: 27%; */
border-radius: 18px;
}

</style>
<script lang="ts">
export default {
    data() {
    return {
      options: []
    }
  },
  methods: {
    addOption() {
      this.options.push({
        value: '',
        label: `选项 ${this.options.length + 1}`,
        inputValue: ''
      })
    }
  }
}
</script>