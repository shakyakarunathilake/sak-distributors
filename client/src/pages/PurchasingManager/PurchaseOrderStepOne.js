import React, { useMemo, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Controller } from 'react-hook-form';

//Material UI 
import Divider from '@mui/material/Divider';
import Select from '../../shared/Select/Select';
import {
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Button,
    Grid,
    Typography,
    TextField as MuiTextField
} from '@material-ui/core';
import { Autocomplete } from '@mui/material';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

//Dialog Content
import Quotations from './Quotations';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS styles
import style from './PurchaseOrderStepOne.module.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    row1: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "5px 0 2.5px 0"
        },
    },
    row2: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "2.5px 0 5px 0"
        },
    }
});

export default function PurchaseOrderStepOne(props) {

    const classes = useStyles();

    const {
        action,
        data,
        setData,
        handleClosePopUp,
        completeFormStep,
        supplierOptions,
        productOptions,
        getValues,
        setValue,
        trigger,
        watch,
        control,
        errors,
        podate,
    } = props;

    const addActionRef = useRef();

    const getProductItemList = useMemo(() => {
        const selectedDescriptions = data.map(x => x.description);
        // console.log("SELECTED DESCRIPTIONS: ", selectedDescriptions);
        const supplierProducts = productOptions.filter(x => x.supplier === getValues('supplier'));
        // console.log("SUPPLIER PRODUCTS: ", supplierProducts);
        const productItemList = supplierProducts.filter(x => selectedDescriptions.indexOf(x.name) === -1);
        // console.log("PRODUCT ITEM LIST: ", productItemList);

        return productItemList;
    }, [data, getValues('supplier'), getValues, productOptions]);

    const calculateTotal = () => {
        let total = 0;
        let grosstotal = getValues('grosstotal');
        let receiveddiscounts = getValues('receiveddiscounts');
        let damagedmissingitems = getValues('damagedmissingitems');

        total = parseInt(grosstotal) - (parseInt(receiveddiscounts) + parseInt(damagedmissingitems));

        setValue('total', total.toFixed(2));
    }

    const handleAddNewItem = () => {
        if (!!getValues('supplier')) {
            addActionRef.current.click();
        } else {
            trigger('supplier', { shouldFocus: true });
        }
    }

    const onSubmit = () => {

        const supplier = supplierOptions.filter(x => x.title === getValues("supplier"))

        if (action === 'Create') {
            setValue("ponumber", supplier[0].abbreviation + podate);
            setValue("givenid", supplier[0].givenid);
            setValue("damagedmissingitems", supplier[0].damagedmissingitems);
            setValue("status", 'Waiting For Approval');
        }

        if (action === 'Approve') {
            setValue("approvedby",);
            setValue("status", 'Pending');
        }

        calculateTotal();
        completeFormStep();
    }

    return (
        <div className={style.one}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Purchase Order"}
                        {action === "Edit" && "Edit Purchase Order"}
                        {action === "Approve" && "Edit & Approve Purchase Order"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

                <div className={style.purchaseOrder}>

                    <div className={style.btnRow}>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    fullWidth
                                    options={supplierOptions || []}
                                    error={errors.supplier ? true : false}
                                    helperText={errors.supplier && errors.supplier.message}
                                    size="small"
                                    label="Supplier *"
                                    disabled={data.length > 0 ? true : false}
                                />
                            )}
                            control={control}
                            name={'supplier'}
                            defaultValue={''}
                            rules={{ required: { value: true, message: "Required *" } }}
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

                    <AutoSizer>
                        {({ height, width }) => {

                            const bodyHeight = height - 170;
                            const pageSize = Math.floor((bodyHeight) / 48);
                            // const pageSize = Math.floor((height - 310) / 48);
                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

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
                                            Pagination: props => (
                                                <td style={{
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }} >
                                                    <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                        <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                            <Typography style={{ fontSize: "1.05em", fontWeight: 600 }}>
                                                                Gross Total (Rs.)
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item align="Right" style={{ margin: "0px 102.56px  0px 0px", width: '200px' }}>
                                                            <Typography style={{ fontSize: "1.05em", fontWeight: 600 }}>
                                                                {NumberWithCommas(watch('grosstotal'))}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <TablePagination {...props} />
                                                </td>
                                            ),
                                            Header: props => (
                                                <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                                    <TableRow className={classes.row1}>
                                                        <TableCell width="38%" padding="none" rowSpan={2}>
                                                            <div style={{ padding: '0 10px' }}>
                                                                Description
                                                            </div>
                                                        </TableCell>
                                                        <TableCell width="10%" padding="none" rowSpan={2} align="center">
                                                            <div style={{ padding: '0 10px' }}>
                                                                Pieces per case
                                                            </div>
                                                        </TableCell>
                                                        <TableCell width="10%" padding="none" rowSpan={2} align="center">
                                                            <div style={{ padding: '0 10px' }}>
                                                                List Price (Rs.)
                                                            </div>
                                                        </TableCell>
                                                        <TableCell padding="none" colSpan={2} align="center">
                                                            Sales Qty.
                                                        </TableCell>
                                                        <TableCell padding="none" colSpan={2} align="center">
                                                            Free Qty.
                                                        </TableCell>
                                                        <TableCell width="14%" padding="none" rowSpan={2} align="center">
                                                            <div style={{ padding: '0 10px' }}>
                                                                Value (Rs.)
                                                            </div>
                                                        </TableCell>
                                                        <TableCell padding="none" rowSpan={2} align="center">
                                                            Action
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className={classes.row2}>
                                                        <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                        <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
                                                        <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                        <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            ),
                                        }}
                                        columns={[
                                            {
                                                title: "Description",
                                                field: "description",
                                                cellStyle: {
                                                    padding: "10px 5px 10px 7px",
                                                    width: '38%',
                                                    textAlign: 'left'
                                                },
                                                editComponent: props => (
                                                    <Autocomplete
                                                        options={getProductItemList}
                                                        getOptionLabel={(option) => option.name}
                                                        onChange={e =>
                                                            props.onChange(e.target.innerText)
                                                        }
                                                        inputValue={props.value}
                                                        renderInput={(params) =>
                                                            <MuiTextField
                                                                {...params}
                                                                error={props.error}
                                                                helperText={props.helperText}
                                                                variant="standard"
                                                                placeholder='Khomba Original Herbal Care Soap'
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
                                                title: "Pieces Per Cases",
                                                field: "piecespercase",
                                                type: 'numeric',
                                                initialEditValue: 24,
                                                cellStyle: {
                                                    padding: "10px 5px 10px 7px",
                                                    width: '10%',
                                                    textAlign: 'right'
                                                },
                                                editComponent: props =>
                                                    <MuiTextField
                                                        onChange={e => {
                                                            let data = { ...props.rowData };
                                                            data.piecespercase = e.target.value;
                                                            let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                                            let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                                            let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                            let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                            data.value = ((salesqtycases * piecespercase) + +salesqtypieces) * listprice;
                                                            props.onRowDataChange(data);
                                                        }}
                                                        type="number"
                                                        helperText={props.helperText}
                                                        error={props.error}
                                                        variant="standard"
                                                        value={props.value}
                                                        placeholder='24'
                                                    />
                                                ,
                                                validate: (rowData) =>
                                                    rowData.piecespercase === undefined
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.piecespercase === ''
                                                            ? { isValid: false, helperText: 'Required *' }
                                                            : true
                                            },
                                            {
                                                field: "listprice",
                                                title: '55.00',
                                                type: 'numeric',
                                                initialEditValue: 30,
                                                cellStyle: {
                                                    padding: "10px 5px 10px 7px",
                                                    width: '10%',
                                                    textAlign: 'right'
                                                },
                                                render: rowData => rowData.listprice,
                                                validate: (rowData) =>
                                                    rowData.listprice === undefined
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.listprice === ''
                                                            ? { isValid: false, helperText: 'Required *' }
                                                            : true


                                            },
                                            {
                                                title: "Sales Cs",
                                                field: "salesqtycases",
                                                type: 'numeric',
                                                cellStyle: {
                                                    padding: "10px 5px 10px 7px",
                                                    width: '7%',
                                                    textAlign: 'right'
                                                },
                                                editComponent: props =>
                                                    <MuiTextField
                                                        onChange={e => {
                                                            let data = { ...props.rowData };
                                                            data.salesqtycases = e.target.value;
                                                            let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                                            let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                                            let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                            let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                            data.value = ((salesqtycases * piecespercase) + +salesqtypieces) * listprice;
                                                            props.onRowDataChange(data);
                                                        }}
                                                        type="number"
                                                        helperText={props.helperText}
                                                        error={props.error}
                                                        variant="standard"
                                                        value={props.value}
                                                        placeholder='9'
                                                    />
                                                ,
                                                validate: (rowData) =>
                                                    rowData.salesqtycases === undefined
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.salesqtycases === ''
                                                            ? { isValid: false, helperText: 'Required *' }
                                                            : true

                                            },
                                            {
                                                title: "Sales Pcs",
                                                field: "salesqtypieces",
                                                type: 'numeric',
                                                initialEditValue: 0,
                                                cellStyle: {
                                                    width: '7%',
                                                    padding: "10px 5px 10px 7px",
                                                    textAlign: 'right'
                                                },
                                                editComponent: props =>
                                                    <MuiTextField
                                                        onChange={e => {
                                                            let data = { ...props.rowData };
                                                            data.salesqtypieces = e.target.value;
                                                            let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                                            let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                                            let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                            let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                            data.value = ((salesqtycases * piecespercase) + +salesqtypieces) * listprice;
                                                            props.onRowDataChange(data);
                                                        }}
                                                        type="number"
                                                        helperText={props.helperText}
                                                        error={props.error}
                                                        variant="standard"
                                                        value={props.value}
                                                        placeholder='9'
                                                    />
                                                ,
                                                validate: (rowData) =>
                                                    rowData.salesqtypieces === undefined
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.salesqtypieces === ''
                                                            ? { isValid: false, helperText: 'Required *' }
                                                            : rowData.salesqtypieces > 23
                                                                ? { isValid: false, helperText: 'Invalid *' }
                                                                : true

                                            },
                                            {
                                                title: "9",
                                                field: "freeqtycases",
                                                type: 'numeric',
                                                initialEditValue: 0,
                                                cellStyle: {
                                                    width: '7%',
                                                    padding: "10px 5px 10px 7px",
                                                    textAlign: 'right'
                                                },
                                                validate: (rowData) =>
                                                    rowData.freeqtycases === undefined
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.freeqtycases === ''
                                                            ? { isValid: false, helperText: 'Required *' }
                                                            : true

                                            },
                                            {
                                                title: "9",
                                                field: "freeqtypieces",
                                                type: 'numeric',
                                                initialEditValue: 0,
                                                cellStyle: {
                                                    width: '7%',
                                                    padding: "10px 5px 10px 7px",
                                                    textAlign: 'right'
                                                },
                                                validate: (rowData) =>
                                                    rowData.freeqtypieces === undefined
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.freeqtypieces === ''
                                                            ? { isValid: false, helperText: 'Required *' }
                                                            : rowData.freeqtypieces > 23
                                                                ? { isValid: false, helperText: 'Invalid *' }
                                                                : true

                                            },
                                            {
                                                title: "9999.99",
                                                field: "value",
                                                type: 'numeric',
                                                render: rowData => rowData.value ? NumberWithCommas(rowData.value.toFixed(2)) : '',
                                                cellStyle: {
                                                    width: '14%',
                                                    textAlign: 'right'
                                                },
                                                editable: 'never',
                                            }
                                        ]}
                                        data={data}
                                        editable={{
                                            onRowAdd: (newData) =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        setData(prevData => [...prevData, newData]);

                                                        resolve();
                                                    }, 100);
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
                                            paging: true,
                                            pageSize: pageSize,
                                            pageSizeOptions: [],
                                            minBodyHeight: bodyHeight,
                                            maxBodyHeight: bodyHeight,
                                            addRowPosition: "first",
                                            toolbar: true,
                                            filtering: true,
                                            search: false,
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
                            );
                        }}
                    </AutoSizer>

                </div>

                <Divider
                    className={style.divider}
                    orientation="vertical"
                    variant="middle"
                />

                <Quotations />

            </div >

            <div className={style.footer}>

                <Button
                    disabled={(data.length === 0)}
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Next
                </Button>

            </div>

        </div >
    )
}
