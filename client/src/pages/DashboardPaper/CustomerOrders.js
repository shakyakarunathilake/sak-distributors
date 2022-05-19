import React from 'react';
import { Link } from 'react-router-dom';

//MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';

//MUI Icons
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

//SCSS style
import style from './CustomerOrders.module.scss';

export default function CustomerOrders(props) {

    const { employeedetails } = props;

    return (
        <div className={style.container}>

            <div className={style.head}>
                Pending Invoices
            </div>

            <div className={style.body}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} >
                        <TableHead sx={{ fontWeight: 900 }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Order Number</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Route</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.customerOrders.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ padding: "8px" }}>{row.orderno} </TableCell>
                                    <TableCell sx={{ padding: "8px" }}>{row.route}</TableCell>
                                    <TableCell sx={{ color: "#2196F3", fontWeight: 700, padding: "8px" }}>
                                        {
                                            row.status === 'Pending' ?
                                                <p style={{ padding: "0", margin: "0", color: "#5E01AE", fontWeight: "700" }}>{row.status}</p>
                                                : row.status === 'Processing' ?
                                                    <p style={{ padding: "0", margin: "0", color: "#2196F3", fontWeight: "700" }}>{row.status}</p>
                                                    : row.status === 'Dispatched' ?
                                                        <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{row.status}</p>
                                                        : row.status === 'Delivered' ?
                                                            <p style={{ padding: "0", margin: "0", color: "#FF8400", fontWeight: "700" }}>{row.status}</p>
                                                            : <p style={{ padding: "0", margin: "0", color: "#4caf50", fontWeight: "700" }}>{row.status}</p>
                                        }
                                    </TableCell>
                                    <TableCell sx={{ padding: "8px" }}>
                                        <IconButton>
                                            <Link to={`/${employeedetails.designation.replace(/\s+/g, '-').toLowerCase()}/sales-and-invoice`} >
                                                <NavigateNextIcon
                                                    className={style.icon}
                                                />
                                            </Link>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div >
    )
}
