import React from 'react';
import { useForm } from 'react-hook-form';

//Material UI 
import { Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
                                <th align="left">Delivered at</th>
                                <td align="left">
                                    {/* {dateTime} */}
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
                                    {/* PO2110/004 */}
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
                                <th align="left">Created By</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.createdby} ({poRecords.createdat})
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Approved By</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {poRecords.approvedby ? `${poRecords.approvedby} (${poRecords.approvedat})` : <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{poRecords.status}</p>}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <MaterialTable
                    components={{
                        Pagination: () => (
                            <td style={{
                                display: "flex",
                                flexDirection: "column"
                            }} >
                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Gross Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {poRecords.grosstotal} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Received Discounts (Rs.)</Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {poRecords.receiveddiscounts} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {poRecords.damagedmissingitems} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {poRecords.total} </Typography>
                                    </Grid>
                                </Grid>
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
                                    <TableCell width="8%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            List Price
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
                                            Value
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="8%" padding="none" align="center">D</TableCell>
                                    <TableCell width="8%" padding="none" align="center">R</TableCell>
                                </TableRow>
                            </TableHead>
                        ),
                    }}
                    columns={[
                        {
                            title: "#",
                            field: "tableData.id",
                            cellStyle: {
                                padding: "10px 5px 10px 7px",
                                width: '2%',
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Description",
                            field: "description",
                            cellStyle: {
                                padding: "10px 5px 10px 7px",
                                width: '32%',
                                textAlign: 'left'
                            },
                        },
                        {
                            title: "Pieces Per Cases",
                            field: "piecespercase",
                            hidden: true,
                        },
                        {
                            field: "listprice",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 5px 10px 7px",
                                width: '8%',
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Sales Cs",
                            field: "salesqtycases",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 5px 10px 7px",
                                width: '8%',
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Sales Pcs",
                            field: "salesqtypieces",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Free Cs",
                            field: "freeqtycases",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Free Pcs",
                            field: "freeqtypieces",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Damaged",
                            field: "damaged",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Return",
                            field: "return",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'center'
                            },
                        },
                        {
                            title: "Value (Rs.)",
                            field: "value",
                            type: 'numeric',
                            cellStyle: {
                                width: '12%',
                                padding: "10px 15px 10px 12px",
                                textAlign: 'right'
                            },
                            editable: 'never',
                        }
                    ]}
                    data={poRecords.items}
                    options={{
                        toolbar: false,
                        filtering: true,
                        search: false,
                        pageSize: 999,
                        minBodyHeight: "calc(100vh - 455px)",
                        maxBodyHeight: "calc(100vh - 455px)",
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
