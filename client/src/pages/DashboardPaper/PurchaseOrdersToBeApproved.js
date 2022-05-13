import React from 'react';

//MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//SCSS style
import style from './PurchaseOrdersToBeApproved.module.scss';

export default function PurchaseOrdersToBeApproved(props) {

    return (
        <div className={style.container}>

            <div className={style.head}>
                Purchase Orders to be Approved
            </div>

            <div className={style.body}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} >
                        <TableHead sx={{ fontWeight: 900 }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>PO Number</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Created By</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.purchaseOrders.map((row) => (
                                <TableRow
                                    key={row.ponumber}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.ponumber} </TableCell>
                                    <TableCell>{row.createdat}</TableCell>
                                    <TableCell>{row.createdby}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
