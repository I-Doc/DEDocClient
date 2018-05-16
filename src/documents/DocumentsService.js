import axios from 'axios';

class DocumentsService {
  static async find() {
    return await axios.get('/documents').then(response => response.data);
  }
}

export default DocumentsService;
