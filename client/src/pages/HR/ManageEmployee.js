import React, { useEffect, useState } from 'react';
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
// import ApproveSubmit from './ApproveSubmit';

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
            .get("http://localhost:8080/employees/get-all-employees-table-data")
            .then(res => {
                sessionStorage.setItem("EmployeesTableData", JSON.stringify(res.data));
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
                .post("http://localhost:8080/employees/create-employee", employee)
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

        } if (action === "Edit") {
            axios
                .post(`http://localhost:8080/employees/update-by-id/${employeeid}`, employee)
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
            .get(`http://localhost:8080/employees/${employeeid}`)
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
            .get("http://localhost:8080/employees/get-next-regno")
            .then(res => {
                setNextEmpId(res.data.nextemployeeid);
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
                                setAction('Create');
                                getNextEmployeeId();
                                setOpenPopup(true);
                                setEmployeeRecords(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Employee
                    </Button>
                </div>

                <div className={style.pagecontent}>
                    <MaterialTable
                        columns={[
                            {
                                title: "Employee ID", field: "employeeid", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.employeeid}</p>
                                    )
                                }
                            },
                            { title: "Title", field: "title" },
                            { title: "Name", field: "name" },
                            { title: "Designation", field: "designation" },
                            {
                                title: "Status", field: "status", render: rowData => {
                                    return (
                                        rowData.status === "Active" ?
                                            <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                            rowData.status === "Inactive" ?
                                                <p style={{ padding: "0", margin: "0", color: "red", fontWeight: "700" }}>{rowData.status}</p> :
                                                <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{rowData.status}</p>

                                    )
                                }
                            },
                            { title: "Hired Date", field: "hireddate" },
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
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {action === 'View' ?
                        <ViewEmployee
                            employeeRecords={employeeRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                        /> :
                        <EmployeeForm
                            addOrEdit={addOrEdit}
                            employeeRecords={employeeRecords}
                            setOpenPopup={setOpenPopup}
                            nextEmpId={nextEmpId}
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
