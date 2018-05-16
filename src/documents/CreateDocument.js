import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Well } from 'react-bootstrap';

import DocumentsService from './DocumentsService';
import TemplatesService from '../templates/TemplatesService';

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {},
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

    DocumentsService.create(this.state.document)
      .then(() => {
        this.props.login();
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
      });
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
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="template">
            <FormControl componentClass="select">
              <option value={null}>Оберіть шаблон</option>
              {templates.map(template => (
                <option value={template.id}>{template.name}</option>
              ))}
            </FormControl>
          </FormGroup>

          <Button type="submit">Створити</Button>
        </form>
      </Well>
    );
  }
}

export default CreateDocument;
