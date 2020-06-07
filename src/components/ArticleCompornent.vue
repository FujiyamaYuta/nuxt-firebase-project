<template>
  <article class="media" v-on:mouseover="mouseOverAction" v-on:mouseleave="mouseLemoveAction">
    <figure class="media-left">
      <p class="image is-64x64">
        <img class="is-rounded" :src="icon" />
      </p>
    </figure>
    <div class="media-content">
      <div
        class="field has-addons"
        style="position: absolute;right: 2rem;margin-top: -10px;"
        v-if="hoverFlag"
      >
        <p class="control">
          <b-tooltip type="is-white" label="アクション">
            <button class="button" @click="reAction">
              <span class="icon is-small">
                <span class="material-icons md-18">tag_faces</span>
              </span>
            </button>
          </b-tooltip>
        </p>
        <p class="control">
          <b-tooltip type="is-white" label="編集">
            <button class="button" @click="editText">
              <span class="icon is-small">
                <span class="material-icons md-18">edit</span>
              </span>
            </button>
          </b-tooltip>
        </p>
        <p class="control">
          <b-tooltip type="is-white" label="コメントを残す">
            <button class="button" @click="openCommentForm">
              <span class="material-icons md-18">insert_comment</span>
            </button>
          </b-tooltip>
        </p>
        <p class="control">
          <b-tooltip type="is-white" label="詳細情報">
            <button class="button" @click="getInfo">
              <span class="material-icons md-18">info</span>
            </button>
          </b-tooltip>
        </p>
      </div>
      <div class="content">
        <div class="media-content">
          <p class="title is-5">
            {{ name }}
            <span class="meta is-6">{{time}}</span>
          </p>
        </div>
        <p v-if="!editFlag" style="margin-top:0.6rem;">{{ description }}</p>
        <span v-if="editFlag">
          <textarea v-model="description" class="textarea" placeholder="e.g. Hello world"></textarea>
          <div class="field is-grouped" style="margin-top:0.6rem;">
            <div class="control">
              <button class="button is-small" @click="editCansel">キャンセル</button>
            </div>
            <div class="control">
              <button class="button is-small is-link is-light" @click="editSubmit">登録</button>
            </div>
          </div>
        </span>
      </div>
      <!-- コメントを表示する -->
      <a v-if="0 != commentArray.length && !openCommentFlag" @click="openComment">コメントを読む</a>
      <span v-if="openCommentFlag">
        <Comment-compornent
          v-for="(post, i) in commentArray"
          :key="i"
          :name="post.name"
          :uid="post.uid"
          :description="post.description"
          :time="post.time"
          :icon="post.icon"
        />
      </span>
      <a
        v-if="0 != commentArray.length && openCommentFlag"
        @click="openComment"
        style="margin-top:1rem;"
      >
        <br />コメントを閉じる
      </a>
      <article class="media" v-if="commentFlag">
        <figure class="media-left">
          <p class="image is-32x32">
            <img
              class="is-rounded"
              src="https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg"
            />
          </p>
        </figure>
        <div class="content" style="width:100%">
          <textarea rows="2" v-model="comment" class="textarea" placeholder="コメント"></textarea>
          <div class="field is-grouped" style="margin-top:0.6rem;">
            <div class="control">
              <button class="button is-small" @click="commentCansel">キャンセル</button>
            </div>
            <div class="control">
              <button class="button is-small is-link is-light" @click="commentSubmit">登録</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </article>
</template>

<script>
import CommentCompornent from '~/components/CommentCompornent'

export default {
  name: 'ArticleCompornent',
  components: {
    CommentCompornent
  },
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hoverFlag: false,
      editFlag: false,
      commentFlag: false,
      openCommentFlag: false,
      comment: '',
      msg: 'This is a button.',
      commentArray: []
    }
  },
  methods: {
    mouseOverAction() {
      this.hoverFlag = true
    },
    mouseLemoveAction() {
      this.hoverFlag = false
    },
    reAction() {
      console.log('action')
    },
    editText() {
      console.log('edit')
      this.editFlag = !this.editFlag
    },
    openCommentForm() {
      console.log('reply')
      this.commentFlag = !this.commentFlag
    },
    getInfo() {
      console.log('info')
    },
    editSubmit() {
      this.editFlag = false
      // ** Firestoreに登録する処理
    },
    editCansel() {
      this.editFlag = false
    },
    commentSubmit() {
      this.commentFlag = false
      // ** Firestoreに登録する処理
      let commentObj = {}
      commentObj.uid = '123'
      commentObj.name = 'YutaFujiwara'
      commentObj.description = this.comment
      commentObj.time = '23:12:24'
      commentObj.icon =
        'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
      this.commentArray.push(commentObj)
      this.comment = ''
      this.openCommentFlag = true
    },
    commentCansel() {
      this.commentFlag = false
    },
    openComment() {
      this.openCommentFlag = !this.openCommentFlag
    }
  }
}
</script>
<style>
.media:hover {
  background-color: #f8f8f8;
}

.textarea {
  margin-top: 0.6rem;
}
</style>
