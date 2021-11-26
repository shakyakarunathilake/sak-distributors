import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';

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

    const { GRNRecords, handleClosePopUp, updateGRN } = props;

    const { control, getValues, setValue, handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);

    useEffect(() => {

        setValue("ponumber", GRNRecords.ponumber);
        setValue("grnnumber", GRNRecords.grnnumber);
        setValue("supplier", GRNRecords.supplier);
        setValue("pocreatedat", GRNRecords.pocreatedat);
        setValue("pocreatedby", GRNRecords.pocreatedby);
        setValue("createdby", GRNRecords.createdby);
        setValue("total", GRNRecords.total);
        setValue("customername", "S.A.K Distributors");
        setValue("customeraddress", "No.233, Kiriwallapitiya, Rambukkana, Srilanka");
        setValue("contactnumber", "0352264009")

        setData(GRNRecords.items);

    }, [GRNRecords, setValue])


    const getGRNTotal = () => {

        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total = total + (isNaN(data[i].grnvalue) ? 0 : data[i].grnvalue);
        }

        setValue("grntotal", total);
        return total;
    }

    const getTime = () => {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        setValue("createdat", dateTime);

        return dateTime;
    }

    const onSubmit = (values) => {

        const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
        const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
        const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

        const grnFormData = new formData();

        grnFormData.append('status', "Complete");
        grnFormData.append('items', JSON.stringify(data));
        grnFormData.append('createdat', values.createdat);
        grnFormData.append('createdby', `${firstname} ${lastname} (${employeeid})`);
        grnFormData.append('grntotal', values.grntotal);

        updateGRN(grnFormData, getValues("grnnumber"));
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
                                        {getTime()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <MaterialTable
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
                                        value={props.value || ''}
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
                                        value={props.value || ''}
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
                            minBodyHeight: "calc(100vh - 490px)",
                            maxBodyHeight: "calc(100vh - 490px)",
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

                        components={{
                            Pagination: () => (
                                <td style={{
                                    display: "flex",
                                    flexDirection: "column"
                                }} >
                                    {/* style={{ margin: "0px 10px 0px auto" }} */}
                                    <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}>PO Total </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getValues("total")} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ background: "#f5f5f5", padding: 15, color: 'red' }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}>GRN Total </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getGRNTotal()} </Typography>
                                        </Grid>
                                    </Grid>
                                </td>
                            )
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
