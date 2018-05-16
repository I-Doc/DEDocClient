import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Well } from 'react-bootstrap';

import DocumentsService from './DocumentsService';
import TemplatesService from '../templates/TemplatesService';

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {
        name: '',
        template: '',
      },
      templates: [],
    };
  }

  async componentDidMount() {
    const templates = await TemplatesService.find();

    this.setState({ templates });
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      document: {
        ...this.state.document,
        [name]: value,
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ error: null });

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        DocumentsService.create({ ...this.state.document, data: reader.result })
          .then(() => {
            this.props.login();
            this.props.history.push('/');
          })
          .catch(err => {
            this.setState({ error: err.response.data.error });
          });
      },
      false,
    );

    reader.readAsDataURL(this.fileInput.files[0]);
  };

  render() {
    const { document, templates } = this.state;

    return (
      <Well>
        <h1>Новий документ</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <FormControl
              type="text"
              name="name"
              value={document.name}
              placeholder="Введіть назву документа"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup controlId="template">
            <FormControl
              componentClass="select"
              required
              onChange={this.handleInputChange}
              value={document.template}
            >
              <option value="" disabled>
                Оберіть шаблон
              </option>
              {templates.map(template => (
                <option value={template.id}>{template.name}</option>
              ))}
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl
              type="file"
              required
              ref={input => {
                this.fileInput = input;
              }}
            />
          </FormGroup>

          <Button type="submit">Створити</Button>
        </form>
      </Well>
    );
  }
}

export default CreateDocument;
