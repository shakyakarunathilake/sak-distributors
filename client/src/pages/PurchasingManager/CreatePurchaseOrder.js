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
import { TableFooter, TableRow, TableCell } from '@material-ui/core';

//Material UI Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar, MTableBody } from 'material-table';

//Dialog Content
import ResetForm from './ResetForm';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function CreatePurchaseOrder(props) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    const { handleSubmit, formState: { errors }, control, getValues, setValue, isValid, trigger, reset } = useForm({ mode: "all" });

    const [total, setTotal] = useState(0);
    const [formStep, setFormStep] = useState(0);
    const [data, setData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [productOptions, setProductOptions] = useState([]);
    const [selectedProductOptions, setSelectedProductOptions] = useState([]);

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
            addActionRef.current.click();
        } else {
            trigger('supplier', { shouldFocus: true });
        }
    }

    useEffect(() => {
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

    const resetForm = () => {
        handleClosePopUp();
        reset({
            supplier: '',
            purchaseordernumber: '',
            createddate: '',
            customerid: '',
            customername: '',
            shipto: '',
        });
        setData([]);
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
                                                            onChange={e => {
                                                                onChange(e)
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
                                                    Body: (props) => (
                                                        <>
                                                            <MTableBody {...props} />
                                                            <TableFooter>
                                                                <TableRow>
                                                                    <TableCell
                                                                        colSpan={4}
                                                                        style={{
                                                                            fontSize: "0.8em",
                                                                            color: "black",
                                                                            fontWeight: 600
                                                                        }}
                                                                    > Total </TableCell>
                                                                    <TableCell
                                                                        style={{
                                                                            fontSize: "0.8em",
                                                                            color: "black",
                                                                            fontWeight: 600,
                                                                            textAlign: "right"
                                                                        }}
                                                                    >
                                                                        {total}
                                                                    </TableCell>
                                                                    <TableCell></TableCell>
                                                                </TableRow>
                                                            </TableFooter>
                                                        </>
                                                    )
                                                }}
                                                columns={[
                                                    // {
                                                    //     title: "Prod. ID",
                                                    //     field: "productid",
                                                    //     editComponent: props => (
                                                    //         <Autocomplete
                                                    //             options={selectedProductOptions}
                                                    //             getOptionLabel={(option) => option.productid}
                                                    //             inputValue={props.value || ''}
                                                    //             onChange={e => props.onChange(e.target.innerText)}
                                                    //             renderInput={(params) =>
                                                    //                 <MuiTextField
                                                    //                     {...params}
                                                    //                     helperText={props.helperText}
                                                    //                     error={props.error}
                                                    //                     variant="standard"
                                                    //                 />
                                                    //             }
                                                    //         />
                                                    //     ),
                                                    //     validate: (rowData) => (
                                                    //         rowData.productid === undefined
                                                    //             ? { isValid: false, helperText: 'Required *' }
                                                    //             : rowData.productid === ''
                                                    //                 ? { isValid: false, helperText: 'Required *' }
                                                    //                 : true
                                                    //     ),
                                                    // },
                                                    {
                                                        title: "Description",
                                                        field: "description",
                                                        editComponent: props => (
                                                            <Autocomplete
                                                                options={selectedProductOptions}
                                                                getOptionLabel={(option) => option.name}
                                                                onChange={e => {
                                                                    props.onChange(e.target.innerText)
                                                                }}
                                                                inputValue={props.value || ''}
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
                                                        editComponent: props =>
                                                            <MuiTextField
                                                                onChange={e => {
                                                                    var data = { ...props.rowData };
                                                                    data.quantity = e.target.value;
                                                                    let quantity = isNaN(data.quantity) ? 0 : data.quantity;
                                                                    let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                                    data.value = quantity * listprice;
                                                                    props.onRowDataChange(data);
                                                                }}
                                                                helperText={props.helperText}
                                                                error={props.error}
                                                                variant="standard"
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
                                                                    var data = { ...props.rowData };
                                                                    data.listprice = e.target.value;
                                                                    let quantity = isNaN(data.quantity) ? 0 : data.quantity;
                                                                    let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                                    data.value = quantity * listprice;
                                                                    props.onRowDataChange(data);
                                                                }}
                                                                helperText={props.helperText}
                                                                error={props.error}
                                                                variant="standard"
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
                                                            {/* No.233, Kiriwallapitiya, Rambukkana, Srilanka */}
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
                                                            {/* 071 2686790 */}
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
                                                                name={"createat"}
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
                                                paging: false,
                                                minBodyHeight: "calc(100vh - 405px)",
                                                maxBodyHeight: "calc(100vh - 405px)",
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
                                    <Button
                                        disabled={formStep === 0 && !isValid && data.length === 0}
                                        variant="contained"
                                        onClick={e => setOpenPopup(true)}
                                        style={{
                                            backgroundColor: '#ACA9BB',
                                            color: 'white'
                                        }}
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
                                        onClick={() => completeFormStep()}
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

            </div >
        </Page >
    );
}
