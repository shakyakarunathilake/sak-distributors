import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Material UI 
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { TextField as MuiTextField } from '@mui/material';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './GRNForm.module.scss';

export default function GRNForm(props) {

    const { GRNRecords, handleClosePopUp } = props;

    const { control, getValues, setValue, handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState();

    useEffect(() => {

        setValue("ponumber", GRNRecords.ponumber);
        setValue("grnnumber", GRNRecords.grnnumber);
        setValue("supplier", GRNRecords.supplier);
        setValue("status", GRNRecords.status);
        setValue("pocreatedat", GRNRecords.pocreatedat);
        setValue("pocreatedby", GRNRecords.pocreatedby);
        setValue("createdat", GRNRecords.createdat);
        setValue("createdby", GRNRecords.createdby);
        setValue("grosstotal", GRNRecords.grosstotal);
        setValue("receiveddiscounts", GRNRecords.receiveddiscounts);
        setValue("damagedexpireditems", GRNRecords.damagedexpireditems);
        setValue("total", GRNRecords.total);
        setValue("grntotal", GRNRecords.grntotal);
        setValue("customername", "S.A.K Distributors");
        setValue("customeraddress", "No.233, Kiriwallapitiya, Rambukkana, Srilanka");
        setValue("contactnumber", "0352264009")

        setData(GRNRecords.requesteditems);

    }, [GRNRecords, setValue])


    // const getTotal = () => {
    //     let total = 0;
    //     for (let i = 0; i < data.length; i++) {
    //         total = total + data[i].value;
    //     }
    //     setValue("total", total);
    //     setValue("receiveddiscounts", 0);
    //     setValue("damagedexpireditems", 0);
    //     return total;
    // }

    const onSubmit = () => {
        handleClosePopUp();
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                GRN Form
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClosePopUp() }}
                    />
                </div>
            </div>

            <div className={style.body}>
                <form
                    className={style.form}
                    onSubmit={handleSubmit(onSubmit)}
                >

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
                                                <Typography className={style.input}>
                                                    {value}
                                                </Typography>
                                            )}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">PO Created at</th>
                                    <td align="left">
                                        <Controller
                                            name={"pocreatedat"}
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
                                    <th align="left">GRN No.</th>
                                    <td align="left">
                                        <Controller
                                            name={"grnnumber"}
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
                                    <th align="left">GRN Created at</th>
                                    <td align="left">
                                        <Controller
                                            name={"createdat"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={style.input}
                                                    style={{ color: (value === "Pending" ? 'red' : 'black'), fontWeight: (value === "Pending" ? 600 : 500) }}
                                                >
                                                    {value}
                                                </Typography>
                                            )}
                                        />
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
                                    {/* style={{ margin: "0px 10px 0px auto" }} */}
                                    <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}> Gross Total </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getValues("grosstotal")} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}> Received Discounts </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getValues("receiveddiscounts")} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getValues("damagedexpireditems")} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getValues("total")} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}> GRN Total </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getValues("grntotal")} </Typography>
                                        </Grid>
                                    </Grid>
                                </td>
                            )
                        }}
                        columns={[
                            {
                                title: "Description",
                                field: "description",
                                editable: 'never'
                            },
                            {
                                title: "Unit",
                                field: "unit",
                                lookup: { Cases: 'Case(s)', Pieces: 'Piece(s)', FreeCases: 'Free Case(s)', FreePieces: 'Free Piece(s)' },
                                width: 'min-content',
                                editable: 'never'
                            },
                            {
                                title: "Requested Qty.",
                                field: "quantity",
                                type: 'numeric',
                                cellStyle: {
                                    cellWidth: 'min-content'
                                },
                                editable: 'never'
                            },
                            {
                                title: "Received Qty.",
                                field: "receivedqty",
                                type: 'numeric',
                                cellStyle: {
                                    cellWidth: 'min-content'
                                },
                                editComponent: props =>
                                    <MuiTextField
                                        onChange={e => {
                                            let data = { ...props.rowData };
                                            data.receivedqty = e.target.value;
                                            let damagedqty = isNaN(data.damagedqty) ? 0 : data.damagedqty;
                                            let receivedqty = isNaN(data.receivedqty) ? 0 : data.receivedqty;
                                            data.grnvalue = (receivedqty - damagedqty) * data.listprice;
                                            props.onRowDataChange(data);
                                        }}
                                        type="number"
                                        helperText={props.helperText}
                                        error={props.error}
                                        variant="standard"
                                        value={props.value}
                                    />
                                ,
                                validate: (rowData) =>
                                    rowData.receivedqty === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.receivedqty === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true
                            },
                            {
                                title: "Damaged Qty.",
                                field: "damagedqty",
                                type: 'numeric',
                                cellStyle: {
                                    cellWidth: 'min-content'
                                },
                                editComponent: props =>
                                    <MuiTextField
                                        onChange={e => {
                                            let data = { ...props.rowData };
                                            data.damagedqty = e.target.value;
                                            let damagedqty = isNaN(data.damagedqty) ? 0 : data.damagedqty;
                                            let receivedqty = isNaN(data.receivedqty) ? 0 : data.receivedqty;
                                            data.grnvalue = (receivedqty - damagedqty) * data.listprice;
                                            props.onRowDataChange(data);
                                        }}
                                        helperText={props.helperText}
                                        type="number"
                                        error={props.error}
                                        variant="standard"
                                        value={props.value}
                                    />
                                ,
                                validate: (rowData) =>
                                    rowData.damagedqty === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.damagedqty === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true
                            },
                            {
                                title: "List Price (Rs.)",
                                field: "listprice",
                                type: 'numeric',
                                cellStyle: {
                                    cellWidth: 'min-content'
                                },
                                editable: 'never'
                            },
                            {
                                title: "PO Value (Rs.)",
                                field: "value",
                                type: 'numeric',
                                cellStyle: {
                                    width: 'min-content'
                                },
                                editable: 'never'
                            },
                            {
                                title: "GRN Value (Rs.)",
                                field: "grnvalue",
                                type: 'numeric',
                                cellStyle: {
                                    width: 'min-content'
                                },
                                editable: 'never'
                            }
                        ]}
                        data={data}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setData([...dataUpdate]);

                                        resolve();
                                    }, 1)
                                })
                        }}
                        options={{
                            toolbar: false,
                            filtering: true,
                            search: false,
                            actionsColumnIndex: -1,
                            minBodyHeight: "calc(100vh - 570px)",
                            maxBodyHeight: "calc(100vh - 570px)",
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

                    <div >
                        <div className={style.buttonRow}>
                            <Button
                                className={style.doneBtn}
                                type="submit"
                                variant="contained"
                            >
                                Done
                            </Button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
