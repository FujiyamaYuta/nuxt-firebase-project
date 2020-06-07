<template>
  <div class="sidebar-page">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="nuxt-link" to="/room/123">マイルーム</b-navbar-item>
        <b-navbar-item href="#">Documentation</b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">About</b-navbar-item>
          <b-navbar-item href="#">Contact</b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div" v-if="!idLoginUser">
          <div class="buttons">
            <a class="button is-primary" @click="openLoginModal">新規登録</a>
          </div>
        </b-navbar-item>
        <b-dropdown position="is-bottom-left" aria-role="list" v-if="idLoginUser">
          <a slot="trigger" slot-scope="{ active }">
            <img class="is-rounded icon-image" :src="photoURL" />
          </a>
          <b-dropdown-item aria-role="listitem" @click="logout">ログアウト</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-navbar>
    <nuxt />
    <login-modal ref="loginModal"></login-modal>
  </div>
</template>

<script>
import LoginModal from '~/components/LoginModal'
import axios from 'axios'

export default {
  components: {
    LoginModal
  },
  data() {
    return {
      idLoginUser: false,
      photoURL: localStorage.getItem('photoURL'),
      localAuthFlag: false
    }
  },
  methods: {
    openLoginModal() {
      this.$refs.loginModal.login()
    },
    async isLoginUser() {
      const result = await this.isCommonLoginUser()
      if (result) {
        this.idLoginUser = true
      } else {
        this.idLoginUser = false
      }
      console.log(result)
    }
  },
  created() {
    // ** 毎回呼び出すのではなく、レンダリングされたときのみに実行される
    this.isLoginUser()
  },
  mounted() {
    if (this.localAuthCheck()) {
      this.idLoginUser = true
    }
  }
}
</script>

<style lang="scss">
.navbar {
  // background-color: black;
}
.icon-image {
  border-radius: 50%; /* 角丸半径を50%にする(=円形にする) */
  width: 48px; /* ※縦横を同値に */
  height: 48px; /* ※縦横を同値に */
  padding: 0.4rem;
}
</style>
