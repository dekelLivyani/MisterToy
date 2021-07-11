<template>
  <div class="login">
    <h1>{{ title }}</h1>
    <label v-if="!loggedinUser"
      >Username:
      <el-input
        id="username"
        class="input"
        type="text"
        placeholder="Username"
        v-model="user.username"
      ></el-input>
    </label>
    <label v-if="!loggedinUser"
      >Password:
      <el-input
        id="password"
        class="input"
        type="password"
        placeholder="Password"
        v-model="user.password"
      ></el-input>
    </label>
    <div class="buttons">
      <button class="btn" @click="login" v-if="!loggedinUser">Login</button>
      <button class="btn" @click="clickSignup" v-if="!loggedinUser">
        Singup
      </button>
      <button class="btn" @click="logout" v-else>Logout</button>
    </div>
  </div>
</template>

<script>
import signup from "./signup.vue";
export default {
  components: { signup },
  data() {
    return {
      title: null,
      user: {
         username:'dekelliv',
         password:'1234'
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch({ type: "login", userCred: this.user });
        this.user = {};
      } catch (err) {
        console.log("cannot login", err);
        throw err;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: "logout" });
      } catch (err) {
        console.log("cannot logout", err);
        throw err;
      }
    },
    clickSignup() {
      this.$emit("signup", true);
    },
    async signup() {
      try {
        await this.$store.dispatch({ type: "signup" });
      } catch (err) {
        console.log("cannot signup", err);
        throw err;
      }
    },
  },
  computed: {
    loggedinUser() {
      this.title = this.$store.getters.loggedinUser ? "Logout" : "Login";
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>

<style>
</style>