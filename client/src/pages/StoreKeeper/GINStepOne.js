import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Shared Components
import TextField from '../../shared/TextField/TextField';

//Material UI 
import { Button, Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//SCSS styles
import style from './GINStepOne.module.scss';
import { makeStyles } from '@material-ui/core/styles';

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

export default function StepOne(props) {

    const classes = useStyles();

    const {
        data,
        setData,
        setConfirmation,
        setOrderFormData,
        handleClosePopUp,
        completeFormStep,
        GINRecords,
        inChargeOptions,
    } = props;

    const { formState: { errors }, control, getValues, setValue } = useForm();

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    // useEffect(() => {

    //     setValue("vehicle", GINRecords.vehicle);
    //     setValue("ginnumber", GINRecords.ginnumber);
    //     setValue("incharge", GINRecords.incharge);
    //     setValue("total", GINRecords.total);
    //     setValue("createdat", GINRecords.createdat);
    //     setValue("createdby", GINRecords.createdby);
    //     setValue("distributor", "S.A.K Distributors");
    //     setValue("distributoraddress", "No.233, Kiriwallapitiya, Rambukkana, Srilanka");
    //     setValue("distributorcontactnumber", "0352264009");

    //     setData(GINRecords.items);

    // }, [GINRecords, setValue, setData])

    const getTime = () => {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        return dateTime;
    }

    const getGINTotal = () => {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total = total + (isNaN(data[i].gingrossamount) ? 0 : data[i].gingrossamount);
        }

        setValue("gintotal", total);
        return total;
    }

    const onSubmit = () => {

        setValue("createdat", getTime());
        setValue("createdby", `${firstname} ${lastname} (${employeeid})`);
        setValue("status", "Complete");

        setOrderFormData(getValues());
        setConfirmation(true);
        completeFormStep();
    }

    return (
        <div className={style.container}>

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
                                            <Typography className={style.input && style.blue}>
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
                                <th align="left">In Charge</th>
                                <td align="left">
                                    <Controller
                                        name={"incharge"}
                                        control={control}
                                        rules={{ required: "In Charge is required" }}
                                        render={({ field: { onChange, value } }) => (
                                            <Autocomplete
                                                options={inChargeOptions || []}
                                                getOptionLabel={(option) => option.title}
                                                onChange={onChange}
                                                renderInput={(params) => (
                                                    <MuiTextField
                                                        {...params}
                                                        helperText={errors.incharge && errors.incharge.message}
                                                        error={errors.incharge ? true : false}
                                                        variant="outlined"
                                                        margin="dense"
                                                        placeholder="Ex: Buddhika Bandara (E00006)"
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Vehicle </th>
                                <td align="left">
                                    <Controller
                                        name={"vehicle"}
                                        control={control}
                                        rules={{ required: { value: true, message: "Vehicle is required" } }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                error={errors.vehicle ? true : false}
                                                helperText={errors.vehicle && errors.vehicle.message}
                                                value={value || ''}
                                                onChange={onChange}
                                                placeholder="Ex: Van (PND 8430)"
                                                margin="dense"
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
                                <th rowSpan={4} className={style.thAlign}>Order Numbers</th>
                                <td rowSpan={4} className={style.tdAlign}>
                                    <div>
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
                                        <Chip className={style.chip} label="primary" />
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
                                flexDirection: "column"
                            }} >
                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                    <Grid item align="Right" style={{ margin: "0px 220px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> Order Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 20px 0px 0px" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getValues("total")} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                    <Grid item align="Right" style={{ margin: "0px 220px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> GIN Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 20px 0px 0px" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getGINTotal()} </Typography>
                                    </Grid>
                                </Grid>
                            </td>
                        ),
                        Header: props => (
                            <TableHead {...props} sx={{ position: 'sticky', top: '0', left: '0' }}>
                                <TableRow className={classes.row1}>
                                    <TableCell padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="150px" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Price (Rs.)
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Total Sales Qty.
                                    </TableCell>
                                    <TableCell width="200px" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Total Gross Amount (Rs.)
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="110px" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="110px" padding="none" align="center">Pcs</TableCell>
                                </TableRow>
                            </TableHead>
                        ),
                    }}
                    columns={[
                        {
                            title: 'Description',
                            field: "description"
                        },
                        {
                            title: 'Price (Rs.)',
                            field: 'price',
                        },
                        {
                            title: 'Total Sales Cases Qty.',
                            field: 'totalsalescasesqty',
                        },
                        {
                            title: 'Total Sales Pieces Qty.',
                            field: 'totalsalespiecesqty',
                        },
                        {
                            title: 'Total Gross Amount (Rs.)',
                            field: 'totalgrossamount',
                        }
                    ]}
                    data={data}
                    options={{
                        toolbar: false,
                        filtering: true,
                        search: false,
                        pageSize: 999,
                        maxBodyHeight: "calc(100vh - 470px)",
                        minBodyHeight: "calc(100vh - 470px)",
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
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Next
                </Button>
            </div>

        </div>
    )
}
