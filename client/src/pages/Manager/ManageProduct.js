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
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//Product Form
import ProductForm from './ProductForm';
import ViewProduct from './ViewProduct';
import AddNewVariant from './AddNewVariant';

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

    const [productOptions, setProductOptions] = useState(null);
    const [employeeOptions, setEmployeeOptions] = useState(null);
    const [productRecords, setProductRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextId, setNextId] = useState([]);
    const [reRender, setReRender] = useState(null);

    const [uncollapse, setUncollapse] = useState(false);

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
            .get("http://localhost:8080/products/get-all-product-table-data")
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

    const addOrEdit = (product, productid, variantid) => {
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
                .post(`http://localhost:8080/products/update-by-id/${productid}/${variantid}`, product)
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

    const addVariant = (product, productid) => {
        for (let [key, value] of product.entries()) {
            console.log(key, value);
        }
        axios
            .post(`http://localhost:8080/products/add-new-variant/${productid}`, product)
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
        setOpenPopup(false);
    }

    const openInPopup = (productid) => {
        axios
            .get(`http://localhost:8080/products/${productid}`)
            .then(res => {
                setProductRecords(res.data.product);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }


    const getProductOptions = () => {
        axios
            .get("http://localhost:8080/options/product-options")
            .then(res => {
                setProductOptions(res.data.productOptions);
                setEmployeeOptions(res.data.employeeOptions);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            });
        console.log(productOptions)

    }

    const getEmployeeOptions = () => {
        axios
            .get("http://localhost:8080/options/employee-options")
            .then(res => {
                setEmployeeOptions(res.data.employeeOptions);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextProductId = () => {
        axios
            .get("http://localhost:8080/products/get-next-productid")
            .then(res => {
                setNextId(res.data.nextproductid);
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
                                setAction('Variant');
                                getProductOptions();
                                getEmployeeOptions();
                                setOpenPopup(true);
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
                                getEmployeeOptions();
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
                                    <React.Fragment key={i}>
                                        <TableRow
                                            className={classnames(
                                                { [style.greytablerow]: i % 2 === 1 },
                                                { [style.whitetablerow]: i % 2 === 0 },
                                            )}
                                        >
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setUncollapse(!uncollapse)}
                                                >
                                                    {uncollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell> {row.productid} </TableCell>
                                            <TableCell> {row.name} </TableCell>
                                            <TableCell> {row.supplier} </TableCell>
                                            <TableCell> - </TableCell>
                                            <TableCell> - </TableCell>
                                            <TableCell> - </TableCell>
                                            <TableCell
                                                className={classnames(
                                                    { [style.active]: row.status === "Active" },
                                                    { [style.inactive]: row.status === "Inactive" }
                                                )}
                                            >
                                                {row.status}
                                            </TableCell>
                                            <TableCell> - </TableCell>
                                            <TableCell
                                                align="center"
                                                className={style.actioncolumn}
                                            >
                                                <Tooltip title="View" arrow>
                                                    <VisibilityIcon
                                                        className={style.visibilityIcon}
                                                        onClick={() => {
                                                            setAction('View');
                                                            openInPopup(row.productid);
                                                        }}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Edit" arrow>
                                                    <EditIcon
                                                        className={style.editIcon}
                                                        onClick={() => {
                                                            setAction('Edit');
                                                            openInPopup(row.productid);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                                                <Collapse in={uncollapse} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Table size="small">
                                                            <TableBody>
                                                                {records.map(y => (
                                                                    y.variants.map(x => (
                                                                        <TableRow key={x.variantid}>
                                                                            <TableCell> {x.variantid} </TableCell>
                                                                            <TableCell> {x.mrp} </TableCell>
                                                                            <TableCell> {x.price} </TableCell>
                                                                            <TableCell> {x.type} </TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))
                            }
                        </TableBody>
                    </TableContainer>
                </div>
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {
                        action === 'View' ?
                            <ViewProduct
                                productRecords={productRecords}
                                setOpenPopup={setOpenPopup}
                                setAction={setAction}
                            />
                            : action === "Variant" ?
                                <AddNewVariant
                                    addVariant={addVariant}
                                    productOptions={productOptions}
                                    employeeOptions={employeeOptions}
                                    setOpenPopup={setOpenPopup}
                                    setAction={setAction}
                                /> :
                                <ProductForm
                                    addOrEdit={addOrEdit}
                                    productRecords={productRecords}
                                    employeeOptions={employeeOptions}
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
