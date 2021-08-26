import React from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Shared Components
// import useTable from '../../components/useTable';
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
        })
        .catch(error => {
            console.log(error)
        });

    // const { TblContainer } = useTable(JSON.parse(localStorage.getItem("AllEmployeeData")));

    const AllEmployeeData = JSON.parse(localStorage.getItem("AllEmployeeData"));
    const { thead, tbody } = AllEmployeeData;

    return (
        <Page
            title="Employees"
            buttonText="Employee"
        >
            <div className={style.container}>
                <TableContainer component={Paper}>
                    <Table className={style.table}>
                        <TableHead className={style.tablehead}>
                            <TableRow className={style.tableheadrow}>
                                {thead.map((x, i) => (
                                    <TableCell align="center" className={style.tablecell} key={i}>{x}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tbody.map((x, i) => (
                                <TableRow className={classnames({ [style.greytablerow]: i % 2 === 1 })} key={i}>
                                    {x.map((y, i) => (
                                        <TableCell align="right" key={i}>{y}</TableCell>
                                    ))}
                                    <TableCell align="right" className={style.grid}>
                                        <VisibilityIcon className={style.visibilityIcon} />
                                        <EditIcon className={style.editIcon} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Page>
    );
};
