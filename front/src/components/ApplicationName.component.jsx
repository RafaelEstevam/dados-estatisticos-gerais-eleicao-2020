import React from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import * as V from '../styles/variables';

function Application({events, title}){

    return(

        <Row>
            <Col md="12">
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <span>Bem-vindo ao </span>
                        <h3 className="font-weight-bold"> Naruto Help Desk</h3>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Application;