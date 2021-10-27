import React, { useEffect, useState } from 'react';

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
// import ApproveSubmit from './ApproveSubmit';

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
            .get("http://localhost:8080/customers/get-all-customer-table-data")
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
                .post("http://localhost:8080/customers/create-customer", customer)
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
                .post(`http://localhost:8080/customers/update-by-id/${customerid}`, customer)
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
            .get(`http://localhost:8080/customers/${customerid}`)
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
            .get("http://localhost:8080/customers/get-next-regno")
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

                <div className={style.actionRow}>
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

                <div className={style.pagecontent}>
                    <MaterialTable
                        columns={[
                            {
                                title: "customer ID", field: "customerid", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.customerid}</p>
                                    )
                                }
                            },
                            { title: "Store Name", field: "storename" },
                            { title: "Title", field: "title" },
                            { title: "Customer Name", field: "customername" },
                            { title: "Shipping Address", field: "shippingaddress" },
                            { title: "Contact No.", field: "contactnumber" },
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
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {action === 'View' ?
                        <ViewCustomer
                            customerRecords={customerRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                        /> :
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
