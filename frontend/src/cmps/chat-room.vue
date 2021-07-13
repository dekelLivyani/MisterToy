<template>
  <section class="chat-room">
    <span class="close-chat" @click="closeChat">X</span>
    <h2 class="title">Let's Chat:</h2>
    <p class="typing" v-if="isTyping && isNotYou">
      {{ userTyping }} is typing...
    </p>
    <ul class="list-chat" v-if="msgs">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span> {{ msg.from }}:</span> {{ msg.txt }}
      </li>
    </ul>
    <form class="send-container" @submit.prevent="sendMsg">
      <el-input
        id="name"
        class="input"
        placeholder="Your message..."
        @input="setTyping"
        v-model="msg.txt"
      ></el-input>
      <el-button type="primary" class="send" @click="sendMsg">Send</el-button>
    </form>
  </section>
</template>

<script>
import { socketService } from "../services/socket.service";
export default {
  data() {
    return {
      msg: {
        from: this.$store.getters.loggedinUser?.fullname || "Guest",
        txt: "",
      },
      msgs: [],
      isTyping: false,
      typingTimeOut: null,
      userTyping: null,
      isNotYou: null,
    };
  },
  async created() {
    const { toyId } = this.$route.params;
    socketService.emit("chat topic", toyId);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("display", this.toggleTyping);
   //  socketService.on("stopDisplay", this.toggleTyping);
    try {
      this.msgs = await this.$store.dispatch({ type: "getChatHistoryToy", toyId });
    } catch (err) {
      console.log("cannot get chat history", err);
      throw err;
    }
  },
  methods: {
    sendMsg() {
      socketService.emit("chat newMsg", this.msg);
      this.msg.txt = "";
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    closeChat() {
      this.$emit("closeChat");
    },
    setTyping() {
      if (this.isTyping) {
        clearTimeout(this.typingTimeOut);
      }
      this.isTyping = true;
      this.typingTimeOut = setTimeout(() => {
        socketService.emit("typing", {isTyping:false,  username: this.loggedinUser});
        clearTimeout(this.typingTimeOut);
      }, 500);
      socketService.emit("typing", {
        isTyping: true,
        username: this.loggedinUser,
      });
    },
    setMsgsByHistory(msgs) {
      msgs.forEach((msg) => addMsg(msg));
    },
    toggleTyping({ isTyping, username }) {
      this.isTyping = isTyping;
      if (this.loggedinUser == username) {
         this.isNotYou = false;
      } else {
         this.isNotYou = true;
        this.userTyping = username;
      }
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser?.fullname || "Guest";
    },
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
  },
};
</script>