<template>
  <b-modal :active.sync="isCreateMoalActive" :width="420" scroll="keep">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content">
            <p class="title is-4">ルームを作ります。</p>
            <!-- <p class="subtitle is-6">ログインするとオーナーになれます。</p> -->
          </div>
        </div>

        <div class="field">
          <label class="label">ルームのタイトル</label>
          <div class="control">
            <input v-model="roomName" class="input" type="text" placeholder="2020/06/06のルーム" />
          </div>
          <p v-if="roomNameFlag" class="help is-danger">必須項目です</p>
        </div>
        <b-field label="ルームのパスワード">
          <b-input placeholder="password" type="password" v-model="password" password-reveal></b-input>
        </b-field>
        <div class="field">
          <label class="label">タグ</label>
          <div class="control">
            <vue-tags-input
              v-model="tag"
              style="border-radius: 0.4rem !important;"
              placeholder="タグを5つまで追加できます"
              :tags="tags"
              :validation="validation"
              @tags-changed="(newTags) => (tags = newTags)"
            />
          </div>
          <p v-if="tagsFlag" class="help is-danger">タグは5つまでです</p>
        </div>
        <button class="button sosial-button is-medium is-info is-fullwidth" @click="submit">
          <strong>ルームを作る</strong>
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import firebase from 'firebase'
import { firestore, storage } from '~/plugins/firebase.js'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      authUserInfo: '',
      isCreateMoalActive: false,
      roomName: '',
      roomNameFlag: false,
      idLoginUser: false,
      password: '',
      tag: '',
      tags: [],
      tagsFlag: false,
      autocompleteItems: [
        {
          text: '10文字以下で登録してください。'
        },
        {
          text: 'タグは5つまでです'
        }
      ],
      validation: [
        {
          classes: 'no-braces',
          disableAdd: true,
          rule: (tag) => tag.text.length > 10
        },
        {
          classes: 'no-braces',
          disableAdd: true,
          rule: (tag) => this.tags.length > 5
        }
      ]
    }
  },
  mounted() {
    // Promise.resolve('hoge').then(this.createPhotoURL('hoge'))
  },
  methods: {
    create() {
      this.isCreateMoalActive = true
    },
    async submit() {
      this.roomNameFlag = false
      this.tagsFlag = false
      if (!this.roomName) {
        this.roomNameFlag = true
      }
      if (5 < this.tags.length) {
        this.tagsFlag = true
      }
      if (this.tagsFlag || this.roomNameFlag) {
        return
      }
      if (!this.password) {
        let notPasswordFlag = confirm(
          'パスワードは空の場合、ルームのURLを知っていればアクセスできる状態になりますがよろしいですか？'
        )
        if (!notPasswordFlag) {
          return
        }
      }

      try {
        // ** 登録処理
        let result = await this.isCommonLoginUser()
        let idLoginUser = await this.isLoginUser(result)
        this.setRoomInfo(idLoginUser)
      } catch (error) {
        console.log(error)
      }
    },
    isLoginUser(result) {
      return new Promise((resolve, reject) => {
        if (result) {
          // ** 認証OK
          this.authUserInfo = result
          this.idLoginUser = true
          resolve(this.idLoginUser)
        } else {
          // ** 認証できないユーザー
          this.idLoginUser = false
          reject(this.idLoginUser)
        }
      })
    },
    setRoomInfo(idLoginUser) {
      return new Promise((resolve, reject) => {
        console.log('setRoomInfo')
        let localUserInfo = this.getLocalUserInfo()
        console.log(localUserInfo)
        let setRoomObj = {}
        setRoomObj.uid = localUserInfo.uid
        setRoomObj.photoURL = localUserInfo.photoURL
        setRoomObj.displayName = localUserInfo.displayName
        setRoomObj.roomName = this.roomName
        setRoomObj.password = this.password
        setRoomObj.tagsArray = this.createTagsArray(this.tags)
        setRoomObj.roomId = this.randomStr()
        setRoomObj.createAt = new Date()
        let setRoom = firestore
          .collection('users')
          .doc(localUserInfo.uid)
          .collection('rooms')
          .doc(setRoomObj.roomId)
        // ** privateUsersに登録するObjのみを登録する
        setRoom.set(setRoomObj, { merge: true }).then((result) => {
          console.log(setRoomObj)
          this.$router.push({ path: `/room/${setRoomObj.roomId}` })
          resolve(setRoomObj)
        })
      })
    }
  }
}
</script>
<style>
.sosial-button {
  margin-top: 1rem;
}
.control.has-icons-left .icon,
.control.has-icons-right .icon {
  pointer-events: auto;
}
</style>
