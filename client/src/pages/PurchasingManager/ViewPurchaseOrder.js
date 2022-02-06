import React from 'react';
import { useForm } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';

//Material UI 
import {
    Typography,
    TableRow,
    TableHead,
    TableCell,
    Button,
    TablePagination,
    Grid
} from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './ViewPurchaseOrder.module.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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

export default function ViewPurchaseOrder(props) {

    const classes = useStyles();

    const { handleClosePopUp, poRecords } = props;

    const { handleSubmit } = useForm();

    const onSubmit = () => {
        handleClosePopUp()
    }

    return (
        <form
            className={style.two}
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className={style.header}>

                <div>
                    View Purchase Order
                </div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClosePopUp() }}
                    />
                </div>

            </div>


            <div className={style.body}>

                <div className={style.orderDetails}>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Name</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.customername}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Address</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.customeraddress}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Contact No.</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.contactnumber}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Status</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {
                                            poRecords.deliveredat ?
                                                poRecords.deliveredat : (
                                                    poRecords.status === "Waiting For Approval" ?
                                                        <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{poRecords.status}</p> :
                                                        (
                                                            poRecords.status === "Pending" ?
                                                                <p style={{ padding: "0", margin: "0", color: "red", fontWeight: "700" }}>{poRecords.status}</p> :
                                                                <p style={{ padding: "0", margin: "0", color: "#4caf50", fontWeight: "700" }}>{poRecords.status}</p>
                                                        )
                                                )
                                        }
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">PO No.</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.ponumber}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Supplier</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.supplier}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Created By/At</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.createdby} ({poRecords.createdat})
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Approved By/At</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.approvedby ? `${poRecords.approvedby} (${poRecords.approvedat})` : <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{poRecords.status}</p>}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <AutoSizer>
                    {({ height, width }) => {
                        console.log(`Height: ${height} | Width: ${width}`);
                        const pageSize = Math.floor((height - 440) / 48);
                        console.log(`Page Size: ${pageSize}`);

                        return (
                            <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>
                                <MaterialTable
                                    components={{
                                        Pagination: props => (
                                            <td style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }} >
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> Gross Total (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> {parseInt(poRecords.grosstotal).toFixed(2)} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> Received Discounts (Rs.)</Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> {parseInt(poRecords.receiveddiscounts).toFixed(2)} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> {parseInt(poRecords.damagedmissingitems).toFixed(2)} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> Total (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> {parseInt(poRecords.total).toFixed(2)} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <TablePagination {...props} />
                                            </td>
                                        ),
                                        Header: props => (
                                            <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                                <TableRow className={classes.row1}>
                                                    <TableCell width="2%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            #
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="32%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Description
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="6%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Pieces per Case
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="8%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            List Price (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Sales Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Free Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Return Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" width="14%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Value (Rs.)
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className={classes.row2}>
                                                    <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                                    <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                                    <TableCell width="6%" padding="none" align="center">D</TableCell>
                                                    <TableCell width="6%" padding="none" align="center">R</TableCell>
                                                </TableRow>
                                            </TableHead>
                                        ),
                                    }}
                                    columns={[
                                        {
                                            field: "tableData.id",
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '2%',
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            field: "description",
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '32%',
                                                textAlign: 'left'
                                            },
                                        },
                                        {
                                            field: "piecespercase",
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '6%',
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "listprice",
                                            type: 'numeric',
                                            render: rowData => rowData.listprice.toFixed(2),
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '8%',
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "salesqtycases",
                                            type: 'numeric',
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '6%',
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "salesqtypieces",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '6%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "freeqtycases",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '6%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "freeqtypieces",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '6%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "damaged",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '6%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "return",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '6%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "value",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '12%',
                                                padding: "10px 15px 10px 12px",
                                                textAlign: 'right'
                                            },
                                            render: rowData => rowData.value.toFixed(2),
                                        }
                                    ]}
                                    data={poRecords.items}
                                    options={{
                                        pageSize: pageSize,
                                        pageSizeOptions: [],
                                        paging: true,
                                        toolbar: false,
                                        filtering: true,
                                        search: false,
                                        headerStyle: {
                                            position: "sticky",
                                            top: "0",
                                            backgroundColor: '#20369f',
                                            color: '#FFF',
                                            fontSize: "0.8em"
                                        },
                                        rowStyle: rowData => ({
                                            fontSize: "0.8em",
                                            backgroundColor: (rowData.tableData.id % 2 === 0) ? '#ebebeb' : '#ffffff'
                                        })
                                    }}
                                />
                            </div>
                        );
                    }}
                </AutoSizer>

            </div>


            <div className={style.footer}>

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Done
                </Button>

            </div>

        </form >
    )
}
