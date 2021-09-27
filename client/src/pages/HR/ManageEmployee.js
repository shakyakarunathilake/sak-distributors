import React, { useEffect, useState } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import useTable from '../../components/useTable.js';
import TextField from '../../shared/TextField/TextField';
import PopUp from '../../shared/PopUp/PopUp';

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

export default function ManageEmployee() {

    const [headCells, setHeadCells] = useState([]);
    const [records, setRecords] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [nextEmpId, setNextEmpId] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8080/employees/get-all-employees-table-data")
            .then(res => {
                sessionStorage.setItem("EmployeesTableData", JSON.stringify(res.data));
                // const thead = JSON.parse(sessionStorage.getItem("EmployeesTableData")).thead;
                // const tbody = JSON.parse(sessionStorage.getItem("EmployeesTableData")).tbody;
                setHeadCells(res.data.thead);
                setRecords(res.data.tbody);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


    const addOrEdit = (employee) => {
        axios
            .post("http://localhost:8080/employees/create-employee", employee)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        ;

        setOpenPopup(false);
        setRecords(records);
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
            </div>
        </Page>
    )
}
