<template>
    <div style="height: 50px;   line-height: 50px;border-bottom: 1px solid black;display: flex;">
        <div style="width: 200px;padding-left: 30px;font-weight: bold;color: aquamarine;" >TEST</div>
        <div style="flex: 1;"> </div>
        <div style="width: 100px;"> <el-dropdown id="xiala">
    <span class="el-dropdown-link">user</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>personal data</el-dropdown-item>
        <el-dropdown-item>quit</el-dropdown-item>
        <!-- <el-dropdown-item>选项3</el-dropdown-item> -->
      </el-dropdown-menu>
    </template>
  </el-dropdown></div>

    </div>
</template>

<script>
export default {
    name:"header",
}
</script>

<style>
#xiala{
    margin-top: 16px;
}
</style>