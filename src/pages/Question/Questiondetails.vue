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
      <h5>Commentaires :</h5>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="comment in comments" :key="comment.id">
          <div>
            {{ comment.comment }} - <em>{{ comment.user.name }}</em> <small>({{ comment.time }})</small>
            <br>
            <small>Likes: {{ comment.likes }}</small>
          </div>
          <div>
            <button class="btn btn-primary btn-sm" @click="likeComment(comment.id)">
              <i class="fas fa-thumbs-up"></i> {{ comment.likes }}
            </button>
          </div>
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
    this.fetchQuestion();
    this.fetchComments();
  },
  methods: {
    async fetchQuestion() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/questions/${this.$route.params.id}`);
        this.question = response.data.question;
      } catch (error) {
        console.error("Erreur lors de la récupération de la question :", error);
      }
    },
    async fetchComments() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/question-comments?question_id=${this.$route.params.id}`);
        this.comments = response.data.comments;
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
      }
    },
    async createComment() {
      if (!this.commentaire.comment.trim()) {
        this.errors.push('Le commentaire est requis');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/question-comments', {
          question_id: this.$route.params.id,
          comment: this.commentaire.comment
        });
        
        if (response.status === 200) {
          this.commentaire.comment = ''; // Efface le contenu du champ de commentaire
          this.errors = []; // Réinitialise les erreurs
          this.fetchComments(); // Rafraîchit les commentaires
        }
      } catch (error) {
        console.error("Erreur lors de la création du commentaire :", error);
      }
    },
    async likeComment(commentId) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/comments/${commentId}/like`);
        
        if (response.data.success) {
          const commentIndex = this.comments.findIndex(comment => comment.id === commentId);
          if (commentIndex !== -1) {
            this.comments[commentIndex].likes += 1;
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout d'un like :", error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
