import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

//Shared Components
import Page from '../../shared/Page/Page';
import useTable from '../../components/useTable.js';
import TextField from '../../shared/TextField/TextField';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageCustomer.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Customer Form
import CustomerForm from './CustomerForm';
import ViewCustomer from './ViewCustomer';

//Connecting to Backend
import axios from 'axios';
// import ApproveSubmit from './ApproveSubmit';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageCustomer() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);
    const [headCells, setHeadCells] = useState([]);

    const [customerRecords, setCustomerRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [approve, setApprove] = useState(false);

    const [nextCusId, setNextCusId] = useState();
    const [reRender, setReRender] = useState(null);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/customers/get-all-customer-table-data")
            .then(res => {
                sessionStorage.setItem("CustomerTableData", JSON.stringify(res.data));
                setHeadCells(res.data.thead);
                setRecords(res.data.tbody);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const addOrEdit = (customer, customerid) => {
        if (action === "Create") {
            axios
                .post("http://localhost:8080/customers/create-customer", customer)
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(customerid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        } if (action === "Edit") {
            // axios
            //     .post(`http://localhost:8080/customers/update-by-id/${customerid}`, customer)
            //     .then(res => {
            //         setAlert(res.data.alert);
            //         setType(res.data.type);
            //         handleAlert();
            //         setReRender(customerid);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            // ;
        }

        setCustomerRecords(null)
        setOpenPopup(false);
        setAction('');
    }

    const openInPopup = customerid => {
        axios
            .get(`http://localhost:8080/customers/${customerid}`)
            .then(res => {
                setCustomerRecords(res.data.customer);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextCustomerId = () => {
        axios
            .get("http://localhost:8080/customers/get-next-regno")
            .then(res => {
                setNextCusId(res.data.nextcustomerid);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const { TableContainer, TableHead } = useTable(headCells, records);

    return (
        <Page title="Manage Customers">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
                            color="primary"
                            className={style.searchtextfield}
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                getNextCustomerId();
                                setOpenPopup(true);
                                setCustomerRecords(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Customer
                    </Button>
                </div>

                <div className={style.pagecontent}>
                    <TableContainer >
                        <TableHead />
                        <TableBody className={style.tablebody}>
                            {
                                records.map((row, i) => (
                                    <TableRow
                                        className={classnames(
                                            { [style.greytablerow]: i % 2 === 1 },
                                            { [style.whitetablerow]: i % 2 === 0 },
                                        )}
                                        key={i}
                                    >
                                        {
                                            row.map((cell, i) => (
                                                <TableCell key={i}>
                                                    {cell}
                                                </TableCell>
                                            ))
                                        }
                                        <TableCell
                                            align="center"
                                            className={style.actioncolumn}
                                        >
                                            <Tooltip title="View" arrow>
                                                <VisibilityIcon
                                                    className={style.visibilityIcon}
                                                    onClick={() => {
                                                        setAction('View');
                                                        openInPopup(row[0]);
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Edit" arrow>
                                                <EditIcon
                                                    className={style.editIcon}
                                                    onClick={() => {
                                                        setAction('Edit');
                                                        openInPopup(row[0]);
                                                    }}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>

                                ))
                            }
                        </TableBody>
                    </TableContainer>
                </div>
                <PopUp
                    openPopup={openPopup}
                >
                    {action === 'View' ?
                        <ViewCustomer
                            customerRecords={customerRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                        /> :
                        <CustomerForm
                            addOrEdit={addOrEdit}
                            customerRecords={customerRecords}
                            setOpenPopup={setOpenPopup}
                            nextCusId={nextCusId}
                        />
                    }
                </PopUp>
                <Snackbar
                    open={open}
                    autoHideDuration={2500}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={type}
                        sx={{ width: '100%' }}
                    >
                        {alert}
                    </Alert>
                </Snackbar>
            </div>
        </Page>
    )
}
