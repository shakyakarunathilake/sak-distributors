import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Controller } from 'react-hook-form';

//Material UI 
import {
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Button,
    Grid,
    Typography,
} from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS styles
import style from './PurchaseOrderStepTwo.module.scss';
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

export default function PurchaseOrderStepTwo(props) {

    const classes = useStyles();

    const {
        data,
        action,
        handleClosePopUp,
        backFormStep,
        control,
        getValues
    } = props;


    return (
        <div className={style.two}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Purchase Order"}
                        {action === "Edit" && "Edit Purchase Order"}
                        {action === "Approve" && "Edit & Approve Purchase Order"}
                        {action === "View" && "View Purchase Order"}

                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                {
                    action !== 'View' &&
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

                            {
                                action !== "Create" &&
                                action !== "Edit" &&
                                <tr>
                                    <th align="left">Delivered at</th>
                                    <td align="left">
                                        <Controller
                                            name={"deliveredat"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={style.input}>
                                                    {value}
                                                </Typography>
                                            )}
                                        />
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">PO No.</th>
                                <td align="left">
                                    {/* PO2110/004 */}
                                    <Controller
                                        name={"ponumber"}
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
                            <tr>
                                <th align="left">Created By/At</th>
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
                                    &nbsp;
                                    <Controller
                                        name={"createdat"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                : {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>

                            {
                                action !== "Create" &&
                                action !== "Edit" &&
                                <tr>
                                    <th align="left">Approved By/At</th>
                                    <td align="left">
                                        <Controller
                                            name={"approvedby"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={style.input}>
                                                    {value}
                                                </Typography>
                                            )}
                                        />
                                        &nbsp;
                                        <Controller
                                            name={"approvedat"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={style.input}>
                                                    : {value}
                                                </Typography>
                                            )}
                                        />
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>

                </div>

                <AutoSizer>
                    {({ height, width }) => {

                        const value = (action === 'View' ? 430 : action === 'Edit' ? 400 : action === 'Approve' ? 420 : 460);

                        console.log(value);

                        const pageSize = Math.floor((height - value) / 48);

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
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Gross Total (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues('grosstotal'))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Received Discounts (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {getValues('receiveddiscounts') === 0 ? '0.00' : NumberWithCommas(getValues('receiveddiscounts'))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Damaged / Missing Items (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {getValues('damagedmissingitems') === 0 ? '0.00' : NumberWithCommas(getValues('damagedmissingitems'))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}>
                                                            Total (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues('total'))}
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
                                                    <TableCell width="38%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Description
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="9%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Pieces per Case
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="9%" padding="none" rowSpan={2} align="center">
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
                                                    <TableCell padding="none" width="14%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Value (Rs.)
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className={classes.row2}>
                                                    <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
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
                                                textAlign: 'left'
                                            },
                                        },
                                        {
                                            field: "description",
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '38%',
                                                textAlign: 'left'
                                            },
                                        },
                                        {
                                            title: "Pieces Per Cases",
                                            field: "piecespercase",
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '9%',
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "listprice",
                                            type: 'numeric',
                                            render: rowData => NumberWithCommas(rowData.listprice.toFixed(2)),
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '9%',
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "salesqtycases",
                                            type: 'numeric',
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '7%',
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "salesqtypieces",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "freeqtycases",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "freeqtypieces",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "value",
                                            type: 'numeric',
                                            render: rowData => rowData.value ? NumberWithCommas(rowData.value.toFixed(2)) : '',
                                            cellStyle: {
                                                width: '14%',
                                                padding: "10px 15px 10px 12px",
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

                <div className={style.backBtn}>
                    {
                        action !== "View" &&
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
                        {action === 'Create' && 'Confirm and Submit'}
                        {action === 'Edit' && 'Confirm and Submit'}
                        {action === 'Approve' && 'Approve and Submit'}
                        {action === 'View' && 'Done'}
                    </Button>
                </div>

            </div>

        </div >
    );
}
