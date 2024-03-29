import { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './SupplierForm.module.scss';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//Steps
import StepOne from './SupplierFormStepOne';
import StepTwo from './SupplierFormStepTwo';

export default function SupplierForm(props) {

    const { setOpenPopup, addOrEdit, supplierRecords, nextSupId, action } = props;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const { handleSubmit, formState: { errors, isValid }, control, reset, trigger, getValues } = useForm({
        mode: "all",
        defaultValues: {
            supplierid: supplierRecords ? supplierRecords.supplierid : nextSupId,
            givenid: supplierRecords ? supplierRecords.givenid : '',
            name: supplierRecords ? supplierRecords.name : '',
            abbreviation: supplierRecords ? supplierRecords.abbreviation : '',
            address: supplierRecords ? supplierRecords.address : '',
            title: supplierRecords ? supplierRecords.title : '',
            contactperson: supplierRecords ? supplierRecords.contactperson : '',
            addedby: supplierRecords ? supplierRecords.addedby : `${firstname} ${lastname} (${employeeid})`,
            addeddate: supplierRecords ? supplierRecords.addeddate : date,
            contactnumber: supplierRecords ? supplierRecords.contactnumber : '',
            email: supplierRecords ? supplierRecords.email : '',
            damagedmissingitems: supplierRecords ? NumberWithCommas(supplierRecords.damagedmissingitems.toFixed(2)) : '',
        }
    });

    const [formStep, setFormStep] = useState(0);

    const completeFormStep = () => {
        if (isValid) {
            setFormStep(x => x + 1);
        } else {
            trigger();
        }
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }


    const onSubmit = () => {
        const supplierFormData = new formData();

        supplierFormData.append('supplierid', getValues('supplierid'));
        supplierFormData.append("name", getValues('name'));
        supplierFormData.append("givenid", getValues('givenid'));
        supplierFormData.append('abbreviation', getValues('abbreviation'));
        supplierFormData.append("addedby", getValues('addedby'));
        supplierFormData.append('addeddate', getValues('addeddate'));
        supplierFormData.append("contactnumber", getValues('contactnumber'));
        supplierFormData.append('contactperson', getValues('contactperson'));
        supplierFormData.append('title', getValues('title'));
        supplierFormData.append('address', getValues('address'));
        supplierFormData.append('email', getValues('email'));

        addOrEdit(supplierFormData, getValues('supplierid'));
    };

    const resetForm = () => {
        reset();
    }

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        errors={errors}
                        control={control}
                        completeFormStep={completeFormStep}
                        action={action}
                        setOpenPopup={setOpenPopup}
                        resetForm={resetForm}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        action={action}
                        setOpenPopup={setOpenPopup}
                        control={control}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                    />

                </section >
            }

        </form >
    )
}
