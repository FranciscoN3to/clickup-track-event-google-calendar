import axios from 'axios';
import { oauthSignIn } from '@providers/auth/oath2.google';

const googleAPI = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_API_URL,
});

googleAPI.interceptors.request.use(async (axiosConfig) => {
  const googleToken = localStorage.getItem('google-token')
  if (axiosConfig.headers && googleToken)
    Object.assign(axiosConfig.headers, { Authorization: `Bearer ${googleToken}` });

  return axiosConfig;
});

googleAPI.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error?.response) {
      if ([403, 401].includes(error.response.status)) return oauthSignIn();
    }
    throw error;
  },
);

export default googleAPI;
