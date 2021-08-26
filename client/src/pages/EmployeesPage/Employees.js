import React, { useState } from 'react';
import classnames from 'classnames';

//Material UI Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Material UI Icons


//Shared Components
import useTable from '../../components/useTable';
import Page from '../../shared/Page/Page';

//SCSS Styles
import style from './Employees.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function Employees() {
    axios
        .get("http://localhost:8080/employees/get-all-employees")
        .then(res => {
            localStorage.setItem("AllEmployeeData", JSON.stringify(res.data));
            console.log(res.data);
        })
        .catch(error => {
            console.log(error)
        });

    // const { TblContainer } = useTable(JSON.parse(localStorage.getItem("AllEmployeeData")));

    const AllEmployeeDate = JSON.parse(localStorage.getItem("AllEmployeeData"));

    return (
        <Page
            title="Employees"
            buttonText="Employee"
        >
            <div className={style.container}>
                <TableContainer component={Paper}>
                    <Table className={style.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((AllEmployeeData) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Page>
    );
};
