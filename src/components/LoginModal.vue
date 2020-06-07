<template>
  <b-modal :active.sync="isLoginModalActive" :width="420" scroll="keep">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content">
            <p class="title is-4">新規登録/ログイン</p>
            <p class="subtitle is-6">ログインするとオーナーになれます。</p>
          </div>
        </div>

        <div class="content">
          <button class="button sosial-button is-medium is-info is-fullwidth" @click="twitter">
            <span class="icon">
              <i class="fab fa-twitter"></i>
              &nbsp;
              <span>Twitter</span>
            </span>
          </button>

          <button
            class="button sosial-button is-medium is-info is-fullwidth"
            style="background-color:white;color:red;border:2px solid; border-color:red;"
            @click="google"
          >
            <span class="icon">
              <i class="fab fa-google"></i>
              &nbsp;
              <span>Google</span>
            </span>
          </button>

          <button
            class="button sosial-button is-medium is-info is-fullwidth"
            style="background-color:#24292e"
            @click="github"
          >
            <span class="icon">
              <i class="fab fa-github"></i>
              &nbsp;
              <span>Github</span>
            </span>
          </button>

          <button
            class="button sosial-button is-medium is-info is-fullwidth"
            style="background-color:#1877f2"
            @click="facebook"
          >
            <span class="icon">
              <i class="fab fa-facebook"></i>
              &nbsp;
              <span>Facebook</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-social/bin/bulma-social.min.css'

import firebase from 'firebase'
import { firestore, storage } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      isLoginModalActive: false
    }
  },
  mounted() {
    // Promise.resolve('hoge').then(this.createPhotoURL('hoge'))
  },
  methods: {
    login() {
      this.isLoginModalActive = true
    },
    twitter() {
      // 認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          var authUI = new firebase.auth.TwitterAuthProvider()
          console.log('auth')
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('createAccount', result)

          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          var userObject = {}
          var user = result.additionalUserInfo.profile
          userObject.token = result.credential.accessToken
          userObject.secret = result.credential.secret
          userObject.uid = result.user.uid
          userObject.refreshToken = result.user.refreshToken
          userObject.photoURL = user.profile_image_url_https.replace(
            '_normal',
            '_400x400'
          )
          userObject.displayName = user.name
          userObject.profile = user.description
          userObject.screenName = user.screen_name
          userObject.email = user.email
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }

      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUsertData(userObject))
        .then((userObject) => this.setPrivateUsertData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch((error) => this.onRejectted(error))
    },
    facebook() {
      console.log('facebook')
      // 認証
      const auth = () => {
        var authUI = new firebase.auth.FacebookAuthProvider()
        return new Promise((resolve, reject) => {
          console.log('auth')
          // This gives you a the Facebook OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('createAccount', result)

          // This gives you a Facebook Access Token.
          var userObject = {}
          var user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email // null
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // userObject.profile = result.additionalUserInfo.profile.bio // null
          // userObject.screenName = result.additionalUserInfo.profile.login // null
          resolve(userObject)
        })
      }

      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUsertData(userObject))
        .then((userObject) => this.setPrivateUsertData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch((error) => this.onRejectted(error))
    },
    google() {
      console.log('google')
      // 認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          var authUI = new firebase.auth.GoogleAuthProvider()
          console.log('auth')
          // This gives you a the Google OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('getAccountData', result)
          // This gives you a Google Access Token.
          var userObject = {}
          var user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email // null
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // userObject.profile = result.additionalUserInfo.profile.bio // null
          // userObject.screenName = result.additionalUserInfo.profile.login // null
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }

      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUsertData(userObject))
        .then((userObject) => this.setPrivateUsertData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch((error) => this.onRejectted(error))
    },
    github() {
      console.log('github')
      // 認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          var authUI = new firebase.auth.GithubAuthProvider()
          console.log('auth')
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('getAccountData', result)

          // This gives you a GitHub Access Token.
          var userObject = {}
          var user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          userObject.profile = result.additionalUserInfo.profile.bio
          userObject.screenName = result.additionalUserInfo.profile.login
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }

      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUsertData(userObject))
        .then((userObject) => this.setPrivateUsertData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch((error) => this.onRejectted(error))
    },
    onRejectted(error) {
      this.$buefy.toast.open({
        duration: 5000,
        message: `ログインに失敗しました。`,
        position: 'is-bottom',
        type: 'is-danger'
      })
      this.isLoginModalActive = false
      console.log('onRejectted', error)
    },
    createPublicObj(obj) {
      var publicObj = {}
      publicObj.uid = obj.uid
      publicObj.providerId = obj.providerId
      publicObj.isNewUser = obj.isNewUser
      // publicObj.photoURL = obj.photoURL
      // publicObj.displayName = obj.displayName
      if (obj.isNewUser) {
        publicObj.photoURL = obj.photoURL
        publicObj.displayName = obj.displayName
      }
      if (
        (obj.providerId.indexOf('twitter') != -1 ||
          obj.providerId.indexOf('github') != -1) &&
        obj.isNewUser
      ) {
        // ** プロフィールが存在して、trueじゃないときにオブジェクトに代入する
        publicObj.profile = obj.profile
        publicObj.screenName = obj.screenName
      }
      return publicObj
    },
    createPrivateObj(obj) {
      var privateObj = {}
      privateObj.uid = obj.uid
      privateObj.providerId = obj.providerId
      privateObj.isNewUser = obj.isNewUser
      privateObj.email = obj.email
      privateObj.token = obj.token
      privateObj.refreshToken = obj.refreshToken
      return privateObj
    },
    // ** 公開用のユーザー情報を設定
    setPersistence() {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then((result) => {
            resolve()
          })
      })
    },
    // ** 公開用のユーザー情報を設定
    setPublicUsertData(userObject) {
      return new Promise((resolve, reject) => {
        console.log('setPublicUsertData', userObject)
        var publicUser = firestore.collection('users').doc(userObject.uid)
        debugger
        // ** usersに登録するObjのみを登録する
        publicUser
          .set(this.createPublicObj(userObject), { merge: true })
          .then((result) => {
            resolve(userObject)
          })
      })
    },
    // ** 非公開用のユーザー情報を設定
    setPrivateUsertData(userObject) {
      return new Promise((resolve, reject) => {
        console.log('setPrivateUsertData', userObject)
        var privateUsers = firestore
          .collection('privateUsers')
          .doc(userObject.uid)
        // ** privateUsersに登録するObjのみを登録する
        privateUsers
          .set(this.createPrivateObj(userObject), { merge: true })
          .then((result) => {
            resolve(userObject)
          })
      })
    },
    // ** 非公開用のユーザー情報を設定
    setLocalUserData(userObject) {
      return new Promise((resolve, reject) => {
        var user = firestore.collection('users').doc(userObject.uid)
        user
          .get()
          .then((doc) => {
            if (doc.exists) {
              localStorage.setItem('photoURL', doc.data().photoURL)
              localStorage.setItem('uid', userObject.uid)
              localStorage.setItem('token', userObject.token)
              localStorage.setItem('displayName', doc.data().displayName)
              this.$buefy.toast.open({
                duration: 5000,
                message: `ログインに成功しました`,
                position: 'is-bottom',
                type: 'is-success'
              })
              this.isLoginModalActive = false
              location.reload()
              resolve(userObject)
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error)
          })
      })
    },
    // ** SNSから取得したURLをfirestorageに登録して、そのURLをfirestoreに登録する
    createPhotoURL(userObject) {
      return new Promise((resolve, reject) => {
        // ** TODO - 初めてじゃない場合はreject
        console.log(userObject)
        // This can be downloaded directly:
        var url = userObject.photoURL
        var xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function(event) {
          var blob = xhr.response
          let storageRef = storage.ref()
          // ファイルのパスを設定
          let mountainsRef = storageRef.child(
            `user/${userObject.uid}/image.jpg`
          )
          let uploadTask = mountainsRef.put(blob)
          uploadTask.then((snapshot) => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(downloadURL)
              // ** firestorageに登録したURLをfirestoreに登録する
              userObject.photoURL = downloadURL
              resolve(userObject)
            })
          })
        }
        xhr.open('GET', url)
        xhr.onerror = function(e) {
          // クロスドメインでひっかかる場合は無視する
          console.log('ooooooops!!cros!!')
          resolve(userObject)
        }
        xhr.send()
      })
    }
  }
}
</script>
<style>
.sosial-button {
  margin-top: 1rem;
}
</style>
