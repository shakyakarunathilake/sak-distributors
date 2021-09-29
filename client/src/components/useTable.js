import React from 'react';
import classnames from 'classnames';

//Material UI 
import {
    TableContainer as MuiTableContainer,
    Paper,
    Table as MuiTable,
    TableHead as MuiTableHead,
    TableRow,
    TableCell
} from '@material-ui/core';

//SCSS styles
import style from './useTable.module.scss';

export default function useTable(headCells) {

    const TableContainer = (props) => (
        <MuiTableContainer className={style.tablecontainer} component={Paper}>
            <MuiTable>
                {props.children}
            </MuiTable>
        </MuiTableContainer>
    )

    const TableHead = (props) => (
        <MuiTableHead className={style.tablehead}>
            <TableRow className={style.tableheadrow}>
                {
                    headCells.map((x, i) => (
                        <TableCell
                            align="left"
                            className={style.tablecell}
                            key={i}
                        >
                            {x}
                        </TableCell>
                    ))
                }
                <TableCell
                    align="center"
                    className={classnames(style.actioncolumn, style.tableheadfontstyles)}
                >
                    Action
                </TableCell>
            </TableRow>
        </MuiTableHead>
    )

    return {
        TableContainer,
        TableHead
    }
}

