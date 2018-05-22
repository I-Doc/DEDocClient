import axios from 'axios';

class TemplatesService {
  static async find() {
    return (await axios.get('/templates')).data;
  }

  static async create(template) {
    return axios.post('/templates', template);
  }
}

export default TemplatesService;
