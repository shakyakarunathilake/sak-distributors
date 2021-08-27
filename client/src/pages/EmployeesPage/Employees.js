import React, { useState } from 'react';

// //Material UI Components
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// //Material UI Icons
// import EditIcon from '@material-ui/icons/Edit';
// import VisibilityIcon from '@material-ui/icons/Visibility';

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
        })
        .catch(error => {
            console.log(error)
        });
    ;

    //Getting Data From Local Storage
    const AllEmployeeData = JSON.parse(localStorage.getItem("AllEmployeeData"));
    
    //Deconstructing into thead and tbody
    const { thead, tbody } = AllEmployeeData;

    //Setting the tbody as records in useState
    const [records, setRecords] = useState(tbody);

    //Passing and Importing data to useTable
    const { TableContainer } = useTable(thead, tbody);

    return (
        <Page
            title="Employees"
            buttonText="Employee"
        >
            <div className={style.container}>
                <TableContainer/>
            </div>
        </Page>
    );
};
