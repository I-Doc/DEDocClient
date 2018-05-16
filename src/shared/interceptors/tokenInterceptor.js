import axios from 'axios';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.common.Authorization = `Token ${token}`;
  }

  return config;
});
