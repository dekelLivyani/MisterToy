<template>
  <section class="toy-filter">
    <el-input class="input"
      placeholder="Search..."
      v-model="filterBy.name"
      @input="filter"
    ></el-input>
      <el-input class="input"
      type="number"
     placeholder="Price from..."
       v-model.number="filterBy.price"
      @input="filter"
    ></el-input>
    <el-select  class="input" v-model="filterBy.type" placeholder="Filter By" @change="filter">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: "",
        price: 0,
        type: "All",
        inStock: "All",
      },
       options: [{
          value: 'All',
          label: 'All'
        }, {
          value: 'Funny',
          label: 'Funny'
        }, {
          value: 'Adult',
          label: 'Adult'
        }, {
          value: 'Sad',
          label: 'Sad'
        },],
        value: ''
      
    };
  },
  methods: {
    filter() {
      this.$emit("filter", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
</script>
