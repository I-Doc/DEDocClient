import React, { Component } from 'react';
import { Col, Grid, Row, Well } from 'react-bootstrap';
import { DateTime } from 'luxon';

import DocumentsService from './DocumentsService';

const DATE_FORMAT = 'dd/MM/yyyy HH:mm';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const documents = await DocumentsService.find();

    this.setState({ documents });
  }

  render() {
    const { documents } = this.state;

    return (
      <Well className="text-center">
        {documents ? (
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
                  <Col xs={2}>
                    {document.id}. {document.name}
                  </Col>
                  <Col xs={2}>
                    {DateTime.fromISO(document.cdate).toFormat(DATE_FORMAT)}
                  </Col>
                  <Col xs={2}>
                    {DateTime.fromISO(document.mdate).toFormat(DATE_FORMAT)}
                  </Col>
                  <Col xs={2}>{document.template}</Col>
                  <Col xs={2}>{document.status}</Col>
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

export default Documents;
