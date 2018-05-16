import axios from 'axios';

class AuthService {
  static async login(username, password) {
    return await axios
      .post('/login', {
        username,
        password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
      });
  }

  static async register(user) {
    return await axios.post('/register', user);
  }

  static async profile() {
    return await axios.get('/profile').then(response => response.data);
  }
}

export default AuthService;
