import axios from 'axios';
import { auth } from '../auth/google';

const googleAPI = axios.create({
    baseURL: process.env.GOOGLE_API_URL,
});

googleAPI.interceptors.request.use(async (axiosConfig) => {
    // axiosConfig.headers = ;i
    if (axiosConfig.headers)
        Object.assign(axiosConfig.headers, { Authorization: `Bearer ${process.env.token}` });

    return axiosConfig;
});

googleAPI.interceptors.response.use(
    (config) => config,
    async (error) => {
        if (error?.response) {
            if ([403, 401].includes(error.response.status)) {
                const authentication = await auth();
                process.env.token = authentication.access_token;
                error.config.headers.Authorization = `Bearer ${process.env.token}`;
                return axios(error.config);
            }
        }
        throw error;
    },
);

export default googleAPI;
