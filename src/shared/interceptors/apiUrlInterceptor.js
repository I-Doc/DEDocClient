import axios from 'axios';

const API_URL = 'https://dedoc.herokuapp.com';

axios.interceptors.request.use(config => {
  config.url = `${API_URL}${config.url}`;

  return config;
});
