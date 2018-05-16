import React, { Component } from 'react';
import { Alert, Button, FormControl, FormGroup, Well } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import AuthService from '../AuthService';
import { AuthContext } from '../../shared/AuthContext';

import './Login.css';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
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

    AuthService.login(this.state.username, this.state.password)
      .then(() => {
        this.props.login();
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
      });
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <Well bsSize="large" className="login-card">
        {error && <Alert bsStyle="danger">{error}</Alert>}

        <h1>Вхід</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <FormControl
              type="text"
              name="username"
              value={username}
              placeholder="Введіть ім'я користувача"
              onChange={this.handleInputChange}
              required
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="password">
            <FormControl
              type="password"
              name="password"
              value={password}
              placeholder="Введіть пароль"
              onChange={this.handleInputChange}
              required
            />
            <FormControl.Feedback />
          </FormGroup>

          <Button className="login-button" type="submit">
            Увійти
          </Button>
        </form>
      </Well>
    );
  }
}

export default withRouter(props => (
  <AuthContext.Consumer>
    {({ login }) => <Login {...props} login={login} />}
  </AuthContext.Consumer>
));
