import axios from 'axios'
import store from "../admin/redux/store/store.js"
import { logout } from '../admin/redux/features/auth/authSlice.js'

const api = axios.create({
    baseURL: 'http://localhost:8081',

})

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response?.status === 401) {
            store.dispatch(logout())
        window.location.href = "/iniciar-sesion"
        }
        return Promise.reject(error)
        
    }
)

export default api;