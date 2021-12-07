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
import CreateOrder from './CreateOrder';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SalesAndInvoice() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [orderRecords, setOrderRecords] = useState(null);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextOrderId, setNextOrderId] = useState();
    const [total, setTotal] = useState();
    const [reRender, setReRender] = useState(null);

    // const handleAlert = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/orders/get-all-sales-and-invoice-table-data`)
            .then(res => {
                sessionStorage.setItem("SalesAndInvoiceTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    // const addOrEdit = (order, orderid) => {

    //     for (let [key, value] of order.entries()) {
    //         console.log(key, value);
    //     }

    //     if (action === "Create") {
    //         axios
    //             .post("http://localhost:8080/orders/create-order", order)
    //             .then(res => {
    //                 setAlert(res.data.alert);
    //                 setType(res.data.type);
    //                 handleAlert();
    //                 setReRender(orderid);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //         ;
    //     } if (action === "Edit") {
    //         axios
    //             .post(`http://localhost:8080/orders/update-by-id/${orderid}`, order)
    //             .then(res => {
    //                 setAlert(res.data.alert);
    //                 setType(res.data.type);
    //                 handleAlert();
    //                 setReRender(orderid);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //         ;
    //     }

    //     setOrderRecords(null)
    //     setOpenPopup(false);
    //     setAction('');
    // }

    const openInPopup = orderid => {
        axios
            .get(`http://localhost:8080/orders/${orderid}`)
            .then(res => {
                setOrderRecords(res.data.order);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextOrderId = () => {
        axios
            .get("http://localhost:8080/orders/get-next-invoiceno")
            .then(res => {
                setNextOrderId(res.data.nextinvoiceno);
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
                                getNextOrderId();
                                getOptions();
                                setOpenPopup(true);
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
                                title: "Order ID", field: "orderid", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.orderid}</p>
                                    )
                                }
                            },
                            { title: "Customer Name", field: "storename" },
                            { title: "Status", field: "status" },
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
                                    openInPopup(rowData.orderid);
                                }
                            },
                            {
                                icon: 'edit',
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    setAction('Edit');
                                    openInPopup(rowData.orderid);
                                }
                            }
                        ]}
                    />
                </div>
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    fullScreen={true}
                >
                    <CreateOrder
                        setOpenPopup={setOpenPopup}
                        productOptions={productOptions}
                        customerOptions={customerOptions}
                        nextOrderId={nextOrderId}
                        total={total}
                        setTotal={setTotal}
                    />
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
