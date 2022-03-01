import React, { useEffect, useState } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';

//Material UI 
import {
    Paper,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';

//Material Icons
import InfoIcon from '@mui/icons-material/Info';

//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//SCSS styles
import style from './ManageStore.module.scss';
import { makeStyles } from '@material-ui/core/styles';

//Axios
import axios from 'axios';

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
    },

});

export default function ManageStore() {

    const classes = useStyles();

    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8080/store/get-all-store-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                sessionStorage.setItem("StoreTableData", JSON.stringify(res.data));
                setData(res.data.tbody);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

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
                            <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 999 }}>
                                <TableRow className={classes.row1}>
                                    <TableCell width="2%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                        </div>
                                    </TableCell>
                                    <TableCell width="7%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Prod. ID
                                        </div>
                                    </TableCell>
                                    <TableCell width="25%" padding="none" rowSpan={2} align="left">
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell width="7%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            List Price / Selling Price
                                            <Tooltip title="List price for GRN and Selling price for GIN" arrow>
                                                <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'top', marginLeft: '5px' }} />
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                    <TableCell width="15%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            GRN / GIN No.
                                        </div>
                                    </TableCell>
                                    <TableCell width="10%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Date
                                        </div>
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Pieces per Case
                                        </div>
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Damaged Qty
                                            <Tooltip title="Sales damaged pieces / Free damaged pieces" arrow>
                                                <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'top', marginLeft: '5px' }} />
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Total Qty.
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="6%" padding="none" align="center">
                                        Cs
                                        <Tooltip title="Sales cases / Free cases" arrow>
                                            <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'top', marginLeft: '5px' }} />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell width="6%" padding="none" align="center">
                                        Pcs
                                        <Tooltip title="Sales pieces / Free pieces" arrow>
                                            <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'top', marginLeft: '5px' }} />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        ),
                    }}
                    columns={[
                        {
                            field: "productid",
                            render: rowData => {
                                return (
                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.productid}</p>
                                )
                            },
                            cellStyle: {
                                width: '9%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "name",
                            cellStyle: {
                                width: '28%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "listorsellingprice",
                            render: rowData => rowData.listorsellingprice ? `Rs. ${rowData.listorsellingprice}` : '',
                            cellStyle: {
                                width: '7%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "grnnumberginnumber",
                            render: rowData => {
                                const grnnumberginnumber = rowData.grnnumberginnumber ? rowData.grnnumberginnumber.substring(0, 3) : '';

                                return (
                                    grnnumberginnumber === "GRN" ?
                                        <p style={{ padding: "0", margin: "0", color: "#1338BD", fontWeight: "700" }}>{rowData.grnnumberginnumber}</p> :
                                        <p style={{ padding: "0", margin: "0", color: "#FC6A03", fontWeight: "700" }}>{rowData.grnnumberginnumber}</p>
                                )
                            },
                            cellStyle: {
                                width: '15%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "date",
                            type: 'numeric',
                            cellStyle: {
                                width: '10%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "piecespercase",
                            type: 'numeric',
                            cellStyle: {
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "damagedqty",
                            type: 'numeric',
                            cellStyle: {
                                width: '6%',
                                padding: "10px 7px 10px 7px",
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "cases",
                            type: 'numeric',
                            cellStyle: {
                                width: '6%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "pieces",
                            type: 'numeric',
                            cellStyle: {
                                width: '6%',
                                textAlign: 'right'
                            }
                        },
                    ]}
                    data={data}
                    parentChildData={(row, rows) => rows.find(a => a.id === row.parentid)}
                    options={{
                        addRowPosition: "first",
                        toolbar: false,
                        paging: false,
                        filtering: true,
                        search: false,
                        maxBodyHeight: "calc(100vh - 126px)",
                        minBodyHeight: "calc(100vh - 126px)",
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
                            backgroundColor: !!rowData.grnnumberginnumber ? '#ebebeb' : '#ffffff'
                        })
                    }}
                />

            </div>

        </Page>
    )
}
