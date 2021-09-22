import React, { useState } from 'react';
import classnames from 'classnames';

//Shared Components
import useTable from '../../components/useTable';
import Page from '../../shared/Page/Page';
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

//SCSS Styles
import style from './Customers.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function Customers() {
    axios
        .get("http://localhost:8080/customers/get-all-customers")
        .then(res => {
            sessionStorage.setItem("AllCustomerData", JSON.stringify(res.data));
        })
        .catch(error => {
            console.log(error);
        })

    //Getting Data From Local Storage
    const AllCustomerData = JSON.parse(sessionStorage.getItem("AllCustomerData"));

    //Deconstructing into thead and tbody
    const { thead, tbody } = AllCustomerData;

    //Setting the tbody as records in useState
    const [records, setRecords] = useState(tbody);

    //Passing and Importing data to useTable
    const {
        TablePagination,
        // order,
        // orderBy,
        // handleSortRequest,
        // recordsAfterPagingAndSorting
    } = useTable(records);

    return (
        <Page
            title="Customers"
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
                    Add New Customer
                </Button>
            </div>
            <div className={style.pagecontent}>
                <TableContainer className={style.tablecontainer} component={Paper} >
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
                                            {x.label}
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
                                records.map((x, i) => (
                                    <TableRow
                                        className={classnames(
                                            { [style.greytablerow]: i % 2 === 1 },
                                            { [style.whitetablerow]: i % 2 === 0 },
                                        )}
                                        key={i}
                                    >
                                        <TableCell className={style.columnonesticky}> {x.customerid} </TableCell>
                                        <TableCell className={style.columntwosticky}> {x.storename} </TableCell>
                                        <TableCell> {x.brn} </TableCell>
                                        <TableCell> {x.fullname} </TableCell>
                                        <TableCell> {x.title} </TableCell>
                                        <TableCell> {x.firstname} </TableCell>
                                        <TableCell> {x.lastname} </TableCell>
                                        <TableCell> {x.route} </TableCell>
                                        <TableCell> {x.billingaddress} </TableCell>
                                        <TableCell> {x.shippingaddress} </TableCell>
                                        <TableCell> {x.storecontactnumber} </TableCell>
                                        <TableCell> {x.customercontactnumber} </TableCell>
                                        <TableCell> {x.email} </TableCell>
                                        <TableCell> {x.addeddate} </TableCell>
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
