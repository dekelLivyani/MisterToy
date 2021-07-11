<template>
  <div class="toy-app">
    <toy-filter @filter="filter" />
    <el-button
      class="btn btn-add"
      type="primary"
      @click="clickAddToy"
      v-if="isUserAdmin"
      >Add Toy</el-button
    >
    <toy-list :toys="getToys" @update="update" @remove="remove" />
    <toy-add v-if="isAdding" @closeModal="closeModal" />
  </div>
</template>

<script>
import toyList from "../cmps/toy-list.vue";
import toyAdd from "../cmps/toy-add.vue";
import toyFilter from "../cmps/toy-filter.vue";
export default {
  data() {
    return {
      isAdding: false,
    };
  },
  async created() {
    try {
      await this.$store.dispatch("loadToys");
    } catch (err) {
      console.log("cannot load toys", err);
      throw err;
    }
  },
  components: {
    toyList,
    toyAdd,
    toyFilter,
  },
  methods: {
    clickAddToy() {
      this.isAdding = true;
    },
    closeModal() {
      this.isAdding = false;
    },
    update(toy) {
      this.isAdding = true;
      this.$store.commit({ type: "setToyToUpdate", toy });
    },
    async remove(toyId) {
      try {
        await this.$store.dispatch({ type: "removeToy", toyId });
      } catch (err) {
        console.log("cannot remove toy", err);
        throw err;
      }
    },
    async filter(filterBy) {
      try {
        this.$store.commit({ type: "setFilter", filterBy });
        await this.$store.dispatch("loadToys");
      } catch (err) {
        console.log("cannot load toys", err);
        throw err;
      }
    },
  },
  computed: {
    getToys() {
      return this.$store.getters.toysToShow;
    },
    isUserAdmin() {
      return this.$store.getters.loggedinUser?.isAdmin === true;
    },
  },
};
</script>