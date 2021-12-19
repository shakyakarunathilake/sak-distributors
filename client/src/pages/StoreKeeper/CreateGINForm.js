import React, { useState } from 'react';
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

//SCSS styles
import style from './CreateGINForm.module.scss';
import { makeStyles } from '@material-ui/core/styles';

//Form Step
import GINStepOne from './GINStepOne';

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

export default function GINForm(props) {

    const classes = useStyles();

    const { GINRecords, handleClosePopUp, updateGIN } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [confirmation, setConfirmation] = useState(false);
    const [orderFormData, setOrderFormData] = useState({});

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {
        if (confirmation === true) {

            const ginFormData = new formData();

            ginFormData.append('createdat', orderFormData.createdat);
            ginFormData.append('createdby', orderFormData.createdby);
            ginFormData.append('status', orderFormData.status);
            ginFormData.append('items', JSON.stringify(data));
            ginFormData.append('gintotal', orderFormData.gintotal);

            updateGIN(ginFormData, orderFormData.ginnumber);
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
                                        <th align="left">Order No.</th>
                                        <td align="left">
                                            <Typography className={style.input && style.blue}>
                                                {orderFormData.orderno}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">GIN No.</th>
                                        <td align="left">
                                            <Typography className={style.input && style.blue}>
                                                {orderFormData.ginnumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">GIN Created at</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.createdat}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">GIN Created by</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.createdby}
                                            </Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className={style.details}>
                                <tbody>
                                    <tr>
                                        <th align="left">Distributor</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.distributor}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Address</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.distributoraddress}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Contact No.</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.distributorcontactnumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Customer</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.customer}
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
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.gintotal} </Typography>
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
                                            <TableCell width="5%" padding="none" rowSpan={2}>
                                                <div style={{ padding: '0 10px' }}>
                                                    Pieces per Case
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
                                    field: "piecespercase",
                                    editable: 'never',
                                    cellStyle: {
                                        padding: "10px 7px 10px 7px",
                                        width: '5%',
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
                            data={data}
                            options={{
                                addRowPosition: "first",
                                toolbar: true,
                                filtering: true,
                                search: false,
                                pageSize: 999,
                                maxBodyHeight: "calc(100vh - 420px)",
                                minBodyHeight: "calc(100vh - 420px)",
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
