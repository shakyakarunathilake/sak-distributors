import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

//Shared Components
import Page from '../../shared/Page/Page';
import useTable from '../../components/useTable.js';
import TextField from '../../shared/TextField/TextField';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageProduct.module.scss';

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
import NewReleasesIcon from '@mui/icons-material/NewReleases';

//Product Form
import ProductForm from './ProductForm';
import ViewProduct from './ViewProduct';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageProduct() {

    const [searchText, setSearchText] = useState();

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();

    const [records, setRecords] = useState([]);
    const [headCells, setHeadCells] = useState([]);

    const [productRecords, setProductRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextId, setNextId] = useState([]);
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
            .get("http://localhost:8080/products/get-all-products-table-data")
            .then(res => {
                sessionStorage.setItem("ProductsTableData", JSON.stringify(res.data));
                setHeadCells(res.data.thead);
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const addOrEdit = (product, productid) => {
        for (let [key, value] of product.entries()) {
            console.log(key, value);
        }
        if (action === "Create") {
            axios
                .post("http://localhost:8080/products/create-product", product)
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(productid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;

        } if (action === "Edit") {
            axios
                .post(`http://localhost:8080/products/update-by-id/${productid}`, product)
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(productid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        setProductRecords(null)
        setOpenPopup(false);
        setAction('');
    }

    const openInPopup = (productid, variantid) => {

        //Development Stage
        console.log(productid, variantid);

        axios
            .get(`http://localhost:8080/products/${productid}/${variantid}`)
            .then(res => {
                setProductRecords(res.data.product);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextProductId = () => {
        axios
            .get("http://localhost:8080/products/get-next-product-variant-grn-id")
            .then(res => {
                setNextId([res.data.nextproductid, res.data.nextvariantid, res.data.nextgrnid]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const { TableContainer, TableHead } = useTable(headCells);

    return (
        <Page title="Manage Products">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
                            color="primary"
                            className={style.searchtextfield}
                            fullWidth={true}
                            placeholder="Search"
                            onChange={e =>
                                setSearchText(e.target.value)
                            }
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
                                // setAction('Create');
                                // setOpenPopup(true);
                                // setProductRecords(null);
                            }
                        }
                    >
                        <NewReleasesIcon className={style.icon} />
                        Add New Variant
                    </Button>

                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                getNextProductId();
                                setOpenPopup(true);
                                setProductRecords(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Product
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
                                                < TableCell key={i}
                                                    className={classnames(
                                                        { [style.active]: cell === "Active" },
                                                        { [style.inactive]: cell === "Inactive" }
                                                    )}
                                                >
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
                                                        openInPopup(row[0], row[3]);
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
                    setOpenPopup={setOpenPopup}
                >
                    {action === 'View' ?
                        <ViewProduct
                            productRecords={productRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                        /> :
                        <ProductForm
                            addOrEdit={addOrEdit}
                            productRecords={productRecords}
                            setOpenPopup={setOpenPopup}
                            nextId={nextId}
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
        </Page >
    )
}
