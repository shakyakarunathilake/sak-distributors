import React, { useState } from 'react';
import classnames from 'classnames';

//Shared Components
import useTable from '../../components/useTable';
import Page from '../../shared/Page/Page';
import TextField from '../../shared/TextField/TextField';

//Material UI 
import Button from '@material-ui/core/Button';
import { Table, TableBody, TableRow, TableCell, TableSortLabel } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';


//Material UI Icons
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

//SCSS Styles
import style from './Employees.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function Employees() {
    axios
        .get("http://localhost:8080/employees/get-all-employees")
        .then(res => {
            localStorage.setItem("AllEmployeeData", JSON.stringify(res.data));
        })
        .catch(error => {
            console.log(error);
        });
    ;

    console.log(JSON.parse(localStorage.getItem("AllEmployeeData")));

    //Getting Data From Local Storage
    const AllEmployeeData = JSON.parse(localStorage.getItem("AllEmployeeData"));

    //Deconstructing into thead and tbody
    const { thead, tbody } = AllEmployeeData;

    //Setting the tbody as records in useState
    const [records, setRecords] = useState(tbody);

    //Passing and Importing data to useTable
    const {
        TableContainer,
        TableHead,
        TablePagination,
        recordsAfterPagingAndSorting
    } = useTable(thead, records);

    return (
        <Page
            title="Employees"
        >
            <div className={style.actionRow}>
                <div className={style.search}>
                    <TextField
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
                    variant="contained">
                    <AddCircleIcon className={style.icon} />
                    Add New Employee
                </Button>
            </div>
            <div className={style.tablecontainer}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow className={style.tableheadrow}>
                                {
                                    thead.map((x, i) => (
                                        <TableCell
                                            align="center"
                                            className={classnames(
                                                { [style.columnonesticky]: i === 0 },
                                                { [style.columntwosticky]: i === 1 },
                                                style.tablecell
                                            )}
                                            key={x.id}
                                        >
                                            <TableSortLabel
                                                className={style.tablesortlabel}
                                            >
                                                {x.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))
                                }
                                <TableCell
                                    align="center"
                                    className={classnames(style.columnlaststicky, style.tableheadfontstyles)}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={style.tablebody}>
                            {
                                recordsAfterPagingAndSorting().map((x, i) => (
                                    <TableRow
                                        className={classnames(
                                            { [style.greytablerow]: i % 2 === 1 },
                                            { [style.whitetablerow]: i % 2 === 0 },
                                        )}
                                        key={i}
                                    >
                                        <TableCell className={style.columnonesticky}> {x.employeeid} </TableCell>
                                        <TableCell className={style.columntwosticky}> {x.fullname} </TableCell>
                                        <TableCell> {x.title} </TableCell>
                                        <TableCell> {x.firstname} </TableCell>
                                        <TableCell> {x.lastname} </TableCell>
                                        <TableCell> {x.employeestatus} </TableCell>
                                        <TableCell> {x.designation} </TableCell>
                                        <TableCell> {x.hireddate} </TableCell>
                                        <TableCell> {x.nic} </TableCell>
                                        <TableCell> {x.contactnumber} </TableCell>
                                        <TableCell> {x.email} </TableCell>
                                        <TableCell> {x.address} </TableCell>
                                        <TableCell> {x.dob} </TableCell>
                                        <TableCell> {x.gender} </TableCell>
                                        <TableCell> {x.civilstatus} </TableCell>
                                        <TableCell
                                            align="center"
                                            className={style.columnlaststicky}
                                        >
                                            <VisibilityIcon className={style.visibilityIcon} />
                                            <EditIcon className={style.editIcon} />
                                        </TableCell>
                                    </TableRow>

                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination />
            </div>
        </Page>
    );
};
