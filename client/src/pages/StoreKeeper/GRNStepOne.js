import React from 'react';
import { Controller } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';
import classnames from 'classnames';

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
import Tooltip from '@mui/material/Tooltip';

//Material Icons
import InfoIcon from '@mui/icons-material/Info';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS styles
import style from './GRNStepOne.module.scss';
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

export default function GRNStepOne(props) {

    const classes = useStyles();

    const {
        data,
        setData,
        handleClosePopUp,
        completeFormStep,
        control,
        getValues,
        setValue
    } = props;

    const getDamagedMissingItems = () => {
        let pototal = 0;
        let grntotal = 0;

        for (let i = 0; i < data.length; i++) {
            pototal = pototal + (isNaN(data[i].value) ? 0 : data[i].value);
            grntotal = grntotal + (isNaN(data[i].grnvalue) ? 0 : data[i].grnvalue);
        }

        let damagedmissingitems = (pototal - grntotal).toFixed(2);

        setValue("damagedmissingitems", damagedmissingitems);
        return NumberWithCommas(damagedmissingitems);
    }

    const onSubmit = () => {
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
                                    &nbsp;
                                    <Controller
                                        name={"givenid"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                ({value})
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
                                            <Typography className={classnames(style.input, style.blue)}>
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
                                            <Typography className={classnames(style.input, style.blue)}>
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
                                            <Typography className={style.input}>
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
                                            <Typography className={style.input}>
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
                        const pageSize = Math.floor((height - 470) / 48);

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
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Previous GRN Damaged / Missing Items (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues("previousdamagedmissingitems"))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Purchase Order Total (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues("pototal"))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            Damaged / Missing Items (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontWeight: 600 }}>
                                                            {getDamagedMissingItems()}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '300px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}>
                                                            GRN Total (Rs.)
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px 0px", width: '200px' }}>
                                                        <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}>
                                                            {NumberWithCommas(getValues('grntotal'))}
                                                        </Typography>
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
                                                    <TableCell width="15%" padding="none" rowSpan={2}>
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
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Damaged Qty.
                                                        <Tooltip title="In Pieces" arrow>
                                                            <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'top', marginLeft: '5px' }} />
                                                        </Tooltip>
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
                                                    <TableCell width="5%" padding="none" align="center">Sales</TableCell>
                                                    <TableCell width="5%" padding="none" align="center">Free</TableCell>
                                                </TableRow>
                                            </TableHead>
                                        ),
                                    }}
                                    columns={[
                                        {
                                            title: "#",
                                            field: "tableData.id",
                                            cellStyle: {
                                                width: '3%',
                                                textAlign: 'left'
                                            },
                                            render: rowData => {
                                                return rowData.tableData.id + 1
                                            }
                                        },
                                        {
                                            field: "description",
                                            render: rowData => `${rowData.productid} ${rowData.description}`,
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
                                            render: rowData => NumberWithCommas(parseInt(rowData.listprice).toFixed(2)),
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
                                                        let damagedsalesqty = isNaN(data.damagedsalesqty) ? 0 : data.damagedsalesqty;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damagedsalesqty) * listprice;

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
                                                rowData.deliveredsalesqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.deliveredsalesqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
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
                                                        let damagedsalesqty = isNaN(data.damagedsalesqty) ? 0 : data.damagedsalesqty;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damagedsalesqty) * listprice;

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
                                                rowData.deliveredsalesqtypieces === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.deliveredsalesqtypieces === ''
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
                                                        let damagedsalesqty = isNaN(data.damagedsalesqty) ? 0 : data.damagedsalesqty;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damagedsalesqty) * listprice;

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
                                                rowData.deliveredfreeqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.deliveredfreeqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
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
                                                        let damagedsalesqty = isNaN(data.damagedsalesqty) ? 0 : data.damagedsalesqty;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damagedsalesqty) * listprice;

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
                                                rowData.deliveredfreeqtypieces === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.deliveredfreeqtypieces === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "damagedsalesqty",
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
                                                        data.damagedsalesqty = e.target.value;
                                                        let deliveredsalesqtycases = isNaN(data.deliveredsalesqtycases) ? 0 : data.deliveredsalesqtycases;
                                                        let deliveredsalesqtypieces = isNaN(data.deliveredsalesqtypieces) ? 0 : data.deliveredsalesqtypieces;
                                                        let damagedsalesqty = isNaN(data.damagedsalesqty) ? 0 : data.damagedsalesqty;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damagedsalesqty) * listprice;

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
                                                rowData.damagedsalesqty === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.damagedsalesqty === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "damagedfreeqty",
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
                                                        data.damagedfreeqty = e.target.value;
                                                        let deliveredsalesqtycases = isNaN(data.deliveredsalesqtycases) ? 0 : data.deliveredsalesqtycases;
                                                        let deliveredsalesqtypieces = isNaN(data.deliveredsalesqtypieces) ? 0 : data.deliveredsalesqtypieces;
                                                        let damagedsalesqty = isNaN(data.damagedsalesqty) ? 0 : data.damagedsalesqty;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                                        let numberofpieces = ((deliveredsalesqtycases * piecespercase) + +deliveredsalesqtypieces)
                                                        data.grnvalue = (numberofpieces - damagedsalesqty) * listprice;

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
                                                rowData.damagedfreeqty === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.damagedfreeqty === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "grnvalue",
                                            type: 'numeric',
                                            render: rowData => NumberWithCommas(rowData.grnvalue.toFixed(2)),
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
                                            render: rowData => NumberWithCommas(rowData.value.toFixed(2)),
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
