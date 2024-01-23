import React, {useEffect, useMemo, useState} from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../../api";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog.tsx";
import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
const Assunto = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [assuntoDelete, setAssuntoDelete] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([])

    const fetchData = async () => await api.get('assunto').then(r => setData(r.data))
    useEffect(():void => {
        fetchData()
    }, [])

    const fetchDelete = async () => await api.delete(`assunto/${assuntoDelete?.CodAs}`).then(r => {
        fetchData()
        handleClose()
    })


    const deleteAction = (assunto) => {
        setAssuntoDelete(assunto)
        handleShow()
    }
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'CodAs',
                header: 'CodAs',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'Descricao',
                header: 'Descricao',
                muiEditTextFieldProps: {
                    required: true,
                },
            },




        ],
        [validationErrors],
    );



    const table = useMaterialReactTable({
        columns,
        data: data,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: true
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },



        renderRowActions: ({ row, table }) => {
            return (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => {
                        navigate(`/assunto/editar/${row.original.CodAs}`)
                    }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => deleteAction(row.original)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )},
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="primary"
                size={'sm'}
                onClick={() => navigate("/assunto/cadastro")}
            >
               Cadastrar
            </Button>
        ),
        state: {

        },
    });

    return (<>
        <Navbar className="bg-body-tertiary bg-se ">
            <Container>
                <h2>Assuntos</h2>
            </Container>
        </Navbar>

        <DeleteDialog  handleClose={handleClose} handleShow={handleShow}  show={show} assuntoDelete={assuntoDelete} fetchDelete={fetchDelete}/>
        <MaterialReactTable table={table} />

    </>);
};

export default Assunto


