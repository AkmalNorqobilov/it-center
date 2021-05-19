import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import group from "./modules/group";
import science from "./modules/science";
import time from "./modules/time";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        changeModal: false,
        changeModalForUpdate: false
    },
    plugins: [Vuex.createLogger()],
    modules: {
        auth,
        group,
        science,
        time
    }
})