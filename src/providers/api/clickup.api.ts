import axios, { AxiosError } from 'axios';

const clickupAPI = axios.create({
  baseURL: import.meta.env.VITE_CLICKUP_API_URL,
});

clickupAPI.interceptors.request.use(async (axiosConfig) => {
  const clickupToken = localStorage.getItem('clickup-token') 
  if (axiosConfig.headers && clickupToken)
    Object.assign(axiosConfig.headers, { Authorization: clickupToken });
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
