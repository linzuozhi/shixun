<template>
  <div >
    <Header></Header>
    
    <div>
    <el-input v-model="token.inputLink" placeholder="请输入链接" style="width: 600px;    "></el-input>
    <el-input v-model="token.permissionCode" placeholder="请输入权限码"  style="width: 600px;    "></el-input>

    <el-button icon="el-icon-search" circle @click="submitLink"></el-button>
    </div>
    <h2 style="margin-bottom: 20px;margin-top: 10px;font-size: 30px;">{{ dataofwritten.titleofquestionnaire }}</h2>
    <div v-for="question in dataofwritten.questiondata" :key="question.id">
      <h3 v-if="question.type === 1 || question.type === 0" >{{ question.title }}</h3>
      <div v-if="question.type === 1 || question.type === 0" class="chart-container">
        <div :id="'chart' + question.id" style="width: 400px; height: 400px;"></div>
      </div>
      <h3 v-if="question.type === 2" style="margin-bottom: 15px;">{{ question.title }}</h3>
      <div v-if="question.type === 2">
        <ul class="re-list">
          <li v-for="(answer, index) in question.filldata" :key="index">{{ answer }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';
import Header from "../smallcomponents/header.vue"
import userdata from "../pagecomponents/userdata.vue"
export default {
 components: {
   Header,
   userdata
  }, 
  data() {
    return {
      jsonData:{},
token:{ 
  inputLink:"",
    permissionCode:"",
  },

      dataofwritten: {
        titleofquestionnaire:"",
        questiondata:[],
      },
    };
  },
  mounted() {
    
  },
  methods: {
   
    submitLink() {
      axios.post("http://localhost:9090/analyze", this.token)
          .then(response => {
            if (response.data === 0) {
              alert('链接无效或权限码错误');
              this.token.inputLink = '';
              this.token.permissionCode = '';

            } else {
              this.dataofwritten = response.data;
              this.renderCharts();
              
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    renderCharts() {
      for (const question of this.dataofwritten.questiondata) {
        if (question.type === 1 || question.type === 0) {
          const chartId = `chart${question.id}`;
          const chartData = question.seleted.map((option) => ({
            name: option.textofoption,
            value: option.num,
          }));

          const chart = echarts.init(document.getElementById(chartId));
          const options = {

            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 10,

            },
            series: [
              {
                name: "详细数据",
                type: 'pie',

                data: chartData,
                // roseType:'area',
                label: {
                  show: true,
                  position: 'inside',
                  formatter: '{b} ({d}%)',
                },
              },
            ],
          };
          chart.setOption(options);
        }
      }
    },
  },
};
</script>

<style>

.re-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .re-list li {
    padding: 10px;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    margin: 0 auto 10px auto;
    /* margin-bottom: 10px; */
    width: 600px;
    transition: transform 0.2s ease-in-out;
    animation: slide-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .re-list li:hover {
    transform: scale(1.1);
  }
  @keyframes slide-in {
    0% {
      transform: translateX(-100px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
.chart-container {
  display: flex;
  justify-content: center;
}
</style>
