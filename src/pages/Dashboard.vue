<template>
  
</template>

<script>
export default {
    data() {
        return {
            tags: [

                { id: 1, name: "JavaScript", slug: "javascript" },
                { id: 2, name: "Vue.js", slug: "vuejs" },
                { id: 3, name: "Laravel", slug: "laravel" },
            ],
            showQuestionForm: false, // Initial state for showing/hiding the form
            title: '',
            description: '',
            tagsList: [],

        };
    },
    computed: {
        isProfileUrl() {
            return this.$route.path.includes("profile");
        },
    },
};
</script>

<style scoped>
/* Add your styles here */
.mb-2:hover {
    background-color: rgb(32, 90, 178);
    text-decoration: none;
    color: #fff;
}
</style>
