import axios from 'axios'

const state = {
    classify: []
}

const getters = {
    renderClassifyData(state) {
        return state.classify
    }
}

const mutations = {
    getClassifyData: async (state) => {
        let res = await axios.get("/api/getClassify")

        state.classify = res.data.classify;
        
    },
};

const actions = {
    getClassifyAct(context) {

        context.commit('getClassifyData')
    }
}

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}