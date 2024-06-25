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
                    <table class="table table-striped table-hover">
                        <tbody v-for="question in questions" :key="question.id">
                            <tr>
                                <td>{{ question.title }}</td>
                                <td>{{ question.description }}</td>
                                <td>{{ question.user_id }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-8">
                    <form @submit.prevent="createQuestion">
                        <div class="mb-3">
                            <label for="title" class="form-label">Titre de la question</label>
                            <input type="text"  class="form-control" v-model="questions.title"
                                >
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Contenu de la question</label>
                            <textarea  class="form-control" v-model="questions.description" rows="4"
                                ></textarea>
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
                title: '',
                description: ''
            },
            errors: []
        }
    },
    methods: {
        async createQuestion() {
            this.errors = []
            if (!this.questions.title == '') {
                this.errors.push('Le title est requis')
            }
            if (!this.questions.description == '') {
                this.errors.push('La description est requis')
            }
            if (!this.errors.length) {
                let formData = new FormData()
                formData.append('title', this.questions.title)
                formData.append('description', this.questions.description)
                let url = 'http://127.0.0.1:8000/api/questions'
                await axios.post(url, formData).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        this.questions.title = ''
                        this.questions.description = ''
                        alert(response.data.message)
                    }
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        this.errors = Object.values(error.response.data.errors).flat()
                    } else {
                        this.errors.push('Une erreur est survenue. Veuillez réessayer.')
                    }
                })
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
