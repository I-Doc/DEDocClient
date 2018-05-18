import axios from 'axios';

class DocumentsService {
  static async find() {
    return await axios.get('/documents').then(response => response.data);
  }

  static async create(document) {
    return await axios.post('/documents', document);
  }

  static async findStates() {
    return await axios.get('/states').then(response => response.data);
  }

  static async changeState(stateId, document) {
    return await axios.post(`/documents/${document.id}/state`, {
      state: stateId,
    });
  }
}

export default DocumentsService;
