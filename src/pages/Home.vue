<template>
    <div class="container">
        <router-link to="question" class="btn btn-outline-primary mb-3">Poser une question</router-link>
       <div class="card">
        <div class="card-body">
            <table class="table table-striped table-hover">
            <tbody>
                <tr v-for="question in questions" :key="question.id">
                    <td>{{ question.user_id }}</td>
                    <td>{{ question.slug }}</td>
                    <td>{{ question.title }}</td>
                    <td>{{ question.description }}</td>
                    
                </tr>

            </tbody>
        </table>
        </div>
       </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    data() {
    return {
      questions: Array,
    };
  },
  created() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      let url = "http://127.0.0.1:8000/api/questions";
      await axios
        .get(url)
        .then((response) => {
          this.questions = response.data.questions;
          console.log(this.questions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
},
}
</script>

<style>
.container {
    margin-top: 8%;
}
</style>