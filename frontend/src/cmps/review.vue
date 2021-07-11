<template>
  <div class="reviews-container">
    <section class="reviews-info">
      <h2>Reviews:</h2>
      <el-button type="primary" class="add" plain  @click="addReviewClicked">Add</el-button>
      <div class="reviews">
        <article v-for="review in reviews" :key="review._id">
        By: <router-link :to="'/user/'+ review.user._id">{{ review.user.fullname }}</router-link>
          <p>{{ review.txt }}</p>
        </article>
      </div>
    </section>
    <add-review
      v-if="isAdding"
      @addReview="addReview"
      @closeModal="isAdding = false"
    />
  </div>
</template>

<script>
import addReview from "./add-review";
export default {
  props: {
    reviews: Array,
  },
  data() {
    return {
      isAdding: false,
    };
  },
  methods: {
    addReviewClicked() {
      this.isAdding = true;
    },
    addReview(review) {
      this.$emit("addReview", review);
      this.isAdding = false;
    },
  },
  components: {
    addReview,
  },
};
</script>

<style>
</style>