<template>
  <div>
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        type="is-light"
        open
      >
        <div class="p-1">
          <div class="block">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </div>
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Menu">
              <b-menu-item icon="account-group-outline" expanded>
                <template slot="label" slot-scope="props">
                  参加者
                  <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                </template>
                <b-menu-item icon="account">
                  <template slot="label">
                    YutaFujiwara
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">
                        退出させる
                        <b-icon icon="logout" class="is-pulled-right"></b-icon>
                      </b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
                <b-menu-item icon="account">
                  <template slot="label">
                    User1
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">
                        退出させる
                        <b-icon icon="logout" class="is-pulled-right"></b-icon>
                      </b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
                <b-menu-item icon="account">
                  <template slot="label">
                    User2
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">
                        退出させる
                        <b-icon icon="logout" class="is-pulled-right"></b-icon>
                      </b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
              </b-menu-item>
              <b-menu-item icon="account">
                <template slot="label" slot-scope="props">
                  個人設定
                  <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                </template>
                <b-menu-item v-show="editNameFlag">
                  <template slot="label">
                    <!-- <b-input ></b-input> -->
                    <input
                      @blur="outOfFocus"
                      ref="refFocus"
                      class="input"
                      v-model="name"
                      type="text"
                      placeholder="名前"
                    />
                  </template>
                </b-menu-item>
                <b-menu-item icon="account" v-show="!editNameFlag">
                  <template slot="label">
                    {{ name }}
                    <span @click="editName">
                      <b-icon icon="account-edit" class="is-pulled-right"></b-icon>
                    </span>
                  </template>
                </b-menu-item>
                <b-menu-item icon="emoticon-excited-outline">
                  <template slot="label">
                    アイコン
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="account-edit" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions" v-if="!idLoginUser">
              <b-menu-item @click="openLoginModal" icon="login" label="ログイン"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
      <div class="p-1">
        <b-field>
          <b-switch v-model="reduce">Reduced</b-switch>
        </b-field>
        <div class="container column">
          <section class="section">
            <div class="tabs-page is-show js-tabs-page js-tabs-page_design">
              <Article-compornent
                v-for="(post, i) in dataArray"
                :key="i"
                :name="post.name"
                :uid="post.uid"
                :description="post.description"
                :time="post.time"
                :icon="post.icon"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
    <login-modal ref="loginModal"></login-modal>
  </div>
</template>
<script>
import ArticleCompornent from '~/components/ArticleCompornent'
import LoginModal from '~/components/LoginModal'

export default {
  name: 'Room',

  components: {
    ArticleCompornent,
    LoginModal
  },
  data() {
    return {
      roomId: this.$route.params.id,
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false,
      name: 'YutaFujiwara',
      editNameFlag: false,
      idLoginUser: false,
      micFlag: true,
      dataArray: [
        {
          name: 'FujiwaraYuta',
          uid: '12345',
          description:
            'ここ最近のサービスはNuxt +Firebaseで開発することが多く、認証 / 認可のコードベースのTipsが貯まってきたので公開したら需要あったりするのかな？サンプルになりそうなプロジェクト見当たらないし、コアな部分ではないのであまり楽しくないし...。雛形のプロジェクトとして需要あれば公開します',
          time: '午後0:32 · 2020年6月7日',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: 'User1',
          uid: '12345',
          description:
            '朝ランと筋トレ終わったので、今から朝活するぞ💪 25分×3ポモドーロ🍅 I just want to focus on work.so I dont tweet for 25min!!',
          time: '午前9:18 · 2020年6月7日',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        },
        {
          name: 'User2',
          uid: '12345',
          description:
            '金曜日だけリアル出社すると、世の週末感を一緒に味わえるといライフハック。飲みたみが激しくなる…',
          time: '午後6:53 · 2020年6月5日',
          icon:
            'https://pbs.twimg.com/profile_images/704153164438642692/bYo0YeEr_400x400.jpg'
        }
      ]
    }
  },
  methods: {
    openLoginModal() {
      this.$refs.loginModal.login()
    },
    editName() {
      console.log('変更')
      this.editNameFlag = true
      this.$nextTick(() => this.$refs.refFocus.focus())
    },
    outOfFocus() {
      this.editNameFlag = false
    },
    changeMic() {
      this.micFlag = !this.micFlag
    }
  },
  mounted() {
    if (this.localAuthCheck()) {
      this.idLoginUser = true
    }
    console.log(this.roomId)
  }
}
</script>
<style lang="scss">
.p-1 {
  padding: 1em;
  width: 100% !important;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    z-index: 2;
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
.b-sidebar {
  z-index: 3;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.sidebar-content {
  flex: 1 1 100%;
  overflow-y: scroll;
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
