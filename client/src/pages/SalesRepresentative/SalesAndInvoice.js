import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
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
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

//Connecting to Backend
import axios from 'axios';

//Forms
import ViewOrder from './ViewOrder';
import EditOrder from './EditOrder';
import CreateOrder from './CreateOrder';
import DeliveredPaidForm from '../DeliveryRepresentative/DeliveredPaidForm';

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
    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

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
        if (designation === "Manager") {
            axios
                .get(`http://localhost:8080/orders/get-all-sales-and-invoice-table-data`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    sessionStorage.setItem("SalesAndInvoiceTableData", JSON.stringify(res.data));
                    setRecords(res.data.tbody);
                    setReRender(null);
                })
                .catch(error => {
                    console.log(error)
                })
        }

        if (designation === "Sales Representative") {
            axios
                .get(`http://localhost:8080/orders/get-all-sales-and-invoice-table-data-for-sales-representative/${firstname} ${lastname} (${employeeid})`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    sessionStorage.setItem("SalesAndInvoiceTableData", JSON.stringify(res.data));
                    setRecords(res.data.tbody);
                    setReRender(null);
                })
                .catch(error => {
                    console.log(error)
                })
        }

        if (designation === "Delivery Representative") {
            axios
                .get(`http://localhost:8080/orders/get-all-sales-and-invoice-table-data-for-delivery-representative/${firstname} ${lastname} (${employeeid})`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    sessionStorage.setItem("SalesAndInvoiceTableData", JSON.stringify(res.data));
                    setRecords(res.data.tbody);
                    setReRender(null);
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }, [reRender, firstname, lastname, designation, employeeid]);

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
                .post("http://localhost:8080/orders/create-order", order, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
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

        if (action === "Edit") {
            axios
                .post(`http://localhost:8080/orders/update-by-id/${orderno}`, order, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
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

        if (action === "Delivered") {
            axios
                .post(`http://localhost:8080/orders/approve-delivery/${orderno}`, order, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(orderno);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if (action === "Paid") {

            axios
                .post(`http://localhost:8080/orders/approve-complete/${orderno}`, order, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(orderno);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        setOrderRecords(null);
        setOpenPopup(false);
        setReRender(orderno);
        setAction('');
    }

    const openInPopup = orderno => {
        axios
            .get(`http://localhost:8080/orders/${orderno}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setOrderRecords(res.data.order);

                if (action === 'Create' || action === 'Edit') {
                    getOptions();
                } else {
                    setOpenPopup(true);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    const getNextOrderNo = () => {
        axios
            .get(`http://localhost:8080/orders/get-next-orderno/${employeeid}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
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
            .get("http://localhost:8080/options/customer-options", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setCustomerOptions(res.data.customeroptions)
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get("http://localhost:8080/options/product-options", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setProductOptions(res.data.productoptions);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <Page title="Sales and Invoice">

            <div className={style.container}>

                {
                    designation === 'Sales Representative' &&
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
                }

                <div className={designation === "Sales Representative" ? style.pagecontent1 : style.pagecontent2}>

                    <AutoSizer>
                        {({ height, width }) => {

                            const pageSize = Math.floor((height - 199.28) / 48);

                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "Order ID",
                                                field: "orderno",
                                                cellStyle: {
                                                    width: "25%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.orderno}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Customer Name",
                                                field: "storename",
                                                cellStyle: {
                                                    width: "50%",
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Status",
                                                field: "status",
                                                cellStyle: {
                                                    width: "25%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        rowData.status === 'Pending' ?
                                                            <p style={{ padding: "0", margin: "0", color: "#5E01AE", fontWeight: "700" }}>{rowData.status}</p>
                                                            : rowData.status === 'Processing' ?
                                                                <p style={{ padding: "0", margin: "0", color: "#2196F3", fontWeight: "700" }}>{rowData.status}</p>
                                                                : rowData.status === 'Shipping' ?
                                                                    <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{rowData.status}</p>
                                                                    : rowData.status === 'Delivered' ?
                                                                        <p style={{ padding: "0", margin: "0", color: "#FF8400", fontWeight: "700" }}>{rowData.status}</p>
                                                                        : <p style={{ padding: "0", margin: "0", color: "#4caf50", fontWeight: "700" }}>{rowData.status}</p>

                                                    )
                                                }
                                            },
                                        ]}
                                        data={records}
                                        options={{
                                            pageSize: pageSize,
                                            pageSizeOptions: [],
                                            paging: true,
                                            toolbar: false,
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
                                                backgroundColor: (rowData.tableData.id % 2 === 0) ? '#ebebeb' : '#ffffff'
                                            })
                                        }}
                                        actions={[
                                            {
                                                icon: VisibilityIcon,
                                                tooltip: 'View',
                                                onClick: (event, rowData) => {
                                                    setAction('View');
                                                    openInPopup(rowData.orderno);
                                                }
                                            },
                                            rowData => ({
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    setAction('Edit');
                                                    openInPopup(rowData.orderno);
                                                },
                                                disabled: rowData.status !== 'Pending'
                                            }),
                                            rowData => ({
                                                icon: LocalShippingIcon,
                                                tooltip: 'Delivered',
                                                onClick: (event, rowData) => {
                                                    setAction('Delivered');
                                                    openInPopup(rowData.orderno);
                                                },
                                                disabled: designation !== "Delivery Representative" || rowData.status === 'Delivered' || rowData.status === 'Paid'
                                            }),
                                            rowData => ({
                                                icon: PaymentIcon,
                                                tooltip: 'Paid',
                                                onClick: (event, rowData) => {
                                                    setAction('Paid');
                                                    openInPopup(rowData.orderno);
                                                },
                                                disabled: designation !== "Manager" || rowData.status !== 'Delivered'
                                            })
                                        ]}
                                    />

                                </div>
                            );
                        }}
                    </AutoSizer>

                </div>

                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    fullScreen={(action === "Delivered") || (designation === 'Manager') ? false : true}
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

                    {
                        (action === 'Delivered' || action === 'Paid') &&
                        <DeliveredPaidForm
                            action={action}
                            orderRecords={orderRecords}
                            handleClosePopUp={handleClosePopUp}
                            addOrEdit={addOrEdit}
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
