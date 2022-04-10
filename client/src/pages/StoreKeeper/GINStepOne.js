import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import Select from '../../shared/Select/Select';

//Material UI 
import {
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Button,
    Grid,
    Typography,
} from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';

//Material Table
import MaterialTable from 'material-table';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//Styles
import style from './GINStepOne.module.scss';
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

export default function GINStepOne(props) {

    const classes = useStyles();

    const {
        data,
        setData,
        handleClosePopUp,
        completeFormStep,
        orderRecords,
        GINRecords,
        orderNumbers,
        setOrderNumbers,
        action,
        control,
        watch,
        getValues,
        trigger,
        isValid,
        errors,
    } = props;

    useEffect(() => {
        if (GINRecords === null) {
            getOrderNumbers();
        }
    }, [watch('route'), GINRecords]);

    const handleChipClick = (ordernumber) => {
        axios
            .get(`http://localhost:8080/orders/${ordernumber}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                localStorage.setItem(ordernumber, JSON.stringify(res.data.order));
                window.open(`http://localhost:3000/store-keeper/view-order-details/${ordernumber}`, "_blank");
            })
            .catch(err => {
                console.log(err);
            })

    }

    const getOrderNumbers = () => {

        const relevantOrderRecords = orderRecords.filter(x => x.route === getValues('route'));

        const relevantOrderNumbers = relevantOrderRecords.map(x => x.orderno);

        var orderNumberObjArray = relevantOrderNumbers.map(x => {
            return { ordernumber: x, complete: 'No' };
        });

        setOrderNumbers(orderNumberObjArray)

        const relevantOrderItems = [].concat.apply([], relevantOrderRecords.map(order => {
            const itemList = [];

            order.items.forEach(item => {
                itemList.push({
                    'productid': item.productid,
                    'variantid': item.variantid,
                    'name': item.name,
                    'sellingprice': item.sellingprice,
                    'piecespercase': item.piecespercase,
                    'salesqtycases': parseInt(item.salesqtycases),
                    'salesqtypieces': parseInt(item.salesqtypieces),
                    'freeqtycases': parseInt(item.freeqtycases),
                    'freeqtypieces': parseInt(item.freeqtypieces),
                    'grossamount': item.grossamount
                })
            })

            return itemList;
        })).reduce((a, c) => {

            const filtered = a.filter(el => el.name === c.name);

            if (filtered.length > 0) {
                a[a.indexOf(filtered[0])].salesqtycases += +c.salesqtycases;
                a[a.indexOf(filtered[0])].salesqtypieces += +c.salesqtypieces;
                a[a.indexOf(filtered[0])].freeqtycases += +c.freeqtycases;
                a[a.indexOf(filtered[0])].freeqtypieces += +c.freeqtypieces;
            } else {
                a.push(c);
            }

            return a;
        }, []);

        let pieces = 0;
        let cases = 0;

        const getPieces = (noofpieces, piecespercase) => {
            pieces = noofpieces % piecespercase;
            return pieces;
        }

        const getCases = (noofpieces, piecespercase) => {
            cases = Math.floor(noofpieces / piecespercase);
            return cases;
        }

        const halfOrganized = relevantOrderItems.map(item => (
            item.salesqtypieces > item.piecespercase
                ? { ...item, pieces: getPieces(item.salesqtypieces, item.piecespercase), cases: getCases(item.salesqtypieces, item.piecespercase) + parseInt(item.salesqtycases) }
                : item
        ))

        const fullyOrganized = halfOrganized.map(item => (
            item.freeqtypieces > item.piecespercase
                ? { ...item, pieces: getPieces(item.freeqtypieces, item.piecespercase), cases: getCases(item.freeqtypieces, item.piecespercase) + parseInt(item.freeqtycases) }
                : item
        ))

        setData(fullyOrganized);

    }

    const onSubmit = () => {
        trigger();

        if (isValid) {
            completeFormStep();
        }
    }

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === 'Create' && 'Create GIN Form'}
                        {action === 'Edit' && 'Edit GIN Form'}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

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
                                            <Typography className={style.input}>
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
                                            <Typography className={value === 'Pending' ? style.red : style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th align="left">
                                    Route <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        name={"route"}
                                        control={control}
                                        rules={{ required: { value: true, message: "Required *" } }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                size="small"
                                                options={employeeservice.getRouteOptions()}
                                                helperText={errors.route && errors.route.message}
                                                error={errors.route ? true : false}
                                                disabled={action === "Edit"}
                                            />
                                        )}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th rowSpan={3} className={style.thAlign}>Order Numbers</th>
                                <td rowSpan={3} className={style.tdAlign}>
                                    <div>
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
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {NumberWithCommas(watch('total'))}
                                                        </Typography>
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

                <Tooltip
                    arrow
                    placement="top"
                    title="Please select a route with orders to proceed"
                >
                    <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'middle', marginRight: '10px' }} />
                </Tooltip>

                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                    disabled={data.length === 0}
                >
                    Next
                </Button>

            </div>

        </div>
    )
}
