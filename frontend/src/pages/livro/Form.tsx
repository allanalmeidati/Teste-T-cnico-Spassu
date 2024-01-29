import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Navbar, Row, Alert} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Container from "react-bootstrap/Container";
import api from "../../api";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function FormLivro() {

    const { id } = useParams();

    const { handleSubmit, control, formState: { errors } } =    useForm({
        defaultValues: id ? async () => await api.get(`/livro/${id}`).then(r => {
            return {...r.data.livro,
                Autor: r?.data?.livro?.autores?.map(a => { return {value: a.CodAu, label: a.Nome}}),
                Assunto: r?.data?.livro?.assuntos?.map(a => { return {value: a.CodAs, label: a.Descricao}}),

            }
        }) : { }
    })

    const checkErro = () => console.log('erros', errors)

    const navigate = useNavigate()
    const [autores, setAutores] = useState([])
    const [assunto, setAssunto] = useState([])
    const [codigoHttpAcao, setCodigoHttpAcao] = useState(null)
    const onSubmit = async (data:any) => {

        let payload = {...data}

        if ('assuntos' in payload) {
            delete payload.assuntos;
        }
        if ('autores' in payload) {
            delete payload.autores;
        }

        id ?  await api.put(`livro/${id}`, { ...payload }).then((r) => {
            setCodigoHttpAcao(r.status)
        }).catch(e => {
                setCodigoHttpAcao(e.response.status)
            }) :
        await api.post('livro', { ...payload }).then((r) => {
            setCodigoHttpAcao(r.status)

        }).catch(e => {
            setCodigoHttpAcao(e.response.status)
        })
    };

    const fetchAutores = async () => await api.get('autor').then(r => setAutores(r.data))
    const fetchAssunto = async () => await api.get('assunto').then(r => setAssunto(r.data))

    useEffect(() => {
        fetchAutores()
        fetchAssunto()

    }, [id])

    const MultiSelect = ({ label, options, value, onChange }) => {
        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Select
                    isMulti
                    options={options}
                    value={value}
                    onChange={onChange}
                    className="basic-multi-select "
                    classNamePrefix="select"

                />
            </Form.Group>
        );
    };

    return (
        <>
            <Navbar className="bg-body-tertiary bg-se">
                <Container>
                    <h2>{ id ? 'Edição' : 'Cadastro'} de Livro</h2>
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
                            <Button onClick={() => navigate("/livro")} variant="primary">
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
                                required: 'O campo [Titulo] é obrigatório',
                            }}
                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="Titulo">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control type="text" placeholder="Titulo" onChange={onChange} value={value}/>
                                </Form.Group>
                            )}
                            name="Titulo"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'O campo [Editora] é obrigatório',
                            }}
                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="Editora">
                                    <Form.Label>Editora</Form.Label>
                                    <Form.Control type="text" placeholder="Editora" onChange={onChange} value={value}/>
                                </Form.Group>
                            )}
                            name="Editora"
                        />
                    </Row>

                    <Row className="mb-3">
                        <Controller
                            control={control}
                            rules={{
                                required: 'O campo [Edicao] é obrigatório',
                            }}
                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="Edicao">
                                    <Form.Label>Edicao</Form.Label>
                                    <Form.Control type="number" placeholder="Edicao" onChange={onChange} value={value}/>
                                </Form.Group>
                            )}
                            name="Edicao"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'O campo [Ano de Publicacao] é obrigatório',
                            }}
                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="AnoPublicacao">
                                    <Form.Label>Ano Publicacao</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="YYYY"
                                        onChange={onChange}
                                        max={2024}
                                        min={1980}
                                        value={value}
                                    />
                                </Form.Group>
                            )}
                            name="AnoPublicacao"
                        />
                    </Row>
                    <Row className="mb-3">
                        <Controller
                            control={control}
                            rules={{
                                required: 'O campo [Valor] é obrigatório',
                                validate: function(value) {
                                    const isFloat = /^\d+(\.\d+)?$/.test(value);
                                    if (!isFloat) {
                                        return 'O campo [Valor] deve ser numérico';
                                    }
                                    return undefined;
                                }
                            }}


                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="formGridEdicao">
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control type="text" placeholder="Valor" onChange={onChange} value={value}/>
                                </Form.Group>
                            )}
                            name="Valor"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'O campo [Assunto(s)] é obrigatório',
                            }}
                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="Assunto">
                                    <Form.Group as={Col} controlId="Assunto">
                                        <MultiSelect
                                            label="Assunto(s)"
                                            options={assunto?.map(a => {
                                                return {value: a.CodAs, label: a.Descricao}
                                            })}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    </Form.Group>

                                </Form.Group>
                            )}
                            name="Assunto"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'O [Autor(es)]  é obrigatório',
                            }}
                            render={({field: {onChange, value}}) => (
                                <Form.Group as={Col} controlId="Assunto">
                                    <MultiSelect
                                        label="Autor(es)"
                                        options={autores?.map(a => {
                                            return {value: a.CodAu, label: a.Nome}
                                        })}
                                        value={value}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                            )}
                            name="Autor"
                        />
                    </Row>
                    <Button type="submit" onClick={checkErro}
                            disabled={Object.entries(errors)?.length > 0}>{id ? 'Editar' : 'Cadastrar'}</Button>
                </form>
            )}


        </>
    );
}

export default FormLivro;
