import axios from 'axios';
import { env } from '../config/env';
import { getToken } from '../utils/storage';

const instance = axios.create({
  baseURL: env.API_URL,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
