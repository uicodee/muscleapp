import axios, {AxiosRequestConfig} from "axios";


export const api = axios.create({
    responseType: "json",
    withCredentials: false,
    baseURL: "https://app.muscle-care.tw1.ru",
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    //     'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
    //     'Access-Control-Allow-Credentials': 'true'
    // }
});

// api.interceptors.request.use((config) => {
//     const accessTokenStr = localStorage.getItem('accessToken');
//     if (accessTokenStr) {
//         const accessToken = JSON.parse(accessTokenStr);
//         config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
//     } else config.headers.Authorization = null
//     return config
// })


export const createInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    return api({
        ...config,
        ...options
    }).then(r => r.data)
}

export type BodyType<Data> = Data;
