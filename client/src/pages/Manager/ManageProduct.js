import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Styles
import style from './ManageProduct.module.scss';

//Material UI 
import { Button } from '@material-ui/core';

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
    const [productVariantOptions, setProductVariantOptions] = useState(null);
    const [employeeOptions, setEmployeeOptions] = useState(null);
    const [productRecords, setProductRecords] = useState(null);
    const [supplierOptions, setSupplierOptions] = useState(null);

    const [action, setAction] = useState('');
    const [formType, setFormType] = useState('');

    const [openPopup, setOpenPopup] = useState(false);

    const [nextId, setNextId] = useState([]);
    const [reRender, setReRender] = useState(null);

    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

    let productEndPoints = [
        "http://localhost:8080/products/get-next-productid",
        "http://localhost:8080/options/supplier-options",
        "http://localhost:8080/options/employee-options-for-product"
    ]

    let productVariantEndPoints = [
        "http://localhost:8080/options/supplier-options",
        "http://localhost:8080/options/product-options-for-product",
        "http://localhost:8080/options/product-variant-options-for-product",
        "http://localhost:8080/options/employee-options-for-product"
    ]

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const sortData = (tbody) => {

        const product = tbody.filter(x => !(x.parentid));

        const variants = tbody.filter(x => x.parentid);

        const sortedProducts = product.sort((a, b) => b.reorderlevel - a.reorderlevel);

        const finalTableData = [...sortedProducts, ...variants];

        return finalTableData
    }

    useEffect(() => {
        axios
            .get("http://localhost:8080/products/get-all-product-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {

            
                setRecords(sortData(res.data.tbody));

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
                .post("http://localhost:8080/products/create-product", product, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
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
                .post(`http://localhost:8080/products/update-by-id/${productid}`, product, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
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
                .post(`http://localhost:8080/products/add-new-variant/${productid}`, product, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
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
        } else {
            axios
                .post(`http://localhost:8080/products/update-by-id/${productid}/${variantid}`, product, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
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

        if (typeof variantid === 'undefined') {
            setFormType('Product')
            axios
                .get(`http://localhost:8080/products/${productid}`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setProductRecords(res.data.product);
                    setOpenPopup(true);
                })
                .catch(err => {
                    console.log(err);
                })

        } else {
            setFormType('Variant')
            axios
                .get(`http://localhost:8080/products/${productid}/${variantid}`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setProductRecords(res.data.product);
                    setOpenPopup(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const getOptionsForProduct = () => {
        axios
            .all(productEndPoints.map((endpoint) =>
                axios
                    .get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })
            ))
            .then(
                axios.spread((...responses) => {
                    setNextId(responses[0].data.nextproductid);
                    setSupplierOptions(responses[1].data.supplierOptions)
                    setEmployeeOptions(responses[2].data.employeeOptions)
                    setOpenPopup(true);
                }))
            .catch(err => {
                console.log(err);
            })
    }

    const getOptionsForVariant = () => {
        axios
            .all(productVariantEndPoints.map((endpoint) =>
                axios
                    .get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })
            ))
            .then(
                axios.spread((...responses) => {
                    setSupplierOptions(responses[0].data.supplierOptions)
                    setProductOptions(responses[1].data.productOptions)
                    setProductVariantOptions(responses[2].data.productVariantOptions)
                    setEmployeeOptions(responses[3].data.employeeOptions)
                }))
            .catch(err => {
                console.log(err);
            })
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

                {
                    designation === 'Purchasing Manager' &&

                    <div className={style.actionRow}>

                        <Button
                            color="primary"
                            size="medium"
                            variant="contained"
                            onClick={
                                () => {
                                    setAction('Create');
                                    setFormType('Variant')
                                    getOptionsForVariant()
                                    setOpenPopup(true);
                                }
                            }
                        >
                            <NewReleasesIcon className={style.icon} />
                            Add New Variant
                        </Button>

                        <Button
                            color="primary"
                            size="medium"
                            variant="contained"
                            onClick={() => {
                                setAction('Create');
                                setFormType('Product');
                                getOptionsForProduct();
                            }}
                        >
                            <AddCircleIcon className={style.icon} />
                            Add New Product
                        </Button>

                    </div>

                }

                <div className={style.pagecontent}>

                    <MaterialTable
                        columns={[
                            {
                                title: "Product ID",
                                field: "productid",
                                render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.productid}</p>
                                    )
                                },
                                cellStyle: {
                                    width: "6%",
                                    textAlign: 'left'
                                }
                            },
                            {
                                title: "Variant ID",
                                field: "variantid",
                                render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.variantid}</p>
                                    )
                                },
                                cellStyle: {
                                    width: "6%",
                                    textAlign: 'left'
                                }
                            },
                            {
                                title: "Name",
                                field: "name",
                                cellStyle: {
                                    width: "22%",
                                    textAlign: 'left'
                                }
                            },
                            {
                                title: "Reorder Level",
                                field: "reorderlevel",
                                cellStyle: {
                                    width: "4%",
                                    textAlign: 'left'
                                }
                            },
                            {
                                title: "Supplier",
                                field: "supplier",
                                cellStyle: {
                                    width: "15%",
                                    textAlign: 'left'
                                }
                            },
                            {
                                title: "Type",
                                field: "type",
                                cellStyle: {
                                    width: "12%",
                                    textAlign: 'left'
                                }
                            },
                            {
                                title: "Offer Caption",
                                field: "offercaption",
                                cellStyle: {
                                    width: "28%",
                                    textAlign: 'left'
                                }
                            },
                            {
                                title: "Status",
                                field: "status",
                                render: rowData => {
                                    return (
                                        rowData.status === "Active" ?
                                            <p style={{ padding: "0", margin: "0", color: "#4cbb17", fontWeight: "700" }}>{rowData.status}</p> :
                                            <p style={{ padding: "0", margin: "0", color: "#FC6A03", fontWeight: "700" }}>{rowData.status}</p>
                                    )
                                },
                                cellStyle: {
                                    width: "8%",
                                    textAlign: 'left'
                                }
                            },
                        ]}
                        data={records}
                        parentChildData={(row, rows) => rows.find(a => a.id === row.parentid)}
                        options={{
                            toolbar: false,
                            filtering: true,
                            search: false,
                            paging: false,
                            actionsColumnIndex: -1,
                            maxBodyHeight: designation !== 'Purchasing Manager' ? "calc(100vh - 126px)" : "calc(100vh - 199.27px)",
                            headerStyle: {
                                position: "sticky",
                                top: "0",
                                backgroundColor: '#20369f',
                                color: '#FFF',
                                fontSize: "0.8em"
                            },
                            rowStyle: rowData => ({
                                fontSize: "0.8em",
                                backgroundColor: !!rowData.variantid ? '#ebebeb' : '#ffffff'
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
                                disabled: designation !== 'Purchasing Manager',
                                icon: 'edit',
                                tooltip: 'Edit',
                                onClick: (event, rowData) => {
                                    setAction('Edit');
                                    getOptionsForVariant()
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
                        formType === "Product" && action === 'View' &&
                        <ViewProduct
                            productRecords={productRecords}
                            handleClosePopUp={handleClosePopUp}
                            action={action}
                        />
                    }

                    {
                        formType === "Product" && (action === 'Create' || action === 'Edit') &&
                        <ProductForm
                            addOrEdit={addOrEdit}
                            productRecords={productRecords}
                            employeeOptions={employeeOptions}
                            handleClosePopUp={handleClosePopUp}
                            nextId={nextId}
                            action={action}
                            supplierOptions={supplierOptions}
                        />
                    }

                    {
                        formType === "Variant" && action === 'View' &&
                        <ViewProductVariant
                            productRecords={productRecords}
                            handleClosePopUp={handleClosePopUp}
                            action={action}
                        />
                    }

                    {
                        formType === "Variant" && (action === 'Create' || action === 'Edit') &&
                        <VariantForm
                            productRecords={productRecords}
                            addVariant={addVariant}
                            productOptions={productOptions}
                            productVariantOptions={productVariantOptions}
                            employeeOptions={employeeOptions}
                            handleClosePopUp={handleClosePopUp}
                            action={action}
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
