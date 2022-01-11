import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';

//Material UI 
import {
    Typography,
    TableRow,
    TableHead,
    TableCell,
    Button,
    Paper,
    TablePagination,
    TextField as MuiTextField,
    Grid
} from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//SCSS styles
import style from './StepOne.module.scss';
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
        GRNRecords,
    } = props;

    const { control, getValues, setValue } = useForm();

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    useEffect(() => {

        setValue("ponumber", GRNRecords.ponumber);
        setValue("grnnumber", GRNRecords.grnnumber);
        setValue("supplier", GRNRecords.supplier);
        setValue("total", GRNRecords.total);
        setValue("createdat", GRNRecords.createdat);
        setValue("createdby", GRNRecords.createdby);
        setValue("customername", "S.A.K Distributors");
        setValue("customeraddress", "No.233, Kiriwallapitiya, Rambukkana, Srilanka");
        setValue("contactnumber", "0352264009");
        setValue("status", "Delivered");

        setData(GRNRecords.items);

    }, [GRNRecords, setValue, setData])

    const getTime = () => {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        return dateTime;
    }

    const getGRNTotal = () => {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total = total + (isNaN(data[i].grnvalue) ? 0 : data[i].grnvalue);
        }

        setValue("grntotal", total.toFixed(2));
        return total.toFixed(2);
    }

    const getDamagedMissingItems = () => {

        let pototal = 0;
        let grntotal = 0;

        for (let i = 0; i < data.length; i++) {
            pototal = pototal + (isNaN(data[i].value) ? 0 : data[i].value);
            grntotal = grntotal + (isNaN(data[i].grnvalue) ? 0 : data[i].grnvalue);

        }

        let damagedmissingitems = (pototal - grntotal).toFixed(2);

        setValue("damagedmissingitems", damagedmissingitems);
        return damagedmissingitems;
    }

    const onSubmit = () => {

        setValue("createdat", getTime());
        setValue("createdby", `${firstname} ${lastname} (${employeeid})`);

        setOrderFormData(getValues());
        setConfirmation(true);
        completeFormStep();
    }

    return (
        <div className={style.container}>

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
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

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
                                            <Typography className={style.input && style.blue}>
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
                                            <Typography className={style.input && style.blue}>
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
                                            <Typography className={value === 'Pending' ? style.red : style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">GRN Created by</th>
                                <td align="left">
                                    <Controller
                                        name={"createdby"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={value === 'Pending' ? style.red : style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <AutoSizer>
                    {({ height, width }) => {
                        const pageSize = Math.floor((height - 440) / 48);

                        return (
                            <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

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
                                        Pagination: props => (
                                            <td style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }} >
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> Purchase Order Total (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> {parseInt(getValues("total")).toFixed(2)} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> Damaged Expired Items (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> {getDamagedMissingItems()} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> GRN Total (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> {getGRNTotal()} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <TablePagination {...props} />
                                            </td>
                                        ),
                                        Header: props => (
                                            <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                                <TableRow className={classes.row1}>
                                                    <TableCell width="2%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            #
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="25%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Description
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Pieces per Case
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            List Price (Rs.)
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
                                                    <TableCell padding="none" width="7%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            GRN Value (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="7%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            PO Value (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="2%" rowSpan={2} align="center">
                                                        Action
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
                                            field: "tableData.id",
                                            editable: 'never',
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '2%',
                                                textAlign: 'center'
                                            },
                                        },
                                        {
                                            field: "description",
                                            editable: 'never',
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
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "listprice",
                                            type: 'numeric',
                                            render: rowData => rowData.listprice.toFixed(2),
                                            editable: 'never',
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '5%',
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "salesqtycases",
                                            type: 'numeric',
                                            editable: 'never',
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '5%',
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "salesqtypieces",
                                            type: 'numeric',
                                            editable: 'never',
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
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.deliveredsalesqtycases = e.target.value;
                                                        let deliveredsalesqtycases = isNaN(data.deliveredsalesqtycases) ? 0 : data.deliveredsalesqtycases;
                                                        let deliveredsalesqtypieces = isNaN(data.deliveredsalesqtypieces) ? 0 : data.deliveredsalesqtypieces;
                                                        let damaged = isNaN(data.damaged) ? 0 : data.damaged;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damaged) * listprice;

                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                    defaultValue={props.rowData.salesqtycases}
                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.salesqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.salesqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        }, {
                                            field: "deliveredsalesqtypieces",
                                            type: 'numeric',
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '5%',
                                                textAlign: 'right'
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.deliveredsalesqtypieces = e.target.value;
                                                        let deliveredsalesqtycases = isNaN(data.deliveredsalesqtycases) ? 0 : data.deliveredsalesqtycases;
                                                        let deliveredsalesqtypieces = isNaN(data.deliveredsalesqtypieces) ? 0 : data.deliveredsalesqtypieces;
                                                        let damaged = isNaN(data.damaged) ? 0 : data.damaged;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damaged) * listprice;

                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                    defaultValue={props.rowData.salesqtypieces}

                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.salesqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.salesqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "freeqtycases",
                                            type: 'numeric',
                                            editable: 'never',
                                            cellStyle: {
                                                width: '5%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "freeqtypieces",
                                            type: 'numeric',
                                            editable: 'never',
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
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        console.log(props.rowData)
                                                        data.deliveredfreeqtycases = e.target.value;
                                                        let deliveredsalesqtycases = isNaN(data.deliveredsalesqtycases) ? 0 : data.deliveredsalesqtycases;
                                                        let deliveredsalesqtypieces = isNaN(data.deliveredsalesqtypieces) ? 0 : data.deliveredsalesqtypieces;
                                                        let damaged = isNaN(data.damaged) ? 0 : data.damaged;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damaged) * listprice;

                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                    defaultValue={props.rowData.freeqtycases}
                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.salesqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.salesqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        }, {
                                            field: "deliveredfreeqtypieces",
                                            type: 'numeric',
                                            cellStyle: {
                                                padding: "10px 7px 10px 7px",
                                                width: '5%',
                                                textAlign: 'right'
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.deliveredfreeqtypieces = e.target.value;
                                                        let deliveredsalesqtycases = isNaN(data.deliveredsalesqtycases) ? 0 : data.deliveredsalesqtycases;
                                                        let deliveredsalesqtypieces = isNaN(data.deliveredsalesqtypieces) ? 0 : data.deliveredsalesqtypieces;
                                                        let damaged = isNaN(data.damaged) ? 0 : data.damaged;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damaged) * listprice;

                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                    defaultValue={props.rowData.freeqtypieces}
                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.salesqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.salesqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "damaged",
                                            type: 'numeric',
                                            initialEditValue: 0,
                                            cellStyle: {
                                                width: '5%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.damaged = e.target.value;
                                                        let deliveredsalesqtycases = isNaN(data.deliveredsalesqtycases) ? 0 : data.deliveredsalesqtycases;
                                                        let deliveredsalesqtypieces = isNaN(data.deliveredsalesqtypieces) ? 0 : data.deliveredsalesqtypieces;
                                                        let damaged = isNaN(data.damaged) ? 0 : data.damaged;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damaged) * listprice;

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
                                                rowData.damaged === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.damaged === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "grnvalue",
                                            type: 'numeric',
                                            render: rowData => rowData.grnvalue.toFixed(2),
                                            editable: 'never',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        },
                                        {
                                            field: "value",
                                            type: 'numeric',
                                            render: rowData => rowData.value.toFixed(2),
                                            editable: 'never',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 7px 10px 7px",
                                                textAlign: 'right'
                                            }
                                        }
                                    ]}
                                    data={data}
                                    editable={{
                                        onRowAdd: (newData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    setData(prevData => [...prevData, newData]);

                                                    resolve();
                                                }, 100);
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataUpdate = [...data];
                                                    const index = oldData.tableData.id;
                                                    dataUpdate[index] = newData;
                                                    setData([...dataUpdate]);

                                                    resolve();
                                                }, 1)
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataDelete = [...data];
                                                    const index = oldData.tableData.id;
                                                    dataDelete.splice(index, 1);
                                                    setData([...dataDelete]);

                                                    resolve()
                                                }, 1)
                                            }),
                                    }}
                                    icons={{
                                        Delete: () => (
                                            <div>
                                                <DeleteIcon className={style.deleteItemBtn} />
                                            </div>
                                        )
                                    }}
                                    options={{
                                        pageSize: pageSize,
                                        pageSizeOptions: [],
                                        paging: true,
                                        addRowPosition: "first",
                                        toolbar: true,
                                        filtering: true,
                                        search: false,
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
                        );
                    }}
                </AutoSizer>

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
