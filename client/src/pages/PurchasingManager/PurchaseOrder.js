import React from 'react';
import { useForm, Controller } from 'react-hook-form';

//Shared Components
import Select from '../../shared/Select/Select';

//Material UI 
import { Button, Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@mui/material';

//Material UI Icons
import DeleteIcon from '@mui/icons-material/Delete';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

import style from './PurchaseOrder.module.scss';

export default function PurchaseOrder(props) {

    const { supplierOptions, setSelectedProductOptions, productOptions, data, setData, handleClosePopUp, completeFormStep, openPopup, setOpenPopup, selectedProductOptions } = props;

    const { formState: { errors }, control, getValues, setValue, isValid, trigger } = useForm({ mode: "all" });

    const addActionRef = React.useRef();


    const handleAddNewItem = () => {
        if (!!getValues('supplier')) {
            addActionRef.current.click();
        } else {
            trigger('supplier', { shouldFocus: true });
        }
    }

    const getTotal = () => {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total = total + data[i].value;
        }
        setValue("total", total);
        setValue("receiveddiscounts", 0);
        setValue("damagedexpireditems", 0);
        return total;
    }

    return (
        <div className={style.container}>

            <div className={style.btnRow}>

                <Controller
                    defaultValue=''
                    name={'supplier'}
                    control={control}
                    rules={{
                        required: { value: true, message: "Supplier is required" },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            fullWidth
                            helperText={errors.supplier && errors.supplier.message}
                            error={errors.supplier ? true : false}
                            options={supplierOptions || []}
                            onChange={e => {
                                onChange(e);
                                setSelectedProductOptions(productOptions.filter(x => x.supplier === getValues('supplier')));
                            }}
                            size="small"
                            label="Supplier *"
                            value={value}
                            disabled={data.length > 0 ? true : false}
                        />
                    )}
                />

                <div> </div>

                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleAddNewItem()}
                >
                    Add new item
                </Button>

            </div>

            <MaterialTable
                components={{
                    Container: props => <Paper {...props} elevation={1} />,
                    Action: props => {
                        //If isn't the add action
                        if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                            return <MTableAction {...props} />
                        } else {
                            return <div ref={addActionRef} onClick={props.action.onClick} />;
                        }
                    },
                    Toolbar: (props) => (
                        <div
                            style={{
                                height: "0px",
                            }}
                        >
                            <MTableToolbar {...props} />
                        </div>
                    ),
                    Pagination: () => (
                        <td style={{
                            display: "flex",
                            flexDirection: "column"
                        }} >
                            <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                <Grid item align="Left">
                                    <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                </Grid>
                                <Grid item align="Right" style={{ margin: "0px 102.56px 0px auto" }}>
                                    <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
                                </Grid>
                            </Grid>
                        </td>
                    )
                }}
                columns={[
                    {
                        title: "Description",
                        field: "description",
                        editComponent: props => (
                            <Autocomplete
                                options={selectedProductOptions || []}
                                // options={getProductItemList}
                                getOptionLabel={(option) => option.title}
                                onChange={e => {
                                    props.onChange(e.target.innerText)
                                }}
                                inputValue={props.value}
                                renderInput={(params) =>
                                    <MuiTextField
                                        {...params}
                                        helperText={props.helperText}
                                        error={props.error}
                                        variant="standard"
                                    />
                                }
                            />
                        ),
                        validate: (rowData) =>
                            rowData.description === undefined
                                ? { isValid: false, helperText: 'Required *' }
                                : rowData.description === ''
                                    ? { isValid: false, helperText: 'Required *' }
                                    : true

                    },
                    {
                        title: "Unit",
                        field: "unit",
                        lookup: { Cases: 'Case(s)', Pieces: 'Piece(s)', FreeCases: 'Free Case(s)', FreePieces: 'Free Piece(s)' },
                        width: 'min-content',
                        validate: (rowData) =>
                            rowData.unit === undefined
                                ? { isValid: false, helperText: 'Required *' }
                                : rowData.unit === ''
                                    ? { isValid: false, helperText: 'Required *' }
                                    : true

                    },
                    {
                        title: "Quantity",
                        field: "quantity",
                        type: 'numeric',
                        cellStyle: {
                            cellWidth: 'min-content'
                        },
                        editComponent: props =>
                            <MuiTextField
                                onChange={e => {
                                    let data = { ...props.rowData };
                                    data.quantity = e.target.value;
                                    let quantity = isNaN(data.quantity) ? 0 : data.quantity;
                                    let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                    data.value = quantity * listprice;
                                    props.onRowDataChange(data);
                                }}
                                type="number"
                                helperText={props.helperText}
                                error={props.error}
                                variant="standard"
                                value={props.value}
                            />
                        ,
                        validate: (rowData) =>
                            rowData.quantity === undefined
                                ? { isValid: false, helperText: 'Required *' }
                                : rowData.quantity === ''
                                    ? { isValid: false, helperText: 'Required *' }
                                    : true
                    },
                    {
                        title: "List Price (Rs.)",
                        field: "listprice",
                        type: 'numeric',
                        cellStyle: {
                            cellWidth: 'min-content'
                        },
                        editComponent: props =>
                            <MuiTextField
                                onChange={e => {
                                    let data = { ...props.rowData };
                                    data.listprice = e.target.value;
                                    let quantity = isNaN(data.quantity) ? 0 : data.quantity;
                                    let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                    data.value = quantity * listprice;
                                    props.onRowDataChange(data);
                                }}
                                type="number"
                                helperText={props.helperText}
                                error={props.error}
                                variant="standard"
                                value={props.value}
                            />
                        ,
                        validate: (rowData) =>
                            rowData.listprice === undefined
                                ? { isValid: false, helperText: 'Required *' }
                                : rowData.listprice === ''
                                    ? { isValid: false, helperText: 'Required *' }
                                    : true


                    },
                    {
                        title: "Value (Rs.)",
                        field: "value",
                        type: 'numeric',
                        cellStyle: {
                            width: 'min-content'
                        },
                        editable: 'never',
                    }
                ]}
                data={data}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                            }, 1)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

                                resolve()
                            }, 1)
                        }),
                }}
                icons={{
                    Delete: () => (
                        <div>
                            <DeleteIcon className={style.deleteItemBtn} />
                        </div>
                    )
                }}
                options={{
                    addRowPosition: "first",
                    toolbar: true,
                    filtering: true,
                    search: false,
                    maxBodyHeight: "calc(100vh - 300px)",
                    minBodyHeight: "calc(100vh - 300px)",
                    actionsColumnIndex: -1,
                    headerStyle: {
                        position: "sticky",
                        top: "0",
                        backgroundColor: '#20369f',
                        color: '#FFF',
                        fontSize: "0.8em"
                    },
                    rowStyle: rowData => ({
                        fontSize: "0.8em",
                        backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                    })
                }}
            />

        </div>
    )
}
