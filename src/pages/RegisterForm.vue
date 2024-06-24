<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mx-4">
                    <div class="alert alert-danger mt-4" v-if="errors.length">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="card-body p-4">
                        <h1 class="text-center mb-4">Inscription</h1>
                        <form @submit.prevent="register">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" v-model="user.name" id="name" class="form-control" placeholder="Nom complet">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                </div>
                                <input type="email" v-model="user.email" class="form-control" placeholder="Email">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                </div>
                                <input type="password" v-model="user.password" class="form-control" placeholder="Mot de passe">
                            </div>
                            <div class="input-group mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                </div>
                                <input type="password" v-model="user.password_confirmation" class="form-control" placeholder="Confirmer le mot de passe">
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <button type="submit" class="btn btn-primary px-4">S'inscrire</button>
                                </div>
                                <div class="col-6 text-right">
                                    <router-link to="login" class="text-decoration-none">Vous avez déjà un compte?</router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RegisterForm',
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: []
        }
    },
    methods: {
        async register() {
            this.errors = []
            if (!this.user.name) {
                this.errors.push('Le nom est requis')
            }
            if (!this.user.email) {
                this.errors.push('L\'email est requis')
            }
            if (!this.user.password) {
                this.errors.push('Le mot de passe est requis')
            }
            if (!this.user.password_confirmation) {
                this.errors.push('La confirmation du mot de passe est requise')
            }
            if (this.user.password !== this.user.password_confirmation) {
                this.errors.push('Les mots de passe ne correspondent pas')
            }
            if (!this.errors.length) {
                let formData = new FormData()
                formData.append('name', this.user.name)
                formData.append('email', this.user.email)
                formData.append('password', this.user.password)
                formData.append('password_confirmation', this.user.password_confirmation)
                let url = 'http://127.0.0.1:8000/api/register'
                await axios.post(url, formData).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        this.user.name = ''
                        this.user.email = ''
                        this.user.password = ''
                        this.user.password_confirmation = ''
                        alert(response.data.message)
                        this.$router.push({ name: 'Loginform' })
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
}
</script>

<style></style>
