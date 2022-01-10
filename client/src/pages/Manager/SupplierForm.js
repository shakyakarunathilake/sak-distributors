import React, { useEffect } from 'react';
import classnames from 'classnames';

import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './SupplierForm.module.scss';

export default function SupplierForm(props) {

    const { setOpenPopup, addOrEdit, supplierRecords, nextSupId, employeeOptions } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    useEffect(() => {
        if (supplierRecords != null) {

            setValue("supplierid", supplierRecords.supplierid);
            setValue("name", supplierRecords.name);
            setValue("abbreviation", supplierRecords.abbreviation);
            setValue("address", supplierRecords.address);
            setValue("title", supplierRecords.title);
            setValue("contactperson", supplierRecords.contactperson);
            setValue("addedby", supplierRecords.addedby);
            setValue("addeddate", supplierRecords.addeddate);
            setValue("contactnumber", supplierRecords.contactnumber);
            setValue("email", supplierRecords.email);

        } else {
            setValue("supplierid", nextSupId);
        };
    }, [supplierRecords, nextSupId, setValue])

    const resetForm = () => {
        reset({
            supplierid: getValues("supplierid"),
            name: '',
            abbreviation: '',
            address: '',
            title: '',
            contactperson: '',
            addedby: '',
            addeddate: '',
            contactnumber: '',
            email: '',
        });
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
        addOrEdit(customerFormData, getValues("supplierid"));
    };


    return (
        <div className={style.container}>

            <div className={style.header}>
                <div>{supplierRecords ? "Edit Supplier" : "Add New Supplier"}</div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { setOpenPopup(false) }}
                    />
                </div>
            </div>

            <div className={style.body}>
                <form
                    className={style.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={style.redFont}>
                        The fields with "*" are required
                    </div>
                    <div className={classnames(style.row, style.threecolumns)}>
                        <Controller
                            name={"supplierid"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    label="Suplier ID *"
                                    value={value || ''}
                                    onChange={onChange}
                                    placeholder="Ex: S000234"
                                    disabled={true}
                                />
                            )}
                        />
                        <Controller
                            name={"abbreviation"}
                            control={control}
                            rules={{ required: { value: true, message: "Abbreviation is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    label="Abbreviation *"
                                    value={value || ''}
                                    onChange={onChange}
                                    placeholder="Ex: SIWPLC"
                                    error={errors.abbreviation ? true : false}
                                    helperText={errors.abbreviation && errors.abbreviation.message}
                                />
                            )}
                        />
                        <Controller
                            name={"name"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Supplier is required" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    label="Supplier *"
                                    value={value || ''}
                                    onChange={onChange}
                                    placeholder="Ex: Swadeshi Industrial Works PLC"
                                    error={errors.name ? true : false}
                                    helperText={errors.name && errors.name.message}
                                />
                            )}
                        />

                    </div>

                    <div className={classnames(style.row, style.twocolumns)}>
                        <Controller
                            name={"addedby"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Added by is required" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    helperText={errors.addedby && errors.addedby.message}
                                    error={errors.addedby ? true : false}
                                    onChange={onChange}
                                    value={value || ''}
                                    options={employeeOptions || []}
                                    label="Added By"
                                />
                            )}
                        />

                        <Controller
                            name={"addeddate"}
                            control={control}
                            rules={{ required: { value: true, message: "Adding date is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    label="Adding Date *"
                                    value={value || ''}
                                    onChange={onChange}
                                    error={errors.addeddate ? true : false}
                                    helperText={errors.addeddate && errors.addeddate.message}
                                />
                            )}
                        />

                    </div>

                    <div className={style.dividerDiv}>
                        Contact Details
                    </div>

                    <div className={style.reversegridrow}>

                        <div className={style.twocolumns}>

                            <Controller
                                name={"contactnumber"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Contact number is required" },
                                    pattern: { value: /^[0-9]{10}$/, message: "Contact number is invalid" }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        fullWidth={true}
                                        className={style.field}
                                        helperText={errors.contactnumber && errors.contactnumber.message}
                                        placeholder="Ex:  011 2236244"
                                        error={errors.contactnumber ? true : false}
                                        onChange={onChange}
                                        value={value || ''}
                                        label="Contact Number"
                                    />
                                )}
                            />

                            <Controller
                                name={"contactperson"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Contact Person is required" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        fullWidth={true}
                                        className={style.field}
                                        helperText={errors.contactperson && errors.contactperson.message}
                                        placeholder="Ex: Lasitha Abeynayaka"
                                        error={errors.contactperson ? true : false}
                                        onChange={onChange}
                                        value={value || ''}
                                        label="Contact Person *"
                                    />
                                )}
                            />
                        </div>

                        <div>
                            <Controller
                                name={"title"}
                                control={control}
                                rules={{ required: { value: true, message: "Title is required" } }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        label="Title *"
                                        value={value || ''}
                                        onChange={onChange}
                                        options={employeeservice.getTitleOptions()}
                                        error={errors.title ? true : false}
                                        helperText={errors.title && errors.title.message}
                                    />
                                )}
                            />
                        </div>


                    </div>

                    <div className={style.row}>
                        <Controller
                            name={"address"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Address is required" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.address && errors.address.message}
                                    placeholder="Ex: 57 Colombo, Negombo Rd, Kandana 11320"
                                    error={errors.address ? true : false}
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Address*"
                                />
                            )}
                        />
                    </div>

                    <div className={style.row}>
                        <Controller
                            name={"email"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Email is required" },
                                pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.email && errors.email.message}
                                    error={errors.email ? true : false}
                                    onChange={onChange}
                                    placeholder="Ex: swadeshi@sltnet.lk"
                                    value={value || ''}
                                    label="Email"
                                />
                            )}
                        />
                    </div>

                    <div className={style.buttonRow}>
                        <div className={style.resetBtnDiv}>
                            <Button
                                className={style.resetBtn}
                                onClick={resetForm}
                                variant="outlined"
                            >
                                Reset
                            </Button>
                        </div>
                        <div className={style.submitBtnDiv}>
                            <Button
                                className={style.submitBtn}
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div >

        </div >
    )
}
