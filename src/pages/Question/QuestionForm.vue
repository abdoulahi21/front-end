<template>
    <div class="container ">
        <div class="card">
            <div class="card-header">
                Listes des Questions
            </div>
            <div class="alert alert-danger mt-4" v-if="errors.length">
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </div>
            <div class="card-body d-flex col-12 col-md-8">
                <div class="col-md-10">
                    <div class="card w-75 mb-3">
                        <div class="card-body" v-for="question in questions" :key="question.id">
                            <h5>{{ question.title }}</h5>
                            <p>{{ question.description }}</p>
                            <p class="card-text badge text-bg-primary">{{ question.slug }}
                            </p><br>
                            <router-link :to="{ path: '/questiondetails/' + question.id }"
                                class="btn btn-outline-secondary">Voir details</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <form @submit.prevent="createQuestion">
                        <div class="mb-3">
                            <label for="title" class="form-label">Titre de la question</label>
                            <input type="text" id="title" class="form-control" v-model="questions.title">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Contenu de la question</label>
                            <textarea id="description" class="form-control" v-model="questions.description"
                                rows="4"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="slug" class="form-label">Catégorie de la question</label>
                            <input type="text" id="title" class="form-control" v-model="questions.slug">
                        </div>
                        <button type="submit" class="btn btn-outline-primary">Poser la question</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "QuestionForm",
    data() {
        return {
            questions: {
                slug: '',
                title: '',
                description: ''
            },
            questions: [],
            errors: []
        }
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
        async createQuestion() {
            this.errors = [];
            if (this.questions.slug === '') {
                this.errors.push('Le slug est requis');
            }
            if (this.questions.title === '') {
                this.errors.push('Le titre est requis');
            }
            if (this.questions.description === '') {
                this.errors.push('La description est requise');
            }
            if (!this.errors.length) {
                let formData = new FormData();
                formData.append('slug', this.questions.slug);
                formData.append('title', this.questions.title);
                formData.append('description', this.questions.description);
                try {
                    let response = await axios.post('http://127.0.0.1:8000/api/questions', formData, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assurez-vous que le token est stocké et utilisé correctement
                        }
                    });
                    if (response.status === 200) {
                        this.questions.slug = '';
                        this.questions.title = '';
                        this.questions.description = '';
                        alert(response.data.message);
                        this.fetchQuestions(); // Mettre à jour la liste des questions
                    }
                } catch (error) {
                    console.log(error.response);
                    if (error.response && error.response.data && error.response.data.errors) {
                        this.errors = Object.values(error.response.data.errors).flat();
                    } else {
                        this.errors.push('Une erreur est survenue. Veuillez réessayer.');
                    }
                }
            }
        },


    },

}
</script>

<style scoped>
.container {
    margin-top: 10%;
}
</style>
