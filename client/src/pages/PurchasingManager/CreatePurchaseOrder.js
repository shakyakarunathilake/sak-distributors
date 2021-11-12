import React, { useState } from 'react';
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

//Material UI Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//Material UI Icons
import VisibilityIcon from '@material-ui/icons/Visibility';

//Dialog Content
import Quotations from './Quotations';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';

export default function CreatePurchaseOrder(props) {

    const { handleSubmit, formState: { errors, isValid }, control, reset, setValue, getValues, clearErrors } = useForm({ mode: "all" });

    const [formStep, setFormStep] = useState(0);
    const [data, setData] = useState([]);
    const [quotations, setQuotations] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    // var today = new Date();
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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
                                                    onClick={() => addActionRef.current.click()}
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
                                                        title: "Description",
                                                        field: "description",
                                                        // editComponent: props => (
                                                        //     <Autocomplete
                                                        //         options={top100Films}
                                                        //         getOptionLabel={(option) => option.title}
                                                        //         style={{ width: 300 }}
                                                        //         renderInput={(params) => <TextField {...params} label={props.title} variant="standard" />}
                                                        //     />
                                                        // ),
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

                                                <MaterialTable
                                                    columns={[
                                                        {
                                                            title: "Quotaion ID",
                                                            field: "quotationid",
                                                            render: rowData => {
                                                                return (
                                                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.productid}</p>
                                                                )
                                                            }
                                                        },
                                                        {
                                                            title: "Valid Period",
                                                            field: "validdate"
                                                        },
                                                    ]}
                                                    data={quotations}
                                                    options={{
                                                        toolbar: false,
                                                        filtering: false,
                                                        search: false,
                                                        paging: false,
                                                        minBodyHeight: "calc(100vh - 399px)",
                                                        maxBodyHeight: "calc(100vh - 399px)",
                                                        actionsColumnIndex: -1,
                                                        headerStyle: {
                                                            position: "sticky",
                                                            top: "0",
                                                            backgroundColor: '#323232',
                                                            color: '#FFF',
                                                            fontSize: "0.8em"
                                                        },
                                                        rowStyle: rowData => ({
                                                            fontSize: "0.8em",
                                                            backgroundColor: (rowData.tableData.id % 2 === 0) ? '#ebebeb' : '#ffffff'
                                                        })
                                                    }}
                                                    actions={[
                                                        {
                                                            icon: VisibilityIcon,
                                                            tooltip: 'View',
                                                            // onClick: (event, rowData) => {
                                                            //     setAction('View');
                                                            //     openInPopup(rowData.employeeid);
                                                            // }
                                                        }
                                                    ]}
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
                                                        <td align="left">S.A.K Distributors</td>
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
                                                        <td align="left">2021/11/7</td>
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
                                                    title: "Product ID", field: "productid", render: rowData => {
                                                        return (
                                                            <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.productid}</p>
                                                        )
                                                    }
                                                },
                                                { title: "Name", field: "name" },
                                                { title: "Supplier", field: "supplier" },
                                                {
                                                    title: "Variant ID", field: "variantid", render: rowData => {
                                                        return (
                                                            <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.variantid}</p>
                                                        )
                                                    }
                                                },
                                                { title: "Type", field: "type" },
                                                {
                                                    title: "Status", field: "status", render: rowData => {
                                                        return (
                                                            rowData.status === "Active" ?
                                                                <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                                                <p style={{ padding: "0", margin: "0", color: "red", fontWeight: "700" }}>{rowData.status}</p>
                                                        )
                                                    }
                                                },
                                            ]}
                                            data={quotations}
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

                                    formStep == 0 &&
                                    <Button
                                        // disabled={formStep == 0 && !isValid}
                                        color="primary"
                                        variant="contained"
                                        onClick={completeFormStep}
                                    >
                                        Next
                                    </Button>

                                }

                                {
                                    formStep == 1 &&

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
                    disableEnforceFocus={true}
                    hideBackDrop={true}
                    disableBackDropClick={true}
                    style={true}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <Quotations />
                </PopUp>

            </div >
        </Page >
    );
}
