import axios from "../../helpers/handleAxios";

const science = {
    namespaced: true,
    state: {
        status: '',
        error: null,
        sciences: [],
    },
    getters: {
        getAll:(state)=> state.sciences,
    },
    mutations: {
        SCIENCE_REQUEST: (state) => {
            state.status = 'loading';
        },

        SCIENCE_SUCCESS: (state, sciences) => {
            state.status = "";
            state.error = null;
            state.sciences = sciences;
        },
        SCIENCE_ERROR: (state, error) => {
            state.status = "error";
            state.error = error;
        }
    },

    actions: {
        GET_SCIENCES: ({ commit }) => {
            commit('SCIENCE_REQUEST');
            axios.get('/science/all')
                .then((data) => {
                    commit('SCIENCE_SUCCESS', data.data.science);
                })
                .catch(error => {
                    commit('SCIENCE_ERROR', error);
                })
        },
        CREATE_SCIENCE: ({ commit }, data) => {
            commit('SCIENCE_REQUEST');
            return new Promise((resolve, reject) => {
                console.log(data);
                axios.post('/science/create', data)
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
        DELETE_SCIENCE: ({ commit }, id) => {
            commit('SCIENCE_REQUEST');
            return new Promise((resolve, reject) => {
                axios.post('/science/delete', { id: id })
                    .then(data => {
                        commit('SCIENCE_DELETED_SUCCESS');
                        console.log(data.data);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        commit('SCIENCE_ERROR', error);
                        reject();
                    });
            });
        }
    }
}

export default science;