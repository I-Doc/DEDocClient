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
                    <LinkContainer to="/">
                      <NavItem>Мої документи</NavItem>
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
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
