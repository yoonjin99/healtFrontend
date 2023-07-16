<script setup lang="ts">

</script>

<template>
    <transition name="fade" appear>
        <div class="modal-overlay"></div>
    </transition>
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
            <div style="padding-top: 30px">
              <button @click="$emit('close-modal')" style="margin-right: 10px">취소</button>
              <button v-if="!isUpdatePage" @click="insertUpdateExercise('I')">등록</button>
              <button v-if="isUpdatePage" @click="insertUpdateExercise('U')" style="margin-right: 10px">수정</button>
              <button type="danger" v-if="isUpdatePage" @click="deleteExercise">삭제</button>
            </div>
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
                this.$emit('reload')
            })
        },
        deleteExercise(){
            axios.post('/api/deleteExercise', {seq : this.seq}).then(() => {
                alert('삭제되었습니다.')
                this.$emit('reload')
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
            })
        }
    }
}
</script>

<style scoped>
.modal {
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    width: fit-content;
    height: fit-content;
    max-width: 22em;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;
}
.modal h1 {
    margin: 0 0 1rem;
}

.modal-overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #2c3e50;
    opacity: 0.6;
    cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
button {
    padding: 10px 20px;
    border: 1px solid #ddd;
    color: #333;
    background-color:#fff;
    border-radius: 4px;
    font-size: 14px;
    font-family: '微软雅黑',arail;
    cursor: pointer;
    &[disabled]{
        cursor: not-allowed;
    }
    &.danger {
        background-color: #ff4949;
        color: #fff;
    }
    &.success {
        background-color: #13ce66;
        color: #fff;
    }
    &.info {
        background-color: #50bfff;
        color: #fff;
    }
}
</style>