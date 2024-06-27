<template>
    <div class="container">
        <div class="card w-75 mb-3">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <form action="">
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Commentaire</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </form>
                <a href="#" class="btn btn-outline-primary">Button</a>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'ListUsers',
    data() {
    return {
      users: Array,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      let url = "http://127.0.0.1:8000/api/users";
      await axios
        .get(url)
        .then((response) => {
          this.users = response.data.users;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
        });
    },
},
}
</script>


<style></style>