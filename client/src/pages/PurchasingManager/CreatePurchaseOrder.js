import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import { Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';
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

export default function CreatePurchaseOrder(props) {

    const classes = useStyles();

    const { setOpenPopup, productOptions, supplierOptions, addOrder, openPopup, handleClosePopUp } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [confirmation, setConfirmation] = useState(false);
    const [orderFormData, setOrderFormData] = useState({});
    const [resetFormOpenPopup, setResetFormOpenPopup] = useState(false);

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const handleResetFormClosePopUp = () => {
        setResetFormOpenPopup(false)
    }

    const onSubmit = () => {

        console.log("ORDER FORM DATA", orderFormData);

        if (confirmation === true) {

            const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
            const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
            const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

            const purchaseOrderFormData = new formData();

            purchaseOrderFormData.append('ponumber', orderFormData.ponumber);
            purchaseOrderFormData.append('supplier', orderFormData.supplier);
            purchaseOrderFormData.append('createdat', orderFormData.createdat);
            purchaseOrderFormData.append('createdby', `${firstname} ${lastname} (${employeeid})`);
            purchaseOrderFormData.append('approvedat', '');
            purchaseOrderFormData.append('approvedby', '');
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('grosstotal', orderFormData.total);
            purchaseOrderFormData.append('receiveddiscounts', orderFormData.receiveddiscounts);
            purchaseOrderFormData.append('damagedexpireditems', orderFormData.damagedexpireditems);
            purchaseOrderFormData.append('total', orderFormData.total);

            addOrder(purchaseOrderFormData);
            handleClosePopUp()
        }
    }

    return (

        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        data={data}
                        setData={setData}
                        openPopup={openPopup}
                        setConfirmation={setConfirmation}
                        setOrderFormData={setOrderFormData}
                        setOpenPopup={setOpenPopup}
                        handleClosePopUp={handleClosePopUp}
                        resetFormOpenPopup={resetFormOpenPopup}
                        setResetFormOpenPopup={setResetFormOpenPopup}
                        handleResetFormClosePopUp={handleResetFormClosePopUp}
                        completeFormStep={completeFormStep}
                        supplierOptions={supplierOptions}
                        productOptions={productOptions}
                    />

                </section>

            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.two : style.hidden}>

                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                Create Purchase Order
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
                                </tbody>
                            </table>

                            <table className={style.details}>
                                <tbody>
                                    <tr>
                                        <th align="left">PO No.</th>
                                        <td align="left">
                                            {/* PO2110/004 */}
                                            <Typography className={style.input}>
                                                {orderFormData.ponumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">PO Created at</th>
                                        <td align="left">
                                            {/* {dateTime} */}
                                            <Typography className={style.input}>
                                                {orderFormData.createdat}
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

                        </div>

                        <MaterialTable

                            components={{
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
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.grosstotal} </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                            <Grid item align="Left">
                                                <Typography style={{ fontWeight: 600 }}> Received Discounts (Rs.)</Typography>
                                            </Grid>
                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.receiveddiscounts} </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                            <Grid item align="Left">
                                                <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items (Rs.) </Typography>
                                            </Grid>
                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.damagedexpireditems} </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                            <Grid item align="Left">
                                                <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                            </Grid>
                                            <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                                <Typography style={{ fontWeight: 600 }}> {orderFormData.total} </Typography>
                                            </Grid>
                                        </Grid>
                                    </td>
                                ),
                                Header: props => (
                                    <TableHead {...props} >
                                        <TableRow className={classes.row1}>
                                            <TableCell width="34%" padding="none" rowSpan={2}>
                                                <div style={{ padding: '0 10px' }}>
                                                    Description
                                                </div>
                                            </TableCell>
                                            <TableCell width="8%" padding="none" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    List Price
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
                                            <TableCell padding="none" width="14%" rowSpan={2} align="center">
                                                <div style={{ padding: '0 10px' }}>
                                                    Value
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.row2}>
                                            <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                            <TableCell width="8%" padding="none" align="center">D</TableCell>
                                            <TableCell width="8%" padding="none" align="center">R</TableCell>
                                        </TableRow>
                                    </TableHead>
                                ),
                            }}
                            columns={[
                                {
                                    title: "Description",
                                    field: "description",
                                    cellStyle: {
                                        padding: "10px 5px 10px 7px",
                                        width: '34%',
                                        textAlign: 'left'
                                    },
                                },
                                {
                                    title: "Pieces Per Cases",
                                    field: "piecespercase",
                                    hidden: true,
                                },
                                {
                                    field: "listprice",
                                    type: 'numeric',
                                    cellStyle: {
                                        padding: "10px 5px 10px 7px",
                                        width: '8%',
                                        textAlign: 'center'
                                    },
                                },
                                {
                                    title: "Sales Cs",
                                    field: "salesqtycases",
                                    type: 'numeric',
                                    cellStyle: {
                                        padding: "10px 5px 10px 7px",
                                        width: '8%',
                                        textAlign: 'center'
                                    },
                                },
                                {
                                    title: "Sales Pcs",
                                    field: "salesqtypieces",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: "10px 5px 10px 7px",
                                        textAlign: 'center'
                                    },
                                },
                                {
                                    title: "Free Cs",
                                    field: "freeqtycases",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: "10px 5px 10px 7px",
                                        textAlign: 'center'
                                    },
                                },
                                {
                                    title: "Free Pcs",
                                    field: "freeqtypieces",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: "10px 5px 10px 7px",
                                        textAlign: 'center'
                                    },
                                },
                                {
                                    title: "Damaged",
                                    field: "damaged",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: "10px 5px 10px 7px",
                                        textAlign: 'center'
                                    },
                                },
                                {
                                    title: "Return",
                                    field: "return",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '8%',
                                        padding: "10px 5px 10px 7px",
                                        textAlign: 'center'
                                    },
                                },
                                {
                                    title: "Value (Rs.)",
                                    field: "value",
                                    type: 'numeric',
                                    cellStyle: {
                                        width: '12%',
                                        padding: "10px 15px 10px 12px",
                                        textAlign: 'right'
                                    },
                                    editable: 'never',
                                }
                            ]}
                            data={data}
                            options={{
                                toolbar: false,
                                filtering: true,
                                search: false,
                                minBodyHeight: "calc(100vh - 455px)",
                                maxBodyHeight: "calc(100vh - 455px)",
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

    );
}
