import axios from "../../helpers/handleAxios";

const time = {
    namespaced: true,
    state: {
        status: '',
        error: null,
        teachers: [],
    },
    getters: {
        getAll: state => state.teachers,
        getStatus: state => state.status
    },
    mutations: {
        TEACHER_REQUEST: (state) => {
            state.status = 'loading';
        },

        TEACHER_SUCCESS: (state, times) => {
            state.status = "";
            state.error = null;
            state.times = [...times];
        },
        TEACHER_ERROR: (state, error) => {
            state.status = "error";
            state.error = error;
        },
        TEACHER_DELETED_SUCCESS: (state) => {
            state.status = "",
                state.error = null
        }
    },

    actions: {
        GET_TEACHERS: ({ commit }) => {
            commit('TEACHER_REQUEST');
            axios.get('/teacher/all')
                .then((data) => {
                    commit('TEACHER_SUCCESS', [...data.data.teachers]);
                })
                .catch(error => {
                    commit('TEACHER_ERROR', error);
                })
        },
        CREATE_TEACHER: ({ commit }, data) => {
            commit('TEACHER_REQUEST');
            return new Promise((resolve, reject) => {
                axios.post('/teacher/create', data)
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
        DELETE_TEACHER: ({ commit }, id) => {
            commit('TEACHER_REQUEST');
            return new Promise((resolve, reject) => {
                axios.post('/teacher/delete', { id: id })
                    .then(data => {
                        commit('TEACHER_DELETED_SUCCESS');
                        console.log(data.data);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        commit('TEACHER_ERROR', error);
                        reject();
                    });
            });
        }
    }
}

export default time;