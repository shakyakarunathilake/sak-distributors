import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
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
    TextField as MuiTextField
} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './GINStepOne.module.scss';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
    overrides: {
        MuiInputBase: {
            root: {
                fontSize: '0.9em'
            }
        },
        MuiOutlinedInput: {
            inputMarginDense: {
                paddingTop: "10px",
                paddingBottom: "10px"
            }
        },
        MuiAutocomplete: {
            inputRoot: {
                '&&[class*="MuiOutlinedInput-root"] $input': {
                    padding: 1
                }
            }
        },
    }
});

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
        orderRecords,
        inChargeOptions,
    } = props;

    const { formState: { errors }, control, watch, getValues, setValue } = useForm();

    const [orderNumbers, setOrderNumbers] = useState([]);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const ginTime = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();

    useEffect(() => {
        setValue("ginnumber", `GIN${ginTime}`);
        setValue("createdat", dateTime);
        setValue("createdby", `${firstname} ${lastname} (${employeeid})`);
    }, [setValue])

    useEffect(() => {
        getOrderNumbers();
    }, [watch('route')]);

    const handleChipClick = () => { }

    const getOrderNumbers = () => {

        const relevantOrderRecords = orderRecords.filter(x => x.route === getValues('route'));

        const relevantOrderNumbers = relevantOrderRecords.map(x => x.orderno);
        setOrderNumbers(relevantOrderNumbers)

        const relevantOrderItems = [].concat.apply([], relevantOrderRecords.map(order => {
            const itemList = [];

            order.items.forEach(item => {
                itemList.push({
                    'description': item.description,
                    'price': item.price,
                    'cases': parseInt(item.salesqtycases) + parseInt(item.freeqtycases),
                    'pieces': parseInt(item.salesqtypieces) + parseInt(item.freeqtypieces),
                    'grossamount': item.grossamount
                })
            })

            return itemList;
        })).reduce((a, c) => {

            const filtered = a.filter(el => el.description === c.description);

            if (filtered.length > 0) {
                a[a.indexOf(filtered[0])].pieces += +c.pieces;
                a[a.indexOf(filtered[0])].cases += +c.cases;
            } else {
                a.push(c);
            }

            return a;
        }, []);

        const organizedRelevantOrderItems = relevantOrderItems.forEach(item => {

        })

        setData(relevantOrderItems);

    }

    const getGINTotal = () => {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total = total + (isNaN(data[i].grossamount) ? 0 : data[i].grossamount);
        }

        setValue("gintotal", total);
        return total;
    }

    const onSubmit = () => {
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
                                <th align="left">Route</th>
                                <td align="left">
                                    <Controller
                                        name={"route"}
                                        control={control}
                                        rules={{ required: { value: true, message: "Route is required" } }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                size="small"
                                                value={value || ''}
                                                onChange={onChange}
                                                options={employeeservice.getRouteOptions()}
                                                error={errors.route ? true : false}
                                                helperText={errors.route && errors.route.message}
                                            />
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
                                            <ThemeProvider theme={theme}>
                                                <Autocomplete
                                                    options={inChargeOptions || []}
                                                    getOptionLabel={(option) => option.title}
                                                    onChange={onChange}
                                                    size="small"
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
                                            </ThemeProvider>
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
                                <th rowSpan={5} className={style.thAlign}>Order Numbers</th>
                                <td rowSpan={5} className={style.tdAlign}>
                                    <div>
                                        {
                                            orderNumbers.map(x =>
                                                <Chip className={style.chip} label={x} key={x} onClick={handleChipClick} />
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
                                flexDirection: "column"
                            }} >
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
                            <TableHead {...props} >
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
                                cellWidth: '55%',
                                textAlign: 'left'
                            }
                        },
                        {
                            title: 'Price (Rs.)',
                            field: 'price',
                            cellStyle: {
                                cellWidth: '10%',
                                textAlign: 'left'
                            }
                        },
                        {
                            title: 'Cases',
                            field: 'cases',
                            width: "10%",
                            cellStyle: {
                                cellWidth: '10%',
                                textAlign: 'right'
                            }
                        },
                        {
                            title: 'Pieces',
                            field: 'pieces',
                            cellStyle: {
                                cellWidth: '10%',
                                textAlign: 'right'
                            }
                        },
                        {
                            title: 'Gross Amount (Rs.)',
                            field: 'grossamount',
                            cellStyle: {
                                cellWidth: '15%',
                                textAlign: 'right'
                            }
                        }
                    ]}
                    data={data}
                    options={{
                        tableLayout: 'auto',
                        toolbar: false,
                        filtering: true,
                        search: false,
                        pageSize: 999,
                        maxBodyHeight: "calc(100vh - 460px)",
                        minBodyHeight: "calc(100vh - 460px)",
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
