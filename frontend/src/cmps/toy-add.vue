<template>
  <ValidationObserver v-slot="{ invalid }">
    <form class="toy-add" @submit="saveToy">
      <h1>{{ title }}</h1>
      <span class="close-modal" @click="closeModal">X</span>

      <div class="name">
        <label for="name">Name:</label>
        <ValidationProvider name="required" rules="required">
          <div class="input-container" slot-scope="{ errors }">
            <el-input
              id="name"
              class="input"
              placeholder="Name"
              v-model="toy.name"
            ></el-input>
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>

      <div class="price">
        <label for="price">Price:</label>
        <ValidationProvider name="required" rules="required">
          <div class="input-container" slot-scope="{ errors }">
            <el-input
              id="price"
              class="input"
              type="number"
              placeholder="Price"
              v-model="toy.price"
            ></el-input>
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>

      <div class="type">
        <label for="type">type:</label>
        <ValidationProvider name="required" rules="required">
          <div class="input-container" slot-scope="{ errors }">
            <el-select
              id="type"
              class="input"
              v-model="toy.type"
              placeholder="Type"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>
      <div class="inStock">
        <label for="inStock">In Stock:</label>
        <label class="switch">
          <input id="inStock" type="checkbox" v-model="toy.inStock" />
          <div></div>
        </label>
      </div>
      <button type="submit" :disabled="invalid" class="save btn">Save</button>
    </form>
  </ValidationObserver>
</template>


<script>
import { toyService } from "../services/toy.service.js";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { Field, Form } from "vee-validate";
extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  data() {
    return {
      toy: null,
      title: null,
      options: [
        {
          value: "Funny",
          label: "Funny",
        },
        {
          value: "Adult",
          label: "Adult",
        },
        {
          value: "Sad",
          label: "Sad",
        },
      ],
      value: "",
      required: "",
    };
  },
  components: {
    ValidationProvider,
    Field,
    Form,
    ValidationObserver,
  },
  created() {
    if (this.$store.getters.toyToUpdate) {
      this.toy = JSON.parse(JSON.stringify(this.$store.getters.toyToUpdate));
      this.title = "Update Toy";
    } else {
      this.toy = toyService.getEmptyToy();
      this.title = "Add Toy";
    }
  },
  methods: {
    async saveToy() {
      this.toy.createdAt = Date.now();
      this.toy.imgNum = Math.floor(Math.random() * 3 + 1);
      this.toy.chatHistory = [];
      try {
        await this.$store.dispatch({ type: "saveToy", toy: this.toy });
      } catch (err) {
        console.log("cannot save toy", err);
        throw err;
      } finally {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("closeModal");
      this.toy = null;
      this.$store.commit({ type: "setToyToUpdate", toy: null });
    },
  },
};
</script>

