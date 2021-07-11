<template>
  <div class="toy-preview">
    <img class="toy-img" :src="imgUrl" v-if="imgUrl" />
    <p>Name: {{ toy.name }}</p>
    <p>Price: {{ toy.price }}</p>
    <p>in stock: {{ toy.inStock }}</p>
  </div>
</template>

<script>
export default {
  props: {
    toy: Object,
  },
  data() {
    return {
      imgUrl :null,
    };
  },
  created() {
    this.imgUrl = require(`@/assets/toys/${this.toy.imgNum}.png`);
  },
};
</script>
