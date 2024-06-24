<template>
    <div>
        <Dashboard>
            <div class="mb-4 border-0 card" style="border-radius: 15px;">
                <div class="bg-transparent card-header">
                    <h5 class="py-2 mb-0">Ask Question</h5>
                </div>
                <div class="card-body">
                    <form @submit.prevent="createQuestion">
                        <div class="mb-3">
                            <label for="" class="form-label">Title</label>
                            <input v-model="title" type="text" class="form-control" :class="[errors.title ? 'border border-danger' : '']" style="border-radius: 15px;">
                            <small class="text-danger" v-if="errors.title">{{ errors.title }}</small>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Description</label>
                            <textarea v-model="description" class="form-control" :class="[errors.description ? 'border border-danger' : '']" rows="3" style="border-radius: 15px;"></textarea>
                            <small class="text-danger" v-if="errors.description">{{ errors.description }}</small>
                        </div>
                        <div class="mb-3">
                            <div v-for="tag in tagsList" :key="tag.id" class="mb-2 form-check">
                                <input v-model="tags" class="form-check-input" :class="[errors.tags ? 'border border-danger' : '']" type="checkbox" :value="tag.id">
                                <label class="form-check-label" for="flexCheckDefault">
                                    {{ tag.name }}
                                </label>
                            </div>
                            <small class="text-danger" v-if="errors.tags">{{ errors.tags }}</small>
                        </div>

                        <button class="mt-3 btn btn-primary float-end" :disabled="loading">
                            <div v-show="loading" class="spinner-border spinner-border-sm text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <span v-show="loading">wait...</span>
                            <span v-show="!loading">Ask Question</span>
                        </button>
                    </form>
                </div>
            </div>
        </Dashboard>
    </div>
</template>

<script>
import axios from 'axios';
import Dashboard from '../Dashboard.vue';

export default {
    name: "QuestionForm",
    components: {
        Dashboard,
    },
    props: {
        errors: Object,
        tagsList: Array,
    },
    data() {
        return {
            title: '',
            description: '',
            tags: [],
            loading: false,
        };
    },
    methods: {
        async createQuestion() {
            this.loading = true;
            try {
                const response = await axios.post('/question/create', {
                    title: this.title,
                    description: this.description,
                    tags: this.tags,
                });
                this.loading = false;
                // Handle success (e.g., redirect to the new question page)
                console.log(response.data);
            } catch (error) {
                this.loading = false;
                // Handle error (e.g., set validation errors)
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                }
            }
        },
    },
};
</script>

<style lang="stylus" scoped>

</style>
