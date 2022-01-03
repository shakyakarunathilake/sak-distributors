import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageProduct.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

//Product Form
import ViewProduct from './ViewProduct';
import ViewProductVariant from './ViewProductVariant';
import ProductForm from './ProductForm';
import VariantForm from './VariantForm';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ManageProduct() {

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();

    const [records, setRecords] = useState([]);

    const [productOptions, setProductOptions] = useState(null);
    const [employeeOptions, setEmployeeOptions] = useState(null);
    const [productRecords, setProductRecords] = useState(null);

    const [action, setAction] = useState('');
    const [formType, setFormType] = useState('');

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
            .get("http://localhost:8080/products/get-all-product-table-data")
            .then(res => {
                sessionStorage.setItem("ProductsTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    useEffect(() => {
        if (productRecords != null) {
            console.log('Action: ', action);
            setOpenPopup(true);
        }
    }, [productRecords, action])

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
        }

        if (action === "Edit") {
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

    const addVariant = (product, productid, variantid) => {
        for (let [key, value] of product.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
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
        else {
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
            setOpenPopup(false);
        }
    }

    const openInPopup = (productid, variantid) => {
        console.log(
            "Variant ID: ", variantid,
            "Product ID: ", productid
        );

        if (typeof variantid === 'undefined') {
            setFormType('Product')
            axios
                .get(`http://localhost:8080/products/${productid}`)
                .then(res => {
                    setProductRecords(res.data.product);
                })
                .catch(err => {
                    console.log(err);
                })

        } else {
            setFormType('Variant')
            axios
                .get(`http://localhost:8080/products/${productid}/${variantid}`)
                .then(res => {
                    setProductRecords(res.data.product);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const getProductEmployeeOptions = () => {
        axios
            .get("http://localhost:8080/options/product-options-for-product")
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
            .get("http://localhost:8080/options/employee-options-for-product")
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

    const handleClosePopUp = () => {
        setOpenPopup(false)
        setProductRecords(null)
        setFormType('')
        setAction('');
    }

    return (
        <Page title="Manage Products">
            <div className={style.container}>

                <div className={style.actionRow}>

                    <Button
                        className={JSON.parse(sessionStorage.getItem("Auth")).designation !== 'Purchasing Manager' ? style.hidden : style.productbutton}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                setFormType('Product')
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

                    <Button
                        className={JSON.parse(sessionStorage.getItem("Auth")).designation !== 'Purchasing Manager' ? style.hidden : style.variantbutton}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                setFormType('Variant')
                                getProductEmployeeOptions();
                                getEmployeeOptions();
                                setOpenPopup(true);
                            }
                        }
                    >
                        <NewReleasesIcon className={style.icon} />
                        Add New Variant
                    </Button>

                </div>

                <div className={style.pagecontent}>
                    <MaterialTable
                        columns={[
                            {
                                title: "Product ID", field: "productid", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.productid}</p>
                                    )
                                }
                            },
                            {
                                title: "Variant ID", field: "variantid", render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.variantid}</p>
                                    )
                                }
                            },
                            { title: "Name", field: "name" },
                            { title: "Supplier", field: "supplier" },
                            { title: "Type", field: "type" },
                            {
                                title: "Status", field: "status", render: rowData => {
                                    return (
                                        rowData.status === "Active" ?
                                            <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                            <p style={{ padding: "0", margin: "0", color: "red", fontWeight: "700" }}>{rowData.status}</p>
                                    )
                                }
                            },
                        ]}
                        data={records}
                        parentChildData={(row, rows) => rows.find(a => a.id === row.parentid)}
                        // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                        options={{
                            toolbar: false,
                            filtering: true,
                            search: false,
                            paging: false,
                            actionsColumnIndex: -1,
                            maxBodyHeight: JSON.parse(sessionStorage.getItem("Auth")).designation !== 'Purchasing Manager' ? "calc(100vh - 126px)" : "calc(100vh - 199.27px)",
                            headerStyle: {
                                position: "sticky",
                                top: "0",
                                backgroundColor: '#20369f',
                                color: '#FFF',
                                fontSize: "0.8em"
                            },
                            rowStyle: rowData => ({
                                fontSize: "0.8em",
                                backgroundColor: (rowData.tableData.id % 2 === 0) ? '#ebebeb' : '#ffffff'
                            })
                        }}
                        actions={[
                            {
                                icon: VisibilityIcon,
                                tooltip: 'View',
                                onClick: (event, rowData) => {
                                    setAction('View');
                                    openInPopup(rowData.productid, rowData.variantid);
                                }
                            },
                            {
                                disabled: JSON.parse(sessionStorage.getItem("Auth")).designation !== 'Purchasing Manager',
                                icon: 'edit',
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    setAction('Edit');
                                    getEmployeeOptions();
                                    openInPopup(rowData.productid, rowData.variantid);
                                }
                            }
                        ]}
                    />
                </div>
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {

                        formType === "Product" && action === 'View' ?
                            <ViewProduct
                                productRecords={productRecords}
                                handleClosePopUp={handleClosePopUp}
                            />
                            : formType === "Product" && (action === 'Create' || action === 'Edit') ?
                                <ProductForm
                                    addOrEdit={addOrEdit}
                                    productRecords={productRecords}
                                    employeeOptions={employeeOptions}
                                    handleClosePopUp={handleClosePopUp}
                                    nextId={nextId}
                                /> : formType === "Variant" && (action === 'Create' || action === 'Edit') ?
                                    <VariantForm
                                        productRecords={productRecords}
                                        addVariant={addVariant}
                                        productOptions={productOptions}
                                        employeeOptions={employeeOptions}
                                        handleClosePopUp={handleClosePopUp}
                                    /> : formType === "Variant" && action === 'View' ?
                                        <ViewProductVariant
                                            productRecords={productRecords}
                                            handleClosePopUp={handleClosePopUp}
                                        /> : ''

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
