import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const DOMAIN_URL = 'doctorrecetas.com'

export const http = axios.create({
    baseURL: `https://${DOMAIN_URL}`
})

http.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
        return config;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    }
);