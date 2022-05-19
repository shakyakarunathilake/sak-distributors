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
import style from './SupplierPayments.module.scss';

export default function SupplierPayments(props) {

    return (
        <div className={style.container}>

            <div className={style.head}>
                Supplier Payments To Be Paid
            </div>

            <div className={style.body}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} >
                        <TableHead sx={{ fontWeight: 900 }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>PO Number</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>GRN Number</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.supplierPayments.map((row) => (
                                <TableRow
                                    key={row.ponumber}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ padding: "8px" }}>{row.ponumber} </TableCell>
                                    <TableCell sx={{ padding: "8px" }}>{row.grnnumber}</TableCell>
                                    <TableCell sx={{ padding: "8px" }}>
                                        {
                                            row.status === "Advance Payment To Be Paid" && <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{row.status}</p>

                                        }
                                        {
                                            row.status === "Payment To Be Complete" && <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{row.status}</p>
                                        }
                                    </TableCell>
                                    <TableCell sx={{ padding: "8px" }}>
                                        <IconButton>
                                            <Link to="/purchasing-manager/manage-supplier-payment">
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

        </div>
    )
}
