import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Button, FormControl, FormGroup, Well } from 'react-bootstrap';

import AuthService from './AuthService';

class Registration extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      birthdate: '',
      username: '',
      password: '',
    };
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

    AuthService.register({
      name: this.state.name,
      birthdate: this.state.birthdate,
      username: this.state.username,
      password: this.state.password,
    })
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(err => {
        this.setState({ error: err.response.data.errors.join('\n') });
      });
  };

  render() {
    const { name, birthdate, username, password, error } = this.state;

    return (
      <Well bsSize="large" className="auth-card">
        {error && <Alert bsStyle="danger">{error}</Alert>}

        <h1>Реєстрація</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <FormControl
              type="text"
              name="name"
              value={name}
              placeholder="Введіть ПІБ"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup controlId="birthdate">
            <FormControl
              type="date"
              name="birthdate"
              value={birthdate}
              placeholder="Виберіть дату народження"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup controlId="username">
            <FormControl
              type="text"
              name="username"
              value={username}
              placeholder="Введіть ім'я користувача"
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup controlId="password">
            <FormControl
              type="password"
              name="password"
              value={password}
              placeholder="Введіть пароль"
              onChange={this.handleInputChange}
              required
              autoComplete="new-password"
            />
          </FormGroup>

          <Button className="auth-card-submit-button" type="submit">
            Увійти
          </Button>
        </form>
      </Well>
    );
  }
}

export default withRouter(Registration);
