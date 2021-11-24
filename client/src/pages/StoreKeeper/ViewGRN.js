import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Material UI 
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './ViewGRN.module.scss';

export default function ViewGRN(props) {

    const { GRNRecords, handleClosePopUp } = props;

    const { control, getValues, setValue, handleSubmit } = useForm({ mode: "all" });

    useEffect(() => {

        setValue("ponumber", GRNRecords.ponumber);
        setValue("grnnumber", GRNRecords.grnnumber);
        setValue("supplier", GRNRecords.supplier);
        setValue("status", GRNRecords.status);
        setValue("pocreatedat", GRNRecords.pocreatedat);
        setValue("pocreatedby", GRNRecords.pocreatedby);
        setValue("createdat", GRNRecords.createdat);
        setValue("createdby", GRNRecords.createdby);
        setValue("total", GRNRecords.total);
        setValue("grntotal", GRNRecords.grntotal);
        setValue("customername", "S.A.K Distributors");
        setValue("customeraddress", "No.233, Kiriwallapitiya, Rambukkana, Srilanka");
        setValue("contactnumber", "0352264009")
    }, [GRNRecords, setValue])

    const onSubmit = () => {
        handleClosePopUp()
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                View GRN
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
                                    <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                        <Grid item align="Left" sm={9}>
                                            <Typography style={{ fontWeight: 600 }}> PO Total </Typography>
                                        </Grid>
                                        <Grid item align="Right" sm={3}>
                                            <Typography style={{ fontWeight: 600 }}> {getValues("total")} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                        <Grid item align="Left" sm={9}>
                                            <Typography style={{ fontWeight: 600 }}> GRN Total </Typography>
                                        </Grid>
                                        <Grid item align="Right" sm={3}>
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
                            },
                            {
                                title: "Unit",
                                field: "unit",
                                lookup: { Cases: 'Case(s)', Pieces: 'Piece(s)', FreeCases: 'Free Case(s)', FreePieces: 'Free Piece(s)' },
                                width: 'min-content',
                            },
                            {
                                title: "Requested Qty.",
                                field: "quantity",
                            },
                            {
                                title: "Received Qty.",
                                field: "receivedqty",
                            },
                            {
                                title: "Damaged Qty.",
                                field: "damagedqty",
                            },
                            {
                                title: "List Price (Rs.)",
                                field: "listprice",
                            },
                            {
                                title: "Value (Rs.)",
                                field: "value",
                            }
                        ]}
                        data={GRNRecords.items}
                        options={{
                            toolbar: false,
                            filtering: true,
                            search: false,
                            minBodyHeight: "calc(100vh - 460px)",
                            maxBodyHeight: "calc(100vh - 460px)",
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
