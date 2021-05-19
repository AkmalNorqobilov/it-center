import axios from "../../helpers/handleAxios";


// const initialState = {
//     token: localStorage.getItem('user-token') || '',
//     status: '',
//     user: null,
//     error: null
// };
const auth = {
    namespaced: true,
    state: {
        token: localStorage.getItem('user-token') || '',
        status: '',
        user: null,
        error: null,
        users: null,
        message: null
    },


    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        users: state => state.users,
        user: state => state.user,
        teachers: state => {
            let teachers = state.users.filter((teacher) => teacher.role === "teacher");
            return teachers;
        },
    },

    mutations: {
        AUTH_REQUEST: (state) => {
            state.status = 'loading'
        },
        AUTH_SUCCESS: (state, user) => {
            state.status = 'success';
            state.token = user.token;
            state.message = user.message;
            localStorage.setItem('token', user.token);
            state.user = user.user;
            console.log(localStorage.getItem('token'), "");
        },
        AUTH_ERROR: (state, error) => {
            state.status = 'error',
                state.error = error
        },
        AUTH_LOGOUT: (state) => {
            state.token = "",
                state.user = null,
                state.error = null,
                state.status = ''
        },
        USER_REQUEST: (state) => {
            state.status = 'loading';
        },

        USER_SUCCESS: (state, users) => {
            state.status = "";
            state.error = null;
            state.users = users;
        },
        USER_ERROR: (state, error) => {
            state.status = "error";
            state.error = error;
        }
    },

    actions: {
        AUTH_SIGNUP: ({ commit }, data) => {
            commit('AUTH_REQUEST');
            return new Promise((resolve, reject) => {
                axios.post('/auth/signup', {
                        ...data
                    })
                    .then((user) => {
                        console.log(user);
                        commit('AUTH_SUCCESS', user.data);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(JSON.parse(JSON.stringify(error)), "errorkubu");
                        commit('AUTH_ERROR', error);
                        reject();
                    })
            })
        },
        AUTH_SIGNIN: ({ commit }, data) => {
            console.log("boshla", data);
            commit('AUTH_REQUEST');
            console.log("boshla", data);
            return new Promise((resolve, reject) => {
                axios.post('/auth/signin', {
                        _id: "605f3f867c10a44330aeb581",
                        password: data.password
                    })
                    .then((user) => {
                        console.log(user);
                        commit('AUTH_SUCCESS', user.data);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(JSON.parse(JSON.stringify(error)), "errorkubu");
                        commit('AUTH_ERROR', error);
                        reject();
                    })
            })
        },

        AUTH_LOGOUT: ({ commit }) => {
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT');
                console.log("AUTHLOGOUT");
                resolve();
            })
        },

        GET_USERS: ({ commit }) => {
            commit('USER_REQUEST');
            return new Promise((resolve, reject) => {
                axios.get('/auth/getAll')
                    .then((data) => {
                        commit('USER_SUCCESS', data.data.users);
                        resolve();
                    }).catch((error) => {
                        commit('USER_ERROR', error);
                        reject();
                    })
            })
        }
    }
};

export default auth;