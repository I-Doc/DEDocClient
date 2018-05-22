import axios from 'axios';

class AuthService {
  static async login(username, password) {
    const { token } = (await axios.post('/login', {
      username,
      password,
    })).data;

    localStorage.setItem('token', token);
  }

  static async register(user) {
    return axios.post('/register', user);
  }

  static async profile() {
    return (await axios.get('/profile')).data;
  }
}

export default AuthService;
