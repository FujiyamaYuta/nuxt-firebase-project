import * as firebase from "~/plugins/firebase";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
  },
});

export const state = () => ({
  // counter: 0,
  userEmail: null,
  userName: null,
  userPhoto: null,
  userUid: null,
  userProfile: null,
  userScreenName: null,
});

export const mutations = {
  storeUser(state, payload) {
    state.userEmail = payload.userEmail;
    state.userName = payload.userName;
    state.userPhoto = payload.userPhoto;
    state.userUid = payload.userUid;
    state.userProfile = payload.userProfile;
    state.userScreenName = payload.userScreenName;
  },
  deleteUser(state) {
    state.userEmail = null;
    state.userName = null;
    state.userPhoto = null;
    state.userUid = null;
    state.userProfile = null;
    state.userScreenName = null;
  },
  setuserItems(state, payload) {
    state.userItems = payload.userItems;
  },
};

export const actions = {

};
