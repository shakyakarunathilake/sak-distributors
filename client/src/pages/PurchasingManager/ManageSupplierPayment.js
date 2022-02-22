import React, { useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

//Connecting to Backend
import axios from 'axios';

//Style
import style from './ManageSupplierPayment.module.scss';

//Forms
import ViewSupplierPayment from './ViewSupplierPayment';
import SupplierPayentForm from './SupplierPaymentForm';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageSupplierPayment() {

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();

    const [records, setRecords] = useState([]);
    const [paymentRecords, setPaymentRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [reRender, setReRender] = useState(null);


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
            .get("http://localhost:8080/supplier-payments/get-all-supplier-payments-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                sessionStorage.setItem("SupplierPaymentsTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const addOrEdit = (payment, ponumber) => {

        for (let [key, value] of payment.entries()) {
            console.log(key, value);
        }

        if (action === 'Pay Advance Payment') {
            axios
                .post(`http://localhost:8080/supplier-payments/advance-payment-complete/${ponumber}`, payment, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(ponumber);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        if (action === 'Complete Payment') {
            axios
                .post(`http://localhost:8080/supplier-payments/payment-complete/${ponumber}`, payment, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(ponumber);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        setPaymentRecords(null)
        setAction('');
        handleClosePopUp();
    }

    const openInPopup = (ponumber) => {
        axios
            .get(`http://localhost:8080/supplier-payments/${ponumber}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setPaymentRecords(res.data.supplierpayment);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleClosePopUp = () => {
        setOpenPopup(false)
    }

    return (
        <Page title="Manage Supplier Payments">

            <div className={style.container}>

                <AutoSizer>
                    {({ height, width }) => {

                        const pageSize = Math.floor((height - 199.27) / 48);

                        return (
                            <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                <MaterialTable
                                    columns={[
                                        {
                                            title: "PO Number",
                                            field: "ponumber",
                                            render: rowData => {
                                                return (
                                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.ponumber}</p>
                                                )
                                            },
                                            cellStyle: {
                                                width: "20%",
                                                textAlign: 'left'
                                            }
                                        },
                                        {
                                            title: "GRN Number",
                                            field: "grnnumber",
                                            render: rowData => {
                                                return (
                                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.grnnumber}</p>
                                                )
                                            },
                                            cellStyle: {
                                                width: "20%",
                                                textAlign: 'left'
                                            }
                                        },
                                        {
                                            title: "Supplier",
                                            field: "supplier",
                                            cellStyle: {
                                                width: "40%",
                                                textAlign: 'left'
                                            }
                                        },
                                        {
                                            title: "Status",
                                            field: "status",
                                            render: rowData => {
                                                return (
                                                    rowData.status === "Payment Complete" ?
                                                        <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                                        rowData.status === "Advance Payment Paid" ?
                                                            <p style={{ padding: "0", margin: "0", color: "#FC6A03", fontWeight: "700" }}>{rowData.status}</p> :
                                                            rowData.status === "Payment To Be Complete" ?
                                                                <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.status}</p> :
                                                                <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{rowData.status}</p>
                                                )
                                            },
                                            cellStyle: {
                                                width: "20%",
                                                textAlign: 'left'
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
                                        rowStyle: () => ({
                                            fontSize: "0.8em",
                                        })
                                    }}
                                    actions={[
                                        {
                                            icon: VisibilityIcon,
                                            tooltip: 'View',
                                            onClick: (event, rowData) => {
                                                setAction(
                                                    rowData.status !== 'Payment Complete' ? 'View Advance Payment' : 'View Complete Payment'
                                                );
                                                openInPopup(rowData.ponumber);
                                            }
                                        },
                                        rowData => ({
                                            icon: PaymentIcon,
                                            tooltip: 'Pay Advance Payment',
                                            onClick: (event, rowData) => {
                                                setAction('Pay Advance Payment');
                                                openInPopup(rowData.ponumber);
                                            },
                                            disabled: rowData.status !== 'Advance Payment To Be Paid'
                                        }),
                                        rowData => ({
                                            icon: CreditScoreIcon,
                                            tooltip: 'Complete Payment',
                                            onClick: (event, rowData) => {
                                                setAction('Complete Payment');
                                                openInPopup(rowData.ponumber);
                                            },
                                            disabled: rowData.status !== 'Payment To Be Complete'
                                        }),
                                    ]}
                                />

                            </div>

                        );
                    }}

                </AutoSizer>

                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >

                    {
                        (action === 'View Advance Payment' || action === 'View Complete Payment') &&
                        <ViewSupplierPayment
                            paymentRecords={paymentRecords}
                            handleClosePopUp={handleClosePopUp}
                            action={action}
                        />
                    }

                    {
                        (action === 'Pay Advance Payment' || action === 'Complete Payment') &&
                        <SupplierPayentForm
                            paymentRecords={paymentRecords}
                            handleClosePopUp={handleClosePopUp}
                            action={action}
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
}
