<template>
    <header>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="/" class="nav-link">Main</a>
                    </li>
                    <li class="nav-item">
                        <a href="/ChartView?code=10" class="nav-link">데드리프트 기록</a>
                    </li>
                    <li class="nav-item">
                        <a href="/ChartView?code=20" class="nav-link">스쿼트 기록</a>
                    </li>
                    <li class="nav-item">
                        <a href="/ChartView?code=30" class="nav-link">프레스 기록</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <h1>Welcome To My Exercise Writing Site </h1>
</template>

<script>
export default {
    name: 'HelloWorld',
}
</script>

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
</style>