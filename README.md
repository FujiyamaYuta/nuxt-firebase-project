# はじめに

# この記事について

これまでNuxtとFirebaseを使って、いくつかサービス開発をしていますが、認証/認可の部分はどのサービスでも毎回同じようなコードを書いている気がします。

サービスとしてのコア部分ではないですが、センシティブな部分なのでしっかりと調べながら実装すると結構大変ですよね（毎回時間がかかってしまいます）。

たぶん、自分だけではなく、サービス開発をする人は大体同じことを考えている気がします...。

なので今回は**Nuxt+Firebaseのスターター用のプロジェクト**を作成し、テンプレート化して使いまわせるようにしておいた方が便利だよねということを考え、リポジトリを公開しつつ中身を紹介します。

※ 自分の考えるベストプラクティスなので、もっとこうした方がいいよね、これヤバそう...などのご意見やマサカリ、プルリク、フィードバックは歓迎しております🙏

# 対象

* NuxtとFirebaseで何か開発しようと考えている人
* 認証認可のあるサービスをゼロから作ろうとしている人
* `create-nuxt-app`ではない、サンプルのプロジェクトを動かしてみたい人

# Githubのリモートリポジトリ

下記のリポジトリをクローンしてください。

[nuxt-firebase-project](https://github.com/FujiyamaYuta/nuxt-firebase-project.git)

https://github.com/FujiyamaYuta/nuxt-firebase-project.git

# 技術

* Nuxt.js
* Buefy + Bulma
* Firebase
  * Hosting
  * Cloud Firestore
  * Cloud Storage
  * Authentication

# Firebaseの設定

今回はFirebaseの以下のサービスを使います（ある一定の転送量までは全て無料で使うことができます🙏）。
それぞれがどんなサービスかは、別で調べてみてください。

* Hosting
* Cloud Firestore
* Cloud Storage
* Authentication

まずはじめにFirebaseの設定を行いきましょう。以下のリンクからプロジェクトを作成してください。

[Firebase - プロジェクトの追加](https://console.firebase.google.com/u/0/?hl=ja)

https://console.firebase.google.com/u/0/?hl=ja

### ① プロジェクトを作る
<img width="1440" alt="①.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/fca6fd6b-8e59-0da4-6858-71cb55649a03.png">

### ② プロジェクト名を決める
<img width="1437" alt="②.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/24fb68d9-5001-35e8-7bbd-28118bcbd2da.png">

### ③ プロジェクトIDとウェブAPIキーを確認
プロジェクト作成後の **「プロジェクトの管理」** の右の設定アイコンを押すとSettingsのページに遷移するのでそこから確認することができます。**プロジェクトID**と**ウェブAPIキー**はNuxt側に設定する必要があるのでメモしておいてください。

<img width="1440" alt="③.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/b1db22bd-20c3-ea48-b4ac-7edbaa703506.png">

### ④ AuthticationのGoogleの認証を許可する

Authticationのバーをクリックして **Sign-in method** のタブをクリックして、Authticationで認証を許可するサービスを選択します。今回はGoogleの認証を使うので、以下の手順で許可してください。

<img width="1440" alt="④.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/f2fc48e3-0f4e-9d95-c7e9-f677a11d66a3.png">

### ⑤ Cloud Firestoreをプロビジョニング

Databaseのバーをクリックして、Firestoreを方を選択してください。（RealTimeDatabaseもあるので注意）
リージョンを選択できるので **asia-northeast1（東京）** を選択することをお勧めします。海外のリージョンを選択すると、物理的な距離が遠いのでレイテンシーが発生するため。

<img width="1407" alt="⑤.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/28543921-29f1-ddbe-3ae4-91f62c34f26e.png">

### ⑥ Cloud Storageをプロビジョニング

こちらもリージョンを選択できるので **asia-northeast1（東京）** を選択することをお勧めします。

<img width="1440" alt="⑥.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/0b2caa06-3994-3c43-2a31-9c297147825c.png">

Firebase側の設定は以上になります。

# Nuxtの設定

Githubのリポジトリからクローンした `src/plugins/firebase.js ` のファイルにFirebaseプロジェクトで設定された**プロジェクトIDとウェブAPIキー**を追加します。

``` src/plugins/firebase.js
import firebase from 'firebase';

// ** Firebaseプロジェクトの設定を記す
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: '{ウェブAPIキー}',
    authDomain: '{プロジェクトID}.firebaseapp.com',
    databaseURL: 'https://{プロジェクトID}.firebaseio.com',
    projectId: '{プロジェクトID}',
    storageBucket: '{プロジェクトID}.appspot.com',
    messagingSenderId: '1234567890' // ** cloudmessagingを使う場合は設定
  })
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();

```


Nuxt側の設定は以上になります。

# ローカルホストで動作確認

```
// モジュールをインストール&ビルド
% npm install
% npm run build
% npm run dev 
```

`localhost:3000`でブラウザからアプリケーションが立ち上がるのを確認します。

<img width="1439" alt="スクリーンショット 2020-06-08 12.17.39.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/b02722ff-e5ef-af3b-5e5c-897f75c5c118.png">

とりあえず、ローカルでは動いています🙌


# デプロイ

```
// 先ほど作ったFirebaseプロジェクトが存在するか確認
% firebase projects:list
```

ちゃんとありますね👍

![⑧.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/c693e828-77ba-cb7c-315d-b3a9c437aad7.png)

先ほど作ったFirebaseプロジェクトにデプロイします。

```
% firebase use {プロジェクトID}
Now using project {プロジェクトID}

% firebase deploy
```

※ 下記のエラーは発生した場合は `functions` のディレクトリで `npm install` のコマンドを実行してください。

```
Error: Error parsing triggers: Cannot find module 'firebase-functions'
Require stack:
```

これで、URLからアクセスができたはずです🙌 おつかれさまでした！Google認証をすると、認証結果の情報がFirestoreに登録されています。

※ Github、Twitter、Facebookについても、Firebaseと連携すれば認証が使えるようになります。

<img width="1440" alt="スクリーンショット 2020-06-08 12.44.35.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/29eaf1ba-f8f5-605d-7ab3-0eb9b5eb08bf.png">

<img width="1437" alt="スクリーンショット 2020-06-08 12.45.40.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/dc4675e6-d52e-8c07-0bf0-965abd47d2dc.png">


これで動くものがデプロイでき動作確認ができたので、Nuxtの説明をしていきます。

# プロジェクトの紹介

クローンしたプロジェクトは以下のようになっています。 `.eslintrc.js` や `nuxt.config.js` は僕の標準の物を入れいているので、個人のお好みでカスタマイズしてください。

`src`配下に開発者用のソースが格納されています。

```
.
├── README.md
├── database.rules.json
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── functions
├── jsconfig.json
├── node_modules
├── nuxt.config.js
├── package-lock.json
├── package.json
├── public
├── src
│   ├── assets
│   ├── components
│   ├── layouts
│   ├── middleware
│   ├── pages
│   ├── plugins
│   ├── static
│   └── store
└── storage.rules
```

# Authentication

① 認証状態の永続性をセット
Firebaseでは認証状態をどの程度維持するかを指定することが可能です。
https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ja

|  列挙型	  |  値  | 説明  |
| ---- | ---- |---- |
|  firebase.auth.Auth.Persistence.LOCAL	  |  'local'	  | ブラウザ ウィンドウを閉じたり React Native でアクティビティが破棄されたりした場合でも、状態が維持されることを示します。この状態をクリアするには、明示的なログアウトが必要です。Firebase Auth のウェブ セッションは単一のホストを生成元とするため、単一のドメインでのみ永続化されることに注意してください。|
|  firebase.auth.Auth.Persistence.SESSION	  |  'session'	  | 現在のセッションまたはタブでのみ状態が維持され、ユーザーが認証を受けたタブやウィンドウを閉じるとクリアされることを示します。ウェブ アプリケーションのみに適用されます。|
|  firebase.auth.Auth.Persistence.NONE		  |  'none'	  | 状態はメモリにのみ保存され、ウィンドウまたはアクティビティが更新されるとクリアされることを示します。|

イメージとしては永続性をローカルストレージ/ セッションストレージ / メモリのどこに保持するか？という認識でよいを思います（Webの場合はデフォルト`local`）。`GoogleAuthProvider()` の関数を呼び出す前に、永続性の明示的に呼び出します。

```
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    return firebase.auth.GithubAuthProvider()
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  ```

Firebaseの関数はほとんどか非同期処理になっているので、①をした後に②をして③をして④をするみたいに同期処理にしたい場合はPromiseやasync/awaitを使う必要がありそうですね。コールバックの後に続けて書いてもいいですが、ネストが深くなりコードが読みにくくなるので、あまりオススメではありません。

いい感じに関数化して、順番に呼び出すような書き方をしてみました。

``` vue:LoginModal.vue
<template>
  <b-modal :active.sync="isLoginModalActive" :width="420" scroll="keep">
    <button @click="google">
      <span class="icon">
        <i class="fab fa-google"></i>
        &nbsp;
        <span>Google</span>
      </span>
    </button>
  </b-modal>
</template>

<script>
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma-social/bin/bulma-social.min.css";

import firebase from "firebase";
import { firestore, storage } from "~/plugins/firebase.js";

export default {
  data() {
    return {
      isLoginModalActive: true
    };
  },
  methods: {
    // ** Google認証を行うときに呼び出される関数
    google() {
      // ** ② Google認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          var authUI = new firebase.auth.GoogleAuthProvider();
          console.log("auth");
          // This gives you a the Google OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
              reject(error);
            });
        });
      };

      // ** ③ 認証後のユーザー情報を取得してオブジェクト化
      const getAccountData = result => {
        return new Promise((resolve, reject) => {
          var userObject = {};
          var user = result.user;
          userObject.token = result.credential.accessToken;
          userObject.refreshToken = user.refreshToken;
          userObject.uid = user.uid;
          userObject.displayName = user.displayName;
          userObject.photoURL = user.photoURL;
          userObject.uid = user.uid;
          userObject.email = user.email;
          userObject.isNewUser = result.additionalUserInfo.isNewUser;
          userObject.providerId = result.additionalUserInfo.providerId;
          resolve(userObject);
        });
      };

      // ** 同期的に順番に処理を実行する
      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then(userObject => this.createPhotoURL(userObject))
        .then(userObject => this.setPublicUserData(userObject))
        .then(userObject => this.setPrivateUserData(userObject))
        .then(userObject => this.setLocalUserData(userObject))
        .catch(error => this.onRejectted(error));
    },
    // ** ① 認証状態を明示的にセットする
    setPersistence() {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(result => {
            resolve();
          });
      });
    },
    // ** ④ Googleから取得したアイコンのURLをFirestorageに登録して、そのURLをFirestoreに登録する準備
    createPhotoURL(userObject) {
      return new Promise((resolve, reject) => {
        // ** TODO - 初めてじゃない場合は処理しない対応が必要
        var url = userObject.photoURL;
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function(event) {
          var blob = xhr.response;
          let storageRef = storage.ref();
          let mountainsRef = storageRef.child(
            `user/${userObject.uid}/image.jpg`
          );
          let uploadTask = mountainsRef.put(blob);
          uploadTask.then(snapshot => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL);
              // ** firestorageに登録したURLを登録するオブジェクトに代入
              userObject.photoURL = downloadURL;
              resolve(userObject);
            });
          });
        };
        xhr.open("GET", url);
        xhr.onerror = function(e) {
          // クロスドメインでひっかかる場合はstorageに登録しない
          console.log("ooooooops!!cros!!");
          resolve(userObject);
        };
        xhr.send();
      });
    },
    // ** ⑤ 公開可能なユーザー情報をFirestoreに登録
    setPublicUserData(userObject) {
      return new Promise((resolve, reject) => {
        var publicUser = firestore.collection("users").doc(userObject.uid);
        publicUser
          .set(this.createPublicObj(userObject), { merge: true })
          .then(result => {
            resolve(userObject);
          });
      });
    },
    createPublicObj(obj) {
      var publicObj = {};
      publicObj.uid = obj.uid;
      publicObj.providerId = obj.providerId;
      publicObj.isNewUser = obj.isNewUser;
      if (obj.isNewUser) {
        publicObj.photoURL = obj.photoURL;
        publicObj.displayName = obj.displayName;
      }
      if (
        (obj.providerId.indexOf("twitter") != -1 ||
          obj.providerId.indexOf("github") != -1) &&
        obj.isNewUser
      ) {
        // ** プロフィールが存在して、isNewUserがtrueじゃないときにオブジェクトに代入する
        publicObj.profile = obj.profile;
        publicObj.screenName = obj.screenName;
      }
      return publicObj;
    },
    // ** ⑥ 非公開のユーザー情報をFirestoreに登録
    setPrivateUserData(userObject) {
      return new Promise((resolve, reject) => {
        var privateUsers = firestore
          .collection("privateUsers")
          .doc(userObject.uid);
        privateUsers
          .set(this.createPrivateObj(userObject), { merge: true })
          .then(result => {
            resolve(userObject);
          });
      });
    },
    createPrivateObj(obj) {
      var privateObj = {};
      privateObj.uid = obj.uid;
      privateObj.providerId = obj.providerId;
      privateObj.isNewUser = obj.isNewUser;
      privateObj.email = obj.email;
      privateObj.token = obj.token;
      privateObj.refreshToken = obj.refreshToken;
      return privateObj;
    },
    // ** ⑦ ローカルストレージに保持するユーザー情報を設定
    setLocalUserData(userObject) {
      return new Promise((resolve, reject) => {
        var user = firestore.collection("users").doc(userObject.uid);
        user
          .get()
          .then(doc => {
            if (doc.exists) {
              localStorage.setItem("photoURL", doc.data().photoURL);
              localStorage.setItem("uid", userObject.uid);
              localStorage.setItem("token", userObject.token);
              localStorage.setItem("displayName", doc.data().displayName);
              this.$buefy.toast.open({
                duration: 5000,
                message: `ログインに成功しました`,
                position: "is-bottom",
                type: "is-success"
              });
              this.isLoginModalActive = false;
              location.reload();
              resolve(userObject);
            }
          })
          .catch(error => {
            console.log("Error getting document:", error);
          });
      });
    },
    // ** エラー処理
    onRejectted(error) {
      this.$buefy.toast.open({
        duration: 5000,
        message: `ログインに失敗しました。`,
        position: "is-bottom",
        type: "is-danger"
      });
      this.isLoginModalActive = false;
      console.log("onRejectted", error);
    }
  }
};
</script>
```

上の処理を実行することで、FirestoreとFirestorageにデータが登録されます🙌 コードは一部になりますが、`LoginModal.vue`というファイルをチェックしてみてください。

<img width="1434" alt="スクリーンショット 2020-06-08 12.24.32.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/e16d3405-614a-49dc-d0cb-90dfbfc29dce.png">

<img width="1440" alt="スクリーンショット 2020-06-08 12.24.50.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/2ce50fd2-90df-d266-e643-0d67be8c04a8.png">

## 認証ユーザーかどうか？

submitしたユーザーが本当に認証したユーザーかどうかを、データ登録前に確認したいことがあると思います。

```src/plugins/commonModule.js
isCommonLoginUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ** ログイン済のユーザー
        console.log('ok!!Login User!!')
        var name, email, photoUrl, uid, emailVerified
        name = user.displayName
        email = user.email
        photoUrl = user.photoURL
        emailVerified = user.emailVerified
        uid = user.uid
        resolve(user)
      } else {
        // ** ログインしていないユーザーもしくは認証が切れている
        resolve(false)
      }
    })
  })
},
```

```js

// ** 認証かどうかをチェックした後に何かしらの処理を実行する
this.isCommonLoginUser().then((result)) =>
  function(result) {
    // ** resultはuser or false
  }
)
```
セキュリティルールでも制御はしていますが、念のためチェックするとより安全かもしれません。

# セキュリティルール

Firebaseの特徴はクライアントサイドから、データを読み書きするため、悪意あるユーザーが不正をしてくる恐れがあるためセキュリティルールはしっかりと書きましょう。

今回はルートにある`firestore.rules`と`storage.rules`というファイルにあらかじめセキュリティルールを追加しているため、 `firebase deploy`のコマンドを実行すると、自動的にセキュリティルールが反映されます。

【Cloud Firestore セキュリティ ルールの条件の記述】
https://firebase.google.com/docs/firestore/security/rules-conditions?hl=ja

```js:firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{allPaths=**} {
			allow read;
			allow create: if request.auth != null;
			allow update,delete: if request.auth.uid == uid;
    }
    match /privateUsers/{uid}/{allPaths=**} {
			allow create: if request.auth != null;
			allow read,update,delete: if request.auth.uid == uid;
    }
  }
}
```

```js:storage.rules
service firebase.storage {
  match /b/{bucket}/o {
    match /user/{uid}/{allPaths=**} {
      allow read;
			allow create: if request.auth != null;
			allow delete,update: if request.auth.uid == uid;
    }
  }
}
```

# Firestoreにデータが登録されているか確認

最後に本当にユーザー情報以外のデータがFirestoreに登録されるかどうか確認してみましょう。
`users/{uid}/rooms/{roomId}/**` にデータが登録されているはずです🙌

<img width="1428" alt="スクリーンショット 2020-06-08 17.48.52.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/8a1e0838-ec7b-7822-05c6-d2c9e400c3b4.png">

<img width="1440" alt="スクリーンショット 2020-06-08 17.49.21.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/147291/9aafee21-8f35-becb-1ccc-77a7e90da6e4.png">


# 終わりに

今回はNuxt+Firebaseでスターター用のプロジェクトを作ってみました。何かこれからサービスを作ろうと考えたときに、認証・認可を実装することになると思いますが、結構大変ですし、コア部分ではないので楽しくないんですよね...。

なので、
