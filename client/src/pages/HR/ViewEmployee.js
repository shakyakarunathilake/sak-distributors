import React from 'react';
import { useForm } from 'react-hook-form';

//Steps 
import StepTwo from './EmployeeFormStepTwo';

export default function ViewEmployee(props) {

    const {
        setOpenPopup,
        employeeRecords,
        action,
        setAction,
    } = props;

    const { handleSubmit, control } = useForm({
        mode: "all",
        defaultValues: {
            employeeimage: employeeRecords.employeeimage,
            employeeid: employeeRecords.employeeid,
            analyticprivileges: employeeRecords.analyticprivileges,
            fullname: employeeRecords.fullname,
            title: employeeRecords.title,
            firstname: employeeRecords.firstname,
            lastname: employeeRecords.lastname,
            email: employeeRecords.email,
            dob: employeeRecords.dob,
            hireddate: employeeRecords.hireddate,
            address: employeeRecords.address,
            nic: employeeRecords.nic,
            gender: employeeRecords.gender,
            contactnumber: employeeRecords.contactnumber,
            designation: employeeRecords.designation,
            civilstatus: employeeRecords.civilstatus,
            employeestatus: employeeRecords.employeestatus,
            hiredby: employeeRecords.hiredby,
        }
    });


    const onSubmit = () => {
        setAction('');
        setOpenPopup(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <StepTwo
                action={action}
                setOpenPopup={setOpenPopup}
                control={control}
                onSubmit={onSubmit}
            />

        </form >

    )
}
