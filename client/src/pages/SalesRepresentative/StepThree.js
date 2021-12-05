import React, { useMemo } from 'react';

//Material UI Components
import { Paper } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

//Styling
import style from './StepThree.module.scss';
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

export default function StepThree(props) {

    const { data, setData, setOpenPopup, productOptions, backFormStep, completeFormStep } = props;

    const classes = useStyles();

    const addActionRef = React.useRef();

    const getProductItemList = useMemo(() => {
        const selectedDescriptions = data.map(x => x.description);
        const productItemList = productOptions.filter(x => selectedDescriptions.indexOf(x.title) === -1);
        return productItemList;
    }, [data, productOptions]);

    const getTotal = () => {
        // let total = 0;
        // for (let i = 0; i < data.length; i++) {
        //     total = total + data[i].value;
        // }
        // setValue("total", total);
        // setValue("receiveddiscounts", 0);
        // setValue("damagedexpireditems", 0);
        // return total;
    }

    return (
        <div className={style.three}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Add Items to Order
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 3 of 4
                </div>

            </div>

            <div className={style.body}>

                <div className={style.btndiv}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => addActionRef.current.click()}
                    >
                        Add new item
                    </Button>
                </div>

                <MaterialTable
                    components={{
                        Container: props => <Paper {...props} elevation={1} />,
                        Action: props => {
                            if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                                return <MTableAction {...props} />
                            } else {
                                return <div ref={addActionRef} onClick={props.action.onClick} />;
                            }
                        },
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
                                <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 102.56px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
                                    </Grid>
                                </Grid>
                            </td>
                        ),
                        Header: props => (
                            <TableHead {...props} >
                                <TableRow className={classes.row1}>
                                    <TableCell width="24%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell width="8%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Retail Price
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Free Qty.
                                    </TableCell>
                                    <TableCell padding="none" colspan={2} align="center">
                                        Return Qty.
                                    </TableCell>
                                    <TableCell padding="none" width="14%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Gross Amount
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="11%" rowSpan={2} align="center">
                                        Action
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="8%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="8%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="7%" padding="none" align="center">D</TableCell>
                                    <TableCell width="7%" padding="none" align="center">R</TableCell>
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
                                width: '24%',
                                textAlign: 'left'
                            },
                            editComponent: props => (
                                < Autocomplete
                                    options={getProductItemList}
                                    getOptionLabel={(option) => option.title}
                                    onChange={e => props.onChange(e.target.innerText)}
                                    inputValue={props.value || ''}
                                    renderInput={(params) =>
                                        <MuiTextField
                                            {...params}
                                            helperText={props.helperText}
                                            error={props.error}
                                            variant="standard"
                                        />
                                    }
                                />
                            ),
                            validate: (rowData) =>
                                rowData.description === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.description === ''
                                        ? { isValid: false, helperText: 'Invalid *' }
                                        : true

                        },
                        {
                            title: "Retail Price",
                            field: "retailprice",
                            editable: 'never',
                            type: 'numeric',
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'left'
                            },
                        },
                        {
                            title: "Sales Cs",
                            field: "salesqtycases",
                            type: 'numeric',
                            cellStyle: {
                                padding: "10px 5px 10px 7px",
                                width: '8%',
                            },
                            validate: (rowData) =>
                                rowData.salesqtycases === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.salesqtycases === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Sales Pcs",
                            field: "salesqtypieces",
                            type: 'numeric',
                            initialEditValue: 0,
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'right'
                            },
                            validate: (rowData) =>
                                rowData.salesqtypieces === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.salesqtypieces === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Free Cs",
                            field: "freeqtycases",
                            type: 'numeric',
                            initialEditValue: 0,
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'right'
                            },
                            validate: (rowData) =>
                                rowData.freeqtycases === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.freeqtycases === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Free Pcs",
                            field: "freeqtypieces",
                            type: 'numeric',
                            initialEditValue: 0,
                            cellStyle: {
                                width: '8%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'right'
                            },
                            validate: (rowData) =>
                                rowData.freeqtypieces === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.freeqtypieces === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Damaged",
                            field: "damaged",
                            type: 'numeric',
                            initialEditValue: 0,
                            cellStyle: {
                                width: '7%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'right'
                            },
                            validate: (rowData) =>
                                rowData.damaged === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.damaged === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Return",
                            field: "return",
                            type: 'numeric',
                            initialEditValue: 0,
                            cellStyle: {
                                width: '7%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'right'
                            },
                            validate: (rowData) =>
                                rowData.return === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.return === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Gross Amount",
                            field: "grossamount",
                            editable: 'never',
                            type: 'numeric',
                            cellStyle: {
                                width: '14%',
                                padding: "10px 5px 10px 7px",
                                textAlign: 'right'
                            },
                        }
                    ]}
                    data={data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setData([newData, ...data]);

                                    resolve();
                                }, 1)
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
                        search: false,
                        maxBodyHeight: "calc(100vh - 280px)",
                        minBodyHeight: "calc(100vh - 280px)",
                        actionsColumnIndex: -1,
                        headerStyle: {
                            position: "sticky",
                            top: "0",
                            backgroundColor: '#20369f',
                            color: '#FFF',
                            fontSize: "0.8em",
                            padding: "10px 0 10px 10px",
                        },
                        rowStyle: rowData => ({
                            fontSize: "0.8em",
                            backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                        })
                    }}
                />
            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    <Button
                        variant="contained"
                        onClick={() => backFormStep()}
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
                        color="primary"
                        variant="contained"
                        onClick={() => completeFormStep()}
                    >
                        Next
                    </Button>
                </div>

            </div>

        </div>
    )
}
