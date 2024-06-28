<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Mini Stack</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link
                            class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                            aria-current="page" to="/">Accueil</router-link>
                    </li> &nbsp;&nbsp;&nbsp;&nbsp;
                    <li class="nav-item">
                        <router-link
                            class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                            aria-current="page" to="question">Questions</router-link>
                    </li>&nbsp;&nbsp;&nbsp;&nbsp;
                    <li class="nav-item">
                        <router-link
                            class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                            aria-current="page" to="listUsers">Users</router-link>
                    </li>&nbsp;&nbsp;
                </ul>
               
            </div>
            <div class="d-flex" v-if="!isLoggedIn">
                    <router-link class="btn btn-outline-light" to="/login">Login</router-link>
                </div>
            <div class="d-flex" v-if="isLoggedIn">
                <form @submit.prevent="logout">
                    <button class="btn btn-outline-light" type="submit">Deconnexion</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NavBar',
    data() {
        return {
            token: localStorage.getItem('token')
        };
    },
    computed: {
        isLoggedIn() {
            return !!this.token;
        }
    },
    methods: {
        async logout() {
            localStorage.removeItem('token');
            this.token = null;
            // Rediriger vers une autre page après la déconnexion et rechargez la page
            this.$router.push({ name: 'Home' });
        }
    },
    watch: {
        token(newToken) {
            this.isLoggedIn = !!newToken;
        }
    },
    mounted() {

    }
}
</script>

<style>
/* Add your styles here */
</style>
