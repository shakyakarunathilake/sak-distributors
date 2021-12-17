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
import style from './CreateGRNForm.module.scss';
import { makeStyles } from '@material-ui/core/styles';

//Form Step
import StepOne from './StepOne';

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

export default function GRNForm(props) {

    const classes = useStyles();

    const { GRNRecords, handleClosePopUp, updateGRN } = props;

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

        console.log("UPDATE GRN")

        const grnFormData = new formData();

        grnFormData.append('createdat', orderFormData.createdat);
        grnFormData.append('createdby', orderFormData.createdby);
        grnFormData.append('status', orderFormData.status);
        grnFormData.append('items', JSON.stringify(data));
        grnFormData.append('grntotal', orderFormData.grntotal);
        grnFormData.append('damagedmissingitems', orderFormData.damagedmissingitems);

        updateGRN(grnFormData, orderFormData.grnnumber);
    };

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        data={data}
                        setData={setData}
                        setConfirmation={setConfirmation}
                        setOrderFormData={setOrderFormData}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        GRNRecords={GRNRecords}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.two : style.hidden}>
                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                Create GRN Form
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
                                        <th align="left">Name</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.customername}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Address</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.customeraddress}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Contact No.</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.contactnumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Supplier</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.supplier}
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
                                                {orderFormData.ponumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">GRN No.</th>
                                        <td align="left">
                                            <Typography className={style.input, style.blue}>
                                                {orderFormData.grnnumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">GRN Created at</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.createdat}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">GRN Created by</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.createdby}
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
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.damagedmissingitems} </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                            <Grid item align="Left">
                                                <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                            </Grid>
                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.grntotal} </Typography>
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
                            data={data}
                            options={{
                                addRowPosition: "first",
                                toolbar: true,
                                filtering: true,
                                search: false,
                                pageSize: 999,
                                maxBodyHeight: "calc(100vh - 450px)",
                                minBodyHeight: "calc(100vh - 450px)",
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
