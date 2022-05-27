import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageRoutes.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Route Form
import RouteForm from './RouteForm';
import ViewRoute from './ViewRoute';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageRoute() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [routeRecords, setRouteRecords] = useState(null);
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
            .get("http://localhost:8080/routes/get-all-route-table-data", {
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
    }, [reRender]);

    const handleClosePopUp = () => {
        setOpenPopup(false);
        setRouteRecords(null);
        setAction('');
    }

    const addOrEdit = (route, routeid) => {

        for (let [key, value] of route.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
            axios
                .post("http://localhost:8080/routes/add-route", route, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(routeid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        if (action === "Edit") {
            axios
                .post(`http://localhost:8080/routes/update-by-id/${routeid}`, route, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(routeid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        handleClosePopUp();
    }

    const openInPopup = routeid => {
        axios
            .get(`http://localhost:8080/routes/${routeid}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setRouteRecords(res.data.route);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Page title="Manage Routes">

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
                        Add New Route
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
                                                title: "Route ID",
                                                field: "routeid",
                                                cellStyle: {
                                                    width: "20%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.routeid}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Route",
                                                field: "title",
                                                cellStyle: {
                                                    width: "25%",
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
                                            {
                                                title: "Added date",
                                                field: "addeddate",
                                                cellStyle: {
                                                    width: "20%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Added by",
                                                field: "addedby",
                                                cellStyle: {
                                                    width: "25%",
                                                    textAlign: 'left'
                                                }
                                            }
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
                                                    openInPopup(rowData.routeid);
                                                    setAction('View');
                                                }
                                            },
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    openInPopup(rowData.routeid);
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
                        <ViewRoute
                            routeRecords={routeRecords}
                            handleClosePopUp={handleClosePopUp}
                            setAction={setAction}
                            action={action}
                        />
                    }

                    {
                        (action === 'Edit' || action === 'Create') &&
                        <RouteForm
                            addOrEdit={addOrEdit}
                            routeRecords={routeRecords}
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
