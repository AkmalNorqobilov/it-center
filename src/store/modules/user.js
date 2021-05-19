import axios from "../../helpers/handleAxios";
import store from '../index';
const group = {
    namespaced: true,
    state: {
        status: '',
        error: null,
        users: [],
    },

    mutations: {
        USER_REQUEST: (state) => {
            state.status = 'loading';
        },

        USER_SUCCESS: (state, groups) => {
            state.status = "";
            state.error = null;
            state.group = groups;
        },
        USER_ERROR: (state, error) => {
            state.status = "error";
            state.error = error;
        }
    },

    actions: {
        GET_USERS: ({ commit }) => {
            const user = store.state['auth/user'];
            if (user.role) {
                commit('USER_REQUEST');
                axios.get('/user/getAll')
                    .then((data) => {
                        commit('USER_SUCCESS', data.data);
                    })
                    .catch(error => {
                        commit('USER_ERROR', error);
                    })
            }
        }
    }
}

export default users;