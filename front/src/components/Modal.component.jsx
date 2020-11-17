import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

import styled from 'styled-components';
import * as V from '../styles/variables';

function ModalComponent({show ,handleClose, data}) {

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Dados do candidato</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="6">
                        <p><b>Candidato à </b> {data.DS_CARGO}</p>
                    </Col>
                    <Col md="6">
                        <p><b>Partido: </b> {data.SG_PARTIDO}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <p><b>Nome: </b> {data.NM_CANDIDATO}</p>
                    </Col>
                    <Col md="6">
                        <p><b>Email: </b> {data.NM_EMAIL}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <p><b>Estado Civil: </b> {data.DS_ESTADO_CIVIL}</p>
                    </Col>
                    <Col md="6">
                        <p><b>Escolaridade: </b> {data.DS_GRAU_INSTRUCAO}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <p><b>Ocupação: </b> {data.DS_OCUPACAO}</p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;