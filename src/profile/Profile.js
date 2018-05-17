import React, { Component } from 'react';
import {
  Col,
  Grid,
  Row,
  Panel,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { DateTime } from 'luxon';

import AuthService from '../auth/AuthService';

import './Profile.css';

const DATE_FORMAT = 'dd/MM/yyyy';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const profile = await AuthService.profile();

    this.setState({ profile });
  }

  render() {
    const { profile } = this.state;

    return (
      <Grid fluid>
        {profile ? (
          <Row>
            <Col xs={9}>
              <div>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title>{profile.name}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <Col xs={5}>
                      <ListGroup>
                        <ListGroupItem>ПІБ</ListGroupItem>
                        <ListGroupItem>Нікнейм</ListGroupItem>
                        <ListGroupItem>Дата народження</ListGroupItem>
                      </ListGroup>
                    </Col>
                    <Col xs={7}>
                      <ListGroup>
                        <ListGroupItem>{profile.name}</ListGroupItem>
                        <ListGroupItem>{profile.username}</ListGroupItem>
                        <ListGroupItem>
                          {DateTime.fromISO(profile.birthdate).toFormat(
                            DATE_FORMAT,
                          )}
                        </ListGroupItem>
                      </ListGroup>
                    </Col>
                  </Panel.Body>
                </Panel>
              </div>
            </Col>
            <Col xs={3}>
              <div>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title>Документи</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <Row>
                      <Button className="profile-button">Усі створені</Button>
                    </Row>
                    <Row>
                      <Button className="profile-button">Схвалені</Button>
                    </Row>
                    <Row>
                      <Button className="profile-button">На розгляді</Button>
                    </Row>
                    <Row>
                      <Button className="profile-button">Відхилені</Button>
                    </Row>
                  </Panel.Body>
                </Panel>
              </div>
            </Col>
          </Row>
        ) : (
          <div>Завантажується...</div>
        )}
      </Grid>
    );
  }
}

export default Profile;
