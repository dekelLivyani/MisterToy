<template>
    <form class="signup" @submit="signup">
       <span class="close-modal" @click="closeSignout">X</span>
      <h1>Signup</h1>
      <label
        >Full name:
        <el-input
          id="fullname"
          class="input"
          type="text"
          placeholder="Full name"
          v-model="user.fullname"
        ></el-input>
      </label>
      <label
        >Username:
        <el-input
          id="username"
          class="input"
          type="text"
          placeholder="Username"
          v-model="user.username"
        ></el-input>
      </label>
      <label
        >Password:
        <el-input
          id="password"
          class="input"
          type="password"
          placeholder="Password"
          v-model="user.password"
        ></el-input>
      </label>
        <el-button @click="signup" type="info" class="signup-btn">Signup</el-button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    signup() {
      this.$emit("signup", this.user);
      this.user = {};
    },
    closeSignout(){
        this.$emit("closeSignout");
    }
  },
};
</script>

<style>
</style>