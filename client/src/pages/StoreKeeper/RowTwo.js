import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

//Material UI Components
import {
    Paper,
    TableHead,
    TableRow,
    TableCell,
    Grid,
    Typography,
    TablePagination,
} from '@material-ui/core';

//Material Table
import MaterialTable from 'material-table';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//Style
import style from './RowTwo.module.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tablehead: {
        position: 'sticky',
        top: 0,
        zIndex: 9999
    },
    row1: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "5px 0 2.5px 0"
        },
    },
    row2: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "2.5px 0 5px 0"
        },
    }
});

export default function RowTwo(props) {

    const { data, watch } = props;

    const classes = useStyles();

    return (

        <div className={style.container}>

            <AutoSizer>
                {({ height, width }) => {
                    const pageSize = Math.floor((height - 250) / 48);

                    return (
                        <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>
                            <MaterialTable
                                components={{
                                    Container: props => <Paper {...props} elevation={1} />,
                                    Pagination: props => (
                                        <td style={{
                                            display: "flex",
                                            flexDirection: "column"
                                        }} >
                                            <Grid container style={{ background: "#f5f5f5", padding: 5 }}>
                                                <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>  Previous credit amount to settle (Rs.) </Typography>
                                                </Grid>
                                                <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '100px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>
                                                        {NumberWithCommas(watch('creditamounttosettle'))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ background: "#f5f5f5", padding: 5 }}>
                                                <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>  Current Invoice Total (Rs.) </Typography>
                                                </Grid>
                                                <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '100px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>
                                                        {NumberWithCommas(watch('total'))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ background: "#f5f5f5", padding: 5 }}>
                                                <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>  Current Invoice Credit Amount (Rs.) </Typography>
                                                </Grid>
                                                <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '100px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>
                                                        {NumberWithCommas(watch('currentinvoicecreditamount'))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ background: "#f5f5f5", padding: 5 }}>
                                                <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>  Minimum Payment (Rs.) </Typography>
                                                </Grid>
                                                <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '100px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>
                                                        {NumberWithCommas(watch('minimumpayment'))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ background: "#f5f5f5", padding: 5 }}>
                                                <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>   Invoice Settlement Value (Rs.) </Typography>
                                                </Grid>
                                                <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '100px' }}>
                                                    <Typography style={{ fontWeight: 600 }}>
                                                        {NumberWithCommas(watch('invoicesettlementvalue'))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <TablePagination {...props} />
                                        </td>
                                    ),
                                    Header: props => (
                                        <TableHead {...props} className={classes.tablehead} >
                                            <TableRow className={classes.row1}>
                                                <TableCell width="40%" padding="none" rowSpan={2}>
                                                    <div style={{ padding: '0 10px' }}>
                                                        Description
                                                    </div>
                                                </TableCell>
                                                <TableCell padding="none" width="6%" rowSpan={2} align="center">
                                                    <div style={{ padding: '0 10px' }}>
                                                        Pcs/Case
                                                    </div>
                                                </TableCell>
                                                <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                                    <div style={{ padding: '0 10px' }}>
                                                        Selling Price (Rs.)
                                                    </div>
                                                </TableCell>
                                                <TableCell padding="none" width="6%" rowSpan={2} align="center">
                                                    <div style={{ padding: '0 10px' }}>
                                                        MRP (Rs.)
                                                    </div>
                                                </TableCell>
                                                <TableCell padding="none" colSpan={2} align="center">
                                                    Sales Qty.
                                                </TableCell>
                                                <TableCell padding="none" colSpan={2} align="center">
                                                    Free Qty.
                                                </TableCell>
                                                <TableCell padding="none" width="14%" rowSpan={2} align="center">
                                                    <div style={{ padding: '0 10px' }}>
                                                        Gross Amount (Rs.)
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className={classes.row2}>
                                                <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                                <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                                <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                                <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    ),
                                }}
                                columns={[
                                    {
                                        field: "description",
                                        cellStyle: {
                                            padding: "12px 5px 12px 7px",
                                            width: '40%',
                                            textAlign: 'left'
                                        },
                                    },
                                    {
                                        field: "piecespercase",
                                        cellStyle: {
                                            width: '6%',
                                            padding: "12px 5px 12px 7px",
                                            textAlign: 'right'
                                        },
                                    },
                                    {
                                        field: "sellingprice",
                                        render: rowData => NumberWithCommas(rowData.sellingprice),
                                        cellStyle: {
                                            width: '10%',
                                            padding: "12px 5px 12px 7px",
                                            textAlign: 'right'
                                        },
                                    },
                                    {
                                        field: "mrp",
                                        render: rowData => NumberWithCommas(rowData.mrp),
                                        cellStyle: {
                                            width: '6%',
                                            padding: "12px 5px 12px 7px",
                                            textAlign: 'right'
                                        },
                                    },
                                    {
                                        field: "salesqtycases",
                                        cellStyle: {
                                            padding: "12px 5px 12px 7px",
                                            width: '6%',
                                            textAlign: 'right'
                                        },
                                    },
                                    {
                                        field: "salesqtypieces",
                                        cellStyle: {
                                            width: '6%',
                                            padding: "12px 5px 12px 7px",
                                            textAlign: 'right'
                                        },
                                    },
                                    {
                                        field: "freeqtycases",
                                        cellStyle: {
                                            width: '6%',
                                            padding: "12px 5px 12px 7px",
                                            textAlign: 'right'
                                        },
                                    },
                                    {
                                        field: "freeqtypieces",
                                        cellStyle: {
                                            width: '6%',
                                            padding: "12px 5px 12px 7px",
                                            textAlign: 'right'
                                        },
                                    },
                                    {
                                        field: "grossamount",
                                        render: rowData => NumberWithCommas(rowData.grossamount),
                                        cellStyle: {
                                            width: '14%',
                                            padding: "12px 12px 12px 7px",
                                            textAlign: 'right'
                                        },
                                    }
                                ]}
                                data={data}
                                options={{
                                    pageSize: pageSize,
                                    pageSizeOptions: [],
                                    paging: true,
                                    toolbar: false,
                                    filter: true,
                                    search: false,
                                    headerStyle: {
                                        position: "sticky",
                                        top: "0",
                                    },
                                    rowStyle: rowData => ({
                                        fontSize: "0.8em",
                                        backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                                    })
                                }}
                            />
                        </div>
                    );
                }}
            </AutoSizer>

        </div>
    )
}
