import Vue from 'vue'
import VTooltip from 'v-tooltip'
import firebase from 'firebase'
import moment from 'moment'

Vue.use(VTooltip)

// ** 汎用的な処理をここに記述する
Vue.mixin({
  methods: {
    truncate(str, length) {
      return str.length <= length ? str : str.substr(0, length) + '...'
    },
    // ** ローカルでログイン済みかどうかをチェックする
    localAuthCheck() {
      let uid = localStorage.getItem('uid')
      let photoURL = localStorage.getItem('photoURL')
      let displayName = localStorage.getItem('displayName')
      if (uid && photoURL && displayName) {
        return true
      }
      return false
    },
    getLocalUserInfo() {
      let uid = localStorage.getItem('uid')
      let photoURL = localStorage.getItem('photoURL')
      let displayName = localStorage.getItem('displayName')
      if (uid && photoURL && displayName) {
        let obj = {}
        obj.uid = uid
        obj.photoURL = photoURL
        obj.displayName = displayName
        return obj
      }
      return false
    },
    isCommonLoginUser() {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // ** ログイン済のユーザー
            console.log('ok!!Login User!!')
            let name, email, photoUrl, uid, emailVerified
            name = user.displayName
            email = user.email
            photoUrl = user.photoURL
            emailVerified = user.emailVerified
            uid = user.uid
            resolve(user)
          } else {
            // ** ログアウトせずfalseを返す
            resolve(false)
          }
        })
      })
    },
    logout() {
      localStorage.clear()
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          location.reload()
        })
        .catch((error) => {
          // An error happened.
          location.reload()
        })
    },
    randomStr() {
      let l = 48

      // 生成する文字列に含める文字セット
      let c = 'abcdefghijklmnopqrstuvwxyz0123456789'

      let cl = c.length
      let r = ''
      for (let i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)]
      }
      return r
    },
    createTagsArray(tags) {
      let tagsArray = [];
      for (let i = 0; i < tags.length; ++i) {
        if (tags[i].text) {
          tagsArray.push(tags[i].text)
        } else {
          tagsArray.push(tags[i])
        }
      }
      return tagsArray;
    },
  }
})
