import axios from 'axios';

class DocumentsService {
  static async find() {
    return await axios.get('/documents').then(response => response.data);
  }

  static async create(document) {
    return await axios.post('/documents', document);
  }
}

export default DocumentsService;
