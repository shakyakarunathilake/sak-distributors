import React, { useState, useEffect } from 'react';

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
import { TextField as MuiTextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//SCSS Styles
import style from './ProductForm.module.scss';




export default function ProductsForm(props) {

    const { setOpenPopup, addOrEdit, productRecords, nextId, employeeOptions } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    const [file, setFile] = useState("");

    const [addedBy, setAddedBy] = useState();

    useEffect(() => {
        if (productRecords != null) {
            setFile(`http://${productRecords.productimage}`);

            setValue("productid", productRecords.productid);
            setValue("name", productRecords.name);
            setValue("supplier", productRecords.supplier);
            setValue("productimage", productRecords.productimage);
            setValue("addeddate", productRecords.addeddate);
            setValue("addedby", productRecords.addedby);
            setValue("status", productRecords.status);


        } else {
            setValue("productid", nextId);
        };
    }, [productRecords, nextId])

    const resetForm = () => {
        reset({
            productid: getValues("productid"),
            name: '',
            supplier: '',
            productimage: '',
            addeddate: '',
            addedby: '',
            status: '',
        });
        setFile("");
    }

    // Handle Image Upload
    const handleChange = e => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = (values) => {

        const productFormData = new formData();

        productFormData.append('productid', values.productid);
        productFormData.append('productimage', values.productimage);
        productFormData.append('name', values.name);
        productFormData.append('supplier', values.supplier);
        productFormData.append('addeddate', values.addeddate);
        productFormData.append("addedby", values.addedby);
        productFormData.append("status", values.status);

        resetForm();
        addOrEdit(productFormData, getValues("productid"));
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                <div>{productRecords ? "Edit Product" : "Add New Product"}</div>
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
                    <div className={style.formFields}>

                        <div className={style.columnA}>

                            <div className={style.image}>
                                <div className={style.imgWrapper}>
                                    <img src={file ? file : product} alt="" />
                                    <div className={style.uploadWrapper}>
                                        <Controller
                                            name={"productimage"}
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: { value: true, message: "Product Image is required" } }}
                                            render={({ field: { onChange } }) => (
                                                <input
                                                    type="file"
                                                    id="product-image"
                                                    hidden
                                                    onChange={(e) => {
                                                        onChange(e.target.files[0]);
                                                        handleChange(e);
                                                    }}
                                                // value={value || ''}
                                                />
                                            )}
                                        />
                                        <label
                                            className={style.label}
                                            htmlFor="product-image"
                                        >
                                            Upload *
                                        </label>
                                    </div>
                                </div>
                                <div className={style.partialCircle}></div>
                            </div>
                            <div className={style.redFontCenter}>
                                {
                                    errors.productimage && errors.productimage.message
                                }
                            </div>

                            <div className={style.productId}>
                                <Controller
                                    name={"productid"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <input
                                            disabled
                                            type="text"
                                            className={style.input}
                                            onChange={onChange}
                                            value={`ID: ${value}`}
                                        />
                                    )}
                                />
                            </div>

                        </div>

                        <div className={style.columnB}>

                            <div className={style.textFields}>

                                <div className={style.redFont}>
                                    The fields with "*" are required
                                </div>

                                <div className={style.row}>
                                    <Controller
                                        name={"name"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Product Name is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.name && errors.name.message}
                                                placeholder="Ex: Ice Cream – Butter Scotch"
                                                error={errors.name ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Product Name *"
                                            />
                                        )}
                                    />
                                </div>

                                <div className={style.row}>
                                    <Controller
                                        name={"supplier"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Supplier is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                className={style.field}
                                                helperText={errors.supplier && errors.supplier.message}
                                                error={errors.supplier ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                options={employeeservice.getSupplierOptions()}
                                                label="Supplier *"
                                            />
                                        )}
                                    />
                                </div>

                                <div className={style.row}>
                                    <Controller
                                        name={"addedby"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Added by is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.addedby && errors.addedby.message}
                                                error={errors.addedby ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                options={employeeOptions || []}
                                                label="Added By"
                                            />
                                        )}
                                    />
                                </div>

                                <div className={style.gridrow}>
                                    <div>
                                        <Controller
                                            name={"status"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Status is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText={errors.status && errors.status.message}
                                                    error={errors.status ? true : false}
                                                    onChange={onChange}
                                                    value={value || ''}
                                                    options={employeeservice.getVariantStatusOptions()}
                                                    label="Status *"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            name={"addeddate"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Added date is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <DatePicker
                                                    className={style.field}
                                                    helperText={errors.addeddate && errors.addeddate.message}
                                                    error={errors.addeddate ? true : false}
                                                    onChange={onChange}
                                                    value={value || ''}
                                                    label="Added Date *"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

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
            </div>
        </div>

    );
};
