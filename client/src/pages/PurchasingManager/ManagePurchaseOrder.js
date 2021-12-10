import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';

//SCSS styles
import style from './ManagePurchaseOrder.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Form
import CreatePurchaseOrder from './CreatePurchaseOrder';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManagePurchaseOrder() {

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();
    const [openPopup, setOpenPopup] = useState(false);
    const [action, setAction] = useState('');
    const [records, setRecords] = useState([]);
    const [poRecords, setPORecords] = useState();
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/purchaseorder/get-all-purchaseorder-table-data")
            .then(res => {
                setRecords(res.data.purchaseorder);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const getOptions = () => {
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

    }

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

    const addOrder = (purchaseOrderFormData) => {
        axios
            .post("http://localhost:8080/purchaseorder/create-purchaseorder", purchaseOrderFormData)
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
            })
            .catch(err => {
                console.log(err);
            });
        ;
    }

    const openInPopup = ponumber => {
        axios
            .get(`http://localhost:8080/purchaseorder/${ponumber}`)
            .then(res => {
                setPORecords(res.data.purchaseorder);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Page title="Manage Purchase Order">
            <div className={style.container}>

                <div className={style.actionRow}>

                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                getOptions();
                                setOpenPopup(true);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Create Purchase Order
                    </Button>

                </div>

                <div className={style.pagecontent}>
                    <MaterialTable
                        columns={[
                            {
                                title: "PO Number", field: "ponumber", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.ponumber}</p>
                                    )
                                }
                            },
                            { title: "Supplier", field: "supplier" },
                            { title: "Created By", field: "createdby" },
                            { title: "Approved By", field: "approvedby" },
                            {
                                title: "Status", field: "status", render: rowData => {
                                    return (
                                        rowData.status === "Delivered" ?
                                            <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                            rowData.status === "Pending" ?
                                                <p style={{ padding: "0", margin: "0", color: "red", fontWeight: "700" }}>{rowData.status}</p> :
                                                <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{rowData.status}</p>

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
                                    openInPopup(rowData.ponumber);
                                }
                            },
                            {
                                icon: 'edit',
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    setAction('Edit');
                                    openInPopup(rowData.ponumber);
                                }
                            }
                        ]}
                    />

                </div>

            </div>

            <PopUp
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                fullScreen={true}
            >
                <CreatePurchaseOrder
                    productOptions={productOptions}
                    supplierOptions={supplierOptions}
                    addOrder={addOrder}
                    handleClosePopUp={handleClosePopUp}
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

        </Page>
    )
}
