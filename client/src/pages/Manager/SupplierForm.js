import { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './SupplierForm.module.scss';

//Steps
import StepOne from './SupplierFormStepOne';
import StepTwo from './SupplierFormStepTwo';

export default function SupplierForm(props) {

    const { setOpenPopup, addOrEdit, supplierRecords, nextSupId, action, employeeOptions } = props;

    const today = new Date();
    const dateTime = today.getFullYear() + '-' + (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { handleSubmit, formState: { errors, isValid }, control, reset, trigger } = useForm({
        mode: "all",
        defaultValues: {
            supplierid: supplierRecords ? supplierRecords.supplierid : nextSupId,
            name: supplierRecords ? supplierRecords.name : '',
            abbreviation: supplierRecords ? supplierRecords.abbreviation : '',
            address: supplierRecords ? supplierRecords.address : '',
            title: supplierRecords ? supplierRecords.title : '',
            contactperson: supplierRecords ? supplierRecords.contactperson : '',
            addedby: supplierRecords ? supplierRecords.addedby : '',
            addeddate: supplierRecords ? supplierRecords.addeddate : dateTime,
            contactnumber: supplierRecords ? supplierRecords.contactnumber : '',
            email: supplierRecords ? supplierRecords.email : '',

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


    const onSubmit = (values) => {
        const customerFormData = new formData();

        customerFormData.append('supplierid', values.supplierid);
        customerFormData.append("name", values.name);
        customerFormData.append('abbreviation', values.abbreviation);
        customerFormData.append("addedby", values.addedby);
        customerFormData.append('addeddate', values.addeddate);
        customerFormData.append("contactnumber", values.contactnumber ? values.contactnumber : "");
        customerFormData.append('contactperson', values.contactperson);
        customerFormData.append('title', values.title);
        customerFormData.append('address', values.address);
        customerFormData.append('email', values.email);

        addOrEdit(customerFormData, values.supplierid);
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
                        employeeOptions={employeeOptions}
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
