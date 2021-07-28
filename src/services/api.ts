import axios from 'axios';
import { toast } from 'react-toastify';
// import { useHistory } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

axiosService.interceptors.request.use(
    async config => {
        const value = await config;
        console.debug('InterceptorRequest',value);
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosService.interceptors.response.use((response) => {
    console.debug('InterceptorResponse', response);
    return response;
}, async function (error) {
    // const history = useHistory();
    // const history = createBrowserHistory();
    
    const originalRequest = error.config;
    console.debug('InterceptorResponse', `error response interceptor`, originalRequest);

    if(error.message === 'Network Error' && !error.response) {
        toast.error(`Netowrk error - make sure API is running`);
        return Promise.reject(error);
    }
    
    const {status, data, config} = error.response;

    if(status === 401 && data.message === '') {
        // history.push('/login');
        toast.error(`Você não está mais logado no sistema.`);
        return Promise.reject(error);
    }

    if(status === 404) {
        // history.push('/404');
        toast.error(`not found`);
        return Promise.reject(error);
    }
    
    if(status === 400 && config.method ==='get' && data.errors.hasOwnProperty('id')) {
        toast.error(`not found`);
        return Promise.reject(error);
    }
    
    if(status === 500) {
        toast.error(`Server error - check the terminal for more info!`);
        return Promise.reject(error);
    }

    toast.error(data.message);
    return Promise.reject(error);
});


export default axiosService;
