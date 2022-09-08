import axios, { AxiosError } from 'axios';

const clickupAPI = axios.create({
    baseURL: process.env.CLICKUP_API_URL,
});

clickupAPI.interceptors.request.use(async (axiosConfig) => {
    if (axiosConfig.headers)
        Object.assign(axiosConfig.headers, { Authorization: process.env.CLICKUP_TOKEN });
    return axiosConfig;
});

clickupAPI.interceptors.response.use(
    (axiosConfig) => {
        if (axiosConfig.data?.data) {
            axiosConfig.data = axiosConfig.data.data;
        }

        return axiosConfig;
    },
    (axiosError: AxiosError) => {
        if (axiosError?.response?.status === 429) return axiosError.response;
        throw axiosError;
    },
);

export default clickupAPI;
