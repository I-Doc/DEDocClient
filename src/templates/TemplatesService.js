import axios from 'axios';

class TemplatesService {
  static async find() {
    return await axios.get('/templates').then(response => response.data);
  }
}

export default TemplatesService;
