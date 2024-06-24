<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mx-4">
                    <div class="card-body p-4">
                        <h1 class="text-center mb-4">Login</h1>
                        <form @submit.prevent="login">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="email" class="form-control" v-model="email" placeholder="Email">
                            </div>
                            <div class="input-group mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                </div>
                                <input type="password" v-model="password" class="form-control" placeholder="Password">
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <button type="submit" class="btn btn-primary px-4">Login</button>
                                </div>
                                <div class="col-6 text-right">
                                    <a href="#" class="text-decoration-none">Forgot password?</a>
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
import axios from 'axios';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                // Rediriger vers une autre page après le login
                this.$router.push({ name: 'Dashboard' });
            } catch (error) {
                console.error('Login failed', error);
                alert('Invalid login details');
            }
        },
    },

    }
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
}

.card {
    border: none;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.input-group-text {
    background-color: #f5f5f5;
    border: none;
    font-size: 1.2em;
}

input::placeholder {
    font-family: 'Roboto', sans-serif;
}



.btn-primary:hover {
    background-color: #4338ca;
}

.container {
    margin-top: 15%;
}
</style>