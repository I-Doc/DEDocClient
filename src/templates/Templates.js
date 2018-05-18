import React, { Component } from 'react';
import { Col, Grid, Row, Well } from 'react-bootstrap';
import { DateTime } from 'luxon';

import TemplatesService from './TemplatesService';

const DATE_FORMAT = 'dd/MM/yyyy HH:mm';

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const templates = await TemplatesService.find();

    this.setState({ templates });
  }

  render() {
    const { templates } = this.state;

    return (
      <Well className="text-center doc-card">
        {templates ? (
          templates.length > 0 ? (
            <Grid fluid>
              <Row>
                <Col xs={3}>
                  <h4 className="doc-table-title">Назва</h4>
                </Col>
                <Col xs={3}>
                  <h4 className="doc-table-title">Дата створення</h4>
                </Col>
                <Col xs={3}>
                  <h4 className="doc-table-title">Дата редагування</h4>
                </Col>
              </Row>

              {templates.map(template => (
                <Row key={template.id} className="doc-item">
                  <Col xs={3}>
                    {template.id}. {template.name}
                  </Col>
                  <Col xs={3}>
                    {DateTime.fromISO(template.cdate).toFormat(DATE_FORMAT)}
                  </Col>
                  <Col xs={3}>
                    {DateTime.fromISO(template.mdate).toFormat(DATE_FORMAT)}
                  </Col>
                  <Col xs={3}>
                    <a
                      href={template.data}
                      download={template.name}
                      className="download-button"
                    >
                      Завантажити
                    </a>
                  </Col>
                </Row>
              ))}
            </Grid>
          ) : (
            <div>Шаблонів ще не було створено</div>
          )
        ) : (
          <div>Завантажується...</div>
        )}
      </Well>
    );
  }
}

export default Templates;
