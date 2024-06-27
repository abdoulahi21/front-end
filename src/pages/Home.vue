<template>
    <div class="container">
      <router-link to="question" class="btn btn-outline-primary mb-3">Poser une question</router-link>
        <div class="card w-75 mb-3">
            <div class="card-body" v-for="question in questions" :key="question.id">
                <h5 class="card-title">{{ question.slug}} {{ question.title }}</h5> 
                <p class="card-text">{{ question.description }}</p> 
                <router-link :to="{ path:'/questiondetails/' + question.id}" class="btn btn-outline-secondary">Voir details</router-link>
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
.user-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>