import { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './RouteForm.module.scss';

//Steps
import StepOne from './RouteFormStepOne';
import StepTwo from './RouteFormStepTwo';

export default function RouteForm(props) {

    const { handleClosePopUp, addOrEdit, routeRecords, nextSupId, action } = props;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const { handleSubmit, formState: { errors, isValid }, control, reset, trigger, getValues, setValue } = useForm({
        mode: "all",
        defaultValues: {
            routeid: routeRecords ? routeRecords.routeid : nextSupId,
            title: routeRecords ? routeRecords.title : '',
            from: routeRecords ? routeRecords.from : '',
            to: routeRecords ? routeRecords.to : '',
            status: routeRecords ? routeRecords.status : 'Active',
            addedby: routeRecords ? routeRecords.addedby : `${firstname} ${lastname} (${employeeid})`,
            addeddate: routeRecords ? routeRecords.addeddate : date,
        }
    });

    const [formStep, setFormStep] = useState(0);

    const completeFormStep = () => {
        if (isValid) {
            setValue("routeid", `${getValues("from").substring(0, 3)} - ${getValues("to")}`)
            setValue("title", `${getValues("from")} - ${getValues("to")}`)
            setFormStep(x => x + 1);
        } else {
            trigger();
        }
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }


    const onSubmit = () => {
        const routeFormData = new formData();

        routeFormData.append('routeid', getValues('routeid'));
        routeFormData.append('title', getValues('title'));
        routeFormData.append("from", getValues('from'));
        routeFormData.append("to", getValues('to'));
        routeFormData.append('status', getValues('status'));
        routeFormData.append("addedby", getValues('addedby'));
        routeFormData.append('addeddate', getValues('addeddate'));

        addOrEdit(routeFormData, getValues('routeid'));
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
                        resetForm={resetForm}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
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
