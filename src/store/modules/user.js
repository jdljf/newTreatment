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
    address: '',
    curriculum: 0,
    learnedTime: 0,
    medicalBeans: 0
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
    curriculum(state){
        return state.curriculum
    },
    learnedTime(state){
        return state.learnedTime
    },
    medicalBeans(state){
        return state.medicalBeans
    }
}

const mutations = {
    getPersonMessage: async (state) => {
        let res = await axios.get("/api/getPersonMessage", )

        state.name = res.data.name;
        state.phoneNumber = res.data.phoneNumber;
        state.idNumber = res.data.idNumber;
        state.password = res.data.password;
        state.province = res.data.province;
        state.area = res.data.area;
        state.city = res.data.city;
        state.address = res.data.address;
        state.curriculum = res.data.curriculum
        state.learnedTime = res.data.learnedTime
        state.medicalBeans = res.data.medicalBeans
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
