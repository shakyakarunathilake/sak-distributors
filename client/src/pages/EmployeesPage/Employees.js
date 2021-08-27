import React, { useState } from 'react';

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

    console.log(JSON.parse(localStorage.getItem("AllEmployeeData")));

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
                <TableContainer />
            </div>
        </Page>
    );
};
