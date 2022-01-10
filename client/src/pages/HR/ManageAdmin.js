import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageAdmin.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveModeratorSharpIcon from '@mui/icons-material/RemoveModeratorSharp';

//Admin Form
import AdminForm from './AdminForm.js';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageAdmin() {

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();

    const [records, setRecords] = useState([]);

    const [employeeID, setEmployeeID] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [employeeOptions, setEmployeeOptions] = useState(null);

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
        setEmployeeID('')
        setAction('');
    }

    useEffect(() => {
        axios
            .get("http://localhost:8080/admin/get-all-admin-table-data")
            .then(res => {
                sessionStorage.setItem("EmployeesTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const getEmployeeOptions = () => {
        axios
            .get("http://localhost:8080/options/employee-options-for-admin")
            .then(res => {
                setEmployeeOptions(res.data.employeeOptions);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const openInPopup = (employeeid, name) => {
        setEmployeeID(employeeid);
        setEmployeeName(name);
        setOpenPopup(true);
    }

    const addAdmin = (admin, employeeid) => {
        for (let [key, value] of admin.entries()) {
            console.log(key, value);
        }

        axios
            .post(`http://localhost:8080/admin/add-admin`, admin)
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
                setReRender(employeeid);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Page title="Manage Admins">
            <div className={style.container}>
                <div className={style.actionRow}>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Add');
                                setOpenPopup(true);
                                getEmployeeOptions();
                                setEmployeeID(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Admin
                    </Button>
                </div>
                <div className={style.pagecontent}>

                    <AutoSizer>
                        {({ height, width }) => {
                            const pageSize = Math.floor((height - 199.27) / 48);
                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>
                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "Employee ID",
                                                field: "employeeid",
                                                cellStyle: {
                                                    width: "13%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.employeeid}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Title",
                                                field: "title",
                                                cellStyle: {
                                                    width: "7%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Name",
                                                field: "name",
                                                cellStyle: {
                                                    width: "20%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Designation",
                                                field: "designation",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Contact No.",
                                                field: "contactnumber",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Status",
                                                field: "status",
                                                cellStyle: {
                                                    width: "13%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        rowData.status === "Active" ?
                                                            <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                                            rowData.status === "Inactive" ?
                                                                <p style={{ padding: "0", margin: "0", color: "red", fontWeight: "700" }}>{rowData.status}</p> :
                                                                <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{rowData.status}</p>

                                                    )
                                                }
                                            },
                                            {
                                                title: "Hired Date",
                                                field: "hireddate",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                },
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
                                            // maxBodyHeight: "calc(100vh - 199.27px)",
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
                                                icon: RemoveModeratorSharpIcon,
                                                tooltip: 'Remove',
                                                onClick: (event, rowData) => {
                                                    setAction('Remove');
                                                    openInPopup(rowData.employeeid, rowData.name);
                                                },
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
                >
                    <AdminForm
                        employeeID={employeeID}
                        employeeName={employeeName}
                        handleClosePopUp={handleClosePopUp}
                        employeeOptions={employeeOptions}
                        addAdmin={addAdmin}
                        action={action}
                    />
                </PopUp>
                <Snackbar
                    open={open}
                    autoHideDuration={1500}
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
