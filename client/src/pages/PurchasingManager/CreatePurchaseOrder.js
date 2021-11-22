import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';

//Development Stage
import itemImg from '../../images/itemImg.png'

//Shared Components
import Page from '../../shared/Page/Page';
import Select from '../../shared/Select/Select';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI 
import { Button, Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@mui/material';

//Material UI Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//Dialog Content
import ResetForm from './ResetForm';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreatePurchaseOrder() {

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;

    const podate = today.getFullYear().toString().substr(-2) + (today.getMonth() + 1) + today.getDate();

    const { handleSubmit, formState: { errors }, control, getValues, setValue, isValid, trigger, reset } = useForm({ mode: "all" });

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();
    const [formStep, setFormStep] = useState(0);
    const [data, setData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [selectedProductOptions, setSelectedProductOptions] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:8080/options/supplier-options-for-purchase-order")
            .then(res => {
                setSupplierOptions(res.data.supplierOptions);
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get("http://localhost:8080/options/product-options-for-purchase-order", {
                headers: {
                    Authorization: JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setProductOptions(res.data.productOptions);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClosePopUp = () => {
        setOpenPopup(false)
    }

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

    // const getProductItemList = useMemo(() => {
    //     const selectedDescriptions = data.map(x => x.description);
    //     console.log("SELECTED DESCRIPTIONS: ", selectedDescriptions);

    //     const supplierProducts = productOptions.filter(x => x.supplier === getValues('supplier'));
    //     console.log("SUPPLIER PRODUCTS: ", supplierProducts);

    //     const productItemList = supplierProducts.filter(x => selectedDescriptions.indexOf(x.name) === -1);
    //     console.log("PRODUCT ITEM LIST: ", productItemList);

    //     return productItemList;
    // }, [data, getValues('supplier')]);

    const handleDetails = () => {

        const supplier = supplierOptions.filter(x => x.title === getValues("supplier"))

        console.log(dateTime);

        setValue("ponumber", supplier[0].abbreviation + podate)
        setValue("createdat", dateTime);
        // setValue("customerid", option.customerid);
        setValue("customername", "S.A.K Distributors");
        setValue("customeraddress", "No.233, Kiriwallapitiya, Rambukkana, Srilanka");
        setValue("contactnumber", "0352264009")
    }

    const handleAddNewItem = () => {
        if (!!getValues('supplier')) {
            addActionRef.current.click();
        } else {
            trigger('supplier', { shouldFocus: true });
        }
    }

    const resetForm = () => {
        handleClosePopUp();
        reset({
            ponumber: '',
            createddat: '',
            supplier: '',
            grosstotal: '',
            receiveddiscounts: '',
            damagedexpireditems: '',
            total: ''
        });
        setData([]);
    }

    const onSubmit = (values) => {

        console.log(data);

        const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
        const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
        const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

        const purchaseOrderFormData = new formData();

        purchaseOrderFormData.append('ponumber', values.ponumber);
        purchaseOrderFormData.append('createdat', values.createdat);
        purchaseOrderFormData.append('createdby', `${firstname} ${lastname} (${employeeid})`);
        purchaseOrderFormData.append('supplier', values.supplier);
        purchaseOrderFormData.append('requesteditems', JSON.stringify(data));
        purchaseOrderFormData.append('grosstotal', values.total);
        purchaseOrderFormData.append('receiveddiscounts', values.receiveddiscounts);
        purchaseOrderFormData.append('damagedexpireditems', values.damagedexpireditems);
        purchaseOrderFormData.append('total', values.total);

        for (let [key, value] of purchaseOrderFormData.entries()) {
            console.log(key, value);
        }

        axios
            .post("http://localhost:8080/purchaseorder/create-purchaseorder", purchaseOrderFormData)
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
                resetForm();
                setFormStep(0);
            })
            .catch(err => {
                console.log(err);
            });
        ;

    }

    return (
        <Page title="Create Purchase Order">

            <div className={style.container}>

                <div className={style.paper}>

                    <form
                        className={style.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div className={style.paper}>

                            {
                                formStep >= 0 &&
                                <section className={formStep === 0 ? style.one : style.hidden}>

                                    <div className={style.body}>

                                        <div className={style.purcahseOrder}>

                                            <div className={style.header}>
                                                <div>
                                                    Add Items to Purchase Order
                                                </div>
                                                <div className={style.step}>
                                                    Step 1 of 2
                                                </div>
                                            </div>

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
                                                    maxBodyHeight: "calc(100vh - 425px)",
                                                    minBodyHeight: "calc(100vh - 425px)",
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

                                        <Divider
                                            className={style.divider}
                                            orientation="vertical"
                                            variant="middle"
                                        />

                                        <div className={style.quotations}>

                                            <div className={style.analytics}>

                                                <div>
                                                    <ArrowLeftIcon className={style.arrow} />
                                                </div>

                                                <div className={style.card}>

                                                    <div className={style.imageDiv}>
                                                        <img src={itemImg} alt="" />
                                                    </div>

                                                    <div className={style.itemDetails}>

                                                        <div className={style.productid}>
                                                            SWAD-P44893
                                                        </div>

                                                        <div className={style.name}>
                                                            RANI SANDAL GEL BAR - WITH SANDAL & HONEY SOAP - 70G
                                                        </div>

                                                    </div>

                                                    <div className={style.statistics}>
                                                        <div className={style.redText}>
                                                            IN NEXT 10 DAYS
                                                        </div>
                                                        <div className={style.redText}>
                                                            65 CASES
                                                        </div>
                                                        <div className={style.redText}>
                                                            5 PIECES
                                                        </div>
                                                    </div>

                                                </div>

                                                <div>
                                                    <ArrowRightIcon className={style.arrow} />
                                                </div>

                                            </div>

                                            <div className={style.quotationHeader}>
                                                <div className={style.title}>
                                                    Quotations
                                                </div>
                                                <div>

                                                </div>
                                                <div>
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        onClick={() => { setOpenPopup(true) }}
                                                    >
                                                        Add new quotaions
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className={style.quotationTable}>

                                            </div>

                                        </div>

                                    </div>

                                </section>

                            }

                            {
                                formStep >= 1 &&
                                <section className={formStep === 1 ? style.two : style.hidden}>


                                    <div className={style.header}>
                                        <div>
                                            Confirm and Submit Purchase Order
                                        </div>
                                        <div className={style.step}>
                                            Step 2 of 2
                                        </div>
                                    </div>

                                    <div className={style.body}>

                                        <div className={style.orderDetails}>

                                            <table className={style.details}>
                                                <tbody>
                                                    <tr>
                                                        <th align="left">Name</th>
                                                        <td align="left">
                                                            <Controller
                                                                name={"customername"}
                                                                control={control}
                                                                render={({ field: { value } }) => (
                                                                    <Typography className={style.input}>
                                                                        {value}
                                                                    </Typography>
                                                                )}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th align="left">Address</th>
                                                        <td align="left">
                                                            <Controller
                                                                name={"customeraddress"}
                                                                control={control}
                                                                render={({ field: { value } }) => (
                                                                    <Typography className={style.input}>
                                                                        {value}
                                                                    </Typography>
                                                                )}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th align="left">Contact No.</th>
                                                        <td align="left">
                                                            <Controller
                                                                name={"contactnumber"}
                                                                control={control}
                                                                render={({ field: { value } }) => (
                                                                    <Typography className={style.input}>
                                                                        {value}
                                                                    </Typography>
                                                                )}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table className={style.details}>
                                                <tbody>
                                                    <tr>
                                                        <th align="left">PO No.</th>
                                                        <td align="left">
                                                            {/* PO2110/004 */}
                                                            <Controller
                                                                name={"ponumber"}
                                                                control={control}
                                                                render={({ field: { value } }) => (
                                                                    <Typography className={style.input}>
                                                                        {value}
                                                                    </Typography>
                                                                )}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th align="left">PO Created at</th>
                                                        <td align="left">
                                                            {/* {dateTime} */}
                                                            <Controller
                                                                name={"createdat"}
                                                                control={control}
                                                                render={({ field: { value } }) => (
                                                                    <Typography className={style.input}>
                                                                        {value}
                                                                    </Typography>
                                                                )}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th align="left">Supplier</th>
                                                        <td align="left">
                                                            <Controller
                                                                name={"supplier"}
                                                                control={control}
                                                                render={({ field: { value } }) => (
                                                                    <Typography className={style.input}>
                                                                        {value}
                                                                    </Typography>
                                                                )}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                        <MaterialTable

                                            components={{
                                                Pagination: () => (
                                                    <td style={{
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }} >
                                                        <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                                            <Grid item align="Left">
                                                                <Typography style={{ fontWeight: 600 }}> Gross Total </Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                                                <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                                            <Grid item align="Left">
                                                                <Typography style={{ fontWeight: 600 }}> Received Discounts </Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                                                <Typography style={{ fontWeight: 600 }}> {getValues("receiveddiscounts")} </Typography>
                                                            </Grid>
                                                        </Grid><Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                                            <Grid item align="Left">
                                                                <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items </Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                                                <Typography style={{ fontWeight: 600 }}> {getValues("damagedexpireditems")} </Typography>
                                                            </Grid>
                                                        </Grid><Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                                            <Grid item align="Left">
                                                                <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
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
                                                    lookup: { Case: 'Case', Pieces: 'Pieces' },
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
                                                    render: rowData => rowData.quantity * rowData.listprice,
                                                    value: rowData => rowData.quantity * rowData.listprice,
                                                }
                                            ]}
                                            data={data}
                                            options={{
                                                toolbar: false,
                                                filtering: true,
                                                search: false,
                                                minBodyHeight: "calc(100vh - 620px)",
                                                maxBodyHeight: "calc(100vh - 620px)",
                                                headerStyle: {
                                                    position: "sticky",
                                                    top: "0",
                                                    backgroundColor: '#20369f',
                                                    color: '#FFF',
                                                    fontSize: "0.8em"
                                                },
                                                rowStyle: rowData => ({
                                                    fontSize: "0.8em",
                                                    backgroundColor: (rowData.tableData.id % 2 === 0) ? '#ebebeb' : '#ffffff'
                                                })
                                            }}

                                        />

                                    </div>

                                </section>

                            }

                        </div>

                        <div className={style.footer}>

                            {
                                formStep === 0 &&

                                <div className={style.resetBtn}>
                                    <Button
                                        disabled={formStep === 0 && !isValid && data.length === 0}
                                        variant="contained"
                                        onClick={e => setOpenPopup(true)}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            }

                            {
                                formStep === 1 &&

                                <div>
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

                                    formStep === 0 &&
                                    <Button
                                        disabled={formStep === 0 && !isValid && data.length === 0}
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            completeFormStep()
                                            handleDetails()
                                        }}
                                    >
                                        Next
                                    </Button>

                                }

                                {
                                    formStep === 1 &&

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

                    </form>

                </div >

                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >

                    <ResetForm
                        handleClosePopUp={handleClosePopUp}
                        resetForm={resetForm}
                    />

                </PopUp>

                <Snackbar
                    open={open}
                    autoHideDuration={1500}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={type}
                        sx={{ width: '100%' }}
                    >
                        {alert}
                    </Alert>
                </Snackbar>
            </div >
        </Page >
    );
}
