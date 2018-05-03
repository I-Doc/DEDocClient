import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Registration from './components/Registration';

class App extends Component {
  render() {
    return (
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
              <Nav pullRight>
                <LinkContainer to="/login">
                  <NavItem eventKey={1}>Увійти</NavItem>
                </LinkContainer>

                <LinkContainer to="/registration">
                  <NavItem eventKey={2}>Реєстрація</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
        </div>
      </Router>
    );
  }
}

export default App;
