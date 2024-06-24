<template>
        <Dashboard>
           <div>
           </div>
        </Dashboard>
   
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
        }
    },
    methods: {
        createQuestion() {
            this.loading = true
            axios.post('/questions', {
                title: this.title,
                description: this.description,
                tags: this.tags
            })
                .then(() => {
                    this.loading = false
                    this.title = ''
                    this.description = ''
                    this.tags = []
                    this.errors = {}
                    alert('Question created successfully')
                })
                .catch(error => {
                    this.loading = false
                    this.errors = error.response.data.errors
                })
        }
    },

}
</script>

<style></style>