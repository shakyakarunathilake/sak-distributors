import React from 'react';
import { Controller } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';

//Material UI 
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
import Chip from '@mui/material/Chip';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS styles
import style from './GINStepTwo.module.scss';
import { makeStyles } from '@material-ui/core/styles';

//Connecting to backend
import axios from 'axios';

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

export default function GINStepTwo(props) {

    const classes = useStyles();

    const {
        onSubmit,
        backFormStep,
        control,
        getValues,
        handleClosePopUp,
        data,
        action,
        orderNumbers
    } = props;

    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

    const handleChipClick = (ordernumber) => {
        axios
            .get(`http://localhost:8080/orders/${ordernumber}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                localStorage.setItem(ordernumber, JSON.stringify(res.data.order));
                window.open(`http://localhost:3000/storekeeper/view-order-details/${ordernumber}`, "_blank");
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === 'View' && 'View GIN Form'}
                        {action === 'Edit' && 'Edit GIN Form'}
                        {action === 'Create' && 'Create GIN Form'}
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

            <div className={designation !== "Delivery Representative" && action === "View" ? style.fivebody : style.threebody}>

                <div className={style.orderDetails}>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">GIN Number</th>
                                <td align="left">
                                    <Controller
                                        name={"ginnumber"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th align="left">GIN Created at</th>
                                <td align="left">
                                    <Controller
                                        name={"createdat"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th align="left">Route</th>
                                <td align="left">
                                    <Controller
                                        name={"route"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>

                            {
                                designation !== "Delivery Representative" && action === "View" &&
                                <tr>
                                    <th align="left">In Charge</th>
                                    <td align="left">
                                        <Controller
                                            name={"incharge"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={value === '' && style.blue}>
                                                    {value}
                                                </Typography>
                                            )}
                                        />
                                    </td>
                                </tr>
                            }

                            {
                                designation !== "Delivery Representative" && action === "View" &&
                                <tr>
                                    <th align="left">Vehicle</th>
                                    <td align="left">
                                        <Controller
                                            name={"vehicle"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={value === '' && style.blue}>
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
                                <th rowSpan={designation === "Delivery Representative" ? 3 : 5} className={style.thAlign}>Order Numbers</th>
                                <td rowSpan={designation === "Delivery Representative" ? 3 : 5} className={style.tdAlign}>
                                    <div className={designation !== "Delivery Representative" && action === "View" ? style.five : style.three}>

                                        {
                                            orderNumbers.map(x =>
                                                <Chip
                                                    className={style.chip}
                                                    label={x.ordernumber}
                                                    key={x.ordernumber}
                                                    onClick={() => handleChipClick(x.ordernumber)}
                                                />
                                            )
                                        }

                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>

                <AutoSizer>
                    {({ height, width }) => {
                        const pageSize = Math.floor((height - 199.27) / 48);
                        return (
                            <div style={{ height: `${height}px`, width: `${width}px` }}>

                                <MaterialTable
                                    components={{
                                        Container: props => <Paper {...props} elevation={1} />,
                                        Pagination: props => (
                                            <td style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }} >
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Right" style={{ margin: "0px 220px 0px auto" }}>
                                                        <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 20px 0px 0px" }}>
                                                        <Typography style={{ fontWeight: 600 }}> {NumberWithCommas(getValues("total"))} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <TablePagination {...props} />
                                            </td>
                                        ),
                                        Header: props => (
                                            <TableHead {...props} className={classes.tablehead} >
                                                <TableRow className={classes.row1}>
                                                    <TableCell width="13%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Prod. ID
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="30%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Description
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="8%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Selling Price (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="7%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Pieces per Case
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Sales Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Free Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Gross Amount (Rs.)
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className={classes.row2}>
                                                    <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                                    <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                                </TableRow>
                                            </TableHead>
                                        ),
                                    }}
                                    columns={[
                                        {
                                            field: "productid",
                                            render: rowData => `${rowData.productid} ${rowData.variantid}`,
                                            cellStyle: {
                                                width: "8%",
                                                textAlign: 'left'
                                            }
                                        },
                                        {
                                            field: "variantid",
                                            hidden: true,
                                        },
                                        {
                                            field: "name",
                                            cellStyle: {
                                                width: "35%",
                                                textAlign: 'left'
                                            }
                                        },
                                        {
                                            field: 'sellingprice',
                                            render: rowData => NumberWithCommas(rowData.sellingprice),
                                            cellStyle: {
                                                width: "8%",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: 'piecespercase',
                                            cellStyle: {
                                                width: "7%",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: 'salesqtycases',
                                            cellStyle: {
                                                width: "8%",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: 'salesqtypieces',
                                            cellStyle: {
                                                width: "8%",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: 'freeqtycases',
                                            cellStyle: {
                                                width: "8%",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: 'freeqtypieces',
                                            cellStyle: {
                                                width: "8%",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: 'grossamount',
                                            render: rowData => NumberWithCommas(rowData.grossamount),
                                            cellStyle: {
                                                width: "10%",
                                                textAlign: 'right'
                                            }
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
                        action !== "View" &&
                        <Button
                            onClick={backFormStep}
                            variant="contained"
                        >
                            Back
                        </Button>
                    }

                </div>

                <div className={style.doneBtn}>

                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        {action === "Create" && "Confirm & Submit"}
                        {action === "Edit" && "Confirm & Submit"}
                        {action === "View" && "Done"}
                    </Button>

                </div>

            </div>

        </div>
    )
}
