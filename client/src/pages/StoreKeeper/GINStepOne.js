import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';

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
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';

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
                fontSize: '0.9em',
                fontFamily: 'Roboto, Poppins, sans-serif',
            }
        },
        MuiFormHelperText: {
            root: {
                fontSize: '0.64em',
                fontFamily: 'Roboto, Poppins, sans-serif',
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

export default function GINStepOne(props) {

    const classes = useStyles();

    const {
        data,
        setData,
        setConfirmation,
        setOrderFormData,
        handleClosePopUp,
        completeFormStep,
        orderRecords,
        GINRecords,
        inChargeOptions,
        orderNumbers,
        setOrderNumbers,
        action,
        control,
        watch,
        getValues,
        trigger,
        isValid,
        errors,
        setValue,
    } = props;

    useEffect(() => {
        if (GINRecords !== null) {
            setData([...GINRecords.items]);
            setOrderNumbers([...GINRecords.ordernumbers]);
            setValue('incharge', GINRecords.incharge);
        }
    }, [setData, GINRecords, setValue])

    useEffect(() => {
        if (GINRecords === null) {
            getOrderNumbers();
        }
    }, [watch('route'), GINRecords]);

    const handleInChargeChange = (event, option) => {
        if (option) {
            setValue("incharge", option.title);
        }
    }

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
                    'sellingprice': item.sellingprice,
                    'piecespercase': item.piecespercase,
                    'salesqtycases': parseInt(item.salesqtycases),
                    'salesqtypieces': parseInt(item.salesqtypieces),
                    'freeqtycases': parseInt(item.freeqtycases),
                    'freeqtypieces': parseInt(item.freeqtypieces),
                    'grossamount': item.grossamount
                })
            })

            return itemList;
        })).reduce((a, c) => {

            const filtered = a.filter(el => el.description === c.description);

            if (filtered.length > 0) {
                a[a.indexOf(filtered[0])].salesqtycases += +c.salesqtycases;
                a[a.indexOf(filtered[0])].salesqtypieces += +c.salesqtypieces;
                a[a.indexOf(filtered[0])].freeqtycases += +c.freeqtycases;
                a[a.indexOf(filtered[0])].freeqtypieces += +c.freeqtypieces;
            } else {
                a.push(c);
            }

            return a;
        }, []);

        let pieces = 0;
        let cases = 0;

        const getPieces = (noofpieces, piecespercase) => {
            pieces = noofpieces % piecespercase;
            return pieces;
        }

        const getCases = (noofpieces, piecespercase) => {
            cases = Math.floor(noofpieces / piecespercase);
            return cases;
        }

        const halfOrganized = relevantOrderItems.map(item => (
            item.salesqtypieces > item.piecespercase
                ? { ...item, pieces: getPieces(item.salesqtypieces, item.piecespercase), cases: getCases(item.salesqtypieces, item.piecespercase) + parseInt(item.salesqtycases) }
                : item
        ))

        const fullyOrganized = halfOrganized.map(item => (
            item.freeqtypieces > item.piecespercase
                ? { ...item, pieces: getPieces(item.freeqtypieces, item.piecespercase), cases: getCases(item.freeqtypieces, item.piecespercase) + parseInt(item.freeqtycases) }
                : item
        ))

        setData(fullyOrganized);

    }

    const getTotal = () => {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total = total + (isNaN(data[i].grossamount) ? 0 : data[i].grossamount);
        }

        setValue("total", total);
        return total;
    }

    const onSubmit = () => {
        trigger();

        console.log("IS VALID: ", isValid);
        console.log("VALUES: ", getValues());

        if (isValid) {
            setOrderFormData(getValues());
            setConfirmation(true);
            completeFormStep();
        }
    }

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === 'Create' && 'Create GIN Form'}
                        {action === 'Edit' && 'Edit GIN Form'}
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
                                            <Typography className={style.input}>
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
                                <th align="left">
                                    Route <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        name={"route"}
                                        control={control}
                                        rules={{ required: { value: true, message: "Route is required" } }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                size="small"
                                                value={value || ''}
                                                disabled={action === "Edit"}
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
                                <th align="left">
                                    In Charge <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <ThemeProvider theme={theme}>
                                        <Controller
                                            name={"incharge"}
                                            control={control}
                                            defaultValue={''}
                                            rules={{
                                                required: { value: true, message: "Required *" },
                                            }}
                                            render={({ field: { value } }) => (
                                                <Autocomplete
                                                    options={inChargeOptions || []}
                                                    getOptionLabel={(option) => option.title}
                                                    onChange={handleInChargeChange}
                                                    inputValue={value}
                                                    renderInput={(params) => (
                                                        <MuiTextField
                                                            {...params}
                                                            error={errors.incharge ? true : false}
                                                            helperText={errors.incharge && errors.incharge.message}
                                                            placeholder="Ex: Buddhika Bandara (E00006)"
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </ThemeProvider>
                                </td>
                            </tr>
                            <tr>
                                <th align="left">
                                    Vehicle <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        name={"vehicle"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                error={errors.vehicle ? true : false}
                                                helperText={errors.vehicle && errors.vehicle.message}
                                                value={value}
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
                                flexDirection: "column",
                            }} >
                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                    <Grid item align="Right" style={{ margin: "0px 220px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 20px 0px 0px" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
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
                        tableLayout: 'auto',
                        toolbar: false,
                        filtering: true,
                        search: false,
                        paging: true,
                        pageSize: 5,
                        pageSizeOptions: [5],
                        // minBodyHeight: "calc(100vh - 500px)",
                        // maxBodyHeight: "calc(100vh - 500px)",
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
                <Tooltip
                    arrow
                    placement="top"
                    title="Please fill the required * fields to proceed"
                >
                    <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'middle', marginRight: '10px' }} />
                </Tooltip>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                    disabled={!isValid}
                >
                    Next
                </Button>

            </div>

        </div>
    )
}
