import React from 'react';
import { Controller } from 'react-hook-form';

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

//SCSS styles
import style from './GINStepTwo.module.scss';
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

    const { onSubmit, backFormStep, control, getValues, handleClosePopUp, data, action, orderNumbers } = props;

    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

    return (
        <div className={designation === "Delivery Representative" ? style.tablet : style.container}>

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

                <div className={action === 'View' ? style.hidden : style.step}>
                    Step 2 of 2
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

                            {
                                designation !== "Delivery Representative" &&
                                <tr>
                                    <th align="left">GIN Created at</th>
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
                            }

                            <tr>
                                <th align="left">Route</th>
                                <td align="left">
                                    <Controller
                                        name={"route"}
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
                                <th align="left">In Charge</th>
                                <td align="left">
                                    <Controller
                                        name={"incharge"}
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
                                <th align="left">Vehicle</th>
                                <td align="left">
                                    <Controller
                                        name={"vehicle"}
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
                                <th rowSpan={designation === "Delivery Representative" ? 4 : 5} className={style.thAlign}>Order Numbers</th>
                                <td rowSpan={designation === "Delivery Representative" ? 4 : 5} className={style.tdAlign}>
                                    <div className={designation === "Delivery Representative" ? style.tablet : style.pc}>

                                        {
                                            orderNumbers.map(x =>
                                                <Chip className={style.chip} label={x} key={x} />
                                            )
                                        }

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <MaterialTable
                    components={{
                        Container: props => <Paper {...props} elevation={1} />,
                        Pagination: props => (
                            <td style={{
                                display: "flex",
                                flexDirection: "column",
                            }} >
                                <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                    <Grid item align="Right" style={{ margin: "0px 220px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 20px 0px 0px" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getValues("total")} </Typography>
                                    </Grid>
                                </Grid>
                                <TablePagination {...props} />
                            </td>
                        ),
                        Header: props => (
                            <TableHead {...props} className={classes.tablehead} >
                                <TableRow className={classes.row1}>
                                    <TableCell width="42%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell width="8%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Selling Price (Rs.)
                                        </div>
                                    </TableCell>
                                    <TableCell width="8%" padding="none" rowSpan={2} align="center">
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
                            field: "description",
                            cellStyle: {
                                width: "42%",
                                textAlign: 'left'
                            }
                        },
                        {
                            field: 'sellingprice',
                            cellStyle: {
                                width: "8%",
                                textAlign: 'right'
                            }
                        },
                        {
                            field: 'piecespercase',
                            cellStyle: {
                                width: "8%",
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
                            cellStyle: {
                                width: "10%",
                                textAlign: 'right'
                            }
                        }
                    ]}
                    data={data}
                    options={{
                        toolbar: false,
                        filtering: true,
                        search: false,
                        paging: true,
                        pageSize: designation === "Delivery Representative" ? 4 : 5,
                        pageSizeOptions: [],
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

            {
                action === "View" ?
                    <div className={style.doneBtn}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Done
                        </Button>
                    </div>
                    :
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

                        <div className={style.nextBtn}>
                            <Button
                                onClick={onSubmit}
                                color="primary"
                                variant="contained"
                            >
                                Confirm and Submit
                            </Button>
                        </div>

                    </div>
            }
        </div>
    )
}
