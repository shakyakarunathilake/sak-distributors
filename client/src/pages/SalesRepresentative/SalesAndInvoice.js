import React, { useEffect, useState } from 'react';

import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './SalesAndInvoice.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Connecting to Backend
import axios from 'axios';

//Forms
import ViewOrder from './ViewOrder';
import EditOrder from './EditOrder';
import CreateOrder from './CreateOrder';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SalesAndInvoice() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [orderRecords, setOrderRecords] = useState({});
    const [customerOptions, setCustomerOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextOrderNo, setNextOrderNo] = useState();
    const [reRender, setReRender] = useState(null);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/orders/get-all-sales-and-invoice-table-data/${firstname} ${lastname} (${employeeid})`)
            .then(res => {
                sessionStorage.setItem("SalesAndInvoiceTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const handleClosePopUp = () => {
        setOpenPopup(false)
        setAction('');
    }

    const addOrEdit = (order, orderno) => {

        for (let [key, value] of order.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
            axios
                .post("http://localhost:8080/orders/create-order", order)
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(orderno);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        } if (action === "Edit") {
            axios
                .post(`http://localhost:8080/orders/update-by-id/${orderno}`, order)
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(orderno);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        setOrderRecords(null);
        setOpenPopup(false);
        setReRender(orderno);
        setAction('');
    }

    const openInPopup = orderno => {
        axios
            .get(`http://localhost:8080/orders/${orderno}`)
            .then(res => {
                setOrderRecords(res.data.order);
            })
            .catch(err => {
                console.log(err);
            })

        setOpenPopup(true);
    }

    const getNextOrderNo = () => {
        axios
            .get("http://localhost:8080/orders/get-next-orderno")
            .then(res => {
                setNextOrderNo(res.data.nextorderno);
                getOptions();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getOptions = () => {

        axios
            .get("http://localhost:8080/options/customer-options")
            .then(res => {
                setCustomerOptions(res.data.customeroptions)
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get("http://localhost:8080/options/product-options")
            .then(res => {
                setProductOptions(res.data.productoptions)
            })
            .catch(err => {
                console.log(err);
            })

        setOpenPopup(true);
    }

    return (
        <Page
            title="Sales and Invoice">

            <div className={style.container}>

                <div className={style.actionRow}>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                setOrderRecords(null);
                                getNextOrderNo();
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Order
                    </Button>
                </div>

                <div className={style.pagecontent}>
                    <MaterialTable
                        columns={[
                            {
                                title: "Order ID", field: "orderno", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.orderno}</p>
                                    )
                                }
                            },
                            { title: "Customer Name", field: "storename" },
                            {
                                title: "Status", field: "status", render: rowData => {
                                    return (
                                        rowData.status === 'Pending' ?
                                            <p style={{ padding: "0", margin: "0", color: 'red', fontWeight: "700" }}>{rowData.status}</p>
                                            : rowData.status === 'Processing' ?
                                                <p style={{ padding: "0", margin: "0", color: "#2196F3", fontWeight: "700" }}>{rowData.status}</p>
                                                : rowData.status === 'Shipping' ?
                                                    <p style={{ padding: "0", margin: "0", color: "#FF8400", fontWeight: "700" }}>{rowData.status}</p>
                                                    : <p style={{ padding: "0", margin: "0", color: "#4caf50", fontWeight: "700" }}>{rowData.status}</p>
                                    )
                                }
                            },
                        ]}
                        data={records}
                        options={{
                            toolbar: false,
                            filtering: true,
                            search: false,
                            paging: false,
                            actionsColumnIndex: -1,
                            maxBodyHeight: "calc(100vh - 199.27px)",
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
                        actions={[
                            {
                                icon: VisibilityIcon,
                                tooltip: 'View',
                                onClick: (event, rowData) => {
                                    setAction('View');
                                    getOptions();
                                    openInPopup(rowData.orderno);
                                }
                            },
                            rowData => ({
                                icon: 'edit',
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    setAction('Edit');
                                    getOptions();
                                    openInPopup(rowData.orderno);
                                },
                                disabled: rowData.status !== 'Pending'
                            })
                        ]}
                    />
                </div>

                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    fullScreen={true}
                >

                    {
                        action === "Create" &&
                        <CreateOrder
                            handleClosePopUp={handleClosePopUp}
                            addOrEdit={addOrEdit}
                            productOptions={productOptions}
                            customerOptions={customerOptions}
                            nextOrderNo={nextOrderNo}
                            orderRecords={orderRecords}
                            action={action}
                        />
                    }

                    {
                        action === "Edit" &&
                        <EditOrder
                            orderRecords={orderRecords}
                            handleClosePopUp={handleClosePopUp}
                            addOrEdit={addOrEdit}
                            productOptions={productOptions}
                            nextOrderNo={nextOrderNo}
                            customerOptions={customerOptions}
                            action={action}
                        />
                    }
                    {
                        action === "View" &&
                        <ViewOrder
                            handleClosePopUp={handleClosePopUp}
                            orderRecords={orderRecords}
                            action={action}
                        />
                    }
                </PopUp>

                <Snackbar
                    open={open}
                    autoHideDuration={2500}
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

            </div>
        </Page>
    )
};
