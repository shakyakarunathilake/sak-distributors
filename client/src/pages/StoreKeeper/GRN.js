import React, { useState, useEffect } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI Icons
import VisibilityIcon from '@material-ui/icons/Visibility';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './GRN.module.scss';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function GRN() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [PORecords, setPORecords] = useState(null);
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
            .get("http://localhost:8080/purchaseorder/get-all-purchaseorder-table-data")
            .then(res => {
                sessionStorage.setItem("PurchaseOrderTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

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
        <Page title="GRN">
            <div className={style.container}>

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
                        {
                            title: "Status", field: "status", render: rowData => {


                                return (
                                    rowData.status === 'Pending' ?
                                        <p style={{ padding: "0", margin: "0", color: 'red', fontWeight: "700" }}>{rowData.status}</p>
                                        : <p style={{ padding: "0", margin: "0", color: "#4caf50", fontWeight: "700" }}>{rowData.status}</p>
                                )
                            }
                        },
                        { title: "Created By", field: "createdby" },
                        { title: "Created At", field: "createdat" },
                        { title: "Approved By", field: "approvedby" },
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
                        (rowData) => ({
                            disabled: rowData.status === 'Complete',
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (event, rowData) => {
                                setAction('Edit');
                                openInPopup(rowData.ponumber);
                            }
                        })
                    ]}
                />
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {/* {action === 'View' ?
                        <ViewPurchaseOrder
                            PORecords={PORecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                        /> :
                        <PurchaseOrderForm
                            addOrEdit={addOrEdit}
                            PORecords={PORecords}
                            setOpenPopup={setOpenPopup}
                            nextCusId={nextCusId}
                        />
                    } */}
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
        </Page >
    )
}
