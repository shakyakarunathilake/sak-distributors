import React, { useState } from 'react';
import classnames from 'classnames';

//Material UI Components
import {
    TablePagination as MuiTablePagination,
    TableHead as MuiTableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    makeStyles,
    withTheme
} from '@material-ui/core';

//SCSS Styles
import style from './useTable.module.scss';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTableSortLabel-root': {
            color: 'white'
        },
        '& .MuiTableSortLabel-active': {
            color: 'white'
        },
    }
}))

export default function useTable(thead, records) {

    const classes = useStyles();

    const pages = [5, 10, 25, 50];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TableHead = props => {
        const handleSortRequest = cellid => {
            const isAsc = orderBy === cellid && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellid)
        }

        return (
            <MuiTableHead className={style.tablehead}>
                <TableRow className={style.tableheadrow}>
                    {
                        thead.map((x, i) => (
                            <TableCell
                                align="center"
                                className={classnames(
                                    { [style.columnonesticky]: i === 0 },
                                    { [style.columntwosticky]: i === 1 },
                                    { [classes.root]: i === 1 },
                                    style.tablecell
                                )}
                                key={x.id}
                            >
                                <TableSortLabel
                                    active={orderBy === x.id}
                                    direction={orderBy === x.id ? order : "asc"}
                                    className={style.tablesortlabel}
                                    onClick={() => { handleSortRequest(x.id) }}
                                >
                                    {x.label}
                                </TableSortLabel>
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
            </MuiTableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

    }

    const TablePagination = () => (
        <MuiTablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )

    const recordsAfterPagingAndSorting = () => {
        return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    return {
        TableHead,
        // handleSortRequest,
        TablePagination,
        recordsAfterPagingAndSorting,
    }
}
