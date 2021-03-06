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

      document.stateId = document.state;
      document.state = states.find(state => state.id === document.state);
    });

    this.setState({ isLoaded: true, documents, states, templates });
  }

  changeState = async (event, document) => {
    const stateId = Number(event.target.value);
    const state = this.state.states.map(s => s.id === stateId);

    await DocumentsService.changeState(stateId, document);

    const documents = this.state.documents.map(
      d => (d.id !== document.id ? d : { ...d, state, stateId }),
    );

    this.setState({ documents });
  };

  render() {
    const { documents, states, isLoaded } = this.state;
    const { isAdmin } = this.props;

    return (
      <Well className="text-center doc-card">
        {isLoaded ? (
          documents.length > 0 ? (
            <Grid fluid>
              <Row>
                <Col xs={2}>
                  <h4 className="doc-table-title">Назва</h4>
                </Col>
                <Col xs={2}>
                  <h4 className="doc-table-title">Дата створення</h4>
                </Col>
                <Col xs={2}>
                  <h4 className="doc-table-title">Дата редагування</h4>
                </Col>
                <Col xs={2}>
                  <h4 className="doc-table-title">Шаблон</h4>
                </Col>
                <Col xs={2}>
                  <h4 className="doc-table-title">Статус</h4>
                </Col>
              </Row>

              {documents.map(document => (
                <Row key={document.id} className="doc-item">
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
                      <FormGroup controlId="state" className="document-state">
                        <FormControl
                          componentClass="select"
                          name="state"
                          value={document.stateId}
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
                    <a
                      href={document.data}
                      download={document.name}
                      className="download-button"
                    >
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
