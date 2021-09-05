import React, { useState, useEffect } from 'react';

//Material UI Styling
import { makeStyles } from '@material-ui/core/styles';

//Material UI Components
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '20px 10px'
    }
}));

export default function useTable(records) {

    const classes = useStyles();

    //States for Pagination
    const [page, setPage] = useState(0);

    //Pagination Count
    const rowsPerPage = Math.floor((window.innerHeight - 323.45) / 57.56)
    const paginationCount = Math.ceil(records.length / rowsPerPage);


    const handleChangePage = (event, newPage) => {
        // console.log("newPage: ", newPage)
        setPage(newPage - 1);
    }

    const recordsAfterPaging = () => {
        return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const TablePagination = () => (
        <Pagination
            page={page + 1}
            count={paginationCount}
            onChange={handleChangePage}
            color="primary"
            size="small"
            className={classes.pagination}
            disabled={paginationCount === 1 ? true : false}
        />
    )


    return {
        TablePagination,
        recordsAfterPaging,
    }

}