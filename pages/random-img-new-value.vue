<template>
  <v-row column>
    <v-col class="text-center" cols="12" sm="12">
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
    </v-col>
    <v-col cols="12" sm="12">
      <v-row column>
        <v-col cols="12" sm="12">
          <p>On value change set new response</p>
        </v-col>

        <v-col sm="12">
          <v-text-field autocomplete="off" v-model="message" />
          <button class="btn" type="button" @click="sendMessage">Send</button>
        </v-col>

        <v-col cols="12" sm="4" v-for="(msg, index) in messages" :key="index">
          <!-- <v-img 
          lazy-src="https://picsum.photos/id/11/10/6"
          v-bind:src="msg.url"
          ></v-img> -->
          <!-- {{msg.url}} -->
          <!-- <img src="/v.png" alt="Vuetify.js" class="mb-5"> -->

          <v-img lazy-src="/v.png" :src="msg.download_url" max-width="100%"></v-img>

          <!-- https://unsplash.com/photos/yC-Yzbqy7PY -->
        </v-col>
      </v-row>
    </v-col>

  </v-row>
</template>


<script>
  import socket from '../plugins/socket.io.js'
  import axios from '@nuxtjs/axios'
  export default {
    data() {
      return {
        message: '',
        messages: [],
        changeCheck: [],
      }
    },
    mounted() {
      socket.on('randCat', (msg) => {
        this.changeCheck = []
        this.changeCheck.push(msg)
      })
    },
    methods: {
      sendMessage() {
        socket.emit('randCat', this.message)
        this.message = ''
      },
      async testcat() {
        const resp = await this.$axios.$get('https://picsum.photos/v2/list?limit=12')
        this.messages = resp
      }


    },
    computed: {
      msg() {
        return this.changeCheck;
      }
    },
    watch: {
      msg() {
        console.log('changeCheck Changed!')
        this.testcat()
        // this.messages = []
        // this.messages.push(this.changeCheck)
      }
    },
  }
</script>

<style scoped>
  .form {
    background: #000;
    padding: 3px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  input {
    border: 0;
    padding: 10px;
    width: 90%;
    margin-right: .5%;
  }

  .btn {
    width: 9%;
    background: rgb(130, 224, 255);
    border: none;
    padding: 10px;
  }

  .message {
    margin-left: 50px;
  }
</style>