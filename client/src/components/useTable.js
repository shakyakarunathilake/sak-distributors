import React from 'react';
import classnames from 'classnames';

//Material UI 
import {
    TableContainer,
    Paper,
    Table as MuiTable,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';

//Material UI Icons
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

//SCSS styles
import style from './useTable.module.scss';

export default function useTable(thead, trecords) {

    const Table = (props) => (
        <TableContainer className={style.tablecontainer} component={Paper} >
            <MuiTable>
                <TableHead className={style.tablehead}>
                    <TableRow className={style.tableheadrow}>
                        {/* {
                            thead.map((x, i) => (
                                <TableCell
                                    align="left"
                                    className={style.tablecell}
                                    key={x.id}
                                >
                                    {x.label}
                                </TableCell>
                            ))
                        } */}

                        {/* Development Stage */}
                        <TableCell align="center" className={style.tablecell}> Employee ID </TableCell>
                        <TableCell align="center" className={style.tablecell}> Title </TableCell>
                        <TableCell align="center" className={style.tablecell}> Name </TableCell>
                        <TableCell align="center" className={style.tablecell}> Designation </TableCell>
                        <TableCell align="center" className={style.tablecell}> Employee Status </TableCell>
                        {/* End */}

                        <TableCell
                            align="center"
                            className={classnames(style.actioncolumn, style.tableheadfontstyles)}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={style.tablebody}>
                    <TableRow>
                        {/* {
                            trecords.map((row, i) => (
                                <TableRow
                                    className={classnames(
                                        { [style.greytablerow]: i % 2 === 1 },
                                        { [style.whitetablerow]: i % 2 === 0 },
                                    )}
                                    key={i}
                                >
                                    {
                                        row.map((cell, i) => (
                                            <TableCell key={cell.id} >
                                                {cell.label}
                                            </TableCell>
                                        ))
                                    }
                                    <TableCell
                                        align="center"
                                        className={style.actioncolumn}
                                    >
                                        <VisibilityIcon
                                            className={style.visibilityIcon}
                                        />
                                        <EditIcon
                                            className={style.editIcon}
                                        // onClick={() => {
                                        //     openInPopup(row[0].label);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                            ))
                        } */}


                        {/* Development Stage */}
                        <TableCell align="center"> E00001 </TableCell>
                        <TableCell align="center"> Miss </TableCell>
                        <TableCell align="center"> Shakya Karunathilake </TableCell>
                        <TableCell align="center"> Distributor </TableCell>
                        <TableCell align="center"> Active </TableCell>
                        {/* End */}


                        <TableCell
                            align="center"
                            className={style.actioncolumn}
                        >
                            <VisibilityIcon
                                className={style.visibilityIcon}
                            />
                            <EditIcon
                                className={style.editIcon}
                            // onClick={() => {
                            //     openInPopup(row[0].label);
                            // }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </MuiTable>
        </TableContainer>
    )


    return {
        Table,
    }
}

