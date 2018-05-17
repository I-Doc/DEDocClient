import axios from 'axios';

class TemplatesService {
  static async find() {
    return await axios.get('/templates').then(response => response.data);
  }

  static async create(template) {
    return await axios.post('/templates', template);
  }
}

export default TemplatesService;
