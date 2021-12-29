import React, { useEffect, useState } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';

//Material UI 
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Material UI Icons
import DeleteIcon from '@mui/icons-material/Delete';

//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//SCSS styles
import style from './ManageStore.module.scss';
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

export default function ManageStore() {

    const classes = useStyles();

    const [data, setData] = useState();

    useEffect(() => {
        setData([{
            'description': "Khomba Soap",
            'piecespercase': 10,
            'price': 55,
            'qtycases': 45,
            'qtypieces': 4,
            'damaged': 5,
            'return': 11
        }])
    }, [setData])

    return (
        <Page title="Manage Store">
            <div className={style.container}>

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
                        Header: props => (
                            <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                <TableRow className={classes.row1}>
                                    <TableCell padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell width="10%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Pieces per Case
                                        </div>
                                    </TableCell>
                                    <TableCell width="10%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Price
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Quantity
                                    </TableCell>
                                    <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Damaged
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Return
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="10%" padding="none" align="center">Cases</TableCell>
                                    <TableCell width="10%" padding="none" align="center">Pieces</TableCell>
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
                            field: "qtycases",
                            type: 'numeric',
                            editable: 'never',
                            cellStyle: {
                                padding: "10px 7px 10px 7px",
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "qtypieces",
                            type: 'numeric',
                            editable: 'never',
                            cellStyle: {
                                width: '5%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "return",
                            type: 'numeric',
                            editable: 'never',
                            cellStyle: {
                                width: '5%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "damaged",
                            type: 'numeric',
                            editable: 'never',
                            cellStyle: {
                                width: '5%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                    ]}
                    data={data}
                    options={{
                        addRowPosition: "first",
                        toolbar: false,
                        paging: false,
                        filtering: true,
                        search: false,
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

        </Page>
    )
}
