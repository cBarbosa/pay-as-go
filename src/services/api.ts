import axios from 'axios';

const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

axiosService.interceptors.request.use(
    async config => {
        const value = await config
        console.log(value)
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosService.interceptors.response.use((response) => {
    console.log(`response interceptor`, response)
    return response
}, async function (error) {
    const originalRequest = error.config;
    console.log(`error response interceptor`, originalRequest)
    return Promise.reject(error);
});


export default axiosService;