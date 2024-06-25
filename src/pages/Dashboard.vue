<template>
    <div class="container-fluid min-vh-100 bg-light">
        <div class="container">
            <div class="py-5 row">
                <div class="col-12 col-md-4">
                    <!-- tags -->
                    <div v-show="!isProfileUrl" class="mb-3 border-0 card" style="border-radius: 15px;">
                        <div class="bg-transparent card-header">
                            <h5 class="py-2 mb-0">Catégories</h5>
                        </div>
                        <div class="card-body">
                            <div>
                                <router-link to="/" class="mb-2 btn w-100 text-start"
                                    style="border: .5px solid #00000010; border-radius: 15px;">Tous les catégories</router-link>
                            </div>
                            <div v-for="tag in tags" :key="tag.id">
                                <router-link :to="'/?tag=' + tag.slug" class="mb-2 btn w-100 text-start"
                                    style="border: .5px solid #00000010; border-radius: 15px;">{{ tag.name
                                    }}</router-link>
                            </div>
                        </div>
                    </div>
                    <!-- profile -->
                    <div v-show="isProfileUrl" class="mb-3 border-0 card" style="border-radius: 15px;">
                        <div class="bg-transparent card-header">
                            <h5 class="py-2 mb-0">Your Profile</h5>
                        </div>
                        <div class="card-body">
                            <div>
                                <router-link to="" class="mb-2 btn w-100 text-start"><i
                                        class="fas fa-user-edit me-2"></i>Edit Profile</router-link>
                                <router-link to="" class="mb-2 btn w-100 text-start"><i
                                        class="fas fa-lock me-2"></i>Change Password</router-link>
                                <router-link to="" class="mb-2 btn w-100 text-start"><i class="fas fa-bell me-2"></i>All
                                    Notifications</router-link>
                                <router-link to="" class="mb-2 btn w-100 text-start"><i
                                        class="fas fa-question-circle me-2"></i>Your Questions</router-link>
                                <router-link to="" class="mb-2 btn w-100 text-start"><i
                                        class="fas fa-heart me-2"></i>Saved Questions</router-link>
                            </div>
                        </div>
                    </div>

                    <!-- question -->
                    <div class="mb-3 border-0 card" style="border-radius: 15px;">
                        <div class="card-body">
                            <div>
                                <router-link to="question" class="mb-2 btn w-100 text-start">Questions </router-link>
                                <router-link to="" class="mb-2 btn w-100 text-start">Users</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-8">
                    <slot>Button</slot>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            tags: [
                // Example tags, replace with actual data
                { id: 1, name: 'JavaScript', slug: 'javascript' },
                { id: 2, name: 'Vue.js', slug: 'vuejs' },
                { id: 3, name: 'Laravel', slug: 'laravel' },
            ],
        };
    },
    computed: {
        isProfileUrl() {
            return this.$route.path.includes('profile');
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