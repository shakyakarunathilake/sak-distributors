import React from 'react';
import { useForm } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';

//Material UI 
import {
    Paper,
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
                                    <Typography className={style.input && style.blue}>
                                        {GRNRecords.ponumber}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN No.</th>
                                <td align="left">
                                    <Typography className={style.input && style.blue}>
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

                <AutoSizer>
                    {({ height, width }) => {
                        const pageSize = Math.floor((height - 410) / 48);

                        return (
                            <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

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
                                                        <Typography style={{ fontWeight: 600 }}> {parseInt(GRNRecords.total).toFixed(2)} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> {parseInt(GRNRecords.damagedmissingitems).toFixed(2)} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> Total (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> {parseInt(GRNRecords.grntotal).toFixed(2)} </Typography>
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
                                                    <TableCell width="27%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Description
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Pieces per Case
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            List Price (Rs.)
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
                                                    <TableCell padding="none" width="7%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            GRN Value (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="7%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            PO Value (Rs.)
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
                                                padding: "10px 7px 10px 7px",
                                                width: '25%',
                                                textAlign: 'left'
                                            }
                                        },
                                        {
                                            field: "piecespercase",
                                            type: 'numeric',
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '5%',
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "listprice",
                                            type: 'numeric',
                                            render: rowData => rowData.listprice.toFixed(2),
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
                                            field: "damaged",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '5%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "grnvalue",
                                            render: rowData => rowData.grnvalue.toFixed(2),
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "value",
                                            render: rowData => rowData.value.toFixed(2),
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        }
                                    ]}
                                    data={GRNRecords.items}
                                    options={{
                                        pageSize: pageSize,
                                        pageSizeOptions: [],
                                        paging: true,
                                        addRowPosition: "first",
                                        toolbar: true,
                                        filtering: true,
                                        search: false,
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
        </form>
    )
}
