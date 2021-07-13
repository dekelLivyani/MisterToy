<template>
  <div class="toy-details" v-if="toy">
   <el-button type="primary" class="open-chat-btn" @click="isChatOpen = true"
    v-if="!isChatOpen">Open Chat</el-button>
    <chat-room v-else @closeChat="isChatOpen = false"/>
    
    <img class="toy-img" :src="imgUrl" v-if="imgUrl" />
    <review :reviews="reviews" @addReview="addReview" />
    <section class="info1">
      <p>Id: {{ toy._id }}</p>
      <p>Name: {{ toy.name }}</p>
      <p>Price: {{ toy.price }}</p>
    </section>
    <section class="info2">
      <p>Type: {{ toy.type }}</p>
      <p>
        Created at:
        <span>{{ toy.createdAt | moment("ddd, MMMM  YYYY, ha") }}</span>
      </p>
      <p>in stock: {{ toy.inStock }}</p>
    </section>
  </div>
</template>

<script>
import { toyService } from "../services/toy.service";
import review from "../cmps/review.vue";
import chatRoom from "../cmps/chat-room.vue";
export default {
  data() {
    return {
      toy: null,
      imgUrl: null,
      reviews: null,
      isChatOpen:false
    };
  },
  watch: {
    "$route.params.toyId": {
      immediate: true,
      async handler() {
        const { toyId } = this.$route.params;
        try {
          const toy = await toyService.getById(toyId);
          this.toy = toy;
          this.imgUrl = require(`@/assets/toys/${this.toy.imgNum}.png`);
          this.reviews = await this.$store.dispatch({ type: "loadReviews", filterBy:{'toyId':toyId }});
        } catch (err) {
          console.log("cannot get toy", err);
          throw err;
        }
      },
    },
  },
  methods: {
    async addReview(review) {
      try {
        if (!this.$store.getters.toys.length)
         await this.$store.dispatch("loadToys");
        review.toyId = this.toy._id;
        await this.$store.dispatch({ type: "addReview", review });
         this.reviews = await this.$store.dispatch({ type: "loadReviews" ,filterBy:{'toyId':this.toy._id }});
      } catch (err) {
        console.log("cannot add review", err);
        throw err;
      }
    },
  },
  components: {
    review,
    chatRoom
  },
};
</script>

