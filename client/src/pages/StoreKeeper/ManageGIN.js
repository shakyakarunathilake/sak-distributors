import React, { useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrintIcon from '@mui/icons-material/Print';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './ManageGIN.module.scss';

//Pop Up Forms
import ViewGIN from './ViewGINForm';
import CreateGINForm from './CreateGINForm';
import DispatchCompleteForm from './DispatchCompleteForm';
import PrintGINForm from './PrintGINForm';

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

    const [action, setAction] = useState('');
    const [orderRecords, setOrderRecords] = useState([]);
    const [GINRecords, setGINRecords] = useState(null);
    const [routeOptions, setRouteOptions] = useState([]);
    const [inChargeOptions, setInChargeOptions] = useState([]);
    const [vehicleOptions, setVehicleOptions] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);
    const [reRender, setReRender] = useState(null);

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

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
        setGINRecords(null);
        setOpenPopup(false);
        setAction('');
    }

    useEffect(() => {
        if (employeedetails.designation === 'Delivery Representative') {
            axios
                .get(`http://localhost:8080/gin/get-all-gin-table-data/${employeedetails.firstname} ${employeedetails.lastname} (${employeedetails.employeeid})`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setRecords(res.data.tbody);
                    setReRender(null);
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            axios
                .get("http://localhost:8080/gin/get-all-gin-table-data/", {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setRecords(res.data.tbody);
                    setReRender(null);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [reRender]); //eslint-disable-line react-hooks/exhaustive-deps

    const getInChargeVehicleOptions = () => {
        axios
            .get('http://localhost:8080/options/employee-options-for-gin', {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setInChargeOptions(res.data.employeeOptions)
            })
            .catch(error => {
                console.log(error)
            })

        axios
            .get('http://localhost:8080/options/vehicle-options-for-gin', {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setVehicleOptions(res.data.vehicleOptions)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getRouteOptions = () => {
        axios
            .get("http://localhost:8080/options/route-options", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setRouteOptions(res.data.routeOptions);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getOrderRecords = () => {
        axios
            .get('http://localhost:8080/orders/get-order-records', {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setOrderRecords(res.data.orderRecords)
            })
            .catch(error => {
                console.log(error)
            })

    }

    const openInPopup = ginnumber => {

        if (action === 'Dispatch') {
            setGINRecords({ 'ginnumber': ginnumber });
            setOpenPopup(true);
        } else {
            axios
                .get(`http://localhost:8080/gin/${ginnumber}`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setGINRecords(res.data.gin);
                    setOpenPopup(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    const addOrEdit = (gin, ginnumber,) => {

        for (let [key, value] of gin.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
            axios
                .post(`http://localhost:8080/gin/create-gin`, gin, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(ginnumber);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if (action === "Dispatch") {
            axios
                .post(`http://localhost:8080/gin/approve-dispatch/${ginnumber}`, gin, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(ginnumber);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        setAction('');
        setGINRecords(null);
        handleClosePopUp();
    }

    let status = {
        "Pending": 1,
        "Processing": 2,
        "Dispatched": 3,
        "Complete": 4,
    }

    return (
        <Page title="Manage GIN">

            <div className={style.container}>

                {
                    employeedetails.designation !== 'Delivery Representative' &&

                    <div className={style.actionRow}>
                        <Button
                            className={style.button}
                            color="primary"
                            size="medium"
                            variant="contained"
                            onClick={
                                () => {
                                    getOrderRecords();
                                    getRouteOptions();
                                    setAction('Create');
                                    setOpenPopup(true);
                                }
                            }
                        >
                            <AddCircleIcon className={style.icon} />
                            Create New GIN
                        </Button>

                    </div>
                }

                <div className={employeedetails.designation === "Store Keeper" ? style.pagecontent1 : style.pagecontent2}>

                    <AutoSizer>
                        {({ height, width }) => {
                            const pageSize = Math.floor((height - 199.27) / 48);
                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "#",
                                                field: "tableData.id",
                                                cellStyle: {
                                                    width: '3%',
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return rowData.tableData.id + 1
                                                }
                                            },
                                            {
                                                title: "GIN",
                                                field: "ginnumber",
                                                cellStyle: {
                                                    width: employeedetails.designation === "Delivery Representative" ? "32.3%" : "15%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.ginnumber}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Route",
                                                field: "route",
                                                cellStyle: {
                                                    width: employeedetails.designation === "Delivery Representative" ? "32.3%" : "20%",
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "In Charge",
                                                field: "incharge",
                                                hidden: employeedetails.designation === "Delivery Representative",
                                                cellStyle: {
                                                    width: "25%",
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Status",
                                                field: "status",
                                                cellStyle: {
                                                    width: employeedetails.designation === "Delivery Representative" ? "32.3%" : "15%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        rowData.status === 'Pending' ?
                                                            <p style={{ padding: "0", margin: "0", color: 'red', fontWeight: "700" }}>{rowData.status}</p>
                                                            : rowData.status === 'Processing' ?
                                                                <p style={{ padding: "0", margin: "0", color: "#2196F3", fontWeight: "700" }}>{rowData.status}</p>
                                                                : rowData.status === 'Dispatched' ?
                                                                    <p style={{ padding: "0", margin: "0", color: "#FF8400", fontWeight: "700" }}>{rowData.status}</p>
                                                                    : <p style={{ padding: "0", margin: "0", color: "#4caf50", fontWeight: "700" }}>{rowData.status}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Created by",
                                                field: "createdby",
                                                hidden: employeedetails.designation === "Delivery Representative",
                                                cellStyle: {
                                                    width: "17%",
                                                    textAlign: 'left'
                                                },
                                            },
                                        ]}
                                        data={records.sort((a, b) => status[a.status] - status[b.status])}
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
                                                    openInPopup(rowData.ginnumber);
                                                }
                                            },
                                            (rowData) => ({
                                                disabled: rowData.status !== 'Processing' || employeedetails.designation === "Delivery Representative",
                                                icon: LocalShippingIcon,
                                                tooltip: 'Dispatch',
                                                onClick: (event, rowData) => {
                                                    setAction('Dispatch');
                                                    getInChargeVehicleOptions();
                                                    openInPopup(rowData.ginnumber);
                                                }
                                            }),
                                            {
                                                icon: PrintIcon,
                                                tooltip: 'View',
                                                onClick: (event, rowData) => {
                                                    setAction('Print');
                                                    openInPopup(rowData.ginnumber);
                                                }
                                            },
                                        ]}
                                    />

                                </div>
                            );
                        }}
                    </AutoSizer>

                </div>

                <PopUp
                    openPopup={openPopup}
                    fullScreen={(action === 'Complete' || action === 'Dispatch') ? false : true}
                    setOpenPopup={setOpenPopup}
                >

                    {
                        action === 'View' &&
                        <ViewGIN
                            GINRecords={GINRecords}
                            handleClosePopUp={handleClosePopUp}
                            action={action}
                        />
                    }

                    {
                        action === 'Create' &&
                        <CreateGINForm
                            GINRecords={GINRecords}
                            handleClosePopUp={handleClosePopUp}
                            action={action}
                            addOrEdit={addOrEdit}
                            orderRecords={orderRecords}
                            routeOptions={routeOptions}
                        />
                    }

                    {
                        action === 'Dispatch' &&
                        <DispatchCompleteForm
                            GINRecords={GINRecords}
                            handleClosePopUp={handleClosePopUp}
                            addOrEdit={addOrEdit}
                            action={action}
                            inChargeOptions={inChargeOptions}
                            vehicleOptions={vehicleOptions}
                        />
                    }

                    {
                        action === 'Print' &&
                        <PrintGINForm
                            GINRecords={GINRecords}
                            handleClosePopUp={handleClosePopUp}
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
