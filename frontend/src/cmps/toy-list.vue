<template>
  <ul class="toy-list">
    <li class="toy-preview-in-list" v-for="toy in toys" :key="toy._id">
      <toy-preview :toy="toy"/>
      <div class="buttons">
         <el-button class="btn" type="primary" icon="el-icon-edit" 
         @click="clickUpdate(toy)" v-if="isUserAdmin"></el-button>
         <el-button class="btn" type="info" @click="goToDetails(toy._id)">details</el-button>
             <el-button class="btn" type="danger" icon="el-icon-delete" 
         @click="removeToy(toy._id)" v-if="isUserAdmin"></el-button>
      </div>
    </li>
  </ul>
</template>

<script>
import toyPreview from "./toy-preview.vue";
export default {
  props: {
    toys: Array,
  },
  components: {
    toyPreview,
  },
  methods:{
     clickUpdate(toy){
        this.$emit('update',toy)
     },
     removeToy(toyId){
        this.$emit('remove',toyId)
     },
     goToDetails(toyId){
      this.$router.push(`/toy/${toyId}`)
     }

  },
  computed:{
     isUserAdmin(){
       return (this.$store.getters.loggedinUser)?.isAdmin === true
     }
  }
};
</script>
