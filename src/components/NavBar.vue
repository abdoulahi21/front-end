<template>

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Help Me</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">Accueil</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="register" tabindex="-1"
                            aria-disabled="true">Register</router-link>
                    </li>
                </ul>
            </div>
            <!--logout-->
            <div class="d-flex">
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
    name: 'LogoutButton',
    setup() {
       

        const logout = async () => {
            try {
                const token = localStorage.getItem('token'); // Ou récupérez le token de l'endroit où vous le stockez
                await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                localStorage.removeItem('token'); // Supprimez le token stocké localement
                this.$router.push('/LoginForm'); // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée
            } catch (error) {
                console.error('Error during logout', error);
                // Gérez les erreurs, affichez des messages à l'utilisateur, etc.
            }
        };

        return {
            logout
        };
    }
}
</script>

<style></style>