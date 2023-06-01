<template>
    <div>
    <el-button @click="show"></el-button>
       <div ref="chart" style="height: 400px;" id="myChart"></div>
   
       </div>
   </template>
   
   
   
   <script>
   import * as echarts from 'echarts';
   
   export default {
     data(){
   return{
   dataofwritten:{
   titleofquestionnaire:"问卷标题",
   questiondata:[{
    type:1,
    id:0,
     seleted:[
      {id:0,
       textofoption:"选项1",
        num:5,
      },
      {id:1,
       textofoption:"选项2",
        num:3,
      },
   {id:2,
       textofoption:"选项3",
        num:6,
   
   },
   {id:3,
       textofoption:"选项4",
        num:2,}
     ]
   },
   { 
     type:2,
     
    id:1,
   filldata:[
     "填空回答1",
     "填空回答2",
     "填空回答3",
   ]}]},
   
   
   }
   
   },
       mounted() {
      
     },
     methods:{
       
   
       show(){
         this.initchart()
       },
   initchart(){
   
     const myChart = echarts.init(this.$refs.chart)
       myChart.setOption({
         title: {
           text: '饼状图示例',
           left: 'center'
         },
         tooltip: {
          trigger: 'item',
           formatter: '{a} <br/>{b}: {c} ({d}%)'
         },
         legend: {
           orient: 'vertical',
           left: 10,
           data: ['数据1', '数据2', '数据3', '数据4']
         },
         series: [
           {roseType: 'area',
             name: '数据名称',
             type: 'pie',
             // radius: ['50%', '70%'],
             avoidLabelOverlap: false,
             label: {
               show: false,
               position: 'inside'
             },
             emphasis: {
               label: {
                 show: true,
                 fontSize: '30',
                 fontWeight: 'bold'
               }
             },
             labelLine: {
               show: false
             },
             data: [
               {value: 335, name: '数据1'},
               {value: 310, name: '数据2'},
               {value: 234, name: '数据3'},
               {value: 135, name: '数据4'}
             ]
           }
         ]
         // title: {
         //   text: 'ECharts 入门示例'
         // },
         // tooltip: {},
         // xAxis: {
         //   data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
         // },
         // yAxis: {},
         // series: [{
         //   name: '销量',
         //   type: 'bar',
         //   data: [5, 20, 36, 10, 10, 20, 10]
         // }]
       })
   
   
   }
   
   
     },
   
   }
   </script>
   
   <style>
   
   
   </style>