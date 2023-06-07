<template>
    <div class="wrapper">
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <el-menu :default-active="activeName" @select="handleSelect">
          <el-menu-item index="created">
            <i class="el-icon-document"></i>
            <span slot="title">已创建问卷</span>
          </el-menu-item>
          <el-menu-item index="filled">
            <i class="el-icon-edit"></i>
            <span slot="title">已填写问卷</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
  
      <!-- 右侧内容 -->
      <el-main>
        <!-- 已创建问卷 -->
        <div v-if="activeName === 'created'" class="section">

            <div v-for="(item,index) in userdata.quescreated" :key="index" >      
            <h2>{{ item }}</h2>
          <div class="numbers">{{ createdCount }}</div>
          
          <el-button type="danger" >删除</el-button>
          <el-button >查看结果</el-button>
             </div>
        </div>
  
        <!-- 已填写问卷 -->
        <div v-if="activeName === 'filled'" class="section">
            <div v-for="(item,index) in userdata.quesanswered" :key="index" >    
          <h2>{{ item }}</h2>
          <div class="numbers">{{ filledCount }}</div>
          <el-button >查看</el-button>
        </div>
        </div>
      </el-main>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      createdCount: {
        type: Number,
        required: true,
      },
      filledCount: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        userdata:{
username:"",

quescreated:[
    {id :0,
title:""}]
,
quesanswered:[1,2,3],
        },
        activeName: 'created',

      };
    },
    methods: {
      handleSelect(name) {
        this.activeName = name;
      },

    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  min-height: 800px;
  }
  .el-aside {
    background-color: #f5f5f5;
    padding: 20px;
  }
  .el-main {
    margin-left: 20px;
    padding: 20px;
  }
  .section {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;


    display: flex;
  flex-direction: column;
  align-items: flex-start;
  }
  .section h2 {
    margin-top: 0;
  }
  .section .numbers {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>