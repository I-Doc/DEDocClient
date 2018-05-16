import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import './shared/interceptors/interceptors';
import PrivateRoute from './shared/PrivateRoute';
import { AuthContext } from './shared/AuthContext';

import Login from './auth/Login/Login';
import Registration from './auth/Registration';
import Documents from './documents/Documents';
import Templates from './templates/Templates';
import CreateDocument from './documents/CreateDocument';

class App extends Component {
  constructor(props) {
    super(props);

    const isAuthenticated = Boolean(localStorage.getItem('token'));

    this.state = {
      isAuthenticated,
      login: () => {
        this.setState({ isAuthenticated: true });
      },
    };
  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
    });

    localStorage.removeItem('token');
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <div>
            <Navbar inverse collapseOnSelect staticTop fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">DeDoc</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>

              <Navbar.Collapse>
                {isAuthenticated && (
                  <Nav>
                    <LinkContainer exact to="/">
                      <NavItem>Мої документи</NavItem>
                    </LinkContainer>

                    <LinkContainer to="/templates">
                      <NavItem>Шаблони</NavItem>
                    </LinkContainer>

                    <LinkContainer to="/new">
                      <NavItem>Створити документ</NavItem>
                    </LinkContainer>
                  </Nav>
                )}

                <Nav pullRight>
                  {!isAuthenticated ? (
                    <React.Fragment>
                      <LinkContainer to="/login">
                        <NavItem>Увійти</NavItem>
                      </LinkContainer>

                      <LinkContainer to="/registration">
                        <NavItem>Реєстрація</NavItem>
                      </LinkContainer>
                    </React.Fragment>
                  ) : (
                    <NavItem onClick={this.logout}>Вийти</NavItem>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <div className="container">
              <PrivateRoute exact path="/" component={Documents} />
              <Route path="/login" component={Login} />
              <Route path="/registration" component={Registration} />
              <PrivateRoute path="/templates" component={Templates} />
              <PrivateRoute path="/new" component={CreateDocument} />
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
