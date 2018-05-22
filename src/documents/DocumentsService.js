import axios from 'axios';

class DocumentsService {
  static async find() {
    return (await axios.get('/documents')).data;
  }

  static async create(document) {
    return axios.post('/documents', document);
  }

  static async findStates() {
    return (await axios.get('/states')).data;
  }

  static async changeState(stateId, document) {
    return axios.post(`/documents/${document.id}/state`, {
      state: stateId,
    });
  }
}

export default DocumentsService;
