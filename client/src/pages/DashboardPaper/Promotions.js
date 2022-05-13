import React from 'react';

//MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';

//SCSS Style 
import style from './Promotions.module.scss';

export default function Promotions(props) {

    return (
        <div className={style.container}>

            <div className={style.head}>
                Promotions
            </div>

            <div className={style.body}>
                <TableContainer>
                    <Table sx={{ minWidth: 600 }} >
                        <TableHead sx={{ fontWeight: 900 }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, width: "80.59px", padding: "5px" }}>Prod. Image</TableCell>
                                <TableCell sx={{ fontWeight: 700, padding: "5px" }}>P. ID & V. ID</TableCell>
                                <TableCell sx={{ fontWeight: 700, padding: "5px" }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, padding: "5px" }}>Offer</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.promotions.map((row) => (
                                <TableRow
                                    key={row.productid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ padding: "5px" }} >
                                        <Avatar alt={row.name} src={`http://${row.productimage}`} className={style.avatar} />
                                    </TableCell>
                                    <TableCell sx={{ padding: "5px" }}>{row.productid} {row.variantid}</TableCell>
                                    <TableCell sx={{ padding: "5px" }}>{row.name}</TableCell>
                                    <TableCell sx={{ padding: "5px" }}>{row.offercaption}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}