import React from 'react';
import { useForm } from 'react-hook-form';

//Shared Components
import PopUp from '../../shared/PopUp/PopUp';

//Material UI 
import { Button } from '@material-ui/core';
import Divider from '@mui/material/Divider';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Dialog Content
import ResetForm from './ResetForm';
import PurchaseOrder from './PurchaseOrder';
import Quotations from './Quotations';

//SCSS styles
import style from './StepOne.module.scss';

export default function StepOne(props) {

    const { supplierOptions, setSelectedProductOptions, resetForm, productOptions, data, setData, handleClosePopUp, completeFormStep, openPopup, setOpenPopup, selectedProductOptions } = props;

    const { getValues, setValue, isValid } = useForm({ mode: "all" });

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;

    const podate = today.getFullYear().toString().substr(-2) + (today.getMonth() + 1) + today.getDate();

    const handleDetails = () => {

        const supplier = supplierOptions.filter(x => x.title === getValues("supplier"))

        console.log(dateTime);

        setValue("ponumber", supplier[0].abbreviation + podate)
        setValue("createdat", dateTime);
        // setValue("customerid", option.customerid);
        setValue("customername", "S.A.K Distributors");
        setValue("customeraddress", "No.233, Kiriwallapitiya, Rambukkana, Sri Lanka");
        setValue("contactnumber", "0352264009")
    }

    return (
        <div className={style.one}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Add Items to Purchase Order
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

                <PurchaseOrder
                    supplierOptions={supplierOptions}
                    setSelectedProductOptions={setSelectedProductOptions}
                    productOptions={productOptions}
                    data={data}
                    setData={setData}
                    completeFormStep={completeFormStep}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    selectedProductOptions={selectedProductOptions}
                    handleClosePopUp={handleClosePopUp}
                    resetForm={resetForm}
                />

                <Divider
                    className={style.divider}
                    orientation="vertical"
                    variant="middle"
                />

                <Quotations
                    setOpenPopup={setOpenPopup}
                />

            </div>

            <div className={style.footer}>


                <div className={style.resetBtn}>
                    <Button
                        disabled={!isValid && data.length === 0}
                        variant="contained"
                        onClick={e => setOpenPopup(true)}
                    >
                        Reset
                    </Button>
                </div>

                <div className={style.nextBtn}>
                    <Button
                        disabled={!isValid && data.length === 0}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            completeFormStep()
                            handleDetails()
                        }}
                    >
                        Next
                    </Button>
                </div>

            </div>

            <PopUp
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >

                <ResetForm
                    handleClosePopUp={handleClosePopUp}
                    resetForm={resetForm}
                />

            </PopUp>

        </div>
    )
}
