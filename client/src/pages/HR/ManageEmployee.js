import React, { useEffect, useState } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import useTable from '../../components/useTable.js';
import TextField from '../../shared/TextField/TextField';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageEmployee.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

//Employee Form
import EmployeeForm from './EmployeeForm';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageEmployee() {

    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();
    const [type, setType] = React.useState();
    const [headCells, setHeadCells] = useState([]);
    const [records, setRecords] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [nextEmpId, setNextEmpId] = useState();
    const [reRender, setReRender] = useState(false);

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
                // const thead = JSON.parse(sessionStorage.getItem("EmployeesTableData")).thead;
                // const tbody = JSON.parse(sessionStorage.getItem("EmployeesTableData")).tbody;
                setHeadCells(res.data.thead);
                setRecords(res.data.tbody);
                setReRender(false);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const addOrEdit = (employee) => {
        axios
            .post("http://localhost:8080/employees/create-employee", employee)
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
            })
            .catch(err => {
                console.log(err);
            });
        ;

        setOpenPopup(false);
        setRecords(records);
        setReRender(true);
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
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

    const { Table } = useTable(headCells, records);

    return (
        <Page title="Manage Employees">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
                            color="primary"
                            className={style.searchtextfield}
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                getNextEmployeeId();
                                setOpenPopup(true);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Employee
                    </Button>
                </div>

                <div className={style.pagecontent}>
                    <Table />
                </div>
                <PopUp
                    openPopup={openPopup}
                >
                    <EmployeeForm
                        addOrEdit={addOrEdit}
                        recordForEdit={recordForEdit}
                        setOpenPopup={setOpenPopup}
                        nextEmpId={nextEmpId}
                    />
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
