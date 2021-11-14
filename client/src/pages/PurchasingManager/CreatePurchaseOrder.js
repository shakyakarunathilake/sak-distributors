import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Development Stage
import * as employeeservice from "../../services/employeeService";
import itemImg from '../../images/itemImg.png'

//Shared Components
import Page from '../../shared/Page/Page';
import Select from '../../shared/Select/Select';
import PopUp from '../../shared/PopUp/PopUp';

//Material UI 
import { Button } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@mui/material';

//Material UI Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//Dialog Content
import Quotations from './Quotations';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function CreatePurchaseOrder(props) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    const { handleSubmit, formState: { errors }, control, reset, getValues, trigger } = useForm({ mode: "all" });

    const [formStep, setFormStep] = useState(0);
    const [data, setData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [productOptions, setProductOptions] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const addActionRef = React.useRef();

    const completeFormStep = () => {
        if (!data.length === 0) {
            setFormStep(x => x + 1);
        } else {
            setDisabled(false);
        }
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    // const handleSupplierChange = (event, option) => {
    //     if (option) {
    //         setValue("supplier", option.supplier);
    //         setValue("purchaseordernumber", option.purchaseordernumber);
    //         setValue("createddate", option.createddate);
    //         setValue("customerid", option.customerid);
    //         setValue("customername", option.customername);
    //         setValue("shipto", option.shipto);
    //     }
    // }

    const handleAddNewItem = () => {
        if (!!getValues('supplier')) {
            setProductOptions(productOptions.filter(x => x.supplier === getValues('supplier')));
            console.log("Product Options In HandleAddNewItem: ", productOptions);
            addActionRef.current.click();
        } else {
            trigger('supplier', { shouldFocus: true });
        }
    }

    useEffect(() => {
        axios
            .get("http://localhost:8080/options/product-options-for-purchase-order")
            .then(res => {
                console.log("Product Options In UseEffect: ", productOptions);
                setProductOptions(res.data.productOptions);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const resetForm = () => {
        reset({
            supplier: '',
            purchaseordernumber: '',
            createddate: '',
            customerid: '',
            customername: '',
            shipto: '',
        });
    }

    const onSubmit = (values) => {
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
                                                            options={employeeservice.getSupplierOptions()}
                                                            onChange={onChange}
                                                            size="small"
                                                            label="Supplier *"
                                                            value={value}
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
                                                }}
                                                columns={[
                                                    {
                                                        title: "Prod. ID",
                                                        field: "productid",
                                                        editComponent: props => (
                                                            <Autocomplete
                                                                options={productOptions || []}
                                                                getOptionLabel={(option) => option.productid}
                                                                renderInput={(params) =>
                                                                    <MuiTextField
                                                                        {...params}
                                                                        helperText={props.helperText}
                                                                        error={props.error}
                                                                        onChange={e => props.onChange(e.target.value)}
                                                                        variant="standard"
                                                                    />
                                                                }
                                                            />
                                                        ),
                                                        validate: (rowData) => (
                                                            rowData.productid === undefined
                                                                ? { isValid: false, helperText: 'Required *' }
                                                                : rowData.productid === ''
                                                                    ? { isValid: false, helperText: 'Required *' }
                                                                    : true
                                                        ),
                                                    },
                                                    {
                                                        title: "Description",
                                                        field: "description",
                                                        editComponent: props => (
                                                            <Autocomplete
                                                                inputValue={props.value}
                                                                options={productOptions || []}
                                                                getOptionLabel={(option) => option.name}
                                                                renderInput={(params) =>
                                                                    <MuiTextField
                                                                        {...params}
                                                                        helperText={props.helperText}
                                                                        error={props.error}
                                                                        // onChange={e => props.onChange(e.target.value)}
                                                                        value={props.value}
                                                                        variant="standard"
                                                                    />
                                                                }
                                                                onChange={e => props.onChange(e.target.innerText)}
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
                                                            <DeleteForeverIcon className={style.deleteItemBtn} />
                                                        </div>
                                                    )
                                                }}
                                                options={{
                                                    toolbar: true,
                                                    filtering: true,
                                                    search: false,
                                                    paging: false,
                                                    minBodyHeight: "calc(100vh - 354px)",
                                                    maxBodyHeight: "calc(100vh - 354px)",
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
                                                        <img src={itemImg} />
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
                                                                name={"name"}
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
                                                        <td align="left">No.233, Kiriwallapitiya, Rambukkana, Srilanka</td>
                                                    </tr>
                                                    <tr>
                                                        <th align="left">Contact No.</th>
                                                        <td align="left">071 2686790</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table className={style.details}>
                                                <tbody>
                                                    <tr>
                                                        <th align="left">PO No.</th>
                                                        <td align="left">PO2110/004</td>
                                                    </tr>
                                                    <tr>
                                                        <th align="left">PO Created at</th>
                                                        <td align="left">{dateTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th align="left">Supplier</th>
                                                        <td align="left"> </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                        <MaterialTable
                                            columns={[
                                                {
                                                    title: "Prod. ID",
                                                    field: "productid",
                                                    validate: (rowData) =>
                                                        rowData.productid === undefined
                                                            ? { isValid: false, helperText: 'Required *' }
                                                            : rowData.productid === ''
                                                                ? { isValid: false, helperText: 'Required *' }
                                                                : true

                                                },
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
                                                paging: false,
                                                minBodyHeight: "calc(100vh - 453px)",
                                                maxBodyHeight: "calc(100vh - 453px)",
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

                                <div>
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
                                        // disabled={formStep == 0 && !isValid}
                                        color="primary"
                                        variant="contained"
                                        onClick={completeFormStep}
                                        disabled={disabled}
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
                    <Quotations />
                </PopUp>

            </div >
        </Page >
    );
}
