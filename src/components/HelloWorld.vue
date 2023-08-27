<template>
  <div class="hello">
      <CommonHeader/>
      <DialogInsertExercise v-if="isModalViewed" @close-modal="this.isModalViewed = false" :is-update-page="isUpdatePage" :seq="seq" @reload="reloadData"/>
      <br>
      <h4><button @click="showInsertDialog">기록 등록</button></h4>

    <table v-if="list.length > 0" class="table-auto">
        <tr>
            <th>날짜</th>
            <th>운동기록</th>
        </tr>
        <template v-for="(data, index) in list" :key="index">
            <tr>
                <td>{{data.exerciseDate}}</td>
                <td>
                    <p v-for="(detail, index2) in data.exerciseDetails" :key="index2">
                        <a @click="showUpdateDialog(detail.seq)">[{{detail.name}}] {{detail.setNumber}}set / {{detail.weight}}kg / {{detail.times}}회</a>
                    </p>
                </td>
            </tr>
        </template>
    </table>
  </div>
</template>

<script>
import DialogInsertExercise from "@/components/DialogInsertExercise.vue";
import axios from "axios";
import CommonHeader from "@/components/CommonHeader.vue";

export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    components:{
        DialogInsertExercise,
        CommonHeader
    },
    data(){
        return{
            isModalViewed: false,
            list: [],
            isUpdatePage: false,
            seq: 0,
            title: ''
        }
    },
    beforeMount() {
        console.log("beforeMount hook executed")
    },
    mounted() {
        console.log("mounted hook executed")
        this.getList()
    },
    beforeUnmount() {
        console.log('beforeUnmount hook executed')
    },
    unmounted() {
        console.log('unmounted hook executed')
    },
    methods:{
        getList(){
            axios.get('/api/getExerciseList').then(res => {
                console.log(res.data)
                this.list = res.data
            })
        },
        showUpdateDialog(seq){
            this.isUpdatePage = true
            this.seq = seq
            this.isModalViewed = true
        },
        showInsertDialog(){
            this.isUpdatePage = false
            this.isModalViewed = true
        },
        reloadData(){
            this.isModalViewed = false
            this.isUpdatePage = false
            this.getList()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
    display: inline-block;
    margin: 0 10px;
    border-collapse: collapse;
}
th, td {
    padding: 10px;
    border-bottom: 1px solid #181818;
}
tr:hover { background-color: #F5F5F5; }
tr {
    width: 200px;
}
td{
    width: 400px;
    height: 130px;
}
p a {
    color: darkblue;
}
button {
    padding: 10px 20px;
    border: 1px solid #ddd;
    color: #333;
    background-color:#fff;
    border-radius: 4px;
    font-size: 14px;
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
