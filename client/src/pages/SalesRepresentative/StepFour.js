import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

//Material UI Components
import {
    Paper,
    TableHead,
    TableRow,
    TableCell,
    Button,
    Grid,
    Typography,
    TablePagination,
} from '@material-ui/core';

//Material Table
import MaterialTable from 'material-table';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Styles
import style from './StepFour.module.scss';
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

export default function StepFour(props) {

    const { action, formStep, handleClosePopUp, data, backFormStep, onSubmit, total } = props;

    const classes = useStyles();

    return (
        <div className={style.four}>
            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Confirm Items
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
                        />
                    </div>
                </div>

                {
                    action === "Create" && formStep === 3 &&
                    <div className={style.step}>
                        Step 4 of 4
                    </div>
                }

                {
                    action === "Edit" && formStep === 2 &&
                    <div className={style.step}>
                        Step 3 of 3
                    </div>
                }

                {
                    action === "View" && formStep === 1 &&
                    <div className={style.step}>
                        Step 2 of 2
                    </div>
                }

            </div>

            <div className={style.body}>

                <AutoSizer>
                    {({ height, width }) => {
                        console.log(`Height: ${height} | Width: ${width}`);
                        const pageSize = Math.floor((height - 150) / 48);
                        console.log(`Page Size: ${pageSize}`);

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
                                                <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                                    <Grid item align="Left">
                                                        <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 0px 0px auto" }}>
                                                        <Typography style={{ fontWeight: 600 }}>{total}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <TablePagination {...props} />
                                            </td>
                                        ),
                                        Header: props => (
                                            <TableHead {...props} className={classes.tablehead} >
                                                <TableRow className={classes.row1}>
                                                    <TableCell width="37%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Description
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="6%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Pcs/Case
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="6%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Selling Price
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="6%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            MRP
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
                                                    <TableCell padding="none" width="9%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Gross Amount
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
                                            title: "Description",
                                            field: "description",
                                            cellStyle: {
                                                padding: "12px 5px 12px 7px",
                                                width: '37%',
                                                textAlign: 'left'
                                            },
                                        },
                                        {
                                            title: "Pieces Per Cases",
                                            field: "piecespercase",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Selling Price",
                                            field: "sellingprice",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "MRP",
                                            field: "mrp",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Sales Cs",
                                            field: "salesqtycases",
                                            cellStyle: {
                                                padding: "12px 5px 12px 7px",
                                                width: '6%',
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Sales Pcs",
                                            field: "salesqtypieces",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Free Cs",
                                            field: "freeqtycases",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Free Pcs",
                                            field: "freeqtypieces",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Damaged",
                                            field: "damaged",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Returns",
                                            field: "returns",
                                            cellStyle: {
                                                width: '6%',
                                                padding: "12px 5px 12px 7px",
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            title: "Gross Amount",
                                            field: "grossamount",
                                            cellStyle: {
                                                width: '9%',
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

            <div className={style.footer}>

                <div className={style.backBtn}>
                    <Button
                        variant="contained"
                        onClick={backFormStep}
                        style={{
                            backgroundColor: '#ACA9BB',
                            color: 'white'
                        }}
                    >
                        Back
                    </Button>
                </div>

                <div className={style.submitBtn}>

                    <Button
                        onClick={() => onSubmit()}
                        color="primary"
                        variant="contained"
                    >
                        {action === 'View' ? 'Done' : 'Confirm and Submit'}
                    </Button>

                </div>

            </div>
        </div>
    )
}
