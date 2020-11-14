<template>
  <v-layout column>
    <v-flex class="text-center" xs12>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
    </v-flex>
    <v-flex xs12>
      <v-card>
      <div class="message" v-for="(msg, index) in messages" :key="index">
          Chat: {{ msg }}
        </div>
        <div>
           <v-text-field autocomplete="off" v-model="message" />
          <v-button class="btn" type="button" @click="sendMessage">Send</v-button>
        </div>
    </v-card>
    </v-flex>
    
  </v-layout>
</template>


<script>
  import socket from '../plugins/socket.io.js'
  export default {
    data() {
      return {
        message: '',
        messages: [],
      }
    },
    mounted() {
      socket.on('sendMessage', (msg) => {
        this.messages.push(msg)
      })
    },
    methods: {
      sendMessage() {
        socket.emit('sendMessage', this.message)
        this.message = ''
      }
      
    }
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