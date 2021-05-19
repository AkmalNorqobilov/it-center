import axios from "axios";
import { api } from "../urlConfig";
import store from '../store/index';
// import { authConstants } from "../actions/constants";

const token = localStorage.getItem('token');
const axiosInstance  =axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ?   `Bearer ${token}`: ''
    }
})

axiosInstance.interceptors.request.use((req)=>{
    const {auth} = store.state;
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`
    }
    return req;
})

// axiosInstance.interceptors.response.use((res)=>{
//     return res;
// }, (error)=>{
//     const {status} = error.response;
//     if(status === 500 || status === 400){
//         localStorage.clear();
//         store.dispatch('auth/AUTH_LOGOUT');
//     }
//     return Promise.reject(error)
// })
export default axiosInstance;