import React, { useEffect, useState } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
// import PopUp from '../../shared/PopUp/PopUp';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './AddNewOrder.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//Connecting to backend
import axios from 'axios';

export default function AddNewOrder() {

    const [nextInvoiceNo, setNextInvoiceNo] = useState("");
    const [customerInfo, setCustomerInfo] = useState([]);
    // const [customer, setCustomer] = useState();
    // const [filterData, setFilterData] = useState("");

    // const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    useEffect(() => {
        axios
            .get("http://localhost:8080/orders/get-next-invoiceno")
            .then(res => {
                setNextInvoiceNo(res.data.nextinvoiceno);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8080/customers/get-all-basic-customer-data")
            .then(res => {
                setCustomerInfo(res.data.customerinfo);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;
    const contactnumber = JSON.parse(sessionStorage.getItem("Auth")).contactnumber;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    var deliveryDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 3);

    return (
        <Page title="Add New Order">

            <div className={style.container}>

                <div className={style.orderDetails}>
                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Order Placed</th>
                                <td align="left">{dateTime}</td>
                            </tr>
                            <tr>
                                <th align="left">Sales Rep.</th>
                                <td align="left">{firstname} {lastname} ({employeeid}) </td>
                            </tr>
                            <tr>
                                <th align="left">Contact No.</th>
                                <td align="left">{contactnumber}</td>
                            </tr>
                            <tr>
                                <th align="left">Delivery Date</th>
                                <td align="left">{deliveryDate}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Bill No.</th>
                                <td align="left">{nextInvoiceNo}</td>
                            </tr>
                            <tr>
                                <th align="left">Customer</th>
                                <td align="left">
                                    <Autocomplete
                                        options={customerInfo}
                                        style={{ width: 350 }}
                                        getOptionLabel={(option) => {
                                            return `${option.storename} (${option.customerid})`
                                        }}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Customer"
                                                    size="small"
                                                    fullWidth={true}
                                                />
                                            );
                                        }}
                                        renderOption={(option) => {
                                            return (
                                                <MenuItem  key={option.key}>
                                                    {option.key}
                                                </MenuItem>
                                            )
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Route</th>
                                <td align="left">{customerInfo.route}</td>
                            </tr>
                            <tr>
                                <th align="left">Address</th>
                                <td align="left">{customerInfo.shippingaddress}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={style.table}>
                    <TableContainer className={style.tablecontainer} component={Paper}>
                        <Table>
                            <TableHead className={style.tablehead}>
                                <TableRow className={style.tableheadrow}>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                    >
                                        Prod. ID & Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                    >
                                        Retail Price
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                        colSpan={2}
                                        padding="none"
                                    >
                                        Sales Qty
                                        <br />
                                        <span className={style.splitcell}>Cases</span>
                                        <span className={style.splitcell}>Pcs</span>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                        colSpan={2}
                                        padding="none"
                                    >
                                        Free Qty
                                        <br />
                                        <span className={style.splitcell}>Cases</span>
                                        <span className={style.splitcell}>Pcs</span>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                        colSpan={2}
                                        padding="none"
                                    >
                                        Return Qty
                                        <br />
                                        <span className={style.splitcell}>D</span>
                                        <span className={style.splitcell}>R</span>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                    >
                                        Price
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                    >
                                        Gross Amount
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={style.tablecell}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={style.tablebody}>


                                <TableRow className={style.whitetablerow}>
                                    <TableCell>
                                        P456891 - CMFT Pink(1Ltr)
                                    </TableCell>
                                    <TableCell align="center">
                                        139.05
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center">
                                        12
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center">
                                        12
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center"> 1668.60 </TableCell>
                                    <TableCell align="center"> 1668.60 </TableCell>
                                    < TableCell
                                        align="center"
                                        className={style.actioncolumn}
                                    >
                                        <Tooltip title="Edit" arrow>
                                            <EditIcon
                                                className={style.editIcon}
                                            // onClick={() => {
                                            // setAction('Edit');
                                            // openInPopup(row[0]);
                                            // }}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete" arrow>
                                            <DeleteForeverIcon
                                                className={style.deleteIcon}
                                            // onClick={() => {
                                            // setAction('View');
                                            // openInPopup(row[0]);
                                            // }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow className={style.greytablerow}>
                                    <TableCell>
                                        P456891 - CMFT Pink(1Ltr)
                                    </TableCell>
                                    <TableCell align="center">
                                        139.05
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center">
                                        12
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center">
                                        12
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center">
                                        -
                                    </TableCell>
                                    <TableCell align="center"> 1668.60 </TableCell>
                                    <TableCell align="center"> 1668.60 </TableCell>
                                    < TableCell
                                        align="center"
                                        className={style.actioncolumn}
                                    >
                                        <Tooltip title="Edit" arrow>
                                            <EditIcon
                                                className={style.editIcon}
                                            // onClick={() => {
                                            // setAction('Edit');
                                            // openInPopup(row[0]);
                                            // }}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete" arrow>
                                            <DeleteForeverIcon
                                                className={style.deleteIcon}
                                            // onClick={() => {
                                            // setAction('View');
                                            // openInPopup(row[0]);
                                            // }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell padding="none" className={style.textfield}>
                                        <TextField
                                            fullWidth={false}
                                            size="small"
                                            label="Prod. ID/ Name"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center"> - </TableCell>
                                    <TableCell align="center" padding="none" className={style.textfield}>
                                        <TextField
                                            fullWidth={false}
                                            size="small"
                                            label="Cs"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center" padding="none" className={style.textfield}>
                                        <TextField
                                            fullWidth={false}
                                            size="small"
                                            label="Pcs"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center" padding="none" className={style.textfield}>
                                        <TextField
                                            fullWidth={false}
                                            size="small"
                                            label="Cs"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center" padding="none" className={style.textfield}>
                                        <TextField
                                            fullWidth={false}
                                            size="small"
                                            label="Pcs"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center" padding="none" className={style.textfield}>
                                        <TextField
                                            fullWidth={false}
                                            size="small"
                                            label="D"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center" padding="none" className={style.textfield}>
                                        <TextField
                                            fullWidth={false}
                                            size="small"
                                            label="R"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center"> - </TableCell>
                                    <TableCell align="center"> - </TableCell>
                                    < TableCell
                                        align="center"
                                        className={style.actioncolumn}
                                    >
                                        <Tooltip title="Done" arrow>
                                            <DoneIcon
                                                className={style.doneIcon}
                                            // onClick={() => {
                                            // setAction('View');
                                            // openInPopup(row[0]);
                                            // }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow className={style.greytablerow}>
                                    <TableCell colSpan={11} padding="none" align="right">
                                        <Button variant="contained" color="primary" className={style.addBtn}>
                                            Add Order
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <table className={style.salesdetails}>
                    <tbody>
                        <tr>
                            <th align="left">Total Value</th>
                            <td align="left">47947.03</td>
                        </tr>
                        <tr>
                            <th align="left">Less Item Discount</th>
                            <td align="left">-</td>
                        </tr>
                        <tr>
                            <th align="left">Less 0.0% Discount</th>
                            <td align="left">-</td>
                        </tr>
                        <tr>
                            <th align="left">Damages</th>
                            <td align="left">-</td>
                        </tr>
                        <tr>
                            <th align="left" className={style.boldtext}>Invoice Value</th>
                            <td align="left" className={style.boldtext}>47947.03</td>
                        </tr>
                    </tbody>
                </table>


            </div>

        </Page >
    )
}
