<template>
  <div>
    <h2>{{ dataofwritten.titleofquestionnaire }}</h2>
    <div v-for="question in dataofwritten.questiondata" :key="question.id">
      <h3 v-if="question.type === 1">{{ question.title }}</h3>
      <div v-if="question.type === 1"  class="chart-container">
        <div :id="'chart' + question.id" style="width: 400px; height: 400px;"></div>
      </div>
      <h3 v-if="question.type === 2">{{ question.title }}</h3>
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

export default {
  data() {
    return {
      dataofwritten: {
        titleofquestionnaire: '问卷标题',
        questiondata: [
          {
            type: 1,
            title:"单选题1",
            id: 0,
            seleted: [
              {
                id: 0,
                textofoption: '选项1',
                num: 5,
              },
              {
                id: 1,
                textofoption: '选项2',
                num: 3,
              },
              {
                id: 2,
                textofoption: '选项3',
                num: 6,
              },
              {
                id: 3,
                textofoption: '选项4',
                num: 2,
              },
            ],
          },
          {
            type: 1,
            title:"单选题2",
            id: 1,
            seleted: [
              {
                id: 0,
                textofoption: '选项1',
                num: 5,
              },
              {
                id: 1,
                textofoption: '选项2',
                num: 3,
              },
              {
                id: 2,
                textofoption: '选项3',
                num: 6,
              },
              {
                id: 3,
                textofoption: '选项4',
                num: 2,
              },
              {
               id:4,
                textofoption:'选项5',
               num:1
              }
            ],
          },
          {
            type: 2,
            id: 2,
            title:"填空题",
            filldata: ['填空回答1', '填空回答2', '填空回答3'],
          },
        ],
      },
    };
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      for (const question of this.dataofwritten.questiondata) {
        if (question.type === 1) {
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
              {name:"详细数据",
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
  list-style-type: none; 
  margin: 0;
  padding: 0; 
}

.re-list li {
  font-size: 16px; 
  color: #333; 
  line-height: 1.5; /* 修改行高，增加间距 */
  margin-bottom: 10px; /* 增加每项之间的间距 */
}

.chart-container {
display: flex;
justify-content: center;
}
</style>
