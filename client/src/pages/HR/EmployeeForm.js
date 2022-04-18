import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './EmployeeForm.module.scss';

//Steps 
import StepOne from './EmployeeFormStepOne';
import StepTwo from './EmployeeFormStepTwo';

//Development Stage
import * as ManualTimeSetting from '../DateTIme';

export default function EmployeesForm(props) {

    const {
        setOpenPopup,
        addOrEdit,
        employeeRecords,
        nextEmpId,
        action
    } = props;

    const [file, setFile] = useState("");
    const [formStep, setFormStep] = useState(0);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { handleSubmit, formState: { errors, isValid }, control, reset, setValue, trigger, getValues, watch } = useForm({
        mode: "all",
        defaultValues: {
            employeeimage: employeeRecords ? employeeRecords.employeeimage : '',
            employeeid: employeeRecords ? employeeRecords.employeeid : nextEmpId,
            analyticprivileges: employeeRecords ? employeeRecords.analyticprivileges : false,
            adminprivileges: employeeRecords ? employeeRecords.adminprivileges : false,
            fullname: employeeRecords ? employeeRecords.fullname : '',
            title: employeeRecords ? employeeRecords.title : '',
            firstname: employeeRecords ? employeeRecords.firstname : '',
            lastname: employeeRecords ? employeeRecords.lastname : '',
            email: employeeRecords ? employeeRecords.email : '',
            dob: employeeRecords ? employeeRecords.dob : '',
            // hireddate: employeeRecords ? employeeRecords.hireddate : date,
            hireddate: employeeRecords ? employeeRecords.hireddate : ManualTimeSetting.ManualDate,
            address: employeeRecords ? employeeRecords.address : '',
            nic: employeeRecords ? employeeRecords.nic : '',
            gender: employeeRecords ? employeeRecords.gender : '',
            contactnumber: employeeRecords ? employeeRecords.contactnumber : '',
            designation: employeeRecords ? employeeRecords.designation : '',
            civilstatus: employeeRecords ? employeeRecords.civilstatus : '',
            employeestatus: employeeRecords ? employeeRecords.employeestatus : '',
            hiredby: employeeRecords ? employeeRecords.hiredby : `${firstname} ${lastname} (${employeeid})`
        }
    });

    useEffect(() => {
        if (employeeRecords != null) {
            setFile(`http://${employeeRecords.employeeimage}`);
        }
    }, [employeeRecords])

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

    const handleDesignationChange = e => {
        if ((e === "Driver") || (e === "Product Handler") || (e === "Warehouse Worker")) {
            setValue("employeestatus", "Limited Access");
        }
        else {
            setValue("employeestatus", "");
        }
    }

    const resetForm = () => {
        reset();
        setFile("");
    }

    const handleImageChange = e => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = () => {

        const employeeFormData = new formData();

        employeeFormData.append('employeeid', getValues('employeeid'));
        employeeFormData.append('employeeimage', getValues('employeeimage'));
        employeeFormData.append('analyticprivileges', getValues('analyticprivileges'));
        employeeFormData.append('adminprivileges', getValues('adminprivileges'));
        employeeFormData.append('fullname', getValues('fullname'));
        employeeFormData.append('title', getValues('title'));
        employeeFormData.append('firstname', getValues('firstname'));
        employeeFormData.append('lastname', getValues('lastname'));
        employeeFormData.append('email', getValues('email'));
        employeeFormData.append('dob', getValues('dob'));
        employeeFormData.append('hireddate', getValues('hireddate'));
        employeeFormData.append("address", getValues('address'));
        employeeFormData.append("nic", getValues('nic'));
        employeeFormData.append("gender", getValues('gender'));
        employeeFormData.append("contactnumber", getValues('contactnumber'));
        employeeFormData.append("designation", getValues('designation'));
        employeeFormData.append("civilstatus", getValues('civilstatus'));
        employeeFormData.append("employeestatus", getValues('employeestatus'));
        employeeFormData.append("hiredby", getValues('hiredby'));

        addOrEdit(employeeFormData, getValues("employeeid"));
    };

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
                        file={file}
                        completeFormStep={completeFormStep}
                        watch={watch}
                        resetForm={resetForm}
                        action={action}
                        setOpenPopup={setOpenPopup}
                        handleImageChange={handleImageChange}
                        handleDesignationChange={handleDesignationChange}
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
                        file={file}
                        onSubmit={onSubmit}
                    />

                </section >
            }

        </form >

    );
};
