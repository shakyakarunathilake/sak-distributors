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
import style from './ManageGRN.module.scss';

//Pop Up Forms
import ViewGRN from './ViewGRN';
import GRNForm from './GRNForm';

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

    const [GRNRecords, setGRNRecords] = useState(null);
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
            .get("http://localhost:8080/grn/get-all-grn-table-data")
            .then(res => {
                sessionStorage.setItem("GRNTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const openInPopup = grnnumber => {
        axios
            .get(`http://localhost:8080/grn/${grnnumber}`)
            .then(res => {
                setGRNRecords(res.data.grn);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateGRN = (grn, grnnumber,) => {

        for (let [key, value] of grn.entries()) {
            console.log(key, value);
        }

        axios
            .post(`http://localhost:8080/grn/update-by-grnnumber/${grnnumber}`, grn)
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
                setReRender(grnnumber);
            })
            .catch(err => {
                console.log(err);
            })

        handleClosePopUp();
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
                        {
                            title: "GRN", field: "grnnumber", render: rowData => {
                                return (
                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.grnnumber}</p>
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
                                openInPopup(rowData.grnnumber);
                            }
                        },
                        (rowData) => ({
                            disabled: rowData.status === 'Complete',
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (event, rowData) => {
                                setAction('Edit');
                                openInPopup(rowData.grnnumber);
                            }
                        })
                    ]}
                />
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {action === 'View' ?
                        <ViewGRN
                            GRNRecords={GRNRecords}
                            handleClosePopUp={handleClosePopUp}
                            setAction={setAction}
                        /> :
                        <GRNForm
                            GRNRecords={GRNRecords}
                            handleClosePopUp={handleClosePopUp}
                            setAction={setAction}
                            updateGRN={updateGRN}
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
