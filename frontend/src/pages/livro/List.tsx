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
const Livro = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [livroDelete, setLivroDelete] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([])

    const fetchData = async () => await api.get('livro').then(r => setData(r.data))
    useEffect(():void => {
        fetchData()
    }, [])

    const fetchDelete = async () => await api.delete(`livro/${livroDelete?.CodL}`).then(r => {
        fetchData()
        handleClose()
    })


    const deleteAction = (livro) => {
        setLivroDelete(livro)
        handleShow()
    }
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'CodL',
                header: 'CodL',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'Titulo',
                header: 'Titulo',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.firstName,
                    helperText: validationErrors?.firstName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            firstName: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'Editora',
                header: 'Editora',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.lastName,
                    helperText: validationErrors?.lastName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lastName: undefined,
                        }),
                },
            },
            {
                accessorKey: 'Edicao',
                header: 'Edicao',
                muiEditTextFieldProps: {
                    type: 'email',
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                },
            },
            {
                accessorKey: 'AnoPublicacao',
                header: 'AnoPublicacao',
                editVariant: 'select',
                // editSelectOptions: usStates,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.state,
                    helperText: validationErrors?.state,
                },
            },
            {
                accessorKey: 'Valor',
                header: 'Valor',
                editVariant: 'select',
                // editSelectOptions: usStates,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.state,
                    helperText: validationErrors?.state,
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
                        navigate(`/livro/editar/${row.original.CodL}`)
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
                onClick={() => navigate("/livro/cadastro")}
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
                <h2>Livros</h2>
            </Container>
        </Navbar>

        <DeleteDialog  handleClose={handleClose} handleShow={handleShow}  show={show} livroDelete={livroDelete} fetchDelete={fetchDelete}/>
        <MaterialReactTable table={table} />

    </>);
};

export default Livro


