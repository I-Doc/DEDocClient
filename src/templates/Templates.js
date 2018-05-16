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
      <Well className="text-center">
        {templates ? (
          templates.length > 0 ? (
            <Grid fluid>
              <Row>
                <Col xs={4}>
                  <h4>Назва</h4>
                </Col>
                <Col xs={4}>
                  <h4>Дата створення</h4>
                </Col>
                <Col xs={4}>
                  <h4>Дата редагування</h4>
                </Col>
              </Row>

              {templates.map(template => (
                <Row key={template.id}>
                  <Col xs={4}>
                    {template.id}. {template.name}
                  </Col>
                  <Col xs={4}>
                    {DateTime.fromISO(template.cdate).toFormat(DATE_FORMAT)}
                  </Col>
                  <Col xs={4}>
                    {DateTime.fromISO(template.mdate).toFormat(DATE_FORMAT)}
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
