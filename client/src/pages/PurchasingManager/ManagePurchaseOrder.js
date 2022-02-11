import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
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
import ApprovalIcon from '@mui/icons-material/Approval';

//Form
import ViewPurchaseOrder from './ViewPurchaseOrder';
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
    const [reRender, setReRender] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [action, setAction] = useState('');
    const [records, setRecords] = useState([]);
    const [poRecords, setPORecords] = useState();
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

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
            .get("http://localhost:8080/purchaseorder/get-all-purchaseorder-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setRecords(res.data.purchaseorder);
                setReRender(null);
            })
            .catch(err => {
                console.log(err);
            })
    }, [reRender])

    const getOptions = () => {
        axios
            .get("http://localhost:8080/options/supplier-options-for-purchase-order", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
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

    const addOrEdit = (purchaseorder, ponumber) => {
        for (let [key, value] of purchaseorder.entries()) {
            console.log(key, value);
        }
        if (action === "Create") {
            axios
                .post("http://localhost:8080/purchaseorder/create-purchaseorder", purchaseorder, {
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
        if (action === "Edit") {
            axios
                .post(`http://localhost:8080/purchaseorder/update-by-ponumber/${ponumber}`, purchaseorder, {
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

        if (action === "Approve") {
            axios
                .post(`http://localhost:8080/purchaseorder/approve-by-ponumber/${ponumber}`, purchaseorder, {
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

        setPORecords(null);
        handleClosePopUp()
        setAction('');
    }

    const handleClosePopUp = () => {
        setOpenPopup(false)
    }

    const openInPopup = ponumber => {
        axios
            .get(`http://localhost:8080/purchaseorder/${ponumber}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setPORecords(res.data.purchaseorder);
                setOpenPopup(true);
                // console.log(poRecords);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Page title="Manage Purchase Order">
            <div className={style.container}>

                <div className={designation === "Distributor" ? style.hidden : style.actionRow}>

                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                getOptions();
                                setOpenPopup(true);
                                setPORecords(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Create Purchase Order
                    </Button>

                </div>

                <div className={designation === "Distributor" ? style.pagecontent1 : style.pagecontent2}>

                    <AutoSizer>
                        {({ height, width }) => {
                            const pageSize = Math.floor((height - 199.28) / 48);
                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "PO Number",
                                                field: "ponumber",
                                                cellStyle: {
                                                    width: '10%',
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.ponumber}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Supplier",
                                                field: "supplier",
                                                cellStyle: {
                                                    width: '19%',
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Created by",
                                                field: "createdby",
                                                cellStyle: {
                                                    width: '16%',
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Created at",
                                                field: "createdat",
                                                cellStyle: {
                                                    width: '12%',
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Approved by",
                                                field: "approvedby",
                                                cellStyle: {
                                                    width: '16%',
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Approved at",
                                                field: "approvedat",
                                                cellStyle: {
                                                    width: '12%',
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Status",
                                                field: "status",
                                                cellStyle: {
                                                    width: '10%',
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        rowData.status === "Delivered" ?
                                                            <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                                            rowData.status === "Pending" ?
                                                                <p style={{ padding: "0", margin: "0", color: "#FC6A03", fontWeight: "700" }}>{rowData.status}</p> :
                                                                <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{rowData.status}</p>

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
                                                    openInPopup(rowData.ponumber);
                                                }
                                            },
                                            rowData => ({
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    setAction('Edit');
                                                    getOptions();
                                                    openInPopup(rowData.ponumber);
                                                },
                                                disabled: rowData.status !== 'Waiting For Approval' || designation === 'Distributor'
                                            }),
                                            rowData => ({
                                                icon: ApprovalIcon,
                                                tooltip: 'Approve',
                                                onClick: (event, rowData) => {
                                                    setAction('Approve');
                                                    getOptions();
                                                    openInPopup(rowData.ponumber);
                                                },
                                                disabled: rowData.status !== 'Waiting For Approval' || designation !== 'Distributor'
                                            })
                                        ]}
                                    />
                                </div>
                            );
                        }}
                    </AutoSizer>

                </div>

            </div>

            <PopUp
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                fullScreen={true}
            >
                {
                    action === 'View' ?
                        <ViewPurchaseOrder
                            handleClosePopUp={handleClosePopUp}
                            poRecords={poRecords}
                            action={action}
                        /> :
                        <CreatePurchaseOrder
                            addOrEdit={addOrEdit}
                            handleClosePopUp={handleClosePopUp}
                            productOptions={productOptions}
                            supplierOptions={supplierOptions}
                            poRecords={poRecords}
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

        </Page>
    )
}
