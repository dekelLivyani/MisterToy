<template>
  <ul class="reviews">
    <h2 class="title">All Reviews:</h2>
    <li class="review-in-list" v-for="review in reviews" :key="review._id">
      <p>By: {{ review.user.fullname }}</p>
      <p>Toy: {{ review.toy.name }}</p>
      <p>{{ review.txt }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  async created() {
    try {
      await this.$store.dispatch({ type: "loadReviews" });
    } catch (err) {
      console.log("cannot load reviews", err);
      throw err;
    }
  },
  computed: {
    reviews() {
      console.log(this.$store.getters.reviews);
      return this.$store.getters.reviews;
    },
  },
};
</script>

<style>
</style>