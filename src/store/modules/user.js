import axios from 'axios'
import VueAxios from 'vue-axios';

const state = {
    name: '',
    password: '',
    phoneNumber: '',
    idNumber: '',
    province: '',
    area: '',
    city: '',
    address: ''
}

const getters = {
    name(state) {
        return state.name
    },
    password(state) {
        return state.password
    },
    phoneNumber(state) {
        return state.phoneNumber
    },
    idNumber(state) {
        return state.idNumber
    },
    province(state) {
        return state.province
    },
    area(state) {
        return state.area
    },
    city(state) {
        return state.city
    },
    address(state) {
        return state.address
    },
}

const mutations = {
    getPersonMessage: async (state) => {
        let res = await axios.get("/api/getPersonMessage", )
        console.log('个人信息', res);

        state.name = res.data.name;
        state.phoneNumber = res.data.phoneNumber;
        state.idNumber = res.data.idNumber;
        state.password = res.data.password;
        state.province = res.data.province;
        state.area = res.data.area;
        state.city = res.data.city;
        state.address = res.data.address;
        console.log(state);

    },
};

const actions = {
    getPersonMessage: (context) => {
        context.commit('getPersonMessage')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
