import axios from "../../helpers/handleAxios";

const time = {
    namespaced: true,
    state: {
        status: '',
        error: null,
        times: [],
    },
    getters: {
        getAll: state => state.times,
        getStatus: state => state.status
    },
    mutations: {
        TIME_REQUEST: (state) => {
            state.status = 'loading';
        },

        TIME_SUCCESS: (state, times) => {
            state.status = "";
            state.error = null;
            state.times = [...times];
        },
        TIME_ERROR: (state, error) => {
            state.status = "error";
            state.error = error;
        },
        TIME_DELETED_SUCCESS: (state) => {
            state.status = "",
                state.error = null
        }
    },

    actions: {
        GET_TIMES: ({ commit }) => {
            commit('TIME_REQUEST');
            axios.get('/time/all')
                .then((data) => {
                    commit('TIME_SUCCESS', [...data.data.times]);
                })
                .catch(error => {
                    commit('TIME_ERROR', error);
                })
        },
        CREATE_TIME: ({ commit }, data) => {
            commit('TIME_REQUEST');
            return new Promise((resolve, reject) => {
                axios.post('/time/create', data)
                    .then(() => {
                        console.log("ISHLADI");
                        resolve();
                    })
                    .catch((error) => {
                        console.log("ERROR");
                        reject(error);
                    });
            });
        },
        DELETE_TIME: ({ commit }, id) => {
            commit('TIME_REQUEST');
            return new Promise((resolve, reject) => {
                axios.post('/time/delete', { id: id })
                    .then(data => {
                        commit('TIME_DELETED_SUCCESS');
                        console.log(data.data);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        commit('TIME_ERROR', error);
                        reject();
                    });
            });
        }
    }
}

export default time;