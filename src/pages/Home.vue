<template>
    <div>
       
    </div>
    <div class="container">
        <router-link to="question" class="btn btn-outline-primary mb-3">Poser une question</router-link>
       <div class="card">
        <div class="card-body">
            <table class="table table-striped table-hover">
            <tbody>
                <tr>
                    <td>How to install Laravel</td>
                    <td>5</td>
                    <td>Laravel, PHP</td>
                </tr>
                <tr>
                    <td>How to install Laravel</td>
                    <td>5</td>
                    <td>Laravel, PHP</td>
                </tr>
                <tr>
                    <td>How to install Laravel</td>
                    <td>5</td>
                    <td>Laravel, PHP</td>
                </tr>
            </tbody>
        </table>
        </div>
       </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style>
.container {
    margin-top: 8%;
}
</style>