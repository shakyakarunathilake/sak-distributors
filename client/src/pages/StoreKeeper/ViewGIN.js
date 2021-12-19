import React from 'react';
import { useForm } from 'react-hook-form';

//Material UI 
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//Styles
import style from './ViewGIN.module.scss';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    row1: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "5px 0 2.5px 0"
        }
    },
    row2: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "2.5px 0 5px 0"
        }
    }
});

export default function ViewGIN(props) {

    const classes = useStyles();

    const { GINRecords, handleClosePopUp } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const onSubmit = () => {
        handleClosePopUp()
    };

    return (
        <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.header}>
                <div>
                    View GIN Form
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
                                <th align="left">Distributor</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        S.A.K Distributors
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Address</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        No.233, Kiriwallapitiya, Rambukkana, Srilanka
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Contact No.</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        0352264009
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Customer</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {GINRecords.customer}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Order No.</th>
                                <td align="left">
                                    <Typography className={style.input && style.blue}>
                                        {GINRecords.orderno}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GIN No.</th>
                                <td align="left">
                                    <Typography className={style.input && style.blue}>
                                        {GINRecords.ginnumber}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GIN Created at</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {
                                            GINRecords.createdat === 'Pending' ?
                                                <span className={style.red}> {GINRecords.createdat}</span> :
                                                GINRecords.createdat
                                        }
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GIN Created by</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {
                                            GINRecords.createdby === 'Pending' ?
                                                <span className={style.red}> {GINRecords.createdby}</span> :
                                                GINRecords.createdby
                                        }
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <MaterialTable
                    components={{
                        Container: props => <Paper {...props} elevation={1} />,
                        Toolbar: (props) => (
                            <div
                                style={{
                                    height: "0px",
                                }}
                            >
                                <MTableToolbar {...props} />
                            </div>
                        ),
                        Pagination: () => (
                            <td style={{
                                display: "flex",
                                flexDirection: "column"
                            }} >
                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Order Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {GINRecords.total} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> GIN Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {GINRecords.gintotal} </Typography>
                                    </Grid>
                                </Grid>
                            </td>
                        ),
                        Header: props => (
                            <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                <TableRow className={classes.row1}>
                                    <TableCell width="30%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Price
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Delivering Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Free Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Delivering Free Qty.
                                    </TableCell>
                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            GIN Gross Amount
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Ord. Gross Amount
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="5%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="5%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="5%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="5%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="5%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="5%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="5%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="5%" padding="none" align="center">Pcs</TableCell>
                                </TableRow>
                            </TableHead>
                        ),
                    }}
                    columns={[
                        {
                            field: "description",
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '30%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "price",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "salesqtycases",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "salesqtypieces",
                            type: 'numeric',
                            cellStyle: {
                                width: '5%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "deliveringsalesqtycases",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "deliveringsalesqtypieces",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "Free Cs",
                            field: "freeqtycases",
                            type: 'numeric',
                            cellStyle: {
                                width: '5%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "Free Pcs",
                            field: "freeqtypieces",
                            type: 'numeric',
                            cellStyle: {
                                width: '5%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "deliveringfreeqtycases",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "deliveringfreeqtypieces",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "GIN Gross Amount (Rs.)",
                            field: "gingrossamount",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "Ord. Gross Amount (Rs.)",
                            field: "grossamount",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        }
                    ]}
                    data={GINRecords.items}
                    options={{
                        addRowPosition: "first",
                        toolbar: true,
                        filtering: true,
                        search: false,
                        pageSize: 999,
                        maxBodyHeight: "calc(100vh - 395px)",
                        minBodyHeight: "calc(100vh - 395px)",
                        actionsColumnIndex: -1,
                        headerStyle: {
                            position: "sticky",
                            top: "0",
                            backgroundColor: '#20369f',
                            color: '#FFF',
                            fontSize: "0.8em"
                        },
                        rowStyle: rowData => ({
                            fontSize: "0.8em",
                            backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
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
        </form>
    )
}
