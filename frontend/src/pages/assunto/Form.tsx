import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Navbar, Row, Alert} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Container from "react-bootstrap/Container";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function FormAssunto() {

    const { id } = useParams();

    const { handleSubmit, control, formState: { errors } } =    useForm({
        defaultValues: id ? async () => await api.get(`/assunto/${id}`).then(r => {
            return {...r.data.assunto,


            }
        }) : { }
    })

    const checkErro = () => console.log('erros', errors)

    const navigate = useNavigate()

    const [codigoHttpAcao, setCodigoHttpAcao] = useState(null)
    const onSubmit = async (data:any) => {

        let payload = {...data}

        if ('assuntos' in payload) {
            delete payload.assuntos;
        }
        if ('autores' in payload) {
            delete payload.autores;
        }

        id ?  await api.put(`assunto/${id}`, { ...payload }).then((r) => {
            setCodigoHttpAcao(r.status)
        }).catch(e => {
                setCodigoHttpAcao(e.response.status)
            }) :
        await api.post('assunto', { ...payload }).then((r) => {
            setCodigoHttpAcao(r.status)

        }).catch(e => {
            setCodigoHttpAcao(e.response.status)
        })
    };




    return (
        <>
            <Navbar className="bg-body-tertiary bg-se">
                <Container>
                    <h2>{ id ? 'Edição' : 'Cadastro'} de Assunto</h2>
                </Container>
            </Navbar>
            { Object.entries(errors)?.length ? (
                <Alert variant="danger">
                    { Object.entries(errors)?.map(e => {
                        return <li>{e[1].message}</li>
                    })}
                </Alert>
            ) : ''}

            { codigoHttpAcao !== null? (
                <>
                    <Alert show={true} variant={ [200, 201].includes(codigoHttpAcao) ? "success" : 'danger'}>
                        <Alert.Heading>{ [200, 201].includes(codigoHttpAcao) ? 'Ação executada com sucesso!': 'Ocorreu um erro ao executar Ação'}</Alert.Heading>
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => navigate("/assunto")} variant="primary">
                                Ir para listagem
                            </Button>
                        </div>
                        <hr/>

                    </Alert>
                </>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{margin: 100}}>

                    <Row className="mb-3">
                        <Controller
                            control={control}
                            rules={{
                                required: 'O campo [Descrição] é obrigatório',
                            }}
                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="Descricao">
                                    <Form.Label>Descricao</Form.Label>
                                    <Form.Control type="text" placeholder="Descrição" onChange={onChange} value={value} maxLength={20}/>
                                </Form.Group>
                            )}
                            name="Descricao"
                        />

                    </Row>

                    <Button type="submit" onClick={checkErro}
                            disabled={Object.entries(errors)?.length > 0}>{id ? 'Editar' : 'Cadastrar'}</Button>
                </form>
            )}


        </>
    );
}

export default FormAssunto;
