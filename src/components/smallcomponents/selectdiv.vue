<template>
    <div class="center">

<el-input  placeholder="请输入问题"></el-input>

    </div>
</template>


<style>
.center{
height: auto;
width: 600px;
background-color: white;
border: 1px solid black;

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