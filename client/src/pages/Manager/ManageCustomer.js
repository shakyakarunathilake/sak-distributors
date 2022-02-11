import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageCustomer.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Customer Form
import CustomerForm from './CustomerForm';
import ViewCustomer from './ViewCustomer';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageCustomer() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [customerRecords, setCustomerRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextCusId, setNextCusId] = useState();
    const [reRender, setReRender] = useState(null);

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
        axios
            .get("http://localhost:8080/customers/get-all-customer-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                sessionStorage.setItem("CustomerTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const addOrEdit = (customer, customerid) => {

        for (let [key, value] of customer.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
            axios
                .post("http://localhost:8080/customers/create-customer", customer, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(customerid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        } if (action === "Edit") {
            axios
                .post(`http://localhost:8080/customers/update-by-id/${customerid}`, customer, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(customerid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        setCustomerRecords(null)
        setOpenPopup(false);
        setAction('');
    }

    const openInPopup = customerid => {
        axios
            .get(`http://localhost:8080/customers/${customerid}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setCustomerRecords(res.data.customer);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextCustomerId = () => {
        axios
            .get("http://localhost:8080/customers/get-next-regno", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setNextCusId(res.data.nextcustomerid);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Page title="Manage Customers">
            <div className={style.container}>

                <div className={designation === "Manager" ? style.hidden : style.actionRow}>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                getNextCustomerId();
                                setOpenPopup(true);
                                setCustomerRecords(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Customer
                    </Button>
                </div>

                <div className={designation === "Manager" ? style.pagecontent1 : style.pagecontent2}>

                    <AutoSizer>
                        {({ height, width }) => {
                            const pageSize = Math.floor((height - 199.28) / 69.59);
                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "Customer ID",
                                                field: "customerid",
                                                cellStyle: {
                                                    width: "13%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.customerid}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Store Name",
                                                field: "storename",
                                                cellStyle: {
                                                    width: "32%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Customer Name",
                                                field: "customername",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Shipping Address",
                                                field: "shippingaddress",
                                                cellStyle: {
                                                    width: "30%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Contact No.",
                                                field: "contactnumber",
                                                cellStyle: {
                                                    width: "10%",
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
                                                    openInPopup(rowData.customerid);
                                                }
                                            },
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    setAction('Edit');
                                                    openInPopup(rowData.customerid);
                                                }
                                            }
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
                    fullScreen={designation === "Manager" ? false : true}
                >
                    {
                        action === 'View' &&
                        <ViewCustomer
                            customerRecords={customerRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                        />
                    }
                    {
                        (action === 'Edit' || action === 'Create') &&
                        <CustomerForm
                            addOrEdit={addOrEdit}
                            customerRecords={customerRecords}
                            setOpenPopup={setOpenPopup}
                            nextCusId={nextCusId}
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
