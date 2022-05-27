import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageEmployee.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Employee Form
import EmployeeForm from './EmployeeForm';
import ViewEmployee from './ViewEmployee';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageEmployee() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [employeeRecords, setEmployeeRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextEmpId, setNextEmpId] = useState();
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
            .get("http://localhost:8080/employees/get-all-employees-table-data", {
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

    const addOrEdit = (employee, employeeid) => {

        for (let [key, value] of employee.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
            axios
                .post("http://localhost:8080/employees/create-employee", employee, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(employeeid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        if (action === "Edit") {
            axios
                .post(`http://localhost:8080/employees/update-by-id/${employeeid}`, employee, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(employeeid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        setEmployeeRecords(null)
        setOpenPopup(false);
        setAction('');
    }

    const openInPopup = employeeid => {
        axios
            .get(`http://localhost:8080/employees/${employeeid}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setEmployeeRecords(res.data.employee);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextEmployeeId = () => {
        axios
            .get("http://localhost:8080/employees/get-next-regno", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setNextEmpId(res.data.nextemployeeid);
                setAction('Create');
                setEmployeeRecords(null);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Page title="Manage Employees">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                getNextEmployeeId();
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Employee
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
                                                    width: "14%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Contact No.",
                                                field: "contactnumber",
                                                cellStyle: {
                                                    width: "14%",
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
                                                                <p style={{ padding: "0", margin: "0", color: "#FC6A03", fontWeight: "700" }}>{rowData.status}</p> :
                                                                <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{rowData.status}</p>

                                                    )
                                                }
                                            },
                                            {
                                                title: "Hired Date",
                                                field: "hireddate",
                                                cellStyle: {
                                                    width: "14%",
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
                                                    openInPopup(rowData.employeeid);
                                                }
                                            },
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    setAction('Edit');
                                                    openInPopup(rowData.employeeid);
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
                >
                    {
                        action === 'View' &&
                        <ViewEmployee
                            employeeRecords={employeeRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                            action={action}
                        />
                    }
                    {
                        (action === 'Create' || action === "Edit") &&
                        <EmployeeForm
                            addOrEdit={addOrEdit}
                            employeeRecords={employeeRecords}
                            setOpenPopup={setOpenPopup}
                            nextEmpId={nextEmpId}
                            action={action}
                        />
                    }
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
