import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

//Shared Components
import Page from '../../shared/Page/Page';
import Popup from '../../shared/Popup/Popup';
import TextField from '../../shared/TextField/TextField';

//Material UI 
import Button from '@material-ui/core/Button';
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

//
import EmployeesForm from './EmployeesForm';

//SCSS Styles
import style from './Employees.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function Employees() {

    useEffect(() => {
        axios
            .get("http://localhost:8080/employees/get-all-employees")
            .then(res => {
                localStorage.setItem("AllEmployeeData", JSON.stringify(res.data));
            })
            .catch(error => {
                console.log(error);
            });
        ;
    })

    console.log(JSON.parse(localStorage.getItem("AllEmployeeData")));

    //Getting Data From Local Storage
    const AllEmployeeData = JSON.parse(localStorage.getItem("AllEmployeeData"));
    const { thead, tbody } = AllEmployeeData;

    const [records, setRecords] = useState(tbody);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const addOrEdit = (employee, resetForm) => {

        axios
            .post("http://localhost:8080/employees/create-employee", employee)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        ;

        resetForm();
        setOpenPopup(false);
        setRecords(tbody);
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    return (
        <Page
            title="Employees"
        >
            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
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
                                setOpenPopup(true);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Employee
                    </Button>
                </div>

                <div className={style.pagecontent}>
                    <TableContainer className={style.tablecontainer} component={Paper} >
                        <Table>
                            <TableHead className={style.tablehead}>
                                <TableRow className={style.tableheadrow}>
                                    {
                                        thead.map((x, i) => (
                                            <TableCell
                                                align="left"
                                                className={style.tablecell}
                                                key={x.id}
                                            >
                                                {x.label}
                                            </TableCell>
                                        ))
                                    }
                                    <TableCell
                                        align="center"
                                        className={classnames(style.actioncolumn, style.tableheadfontstyles)}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={style.tablebody}>
                                {
                                    records.map((row, i) => (
                                        <TableRow
                                            className={classnames(
                                                { [style.greytablerow]: i % 2 === 1 },
                                                { [style.whitetablerow]: i % 2 === 0 },
                                            )}
                                            key={i}
                                        >
                                            {
                                                row.map((cell, i) => (
                                                    <TableCell key={cell.id} >
                                                        {cell.label}
                                                    </TableCell>
                                                ))
                                            }
                                            <TableCell
                                                align="center"
                                                className={style.actioncolumn}
                                            >
                                                <VisibilityIcon
                                                    className={style.visibilityIcon}
                                                />
                                                <EditIcon
                                                    className={style.editIcon}
                                                    onClick={() => {
                                                        openInPopup(row[0].label);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div >

                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <EmployeesForm
                        title='New Employee'
                        addOrEdit={addOrEdit}
                        recordForEdit={recordForEdit}
                    />
                </Popup>
            </div>
        </Page >
    );
};
