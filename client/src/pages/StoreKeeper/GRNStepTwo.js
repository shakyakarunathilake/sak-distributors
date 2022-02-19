import React from 'react';
import { Controller } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';
import classnames from 'classnames';

//Material UI 
import {
    Typography,
    TableRow,
    TableHead,
    TableCell,
    Button,
    Paper,
    TablePagination,
    Grid
} from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS styles
import style from './GRNStepTwo.module.scss';
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

export default function GRNStepTwo(props) {

    const classes = useStyles();

    const {
        data,
        handleClosePopUp,
        control,
        backFormStep,
        getValues,
        action
    } = props;

    return (
        <div className={style.two}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Edit" && "Create GRN Form"}
                        {action === "View" && "View GRN Form"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                {
                    action === "Edit" &&
                    <div className={style.step}>
                        Step 2 of 2
                    </div>
                }

            </div>

            <div className={style.body}>

                <div className={style.orderDetails}>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Name</th>
                                <td align="left">
                                    <Controller
                                        name={"customername"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                    &nbsp;
                                    <Controller
                                        name={"givenid"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                ({value})
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Address</th>
                                <td align="left">
                                    <Controller
                                        name={"customeraddress"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Contact No.</th>
                                <td align="left">
                                    <Controller
                                        name={"contactnumber"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Supplier</th>
                                <td align="left">
                                    <Controller
                                        name={"supplier"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">PO No.</th>
                                <td align="left">
                                    <Controller
                                        name={"ponumber"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={classnames(style.input, style.blue)}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN No.</th>
                                <td align="left">
                                    <Controller
                                        name={"grnnumber"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={classnames(style.input, style.blue)}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN Created at</th>
                                <td align="left">
                                    <Controller
                                        name={"createdat"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN Created by</th>
                                <td align="left">
                                    <Controller
                                        name={"createdby"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <AutoSizer>
                    {({ height, width }) => {
                        const pageSize = Math.floor((height - (action === 'View' ? 450 : 440)) / 48);

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
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Purchase Order Total (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues("total"))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Damaged / Expired Items (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues("damagedmissingitems"))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}>
                                                            GRN Total (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues("grntotal"))}
                                                        </Typography>
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
                                                    <TableCell width="25%" padding="none" rowSpan={2}>
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
                                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            GRN Value (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
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
                                            title: "#",
                                            field: "tableData.id",
                                            cellStyle: {
                                                width: '3%',
                                                textAlign: 'left'
                                            },
                                            render: rowData => {
                                                return rowData.tableData.id + 1
                                            }
                                        },
                                        {
                                            field: "description",
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '27%',
                                                textAlign: 'left'
                                            }
                                        },
                                        {
                                            field: "piecespercase",
                                            editable: 'never',
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '5%',
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "listprice",
                                            render: rowData => NumberWithCommas(rowData.listprice.toFixed(2)),
                                            type: 'numeric',
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '6%',
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
                                            type: 'numeric',
                                            render: rowData => NumberWithCommas(rowData.grnvalue.toFixed(2)),
                                            cellStyle: {
                                                width: '8%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "value",
                                            type: 'numeric',
                                            render: rowData => NumberWithCommas(rowData.value.toFixed(2)),
                                            cellStyle: {
                                                width: '8%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        }
                                    ]}
                                    data={data}
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

                <div className={style.backBtn}>
                    {
                        action === "Edit" &&
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
                    }
                </div>

                <div className={style.nextBtn}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        {action === "View" && "Done"}
                        {action === "Edit" && "Confirm and Submit"}
                    </Button>
                </div>

            </div>

        </div >
    )
}
