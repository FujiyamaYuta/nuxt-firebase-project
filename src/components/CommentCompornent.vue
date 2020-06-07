<template>
  <article class="media" v-on:mouseover="mouseOverAction" v-on:mouseleave="mouseLemoveAction">
    <figure class="media-left">
      <p class="image is-32x32">
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
    </div>
  </article>
</template>

<script>
// import CommentCompornent from '~/components/CommentCompornent'

export default {
  name: 'CommentCompornent',
  components: {
    // CommentCompornent
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
      editFlag: false
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
      console.log('reAction')
    },
    editText() {
      console.log('edit')
      this.editFlag = !this.editFlag
    },
    editSubmit() {
      this.editFlag = false
      // ** Firestoreに登録する処理
    },
    editCansel() {
      this.editFlag = false
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
