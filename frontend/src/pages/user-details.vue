<template>
     <ul v-if="user" class="user-details">
           <h2 class="title">Reviews:</h2>
        <li class="review-user" v-for="review in  user.givenReviews" :key="review._id">
           <p>By: {{review.user.fullname}}</p>
           <p>Toy: {{review.toy.name}}</p>
           <p>{{review.txt}}</p>
        </li>
     </ul>
</template>

<script>
import {userService} from "../services/user.service.js";
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const { userId } = this.$route.params;
      try {
        this.user = await userService.getById(userId);
      } catch (err) {
        console.log("cannot get user", err);
        throw err;
      }
    },
  },
};
</script>

<style>
</style>