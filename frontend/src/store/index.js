import Vue from 'vue'
import Vuex from 'vuex'
import { toyStore } from './modules/toy-store'
import { userStore } from './modules/user-store'
import { reviewStore } from './modules/review-store'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {},
    mutations: {},
    actions: {},
    modules: {
       toyStore,
       userStore,
       reviewStore
    }
})