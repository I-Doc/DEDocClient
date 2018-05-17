import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import './shared/interceptors/interceptors';
import PrivateRoute from './shared/PrivateRoute';
import { AuthContext } from './shared/AuthContext';

import Login from './auth/Login';
import Registration from './auth/Registration';
import Documents from './documents/Documents';
import Templates from './templates/Templates';
import Profile from './profile/Profile';
import CreateDocument from './documents/CreateDocument';
import AuthService from './auth/AuthService';
import CreateTemplate from './templates/CreateTemplate';

class App extends Component {
  constructor(props) {
    super(props);

    const isAuthenticated = Boolean(localStorage.getItem('token'));

    this.state = {
      isAuthenticated,
      login: this.login,
    };
  }

  async componentDidMount() {
    if (this.state.isAuthenticated) {
      const profile = await AuthService.profile();

      this.setState({ isAdmin: profile.is_admin });
    }
  }

  login = () => {
    return AuthService.profile().then(profile => {
      this.setState({ isAuthenticated: true, isAdmin: profile.is_admin });
    });
  };

  logout = () => {
    this.setState({
      isAuthenticated: false,
    });

    localStorage.removeItem('token');
  };

  render() {
    const { isAuthenticated, isAdmin } = this.state;

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
                      <NavItem>
                        {isAdmin ? 'Документи' : 'Мої документи'}
                      </NavItem>
                    </LinkContainer>

                    <LinkContainer exact to="/templates">
                      <NavItem>Шаблони</NavItem>
                    </LinkContainer>

                    <LinkContainer to="/profile">
                      <NavItem>Особистий кабінет</NavItem>
                    </LinkContainer>
                    {isAdmin ? (
                      <LinkContainer exact to="/templates/new">
                        <NavItem>Створити шаблон</NavItem>
                      </LinkContainer>
                    ) : (
                      <LinkContainer exact to="/new">
                        <NavItem>Створити документ</NavItem>
                      </LinkContainer>
                    )}
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
              <PrivateRoute path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Registration} />
              <PrivateRoute exact path="/templates" component={Templates} />
              <PrivateRoute exact path="/new" component={CreateDocument} />
              <PrivateRoute
                exact
                path="/templates/new"
                component={CreateTemplate}
              />
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
