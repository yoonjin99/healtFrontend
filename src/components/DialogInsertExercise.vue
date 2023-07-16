<script setup lang="ts">

</script>

<template>
    <div class="modal">
        <div class="overlay"></div>
        <div class="modal-card">
            <h3>오늘의 운동 기록</h3>
            날짜 : <input type="date" width="100px" v-model="exerciseDate"><br>
            <div>
                운동 종목 :
                <select v-model="code">
                    <option value=0>- 운동 선택 -</option>
                    <option value=10>데드리프트</option>
                    <option value=20>스쿼트</option>
                    <option value=30>숄더프레스</option>
                </select>
                <br>
                무게 :
                <select v-model="weight">
                  <option value=0>- 무게 선택 -</option>
                  <option value=30>30KG</option>
                  <option value=40>40KG</option>
                  <option value=50>50KG</option>
                </select>
                <br>
                횟수 :
                <select v-model="times">
                  <option value=0>- 횟수 선택 -</option>
                  <option value=5>5회</option>
                  <option value=10>10회</option>
                  <option value=15>15회</option>
                </select>
                <br>
                세트 :
                <select v-model="setNumber">
                  <option value=0>- 세트 선택 -</option>
                  <option value=3>3SET</option>
                  <option value=5>5SET</option>
                  <option value=7>7SET</option>
                </select>
                <br>
            </div>
            <button @click="$emit('close-modal')">취소</button>
            <button v-if="!isUpdatePage" @click="insertUpdateExercise('I')">등록</button>
            <button v-if="isUpdatePage" @click="insertUpdateExercise('U')">수정</button>
            <button v-if="isUpdatePage" @click="deleteExercise">삭제</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props:{
      isUpdatePage: {
          type: Boolean,
          default: false
      },
        seq:{
          type: Number,
            default: 0
        }
    },
    data(){
        return{
            exerciseDate: null,
            weight: 0,
            setNumber: 0,
            code: 0,
            times: 0,
        }
    },
    mounted() {
      if(this.isUpdatePage){
        this.getExerciseDetail()
      }
    },
    methods:{
        insertUpdateExercise(type){
            let param = {
                exerciseDate: this.exerciseDate,
                weight: this.weight,
                setNumber: this.setNumber,
                code: this.code,
                times: this.times
            }

            if(type == 'U'){
                param = {...param, seq: this.seq}
            }

            let url = type == 'I' ? '/api/insertExercise' : '/api/updateExercise'

            axios.post(url, param).then(() => {
                alert('저장되었습니다.')
                this.$emit('close-modal')
            }).then(err => {
                console.log(err)
            })
        },
        deleteExercise(){
            axios.post('/api/deleteExercise', {seq : this.seq}).then(() => {
                alert('삭제되었습니다.')
                this.$emit('close-modal')
            }).then(err => {
                console.log(err)
            })
        },
        getExerciseDetail(){
            axios.get('/api/getExerciseDetail?seq=' + this.seq).then(res => {
                let data = res.data
                this.exerciseDate = data.exerciseDate
                this.weight = data.weight
                this.setNumber = data.setNumber
                this.code = data.code
                this.times = data.times
            }).then(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.modal,
.overlay{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
}
.overlay{
    opacity: 0.5;
    background-color: black;

}
.modal-card{
    position: relative;
    max-width: 80%;
    margin: 30px auto auto;
    padding: 20px;
    background-color: white;
    min-height: 500px;
    z-index: 10;
    opacity: 1;
}
</style>*