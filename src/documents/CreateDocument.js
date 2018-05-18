import React, { Component } from 'react';
import { Alert, Button, FormControl, FormGroup, Well } from 'react-bootstrap';

import DocumentsService from './DocumentsService';
import TemplatesService from '../templates/TemplatesService';

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      template: '',
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
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ error: null });

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        DocumentsService.create({
          name: this.state.name,
          template: Number(this.state.template),
          data: reader.result,
        })
          .then(() => {
            this.props.history.push('/');
          })
          .catch(err => {
            this.setState({ error: err.response.data.errors.join('<br/>') });
          });
      },
      false,
    );

    reader.readAsDataURL(this.fileInput.files[0]);
  };

  render() {
    const { name, template, templates, error } = this.state;

    return (
      <Well className="auth-card b-card">
        {error && (
          <Alert bsStyle="danger">
            <span dangerouslySetInnerHTML={{ __html: error }} />
          </Alert>
        )}

        <h1 className="auth-title">Новий документ</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <FormControl
              type="text"
              name="name"
              value={name}
              placeholder="Введіть назву документа"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup controlId="template">
            <FormControl
              componentClass="select"
              name="template"
              value={template}
              onChange={this.handleInputChange}
              required
            >
              <option value="" disabled>
                Оберіть шаблон
              </option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl
              type="file"
              required
              inputRef={input => {
                this.fileInput = input;
              }}
            />
          </FormGroup>

          <Button type="submit" className="auth-card-submit-button">
            Створити
          </Button>
        </form>
      </Well>
    );
  }
}

export default CreateDocument;
