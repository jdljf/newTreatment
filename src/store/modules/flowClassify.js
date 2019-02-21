import axios from 'axios'

const state = {
    flowClassify: []
}

const getters = {
    renderFlowClassifyData(state) {
        return state.flowClassify
    }
}

const mutations = {
    getFlowClassifyData: async (state) => {
        let res = await axios.get("/api/getFlowClassify")

        state.flowClassify = res.data.flowClassify;        
    },
};

const actions = {
    getFlowClassifyAct(context) {
        context.commit('getFlowClassifyData')
    }
}

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}