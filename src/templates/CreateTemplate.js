import React, { Component } from 'react';
import { Alert, Button, FormControl, FormGroup, Well } from 'react-bootstrap';

import TemplatesService from './TemplatesService';

class CreateTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ error: null });

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      async () => {
        try {
          await TemplatesService.create({
            name: this.state.name,
            data: reader.result,
          });
          await this.props.history.push('/templates');
        } catch (err) {
          this.setState({ error: err.response.data.errors.join('<br/>') });
        }
      },
      false,
    );

    reader.readAsDataURL(this.fileInput.files[0]);
  };

  render() {
    const { name, error } = this.state;

    return (
      <Well className="auth-card b-card">
        {error && (
          <Alert bsStyle="danger">
            <span dangerouslySetInnerHTML={{ __html: error }} />
          </Alert>
        )}

        <h1 className="auth-title">Новий шаблон</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <FormControl
              type="text"
              name="name"
              value={name}
              placeholder="Введіть назву шаблона"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              className="download-file"
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

export default CreateTemplate;
