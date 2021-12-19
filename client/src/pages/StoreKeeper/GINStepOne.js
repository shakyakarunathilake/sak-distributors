import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Material UI 
import { Button, Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
        GINRecords,
    } = props;

    const { control, getValues, setValue } = useForm();

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    useEffect(() => {

        setValue("orderno", GINRecords.orderno);
        setValue("ginnumber", GINRecords.ginnumber);
        setValue("customer", GINRecords.customer);
        setValue("total", GINRecords.total);
        setValue("createdat", GINRecords.createdat);
        setValue("createdby", GINRecords.createdby);
        setValue("distributor", "S.A.K Distributors");
        setValue("distributoraddress", "No.233, Kiriwallapitiya, Rambukkana, Srilanka");
        setValue("distributorcontactnumber", "0352264009");
        
        setData(GINRecords.items);
        
    }, [GINRecords, setValue, setData])
    
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
                                <th align="left">Order No.</th>
                                <td align="left">
                                    <Controller
                                        name={"orderno"}
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
                                <th align="left">GIN No.</th>
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
                                <th align="left">GIN Created by</th>
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

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Distributor</th>
                                <td align="left">
                                    <Controller
                                        name={"distributor"}
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
                                        name={"distributoraddress"}
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
                                        name={"distributorcontactnumber"}
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
                                <th align="left">Customer</th>
                                <td align="left">
                                    <Controller
                                        name={"customer"}
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
                                        <Typography style={{ fontWeight: 600 }}> Order Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getValues("total")} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 7, color: 'red' }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> GIN Total (Rs.) </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getGINTotal()} </Typography>
                                    </Grid>
                                </Grid>
                            </td>
                        ),
                        Header: props => (
                            <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                <TableRow className={classes.row1}>
                                    <TableCell width="25%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Pieces per Case
                                        </div>
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Price
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Delivering Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Free Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Delivering Free Qty.
                                    </TableCell>
                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            GIN Gross Amount
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="8%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Ord. Gross Amount
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
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "price",
                            type: 'numeric',
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
                            field: "deliveringsalesqtycases",
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
                                        data.deliveringsalesqtycases = e.target.value;
                                        let deliveringsalesqtycases = isNaN(data.deliveringsalesqtycases) ? 0 : data.deliveringsalesqtycases;
                                        let deliveringsalesqtypieces = isNaN(data.deliveringsalesqtypieces) ? 0 : data.deliveringsalesqtypieces;
                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                        let price = isNaN(data.price) ? 0 : data.price;
                                        let numberofpieces = ((deliveringsalesqtycases * piecespercase) + +deliveringsalesqtypieces)
                                        data.gingrossamount = numberofpieces * price;

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
                            field: "deliveringsalesqtypieces",
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
                                        data.deliveringsalesqtypieces = e.target.value;
                                        let deliveringsalesqtycases = isNaN(data.deliveringsalesqtycases) ? 0 : data.deliveringsalesqtycases;
                                        let deliveringsalesqtypieces = isNaN(data.deliveringsalesqtypieces) ? 0 : data.deliveringsalesqtypieces;
                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                        let price = isNaN(data.price) ? 0 : data.price;
                                        let numberofpieces = ((deliveringsalesqtycases * piecespercase) + +deliveringsalesqtypieces)
                                        data.gingrossamount = numberofpieces * price;

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
                            title: "Free Cs",
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
                            title: "Free Pcs",
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
                            field: "deliveringfreeqtycases",
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
                                        data.deliveringfreeqtycases = e.target.value;
                                        let deliveringsalesqtycases = isNaN(data.deliveringsalesqtycases) ? 0 : data.deliveringsalesqtycases;
                                        let deliveringsalesqtypieces = isNaN(data.deliveringsalesqtypieces) ? 0 : data.deliveringsalesqtypieces;
                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                        let price = isNaN(data.price) ? 0 : data.price;
                                        let numberofpieces = ((deliveringsalesqtycases * piecespercase) + +deliveringsalesqtypieces)
                                        data.gingrossamount = numberofpieces * price;

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
                            field: "deliveringfreeqtypieces",
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
                                        data.deliveringfreeqtypieces = e.target.value;
                                        let deliveringsalesqtycases = isNaN(data.deliveringsalesqtycases) ? 0 : data.deliveringsalesqtycases;
                                        let deliveringsalesqtypieces = isNaN(data.deliveringsalesqtypieces) ? 0 : data.deliveringsalesqtypieces;
                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                        let price = isNaN(data.price) ? 0 : data.price;
                                        let numberofpieces = ((deliveringsalesqtycases * piecespercase) + +deliveringsalesqtypieces)
                                        data.gingrossamount = numberofpieces * price;

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
                            title: "GIN Gross Amount (Rs.)",
                            field: "gingrossamount",
                            type: 'numeric',
                            editable: 'never',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            title: "Ord. Gross Amount (Rs.)",
                            field: "grossamount",
                            type: 'numeric',
                            editable: 'never',
                            cellStyle: {
                                width: '8%',
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
                        addRowPosition: "first",
                        toolbar: true,
                        filtering: true,
                        search: false,
                        pageSize: 999,
                        maxBodyHeight: "calc(100vh - 420px)",
                        minBodyHeight: "calc(100vh - 420px)",
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
