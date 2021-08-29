import React, { useState } from 'react';

//Material UI Components
import {
    TablePagination as MuiTablePagination,
    TableContainer as MuiTableContainer,
    TableHead as MuiTableHead,
    Paper,
} from '@material-ui/core';

//SCSS Styles
import style from './useTable.module.scss';

export default function useTable(thead, records) {

    const pages = [5, 10, 25, 50];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TableContainer = props => (
        <MuiTableContainer className={style.tablecontainer} component={Paper}>
            {props.children}
        </MuiTableContainer>
    )

    const TableHead = props => {
        return (
            <MuiTableHead className={style.tablehead}>
                {props.children}
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
        TableContainer,
        TableHead,
        TablePagination,
        recordsAfterPagingAndSorting,
    }
}
