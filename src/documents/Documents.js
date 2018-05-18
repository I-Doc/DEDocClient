import React, { Component } from 'react';
import { Col, FormControl, FormGroup, Grid, Row, Well } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';

import DocumentsService from './DocumentsService';
import TemplatesService from '../templates/TemplatesService';
import { AuthContext } from '../shared/AuthContext';

const DATE_FORMAT = 'dd/MM/yyyy HH:mm';

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  async componentDidMount() {
    const documents = await DocumentsService.find();
    const states = await DocumentsService.findStates();
    const templates = await TemplatesService.find();

    documents.forEach(document => {
      document.template = templates.find(
        template => template.id === document.template,
      );

      document.state = states.find(state => state.id === document.state);
    });

    this.setState({ isLoaded: true, documents, states, templates });
  }

  changeState = (e, document) => {
    const stateId = Number(e.target.value);
    const state = this.state.states.map(s => s.id === stateId);

    DocumentsService.changeState(stateId, document).then(() => {
      const documents = this.state.documents.map(
        d => (d.id !== document.id ? d : { ...d, state }),
      );

      this.setState({ documents });
      this.forceUpdate();
    });
  };

  render() {
    const { documents, states, isLoaded } = this.state;
    const { isAdmin } = this.props;

    return (
      <Well className="text-center">
        {isLoaded ? (
          documents.length > 0 ? (
            <Grid fluid>
              <Row>
                <Col xs={2}>
                  <h4>Назва</h4>
                </Col>
                <Col xs={2}>
                  <h4>Дата створення</h4>
                </Col>
                <Col xs={2}>
                  <h4>Дата редагування</h4>
                </Col>
                <Col xs={2}>
                  <h4>Шаблон</h4>
                </Col>
                <Col xs={2}>
                  <h4>Статус</h4>
                </Col>
              </Row>

              {documents.map(document => (
                <Row key={document.id}>
                  <Col xs={2} className="text-ellipsis" title={document.name}>
                    {document.id}. {document.name}
                  </Col>
                  <Col xs={2}>
                    {DateTime.fromISO(document.cdate).toFormat(DATE_FORMAT)}
                  </Col>
                  <Col xs={2}>
                    {DateTime.fromISO(document.mdate).toFormat(DATE_FORMAT)}
                  </Col>
                  <Col
                    xs={2}
                    className="text-ellipsis"
                    title={document.template.name}
                  >
                    {document.template.name}
                  </Col>
                  <Col xs={2}>
                    {!isAdmin ? (
                      document.state.name
                    ) : (
                      <FormGroup controlId="state">
                        <FormControl
                          componentClass="select"
                          name="state"
                          value={String(document.state.id)}
                          onChange={e => this.changeState(e, document)}
                          required
                        >
                          {states.map(state => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                        </FormControl>
                      </FormGroup>
                    )}
                  </Col>
                  <Col xs={2}>
                    <a href={document.data} download={document.name}>
                      Завантажити
                    </a>
                  </Col>
                </Row>
              ))}
            </Grid>
          ) : (
            <div>Документів ще не було створено</div>
          )
        ) : (
          <div>Завантажується...</div>
        )}
      </Well>
    );
  }
}

export default withRouter(props => (
  <AuthContext>
    {({ isAdmin }) => <Documents {...props} isAdmin={isAdmin} />}
  </AuthContext>
));
