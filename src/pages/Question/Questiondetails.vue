<template>
    <div class="container">
      <div class="card w-75 mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ question.title }}</h5>
          <p class="card-text">{{ question.description }}</p>
        </div>
      </div>
      <form @submit.prevent="createComment">
        <div class="mb-3 w-75">
          <textarea
            class="form-control"
            placeholder="commentaire"
            v-model="commentaire.comment"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-outline-primary">Envoyer</button>
      </form>
      <div v-if="comments.length" class="w-75 mt-3">
        <h5>Commentaires:</h5>
        <ul class="list-group">
          <li class="list-group-item" v-for="comment in comments" :key="comment.id">
            {{ comment.comment }} - <em>{{ comment.user.name }}</em> <small>({{ comment.time }})</small>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Questiondetails',
    data() {
      return {
        question: {},
        commentaire: {
          comment: '',
          question_id: this.$route.params.id,
        },
        comments: [],
        errors: [],
      };
    },
    created() {
      this.show();
      this.fetchComments();
    },
    methods: {
      async show() {
        const url = `http://127.0.0.1:8000/api/questions/${this.$route.params.id}`;
        try {
          const response = await axios.get(url);
          this.question = response.data.question;
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération de la question:", error);
        }
      },
      async fetchComments() {
        const url = `http://127.0.0.1:8000/api/question-comments?question_id=${this.$route.params.id}`;
        try {
          const response = await axios.get(url);
          this.comments = response.data.comments;
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération des commentaires:", error);
        }
      },
      async createComment() {
  this.errors = [];
  if (this.commentaire.comment === '') {
    this.errors.push('Le commentaire est requis');
    return;
  }
  const url = 'http://127.0.0.1:8000/api/question-comments';
  try {
    const response = await axios.post(url, {
      question_id: this.$route.params.id,
      comment: this.commentaire.comment
    });
    if (response.status === 200) {
      this.commentaire.comment = ''; // Clear the comment input
      this.fetchComments(); // Refresh comments
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la création du commentaire:", error);
  }
}

    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 10%;
  }
  </style>
  