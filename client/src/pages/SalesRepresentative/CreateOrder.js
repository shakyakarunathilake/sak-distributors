import React, { useState, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import { Paper } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@material-ui/core';
import { TableCell, TableHead, TableRow } from "@material-ui/core";

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

//Material UI Styling
import { makeStyles } from '@material-ui/core/styles';

//SCSS Styles
import style from './CreateOrder.module.scss';

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

export default function CreateOrder(props) {

    const { setOpenPopup, customerOptions, productOptions, nextOrderId } = props;
    const { handleSubmit, formState: { errors }, control, setValue, isValid, reset } = useForm({ mode: "all" });

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [customerType, setCustomerType] = useState('');
    // const [type, setType] = useState();
    // const [open, setOpen] = useState(false);
    const [formStep, setFormStep] = useState(0);

    // const today = new Date();
    // const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 3);

    useEffect(() => {
        setValue('orderno', `${JSON.parse(sessionStorage.getItem("Auth")).employeeid} - ${nextOrderId}`);
        setValue('salesrepresentative', `${JSON.parse(sessionStorage.getItem("Auth")).firstname} ${JSON.parse(sessionStorage.getItem("Auth")).lastname} (${JSON.parse(sessionStorage.getItem("Auth")).employeeid})`);
    }, [nextOrderId, setValue]);

    // const handleAlert = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };

    const addActionRef = React.useRef();

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
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

    const onSubmit = () => { }

    const resetForm = () => {
        reset({
            orderno: `${JSON.parse(sessionStorage.getItem("Auth")).employeeid} - ${nextOrderId}`,
            customertype: '',
            salesrepresentative: `${JSON.parse(sessionStorage.getItem("Auth")).firstname} ${JSON.parse(sessionStorage.getItem("Auth")).lastname} (${JSON.parse(sessionStorage.getItem("Auth")).employeeid})`,
            customer: '',
            storename: '',
            customerid: '',
            shippingaddress: '',
            contactnumber: '',
            route: ''
        });
    }

    const handleCustomerTypeChange = (event, option) => {
        setCustomerType(option.props.value);
        resetForm();
    }

    const handleCustomerChange = (event, option) => {
        if (option) {
            setValue("customerid", option.id);
            setValue("storename", option.storename);
            setValue("shippingaddress", option.shippingaddress);
            setValue("route", option.route);
            setValue("contactnumber", option.contactnumber);
        }
    }

    return (

        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.one : style.hidden}>

                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                Customer and Order Details
                            </div>
                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { setOpenPopup(false) }}
                                />
                            </div>
                        </div>

                        <div className={style.step}>
                            Step 1 of 4
                        </div>

                    </div>

                    <div className={style.body}>

                        <div className={style.row}>
                            <div className={style.label}>
                                Customer Type
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"customertype"}
                                    control={control}
                                    rules={{ required: { value: true, message: "Customer type is required" } }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            value={value || ''}
                                            onChange={(e, options) => {
                                                onChange(e)
                                                handleCustomerTypeChange(e, options)
                                            }}
                                            options={employeeservice.getCustomerTypeOptions()}
                                            error={errors.customertype ? true : false}
                                            helperText={errors.customertype && errors.customertype.message}
                                            size="small"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.label}>
                                Order No.
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"orderno"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            value={value || ''}
                                            onChange={onChange}
                                            placeholder="Ex: ON00006211126001"
                                            margin="dense"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.label}>
                                Order placed at
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"orderplacedat"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DatePicker
                                            value={value || ''}
                                            onChange={onChange}
                                            error={errors.orderplacedat ? true : false}
                                            helperText={errors.orderplacedat && errors.orderplacedat.message}
                                            margin="dense"
                                            type="datetime-local"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.column}>
                            <div className={style.label}>
                                Delivery Date
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"deliveryfrom"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DatePicker
                                            value={value || ''}
                                            onChange={onChange}
                                            error={errors.deliveryfrom ? true : false}
                                            helperText={errors.deliveryfrom && errors.deliveryfrom.message}
                                            margin="dense"
                                        />
                                    )}
                                />
                            </div>
                            <div>
                                <Controller
                                    name={"deliveryto"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DatePicker
                                            value={value || ''}
                                            onChange={onChange}
                                            error={errors.deliveryto ? true : false}
                                            helperText={errors.deliveryto && errors.deliveryto.message}
                                            margin="dense"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.label}>
                                Sales Representative
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"salesrepresentative"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            value={value || ''}
                                            onChange={onChange}
                                            placeholder="Ex: Buddhika Bandara (E00006)"
                                            margin="dense"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.label}>
                                Customer
                            </div>
                            <div className={style.textfield}>
                                {customerType === "Registered Customer" ?
                                    <Controller
                                        name={"customer"}
                                        control={control}
                                        rules={{ required: true, message: "Customer is required" }}
                                        render={() => (
                                            <Autocomplete
                                                className={classes.root}
                                                options={customerOptions || []}
                                                fullWidth
                                                getOptionLabel={(option) => option.title}
                                                onChange={handleCustomerChange}
                                                renderInput={(params) => (
                                                    <MuiTextField
                                                        {...params}
                                                        variant="outlined"
                                                        margin="dense"
                                                        placeholder="Ex: C000001 - Champika Super Center and Pharmacy"
                                                    />
                                                )}
                                            />
                                        )}
                                    /> :
                                    <Controller
                                        name={"customer"}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                value={value || ''}
                                                onChange={onChange}
                                                placeholder="Ex: Champika Super Center and Pharmacy"
                                                margin="dense"
                                            />
                                        )}
                                    />

                                }
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.label}>
                                Shipping  Address
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"shippingaddress"}
                                    control={control}
                                    rules={{ required: true, message: "Shipping address is required" }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            value={value || ''}
                                            onChange={onChange}
                                            placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                            margin="dense"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.label}>
                                Contact No.
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"contactnumber"}
                                    control={control}
                                    rules={{
                                        required: { value: true, message: "Contact number is required" },
                                        pattern: { value: /^[0-9]{10}$/, message: "Contact number is invalid" }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            value={value || ''}
                                            onChange={onChange}
                                            placeholder="Ex: 0352264589"
                                            margin="dense"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.label}>
                                Route
                            </div>
                            <div className={style.textfield}>
                                <Controller
                                    name={"route"}
                                    control={control}
                                    rules={{ required: { value: true, message: "Route is required" } }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            label="Route *"
                                            value={value || ''}
                                            onChange={onChange}
                                            options={employeeservice.getRouteOptions()}
                                            error={errors.route ? true : false}
                                            helperText={errors.route && errors.route.message}
                                            size="small"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                    </div>

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.two : style.hidden}>

                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                Confirm Customer and Order Details
                            </div>
                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { setOpenPopup(false) }}
                                />
                            </div>
                        </div>

                        <div className={style.step}>
                            Step 2 of 4
                        </div>

                    </div>

                    <div className={style.body}>

                        {
                            customerType === "Registered Customer" &&
                            <div className={style.row}>
                                <div className={style.boldText}>
                                    Customer ID
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"customerid"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </div>
                            </div>

                        }

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Customer Name
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"storename"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Contact No.
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"contactnumber"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Shipping Address
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"shippingaddress"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Route
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"route"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Order Placed at
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"orderplacedat"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Delivery Date
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"deliverydate"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Sales Representative
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"salesrepresentative"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                    </div>

                </section>
            }

            {
                formStep >= 2 &&
                <section className={formStep === 2 ? style.three : style.hidden}>

                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                Add Items to Order
                            </div>
                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { setOpenPopup(false) }}
                                />
                            </div>
                        </div>

                        <div className={style.step}>
                            Step 3 of 4
                        </div>

                    </div>

                    <div className={style.body}>

                        <div className={style.btndiv}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => addActionRef.current.click()}
                            >
                                Add new item
                            </Button>
                        </div>

                        <MaterialTable
                            components={{
                                Container: props => <Paper {...props} elevation={1} />,
                                Action: props => {
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
                                ),
                                Header: props => (
                                    <TableHead {...props} >
                                        <TableRow className={classes.row1}>
                                            <TableCell width="30%" padding="none" rowSpan={2}>
                                                <div style={{ padding: '0 10px' }}>
                                                    Description
                                                </div>
                                            </TableCell>
                                            <TableCell padding="none" colSpan={2} align="center">
                                                Sales Qty.
                                            </TableCell>
                                            <TableCell padding="none" colSpan={2} align="center">
                                                Free Qty.
                                            </TableCell>
                                            <TableCell padding="none" colspan={2} align="center">
                                                Return Qty.
                                            </TableCell>
                                            <TableCell padding="none" width="11%" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Gross Amount
                                                </div>
                                            </TableCell>
                                            <TableCell padding="none" width="11%" rowSpan={2} align="center">Action</TableCell>
                                        </TableRow>
                                        <TableRow className={classes.row2}>
                                            <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">D</TableCell>
                                            <TableCell width="8%" padding="none" align="center">R</TableCell>
                                        </TableRow>
                                    </TableHead>
                                ),
                                Row: ({ data }) => (
                                    <TableRow>
                                        <TableCell padding="none" >{data.description}</TableCell>
                                        <TableCell padding="none" align="center">{data.salesqtycases}</TableCell>
                                        <TableCell padding="none" align="center">{data.salesqtypieces}</TableCell>
                                        <TableCell padding="none" align="center">{data.freeqtycases}</TableCell>
                                        <TableCell padding="none" align="center">{data.freeqtypieces}</TableCell>
                                        <TableCell padding="none" align="center">{data.return}</TableCell>
                                        <TableCell padding="none" align="center">{data.damaged}</TableCell>
                                        <TableCell padding="none" align="center">{data.price}</TableCell>
                                        <TableCell padding="none" align="center">{data.grossamount}</TableCell>
                                        <TableCell padding="none" align="center">{data.retailprice}</TableCell>
                                    </TableRow>
                                ),
                            }}
                            columns={[
                                {
                                    title: "Description",
                                    field: "description",
                                    cellStyle: {
                                        padding: 10,
                                        width: '30%'
                                    },
                                    editComponent: props => (
                                        <Autocomplete
                                            options={productOptions || []}
                                            // options={getProductItemList}
                                            getOptionLabel={(option) => option.name}
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
                                    title: "Sales Cs",
                                    field: "salesqtycases",
                                    type: 'numeric',
                                    cellStyle: {
                                        padding: 10,
                                        width: '8%',
                                    },
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
                                    cellStyle: {
                                        width: '8%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.salesqtypieces === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.salesqtypieces === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Free Cs",
                                    field: "freeqtycases",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.freeqtycases === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.freeqtycases === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Free Pcs",
                                    field: "freeqtypieces",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.freeqtypieces === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.freeqtypieces === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Damaged",
                                    field: "damaged",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.damaged === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.damaged === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Return",
                                    field: "return",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.return === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.return === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Gross Amount",
                                    field: "grossamount",
                                    editable: 'never',
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '11%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.grossamount === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.grossamount === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

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
                                search: false,
                                maxBodyHeight: "calc(100vh - 360px)",
                                minBodyHeight: "calc(100vh - 360px)",
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    position: "sticky",
                                    top: "0",
                                },
                                rowStyle: rowData => ({
                                    fontSize: "0.8em",
                                    backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                                })
                            }}
                        />
                    </div>

                </section>
            }

            {
                formStep >= 3 &&
                <section className={formStep === 3 ? style.four : style.hidden}>

                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                Confirm Items
                            </div>
                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { setOpenPopup(false) }}
                                />
                            </div>
                        </div>

                        <div className={style.step}>
                            Step 4 of 4
                        </div>

                    </div>

                    <div className={style.body}>
                        <MaterialTable
                            components={{
                                Container: props => <Paper {...props} elevation={1} />,
                                Pagination: () => (
                                    <td style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }} >
                                        <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                            <Grid item align="Left">
                                                <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                            </Grid>
                                            <Grid item align="Right" style={{ margin: "0px 0px 0px auto" }}>
                                                <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
                                            </Grid>
                                        </Grid>
                                    </td>
                                ),
                                Header: props => (
                                    <TableHead {...props} >
                                        <TableRow className={classes.row1}>
                                            <TableCell width="34%" padding="none" rowSpan={2}>
                                                <div style={{ padding: '0 10px' }}>
                                                    Description
                                                </div>
                                            </TableCell>
                                            <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Retail Price
                                                </div>
                                            </TableCell>
                                            <TableCell padding="none" colSpan={2} align="center">
                                                Sales Qty.
                                            </TableCell>
                                            <TableCell padding="none" colSpan={2} align="center">
                                                Free Qty.
                                            </TableCell>
                                            <TableCell padding="none" colspan={2} align="center">
                                                Return Qty.
                                            </TableCell>
                                            <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Price
                                                </div>
                                            </TableCell>
                                            <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Gross Amount
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.row2}>
                                            <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                            <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                            <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                            <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                            <TableCell width="6%" padding="none" align="center">D</TableCell>
                                            <TableCell width="6%" padding="none" align="center">R</TableCell>
                                        </TableRow>
                                    </TableHead>
                                ),
                                Row: ({ data }) => (
                                    <TableRow>
                                        <TableCell padding="none" >{data.description}</TableCell>
                                        <TableCell padding="none" align="center">{data.retailprice}</TableCell>
                                        <TableCell padding="none" align="center">{data.salesqtycases}</TableCell>
                                        <TableCell padding="none" align="center">{data.salesqtypieces}</TableCell>
                                        <TableCell padding="none" align="center">{data.freeqtycases}</TableCell>
                                        <TableCell padding="none" align="center">{data.freeqtypieces}</TableCell>
                                        <TableCell padding="none" align="center">{data.return}</TableCell>
                                        <TableCell padding="none" align="center">{data.damaged}</TableCell>
                                        <TableCell padding="none" align="center">{data.price}</TableCell>
                                        <TableCell padding="none" align="center">{data.grossamount}</TableCell>
                                    </TableRow>
                                ),
                            }}
                            columns={[
                                {
                                    title: "Description",
                                    field: "description",
                                    cellStyle: {
                                        padding: 10,
                                        width: '34%'
                                    },
                                    editComponent: props => (
                                        <Autocomplete
                                            options={productOptions || []}
                                            // options={getProductItemList}
                                            getOptionLabel={(option) => option.name}
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
                                    title: "Retail Price",
                                    field: "retailprice",
                                    editable: 'never',
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '10%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.retailprice === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.retailprice === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true
                                },
                                {
                                    title: "Sales Cs",
                                    field: "salesqtycases",
                                    type: 'numeric',
                                    cellStyle: {
                                        padding: 10,
                                        width: '6%',
                                    },
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
                                    cellStyle: {
                                        width: '6%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.salesqtypieces === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.salesqtypieces === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Free Cs",
                                    field: "freeqtycases",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '6%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.freeqtycases === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.freeqtycases === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Free Pcs",
                                    field: "freeqtypieces",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '6%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.freeqtypieces === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.freeqtypieces === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Damaged",
                                    field: "damaged",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '6%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.damaged === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.damaged === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Return",
                                    field: "return",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '6%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.return === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.return === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true

                                },
                                {
                                    title: "Price",
                                    field: "price",
                                    editable: 'never',
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '10%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.price === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.price === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true
                                },
                                {
                                    title: "Gross Amount",
                                    field: "grossamount",
                                    editable: 'never',
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '10%',
                                        padding: 10
                                    },
                                    validate: (rowData) =>
                                        rowData.grossamount === undefined
                                            ? { isValid: false, helperText: 'Required *' }
                                            : rowData.grossamount === ''
                                                ? { isValid: false, helperText: 'Required *' }
                                                : true
                                }
                            ]}
                            data={data}
                            icons={{
                                Delete: () => (
                                    <div>
                                        <DeleteIcon className={style.deleteItemBtn} />
                                    </div>
                                )
                            }}
                            options={{
                                addRowPosition: "first",
                                toolbar: false,
                                search: false,
                                maxBodyHeight: "calc(100vh - 305px)",
                                minBodyHeight: "calc(100vh - 305px)",
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    position: "sticky",
                                    top: "0",
                                },
                                rowStyle: rowData => ({
                                    fontSize: "0.8em",
                                    backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                                })
                            }}
                        />
                    </div>

                </section>
            }

            <div className={style.footer}>

                {
                    formStep === 0 &&
                    <div className={style.resetBtn}>
                        <Button
                            disabled={formStep === 1 && !isValid && data.length === 0}
                            variant="contained"
                            onClick={() => resetForm()}
                        >
                            Reset
                        </Button>
                    </div>
                }

                {
                    formStep > 0 &&
                    <div className={style.resetBtn}>
                        <Button
                            variant="contained"
                            onClick={backFormStep}
                            style={{
                                backgroundColor: '#ACA9BB',
                                color: 'white'
                            }}
                        >
                            Back
                        </Button>
                    </div>
                }

                <div className={style.nextBtn}>

                    {
                        ((formStep === 0) || (formStep === 2)) &&
                        <Button
                            // disabled={(formStep === 0 && !isValid) || (formStep === 2 && data.length === 0)}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                completeFormStep()
                                // handleDetails()
                            }}
                        >
                            Next
                        </Button>
                    }

                    {
                        formStep === 1 &&
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                completeFormStep()
                                // handleDetails()
                            }}
                        >
                            Confirm
                        </Button>
                    }

                    {
                        formStep === 3 &&
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Confirm and Submit
                        </Button>
                    }

                </div>

            </div>

        </form >

    )
}
