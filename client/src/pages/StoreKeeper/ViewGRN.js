import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

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
import style from './ViewGRN.module.scss';
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

export default function ViewGRN(props) {

    const classes = useStyles();

    const { GRNRecords, handleClosePopUp } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const onSubmit = () => {
        handleClosePopUp()
    };

    return (
        <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.header}>
                <div>
                    View GRN Form
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
                                <th align="left">Supplier</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {GRNRecords.supplier}
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
                                    <Typography className={style.input, style.blue}>
                                        {GRNRecords.ponumber}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN No.</th>
                                <td align="left">
                                    <Typography className={style.input, style.blue}>
                                        {GRNRecords.grnnumber}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN Created at</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {
                                            GRNRecords.createdat === 'Pending' ?
                                                <span className={style.red}> {GRNRecords.createdat}</span> :
                                                GRNRecords.createdat
                                        }
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN Created by</th>
                                <td align="left">
                                    <Typography className={style.input}>
                                        {
                                            GRNRecords.createdby === 'Pending' ?
                                                <span className={style.red}> {GRNRecords.createdby}</span> :
                                                GRNRecords.createdby
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
                                        <Typography style={{ fontWeight: 600 }}> Gross Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {GRNRecords.total} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {GRNRecords.damagedmissingitems} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {GRNRecords.grntotal} </Typography>
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
                                            List Price
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Delivered Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Free Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Delivered Free Qty.
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Damaged Qty.
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            GRN Value
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            PO Value
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
                            field: "listprice",
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
                            field: "deliveredsalesqtycases",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "deliveredsalesqtypieces",
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
                            field: "deliveredfreeqtycases",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "deliveredfreeqtypieces",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "Damaged",
                            field: "damaged",
                            type: 'numeric',
                            cellStyle: {
                                width: '5%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "GRN Value (Rs.)",
                            field: "grnvalue",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "PO Value (Rs.)",
                            field: "value",
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        }
                    ]}
                    data={GRNRecords.items}
                    options={{
                        addRowPosition: "first",
                        toolbar: true,
                        filtering: true,
                        search: false,
                        pageSize: 999,
                        maxBodyHeight: "calc(100vh - 430px)",
                        minBodyHeight: "calc(100vh - 430px)",
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
