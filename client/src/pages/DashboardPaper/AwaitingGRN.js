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
import style from './AwaitingGRN.module.scss';


export default function AwaitingGRN(props) {



    return (
        <div className={style.container}>

            <div className={style.head}>
                Awaiting GRN
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
                            {props.grn.map((row) => (
                                <TableRow
                                    key={row.ponumber}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ padding: "8px" }}>{row.ponumber} </TableCell>
                                    <TableCell sx={{ padding: "8px" }}>{row.grnnumber}</TableCell>
                                    <TableCell sx={{ color: "#2196F3", fontWeight: 700, padding: "8px" }}>{row.status}</TableCell>
                                    <TableCell sx={{ padding: "8px" }}>
                                        <IconButton>
                                            <Link to="/store-keeper/manage-grn">
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
