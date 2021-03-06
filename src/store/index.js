import Vue from 'vue'
import Vuex from 'vuex'

import state from './states.js'           //状态值
import mutations from './mutations.js'   //同步修改 state的值
import actions from './actions.js'       //异步修改state的值

import user from './modules/user'
import subjectClassify from './modules/classify'
import flowClassify from './modules/flowClassify'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        subjectClassify,
        flowClassify
    },
    state,
    mutations,
    actions
});