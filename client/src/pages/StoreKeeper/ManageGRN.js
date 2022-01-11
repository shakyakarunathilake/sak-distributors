import React, { useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

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
import CreateGRNForm from './CreateGRNForm';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageGRN() {

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
            .post(`http://localhost:8080/grn/create-grnnumber/${grnnumber}`, grn)
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
        <Page title="Manage GRN">
            <div className={style.container}>

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
                                                width: "15%",
                                                textAlign: 'left'
                                            },
                                            render: rowData => {
                                                return (
                                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.ponumber}</p>
                                                )
                                            }
                                        },
                                        {
                                            title: "GRN",
                                            field: "grnnumber",
                                            cellStyle: {
                                                width: "15%",
                                                textAlign: 'left'
                                            },
                                            render: rowData => {
                                                return (
                                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.grnnumber}</p>
                                                )
                                            }
                                        },
                                        {
                                            title: "Supplier",
                                            field: "supplier",
                                            cellStyle: {
                                                width: "25%",
                                                textAlign: 'left'
                                            },
                                        },
                                        {
                                            title: "Created by",
                                            field: "createdby",
                                            cellStyle: {
                                                width: "15%",
                                                textAlign: 'left'
                                            },
                                        },
                                        {
                                            title: "Created at",
                                            field: "createdat",
                                            cellStyle: {
                                                width: "15%",
                                                textAlign: 'left'
                                            },
                                        },
                                        {
                                            title: "Status",
                                            field: "status",
                                            cellStyle: {
                                                width: "15%",
                                                textAlign: 'left'
                                            },
                                            render: rowData => {
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

                            </div>
                        );
                    }}
                </AutoSizer>

                <PopUp
                    openPopup={openPopup}
                    fullScreen={true}
                    setOpenPopup={setOpenPopup}
                >
                    {
                        action === 'View' &&
                        <ViewGRN
                            GRNRecords={GRNRecords}
                            handleClosePopUp={handleClosePopUp}
                            setAction={setAction}
                        />}
                    {
                        action === 'Edit' &&
                        <CreateGRNForm
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
