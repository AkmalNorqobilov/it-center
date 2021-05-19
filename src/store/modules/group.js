import axios from "../../helpers/handleAxios";

const group = {
    namespaced: true,
    state: {
        status: '',
        error: null,
        groups: [],
    },
    getters: {

    },
    mutations: {
        GROUP_REQUEST: (state) => {
            state.status = 'loading';
        },

        GROUP_SUCCESS: (state, groups) => {
            state.status = "";
            state.error = null;
            state.group = groups;
        },
        GROUP_ERROR: (state, error) => {
            state.status = "error";
            state.error = error;
        }
    },

    actions: {
        GET_GROUPS: ({ commit }) => {
            commit('GROUP_REQUEST');
            axios.get('/group/getAll')
                .then((data) => {
                    commit('GROUP_SUCCESS', data.data);
                })
                .catch(error => { 
                    commit('GROUP_ERROR', error);
                })
        }
    }
}

export default group;