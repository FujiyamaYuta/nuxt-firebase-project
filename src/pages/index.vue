<template>
  <section class="section">
    <a class="button" @click="createRoom">ルームを作る</a>
    <login-modal ref="loginModal"></login-modal>
    <create-room-modal ref="createModal"></create-room-modal>
  </section>
</template>

<script>
import LoginModal from '~/components/LoginModal'
import createRoomModal from '~/components/createRoomModal'

export default {
  name: 'HomePage',

  components: {
    LoginModal,
    createRoomModal
  },
  data() {
    return {
      idLoginUser: false,
      room_id: 1234
    }
  },
  methods: {
    createRoom() {
      console.log('room作るよ！')
      if (this.idLoginUser) {
        this.$refs.createModal.create()
      } else {
        this.$refs.loginModal.login()
      }
    },
    isLoginUser(result) {
      if (result) {
        this.idLoginUser = true
        console.log('ok!!!')
      } else {
        this.idLoginUser = false
        console.log('not!!loginuser!!')
      }
    }
  },
  created() {
    // ** 毎回呼び出すのではなく、レンダリングされたときのみに実行される
    this.isCommonLoginUser().then((result) => this.isLoginUser(result))
  }
}
</script>
