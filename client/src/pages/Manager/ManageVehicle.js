import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageVehicle.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Vehicle Form
import VehicleForm from './VehicleForm';
import ViewVehicle from './ViewVehicle';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageVehicle() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [vehicleRecords, setVehicleRecords] = useState(null);
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
            .get("http://localhost:8080/vehicles/get-all-vehicle-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                sessionStorage.setItem("VehicleTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const handleClosePopUp = () => {
        setOpenPopup(false)
        setVehicleRecords(null)
        setAction('');
    }

    const addOrEdit = (vehicle, licenseplatenumber) => {

        for (let [key, value] of vehicle.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
            axios
                .post("http://localhost:8080/vehicles/add-vehicle", vehicle, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(licenseplatenumber);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        if (action === "Edit") {
            axios
                .post(`http://localhost:8080/vehicles/update-by-licenseplatenumber/${licenseplatenumber}`, vehicle, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(licenseplatenumber);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        handleClosePopUp();
    }

    const openInPopup = licenseplatenumber => {
        axios
            .get(`http://localhost:8080/vehicles/${licenseplatenumber}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setVehicleRecords(res.data.vehicle);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Page title="Manage Vehicles">

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
                        Add New Vehicle
                    </Button>

                </div>

                <div className={style.pagecontent}>

                    <AutoSizer>
                        {({ height, width }) => {

                            const pageSize = Math.floor((height - 199.28) / 48);

                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "License Plate No.",
                                                field: "licenseplatenumber",
                                                cellStyle: {
                                                    width: "14%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.licenseplatenumber}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Vehicle",
                                                field: "vehicle",
                                                cellStyle: {
                                                    width: "14%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Ownership",
                                                field: "ownership",
                                                cellStyle: {
                                                    width: "14%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Owner",
                                                field: "vehicleowner",
                                                cellStyle: {
                                                    width: "33%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Rate (Rs)",
                                                field: "rate",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Status",
                                                field: "status",
                                                cellStyle: {
                                                    width: "10%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        rowData.status === "Active" ?
                                                            <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                                            <p style={{ padding: "0", margin: "0", color: "#FC6A03", fontWeight: "700" }}>{rowData.status}</p>
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
                                                    openInPopup(rowData.licenseplatenumber);
                                                    setAction('View');
                                                }
                                            },
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    openInPopup(rowData.licenseplatenumber);
                                                    setAction('Edit');
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
                    fullscreen={false}
                >

                    {
                        action === 'View' &&
                        <ViewVehicle
                            vehicleRecords={vehicleRecords}
                            handleClosePopUp={handleClosePopUp}
                            setAction={setAction}
                            action={action}
                        />
                    }

                    {
                        (action === 'Edit' || action === 'Create') &&
                        <VehicleForm
                            addOrEdit={addOrEdit}
                            vehicleRecords={vehicleRecords}
                            handleClosePopUp={handleClosePopUp}
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

            </div>

        </Page>
    )
}
