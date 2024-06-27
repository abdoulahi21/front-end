<template>
    <div class="container">
        <div class="card w-75 mb-3">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <form action="" @submit.prevent="createComment">
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Commentaire</label>
                        <textarea class="form-control" v-model="commentaire.comment" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-outline-primary">Envoyer</button>
                </form>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Questiondetails",
    data() {
        return {
            commentaire: {
                comment: ''
            }
        }
    },
    created() {
        this.show();
    },
    methods: {
        async show() {
            let url = `http://127.0.0.1:8000/api/questions/${this.$route.params.id}`;
            await axios.get(url).then(response => {
                console.log(response);
                this.question = response.data
            });
        },
        async createComment() {
            this.errors = [];
            if (this.commentaire.comment === '') {
                this.errors.push('Le commentaire est requis');
            }
            if (!this.errors.length) {
                let formData = new FormData();
                formData.append('comment', this.commentaire.comment);
                let url =""
                await axios.post(url, formData).then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        this.$router.push({ name: 'Questiondetails' });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: 10%;
}
</style>