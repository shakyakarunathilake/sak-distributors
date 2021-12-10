import React, { useState } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';

//SCSS styles
import style from './ManagePurchaseOrder.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

//Form
import CreatePurchaseOrder from './CreatePurchaseOrder';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManagePurchaseOrder() {

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();
    const [openPopup, setOpenPopup] = useState(false);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    const getOptions = () => {
        axios
            .get("http://localhost:8080/options/supplier-options-for-purchase-order")
            .then(res => {
                setSupplierOptions(res.data.supplierOptions);
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get("http://localhost:8080/options/product-options-for-purchase-order", {
                headers: {
                    Authorization: JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setProductOptions(res.data.productOptions);
            })
            .catch(err => {
                console.log(err);
            })

    }

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClosePopUp = () => {
        setOpenPopup(false)
    }

    const addOrder = (purchaseOrderFormData) => {
        axios
            .post("http://localhost:8080/purchaseorder/create-purchaseorder", purchaseOrderFormData)
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
            })
            .catch(err => {
                console.log(err);
            });
        ;
    }


    return (
        <Page title="Manage Purchase Order">
            <div className={style.container}>

                <div className={style.actionRow}>

                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                getOptions();
                                setOpenPopup(true);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Create Purchase Order
                    </Button>

                </div>

                <div className={style.pagecontent}>
                </div>

            </div>

            <PopUp
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                fullScreen={true}
            >
                <CreatePurchaseOrder
                    productOptions={productOptions}
                    supplierOptions={supplierOptions}
                    addOrder={addOrder}
                    handleClosePopUp={handleClosePopUp}
                />
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

        </Page>
    )
}
