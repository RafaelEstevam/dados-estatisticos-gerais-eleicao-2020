  
import React, { useEffect, useState, useContext } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
import DataTable from 'react-data-table-component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styled from 'styled-components';

import Space from '../../components/Space.component'
import PieChartComponet from '../../components/PieChartComponent.component'
import ModalComponent from '../../components/Modal.component'

import api from '../../services/api.service';
import {stateList} from '../../services/state.service';


const NewButton = styled('button')`
    background-color: #7f49d4;
    border-color: #7f49d4;
    :hover, :active, :focus{
        background-color: #472879 !important;
        border-color: #472879 !important;
    }
`

function LoginView(){

    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [position, setPosition] = useState('');
    const [educationData, setEducationData] = useState('');
    const [genreData, setGenreData] = useState('');
    const [breedData, setBreedData] = useState('');
    const [dataTable, setDataTable] = useState('');
    const [show, setShow] = useState(false);
    const [dataModal, setDataModal] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (data) => {
        setDataModal(data);
        setShow(true)
    };

    const handleSubmit = async (e) =>{

        e.preventDefault();

        setShowLoading(true);

        const form = {
            "estado": state,
            "cidade": city.toUpperCase(),
            "cargo": position
        }

        try{
            await api.post('/candidatos', form).then((response) => {
                setEducationData(response.data.dados_adicionais.instrucao);
                setGenreData(response.data.dados_adicionais.genero);
                setBreedData(response.data.dados_adicionais.raca);
                setDataTable(response.data.candidatos);
                setShowLoading(false);
            });
        }catch(err){
            alert("Nenhum resultado foi encontrado. Verifique a cidade informada.");
        }
        

    }
    
    const columns = [ //NR_CANDIDATO
        {
            name: 'Nº Candidato',
            selector: 'NR_CANDIDATO',
            sortable: true,
            width: '150px'
        },
        {
            name: 'Partido',
            selector: 'SG_PARTIDO',
            sortable: true,
            right: true,
            width: '250px'
        },
        {
            name: 'Nome do candidato',
            selector: 'NM_CANDIDATO',
            sortable: true,
        },
        {
            cell: (row) => <div className="py-3"><NewButton className="btn btn-primary btn-sm" onClick={() => handleShow(row)} key={row.SQ_CANDIDATO}>Detalhes</NewButton></div>,
            ignoreRowClick: false,
            allowOverflow: true,
            button: true,
        },
    ];

    return(
        <div>
            <Container fluid>
                <Row>
                    <Col md="12" className="bg-dark">
                        <h2 className="font-weight-light text-white text-center py-2">Dados estatísticos e gerais da <span className="font-weight-bold">eleição 2020</span></h2>
                    </Col>
                </Row>

                <Space height={'30px'}/>

                <Row>
                    <Col md="2">
                        <h4 className="text-center">Busca detalhada</h4>
                        
                        <Space height={'15px'}/>

                        <form onSubmit={handleSubmit}>
                            
                            <select required="required" className="form-control" value={state} onChange={e => setState(e.target.value)}>
                                <option>Selecione um estado</option>
                                {   stateList && stateList.length > 0 &&
                                    stateList.map((item) => {
                                        return(
                                            <option value={item.uf.toUpperCase()}>{item.estado.toUpperCase()}</option>
                                        )
                                    })
                                }
                            </select>
                            
                            <Space height={'15px'}/>

                            <input required="required" placeholder="Digite a cidade" className="form-control" readOnly={!state} value={city} onChange={e => setCity(e.target.value)}/>
                            
                            <Space height={'15px'}/>

                            <select required="required" className="form-control" readOnly={!city} disabled={!city} value={position} onChange={e => setPosition(e.target.value)}>
                                <option>Selecione um cargo</option>
                                <option value="PREFEITO">PREFEITO</option>
                                <option value="VEREADOR">VEREADOR</option>
                            </select>

                            <Space height={'15px'}/>

                            <NewButton className="btn btn-block btn-primary">Buscar</NewButton>
                        </form>
                        
                        <Space height={'15px'}/>

                    </Col>
                    <Col md="10">
                        <Tabs>
                            <TabList>
                                <Tab>Análise</Tab>
                                <Tab>Lista de candidatos</Tab>
                            </TabList>
                                
                            <TabPanel>

                                <Space height={'15px'}/>

                                <Row>
                                    <Col md="12">
                                        <div class="jumbotron">
                                            <div class="container text-center">
                                                <h1 class="display-3">Análise dos candidatos</h1>
                                                <p>Levantamento dos candidatos de acordo com os atributos informados no TSE</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                        
                                <Space height={'15px'}/>

                                <Row>
                                    <Col md="4">
                                        <PieChartComponet loading={showLoading} data={educationData} title={"Escolaridade"} colors={"education"}/>
                                    </Col>
                                    <Col md="4">
                                        <PieChartComponet loading={showLoading} data={genreData} title={"Gênero"} colors={"genre"}/>
                                    </Col>
                                    <Col md="4">
                                        <PieChartComponet loading={showLoading} data={breedData} title={"Cor"} colors={"breed"}/>
                                    </Col>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <Row>
                                    <Col md="12">
                                        {
                                            showLoading &&
                                            <p className="text-center">Carregando...</p>
                                        }
                                        {dataTable && dataTable.length > 0 &&
                                            <DataTable
                                                title="Candidatos"
                                                columns={columns}
                                                data={dataTable}
                                                keyField={'SQ_CANDIDATO'}
                                                highlightOnHover
                                                pagination
                                            />
                                        }
                                    </Col>
                                </Row>
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
            <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} data={dataModal} />
        </div>
    )
}

export default LoginView;
