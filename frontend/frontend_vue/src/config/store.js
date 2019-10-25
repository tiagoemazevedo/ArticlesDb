import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
    },
    mutations: {
        toggleMenu(state, isMenuVisible) {
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isMenuVisible  === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isMenuVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }

        }
    }
})