import React, { useState, useEffect } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './ManageGIN.module.scss';

//Pop Up Forms
import ViewGIN from './ViewGIN';
import CreateGINForm from './CreateGINForm';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageGIN() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [GINRecords, setGINRecords] = useState(null);
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


    const handleClosePopUp = () => {
        setOpenPopup(false)
        setAction('');
    }

    useEffect(() => {
        axios
            .get("http://localhost:8080/gin/get-all-gin-table-data")
            .then(res => {
                sessionStorage.setItem("GINTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const openInPopup = ginnumber => {
        axios
            .get(`http://localhost:8080/gin/${ginnumber}`)
            .then(res => {
                setGINRecords(res.data.gin);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateGIN = (gin, ginnumber,) => {

        for (let [key, value] of gin.entries()) {
            console.log(key, value);
        }

        axios
            .post(`http://localhost:8080/gin/update-by-ginnumber/${ginnumber}`, gin)
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
                setReRender(ginnumber);
            })
            .catch(err => {
                console.log(err);
            })

        handleClosePopUp();
    }

    return (
        <Page title="Manage GIN">
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
                                setOpenPopup(true);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Create New GIN
                    </Button>
                </div>

                <div className={style.pagecontent}>

                    <MaterialTable
                        columns={[
                            {
                                title: "Order Number", field: "orderno", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.orderno}</p>
                                    )
                                }
                            },
                            {
                                title: "GIN", field: "ginnumber", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.ginnumber}</p>
                                    )
                                }
                            },
                            { title: "Customer", field: "customer" },
                            {
                                title: "Status", field: "status", render: rowData => {


                                    return (
                                        rowData.status === 'Pending' ?
                                            <p style={{ padding: "0", margin: "0", color: 'red', fontWeight: "700" }}>{rowData.status}</p>
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
                                    openInPopup(rowData.ginnumber);
                                }
                            },
                            (rowData) => ({
                                disabled: rowData.status === 'Complete',
                                icon: 'edit',
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    setAction('Edit');
                                    openInPopup(rowData.ginnumber);
                                }
                            })
                        ]}
                    />

                </div>

                <PopUp
                    openPopup={openPopup}
                    fullScreen={true}
                    setOpenPopup={setOpenPopup}
                >
                    {
                        action === 'View' &&
                        <ViewGIN
                            GINRecords={GINRecords}
                            handleClosePopUp={handleClosePopUp}
                            setAction={setAction}
                        />}
                    {
                        (action === 'Create' || action === 'Edit') &&
                        <CreateGINForm
                            GINRecords={GINRecords}
                            handleClosePopUp={handleClosePopUp}
                            setAction={setAction}
                            updateGIN={updateGIN}
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
        </Page >
    )
}
