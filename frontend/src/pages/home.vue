<template>
  <div class="home">
     <section v-if="loggedinUser" class="greet-user">
    <h1>Hey {{ loggedinUser.fullname }}😊</h1>
    <router-link :to="'/user/'+ loggedinUser._id">Profile</router-link>
    </section>
    <login @signup="changeSignup" />
    <signup @signup="signup" v-if="isSignup" @closeSignout="isSignup = false" />
  </div>
</template>

<script>
import login from "../cmps/login";
import signup from "../cmps/signup.vue";
export default {
  name: "Home",
  data() {
    return {
      isSignup: false,
    };
  },
  components: {
    login,
    signup,
  },
  methods: {
    changeSignup(deff) {
      this.isSignup = deff;
    },
    async signup(userCred) {
      try {
        await this.$store.dispatch({ type: "signup", userCred });
        this.isSignup = false;
      } catch (err) {
        console.log("cannot signup", err);
        throw err;
      }
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>
