<template>
  <div class="container-fluid min-vh-100 bg-light">
    <div class="container">
      <div class="py-5 row">
        <div class="col-12 col-md-4">
          <!-- ... (Other sections) ... -->
  
          <main class="col-12 col-md-8">
            <!-- AskQuestion Form -->
            <div v-if="showQuestionForm" class="mb-3 border-0 card" style="border-radius: 15px">
              <div class="bg-transparent card-header">
                <h5 class="py-2 mb-0">Poser une question</h5>
              </div>
              <div class="card-body">
                <form @submit.prevent="createQuestion">
                  <div class="mb-3">
                    <label for="questionTitle" class="form-label">Titre de la question</label>
                    <input type="text" id="questionTitle" class="form-control" v-model="title" required>
                  </div>
                  <div class="mb-3">
                    <label for="questionContent" class="form-label">Contenu de la question</label>
                    <textarea id="questionContent" class="form-control" v-model="description" rows="4" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Poser la question</button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dashboard from './Dashboard.vue'
import axios from 'axios'
export default {
  name: 'AskQuestion',
  components: {
    Dashboard
  },
  data() {
    return {
      title: '',
      description: '',
      tags: [],
      loading: false,
      errors: {},
      tagsList: [],
      showQuestionForm: false // Ajout de cette propriété pour afficher/masquer le formulaire
    };
  },
  methods: {
    createQuestion() {
      this.loading = true;
      axios
        .post('/questions', {
          title: this.title,
          description: this.description,
          tags: this.tags
        })
        .then(() => {
          this.loading = false;
          this.title = '';
          this.description = '';
          this.tags = [];
          this.errors = {};
          alert('Question créée avec succès');
        })
        .catch(error => {
          this.loading = false;
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<style></style>
