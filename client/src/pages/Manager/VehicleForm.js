import { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './VehicleForm.module.scss';

//Steps
import StepOne from './VehicleFormStepOne';
import StepTwo from './VehicleFormStepTwo';

export default function VehicleForm(props) {

    const { handleClosePopUp, addOrEdit, vehicleRecords, action } = props;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const { handleSubmit, formState: { errors, isValid }, control, reset, trigger, setValue, getValues, watch } = useForm({
        mode: "all",
        defaultValues: {
            licenseplatenumber: vehicleRecords ? vehicleRecords.licenseplatenumber : '',
            vehicle: vehicleRecords ? vehicleRecords.vehicle : '',
            ownership: vehicleRecords ? vehicleRecords.ownership : "Company's",
            status: vehicleRecords ? vehicleRecords.status : 'Active',
            addedby: vehicleRecords ? vehicleRecords.addedby : `${firstname} ${lastname} (${employeeid})`,
            addeddate: vehicleRecords ? vehicleRecords.addeddate : date,
            vehicleowner: vehicleRecords ? vehicleRecords.vehicleowner : '',
            address: vehicleRecords ? vehicleRecords.address : '',
            title: vehicleRecords ? vehicleRecords.title : '',
            contactperson: vehicleRecords ? vehicleRecords.contactperson : '',
            contactnumber: vehicleRecords ? vehicleRecords.contactnumber : '',
            rate: vehicleRecords ? vehicleRecords.rate : '',
            per: vehicleRecords ? vehicleRecords.per : '',
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
        const customerFormData = new formData();

        customerFormData.append('licenseplatenumber', getValues('licenseplatenumber'));
        customerFormData.append("vehicle", getValues('vehicle'));
        customerFormData.append('status', getValues('status'));
        customerFormData.append("ownership", getValues('ownership'));
        customerFormData.append("addedby", getValues('addedby'));
        customerFormData.append('addeddate', getValues('addeddate'));
        customerFormData.append('vehicleowner', getValues('vehicleowner'));
        customerFormData.append('address', getValues('address'));
        customerFormData.append('title', getValues('title'));
        customerFormData.append('contactperson', getValues('contactperson'));
        customerFormData.append("contactnumber", getValues('contactnumber'));
        customerFormData.append("rate", getValues('rate'));
        customerFormData.append("per", getValues('per'));

        addOrEdit(customerFormData, getValues('licenseplatenumber'));
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
                        handleClosePopUp={handleClosePopUp}
                        watch={watch}
                        setValue={setValue}
                        resetForm={resetForm}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        watch={watch}
                        action={action}
                        handleClosePopUp={handleClosePopUp}
                        control={control}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                    />

                </section >
            }

        </form >
    )
}
