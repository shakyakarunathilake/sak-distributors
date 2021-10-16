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
import Divider from '@mui/material/Divider';
import { InputAdornment } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//SCSS Styles
import style from './AddNewVariant.module.scss';


export default function AddNewVariant(props) {

    const { setOpenPopup, addOrEdit, productInfo, nextId } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    const [file, setFile] = useState("");

    useEffect(() => {
        if (productInfo != null) {
            setFile(`http://${productInfo.productimage}`);
            setValue("productid", productInfo.productid);
            setValue("name", productInfo.name);
            setValue("supplier", productInfo.supplier);
            setValue("productimage", productInfo.productimage);
            setValue("addeddate", productInfo.addeddate);
            setValue("addedby", productInfo.addedby);
        } else {
            // setValue("productid", nextId[0]);
            // setValue("variantid", nextId[1]);
            // setValue("grnid", nextId[2]);
        };
    }, [productInfo, nextId])

    const resetForm = () => {
        reset({
            productid: getValues("productid"),
            name: getValues("name"),
            supplier: getValues("supplier"),
            productimage: getValues("productimage"),
            addeddate: getValues("addeddate"),
            addedby: getValues("addedby"),
            variantid: '',
            type: '',
            bulkprice: '',
            mrp: '',
            price: '',
            grnid: '',
            offercaption: '',
            status: '',
            variantaddeddate: '',
            variantaddedby: '',
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
        productFormData.append("variantid", values.variantid);
        productFormData.append('type', values.type);
        productFormData.append("bulkprice", values.bulkprice);
        productFormData.append("mrp", values.mrp);
        productFormData.append("price", values.price);
        productFormData.append("grnid", values.grnid);
        productFormData.append("offercaption", values.offercaption ? values.offercaption : "");
        productFormData.append("status", values.status);
        productFormData.append("variantaddeddate", values.variantaddeddate);
        productFormData.append("variantaddedby", values.variantaddedby);


        resetForm();
        addOrEdit(productFormData, getValues("productid"));
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                <div>Add New Variant </div>
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

                            <div className={style.redFont}>
                                The fields with "*" are required
                            </div>

                            <div className={style.row}>
                                <Autocomplete
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            padding: 0
                                        }
                                    }}
                                    options={productInfo}
                                    getOptionLabel={(option) => {
                                        return `${option.name} (${option.productid})`
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Product"
                                                size="medium"
                                                fullWidth={true}
                                            />
                                        );
                                    }}
                                    renderOption={(option) => {
                                        return (
                                            <MenuItem>
                                                {option.key}
                                            </MenuItem>
                                        )
                                    }}
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

                            <div className={style.gridrow}>
                                <div>
                                    <Controller

                                        name={"addedby"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Added by is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.addedby && errors.addedby.message}
                                                placeholder="Ex: Shakya Karunathilake"
                                                error={errors.addedby ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Added by *"
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

                            <div className={style.dividerDiv}>
                                {/* <ThemeProvider theme={theme}> */}
                                <Divider variant="middle" />
                                {/* <span className={style.chip}> Product Variant</span> */}
                                {/* </Divider> */}
                                {/* </ThemeProvider> */}
                            </div>

                            <div className={style.gridrow}>
                                <div>
                                    <Controller
                                        name={"variantid"}
                                        control={control}
                                        rules={{
                                            required: { value: true },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                placeholder="Ex: PV0001"
                                                onChange={onChange}
                                                value={value || ''}
                                                disabled={true}
                                                label="Variant ID *"
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name={"type"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Type is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                className={style.field}
                                                helperText={errors.type && errors.type.message}
                                                error={errors.type ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                options={employeeservice.getVariantTypeOptions()}
                                                label="Type *"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={style.row}>
                                <Controller
                                    name={"offercaption"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            className={style.field}
                                            placeholder="Ex: Buy 24 and get 6 free"
                                            onChange={onChange}
                                            value={value || ''}
                                            label="Offer Caption"
                                        />
                                    )}
                                />
                            </div>

                            <div className={style.threecolumns}>
                                <div>
                                    <Controller
                                        name={"bulkprice"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Bulk price is required" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Bulk price is invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.bulkprice && errors.bulkprice.message}
                                                error={errors.bulkprice ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Bulk Price *"
                                                placeholder="999.99"
                                                fullWidth={true}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            Rs
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller

                                        name={"mrp"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "MRP is required" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "MRP is invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.mrp && errors.mrp.message}
                                                placeholder="999.99"
                                                error={errors.mrp ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="MRP *"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            Rs
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name={"price"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Price is required" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Price is invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.price && errors.price.message}
                                                error={errors.price ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Price *"
                                                placeholder="999.99"
                                                fullWidth={true}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            Rs
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div>
                                    <Controller

                                        name={"grnid"}
                                        control={control}
                                        rules={{
                                            required: { value: true },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                placeholder="Ex: GRN0001"
                                                onChange={onChange}
                                                value={value || ''}
                                                disabled={true}
                                                label="GRN ID *"
                                            />
                                        )}
                                    />
                                </div>
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
                            </div>

                            <div className={style.gridrow}>
                                <div>
                                    <Controller

                                        name={"variantaddedby"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Added by is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.variantaddedby && errors.variantaddedby.message}
                                                placeholder="Ex: Shakya Karunathilake"
                                                error={errors.variantaddedby ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Added by *"
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller

                                        name={"variantaddeddate"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Added date is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                className={style.field}
                                                helperText={errors.variantaddeddate && errors.variantaddeddate.message}
                                                error={errors.variantaddeddate ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Added Date *"
                                            />
                                        )}
                                    />
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
                        </div>


                    </div>
                </form>
            </div>
        </div>

    )
}
