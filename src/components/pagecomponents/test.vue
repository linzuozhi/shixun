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
          <h2>已创建问卷</h2>
          <div class="numbers">{{ createdCount }}</div>
          <el-button type="primary" @click="handleEdit">编辑</el-button>
          <el-button type="danger" @click="handleDelete">删除</el-button>
          <el-button @click="handleViewResult">查看结果</el-button>
        </div>
  
        <!-- 已填写问卷 -->
        <div v-if="activeName === 'filled'" class="section">
          <h2>已填写问卷</h2>
          <div class="numbers">{{ filledCount }}</div>
          <el-button @click="handleView">查看</el-button>
          <el-button type="danger" @click="handleDelete">删除</el-button>
          <el-button @click="handleExport">导出</el-button>
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