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
import VisibilityIcon from '@mui/icons-material/Visibility';

//SCSS style
import style from './CustomerOrders.module.scss';

//Axios
import axios from 'axios';

export default function CustomerOrders(props) {

    const { employeedetails } = props;

    const handleClick = (orderno) => {

        axios
            .get(`http://localhost:8080/orders/${orderno}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                localStorage.setItem(orderno, JSON.stringify(res.data.order));
                window.open(`http://localhost:3000/store-keeper/view-order-details/${orderno}`, "_blank");
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className={style.container}>

            <div className={style.head}>
                {employeedetails.designation === "Store Keeper" && "Pending Invoices"}
                {employeedetails.designation === "Delivery Representative" && "Dispatched Orders"}
                {employeedetails.designation === "Manager" && "Delivered Orders"}
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
                            {props.customerOrders.map(row => (
                                <TableRow
                                    key={row.orderno}
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

                                        {
                                            employeedetails.designation !== "Store Keeper" ?
                                                <IconButton>
                                                    <Link to={`/${employeedetails.designation.replace(/\s+/g, '-').toLowerCase()}/sales-and-invoice`} >
                                                        <NavigateNextIcon
                                                            className={style.icon}
                                                        />
                                                    </Link>
                                                </IconButton>
                                                :
                                                <IconButton onClick={() => handleClick(row.orderno)}>
                                                    <VisibilityIcon className={style.icon} />
                                                </IconButton>
                                        }

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
