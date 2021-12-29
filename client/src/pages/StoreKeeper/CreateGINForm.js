import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import {
    Paper,
    TableHead,
    TableRow,
    TableCell,
    Button,
    Grid,
    Typography,
} from '@material-ui/core';
import Chip from '@mui/material/Chip';


//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './CreateGINForm.module.scss';
import { makeStyles } from '@material-ui/core/styles';

//Form Step
import GINStepOne from './GINStepOne';

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

export default function GINForm(props) {

    const classes = useStyles();

    const { GINRecords, handleClosePopUp, addOrEdit, orderRecords, inChargeOptions } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [confirmation, setConfirmation] = useState(false);
    const [orderFormData, setOrderFormData] = useState({});
    const [orderNumbers, setOrderNumbers] = useState([]);

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {
        if (confirmation === true) {

            const ginFormData = new formData();

            ginFormData.append('ginnumber', orderFormData.ginnumber);
            ginFormData.append('createdat', orderFormData.createdat);
            ginFormData.append('createdby', orderFormData.createdby);
            ginFormData.append('route', orderFormData.route);
            ginFormData.append('vehicle', orderFormData.vehicle);
            ginFormData.append('incharge', orderFormData.incharge);
            ginFormData.append('ordernumbers', JSON.stringify(orderNumbers));
            ginFormData.append('items', JSON.stringify(data));
            ginFormData.append('total', orderFormData.total);
            ginFormData.append('status', 'Processing');

            addOrEdit(ginFormData, orderFormData.ginnumber);
        }
    };

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <GINStepOne
                        data={data}
                        setData={setData}
                        setConfirmation={setConfirmation}
                        setOrderFormData={setOrderFormData}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        GINRecords={GINRecords}
                        inChargeOptions={inChargeOptions}
                        orderRecords={orderRecords}
                        orderNumbers={orderNumbers}
                        setOrderNumbers={setOrderNumbers}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.two : style.hidden}>
                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                Create GIN Form
                            </div>
                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { handleClosePopUp() }}
                                />
                            </div>
                        </div>

                        <div className={style.step}>
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
                                            <Typography className={style.input && style.blue}>
                                                {orderFormData.ginnumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">GIN Created at</th>
                                        <td align="left">
                                            <Typography className={style.input && style.blue}>
                                                {orderFormData.createdat}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Route</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.route}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">In Charge</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.incharge}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Vehicle</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.vehicle}
                                            </Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className={style.details}>
                                <tbody>
                                    <tr>
                                        <th rowSpan={5} className={style.thAlign}>Order Numbers</th>
                                        <td rowSpan={5} className={style.tdAlign}>
                                            <div>
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
                                Pagination: () => (
                                    <td style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }} >
                                        <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                            <Grid item align="Right" style={{ margin: "0px 220px 0px auto" }}>
                                                <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                            </Grid>
                                            <Grid item align="Right" style={{ margin: "0px 20px 0px 0px" }}>
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.total} </Typography>
                                            </Grid>
                                        </Grid>
                                    </td>
                                ),
                                Header: props => (
                                    <TableHead {...props} className={classes.tablehead} >
                                        <TableRow className={classes.row1}>
                                            <TableCell padding="none" rowSpan={2}>
                                                <div style={{ padding: '0 10px' }}>
                                                    Description
                                                </div>
                                            </TableCell>
                                            <TableCell width="150px" padding="none" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Price (Rs.)
                                                </div>
                                            </TableCell>
                                            <TableCell width="100px" padding="none" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Pieces per Case
                                                </div>
                                            </TableCell>
                                            <TableCell padding="none" colSpan={2} align="center">
                                                Total
                                            </TableCell>
                                            <TableCell padding="none" width="250px" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Gross Amount (Rs.)
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.row2}>
                                            <TableCell width="150px" padding="none" align="center">Cases</TableCell>
                                            <TableCell width="150px" padding="none" align="center">Pieces</TableCell>
                                        </TableRow>
                                    </TableHead>
                                ),
                            }}
                            columns={[
                                {
                                    title: 'Description',
                                    field: "description",
                                    cellStyle: {
                                        textAlign: 'left'
                                    }
                                },
                                {
                                    title: 'Price (Rs.)',
                                    field: 'price',
                                    cellStyle: {
                                        textAlign: 'left'
                                    }
                                },
                                {
                                    title: 'Pieces per Case',
                                    field: 'piecespercase',
                                    cellStyle: {
                                        textAlign: 'left'
                                    }
                                },
                                {
                                    title: 'Cases',
                                    field: 'cases',
                                    width: "10%",
                                    cellStyle: {
                                        textAlign: 'right'
                                    }
                                },
                                {
                                    title: 'Pieces',
                                    field: 'pieces',
                                    cellStyle: {
                                        textAlign: 'right'
                                    }
                                },
                                {
                                    title: 'Gross Amount (Rs.)',
                                    field: 'grossamount',
                                    cellStyle: {
                                        textAlign: 'right'
                                    }
                                }
                            ]}
                            data={data}
                            options={{
                                toolbar: false,
                                filtering: true,
                                search: false,
                                pageSize: 999,
                                maxBodyHeight: "calc(100vh - 425px)",
                                minBodyHeight: "calc(100vh - 425px)",
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

                        <div>
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
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Confirm and Submit
                            </Button>
                        </div>

                    </div>

                </section>

            }

        </form>



    )
}
