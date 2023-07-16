<template>
    <CommonHeader/>
    <div v-if="hasData">
        <Line
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
        />
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend } from 'chart.js'
import axios from "axios";
import CommonHeader from "@/components/CommonHeader.vue";

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)

export default {
    name: 'BarChart',
    components: {CommonHeader, Line },
    computed:{
      hasData(){
          return this.chartData.labels.length > 0
      }
    },
    data() {
        return {
            chartData: {
                labels: [], // 날짜 데이터
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [] // 횟수 * 무게
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.getChartData()
    },
    methods:{
        getChartData(){
            axios.get('/api/getChartByExercise?code=' + this.$route.query.code).then(res => {
                res.data.forEach(exec => {
                    this.chartData.labels.push(exec.exerciseDate)
                    this.chartData.datasets[0].data.push(exec.totalWeight)
                })
            })
        }
    }
}
</script>