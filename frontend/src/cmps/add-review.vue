<template>
   <form class="add-review" @submit.prevent="addReview">
      <h1>Add Review</h1>
      <span class="close-modal" @click="closeModal">X</span>
            <el-input
              class="input"
              placeholder="Review info..."
              v-model="review.txt"
            ></el-input>
      <button type="submit" class="save btn">Add</button>
    </form>
</template>

<script>
export default {
     data() {
    return {
      review: {},
    };
  },
  methods:{
     addReview(){
        this.$emit('addReview',this.review)
     },
     closeModal(){
         this.$emit('closeModal')
     }
  }
}
</script>

<style>

</style>