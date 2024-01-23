import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    // createRow,
    type MRT_ColumnDef,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Livro = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'firstName',
                header: 'First Name',
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
                accessorKey: 'lastName',
                header: 'Last Name',
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
                accessorKey: 'email',
                header: 'Email',
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
                accessorKey: 'state',
                header: 'State',
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
        data: [
            {
                id: 'wzxj9m',
                firstName: 'Mckenna',
                lastName: 'Friesen',
                email: 'Veda_Feeney@yahoo.com',
                state: 'New York',
            },
            {
                id: '21dwtz',
                firstName: 'Wyman',
                lastName: 'Jast',
                email: 'Melvin.Pacocha@yahoo.com',
                state: 'Montana',
            },
            {
                id: 'o8oe4k',
                firstName: 'Janick',
                lastName: 'Willms',
                email: 'Delfina12@gmail.com',
                state: 'Nebraska',
            },

        ],
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



        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New User
            </Button>
        ),
        state: {

        },
    });

    return <MaterialReactTable table={table} />;
};

export default Livro


