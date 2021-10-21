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
import { TextField as MuiTextField } from '@mui/material';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//SCSS Styles
import style from './AddNewVariant.module.scss';


export default function AddNewVariant(props) {

    const { setOpenPopup, addVariant, productOptions, employeeOptions } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    const [file, setFile] = useState();
    const [show, setShow] = useState(false);

    const [productName, setProductName] = useState();

    const handleProductChange = (event, option) => {
        if (option) {
            setProductName(option.title)
            setFile(`http://${option.productimage}`);
            setValue("productid", option.productid);
            setValue("name", option.name);
            setValue("supplier", option.supplier);
            setValue("productimage", option.productimage);
            setValue("addeddate", option.addeddate);
            setValue("addedby", option.addedby);
            setValue("variantid", option.variantid);;
            setValue("productstatus", option.status);;

        } else {
            setProductName()
        }
    }

    // Handle Image Upload
    const handleChange = e => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleTypeChange = value => {
        if (value === "General") {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    const resetForm = () => {
        reset({
            productid: '',
            name: '',
            supplier: '',
            productimage: '',
            addeddate: '',
            addedby: '',
            variantid: '',
            type: '',
            bulkprice: '',
            mrp: '',
            sellingprice: '',
            purchaseprice: '',
            offercaption: '',
            variantstatus: '',
            variantaddeddate: '',
            variantaddedby: '',
        });
        setFile("");
    }

    const onSubmit = (values) => {

        const productFormData = new formData();

        productFormData.append('productid', values.productid);
        productFormData.append('productstatus', values.productstatus);
        productFormData.append("variantid", values.variantid);
        productFormData.append('type', values.type);
        productFormData.append("offercaption", values.offercaption ? values.offercaption : "");
        productFormData.append("bulkprice", values.bulkprice);
        productFormData.append("purchaseprice", values.purchaseprice);
        productFormData.append("sellingprice", values.sellingprice);
        productFormData.append("mrp", values.mrp);
        productFormData.append("variantaddedby", values.variantaddedby);
        productFormData.append("variantaddeddate", values.variantaddeddate);
        productFormData.append("variantstatus", values.variantstatus);


        resetForm();
        addVariant(productFormData, values.productid);
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
                                                    disabled
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
                                            value={`ID: ${value ? value : ''}`}
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
                                    options={productOptions || []}
                                    fullWidth
                                    getOptionLabel={(option) => option.title}
                                    onChange={handleProductChange}
                                    renderInput={(params) => (
                                        <MuiTextField
                                            {...params}
                                            label="Product"
                                            variant="outlined" />
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
                                            disabled={true}
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
                                            disabled={true}
                                            fullWidth={true}
                                            className={style.field}
                                            helperText={errors.addedby && errors.addedby.message}
                                            placeholder="Ex: Shakya Karunathilake"
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
                                        name={"addeddate"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Added date is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                disabled={true}
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
                                <div>
                                    <Controller
                                        name={"productstatus"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Status is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                className={style.field}
                                                helperText={errors.productstatus && errors.productstatus.message}
                                                error={errors.productstatus ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                options={employeeservice.getProductStatusOptions()}
                                                label="Status *"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={style.dividerDiv}>
                                <Divider variant="middle" />
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
                                                onChange={e => {
                                                    onChange(e.target.value)
                                                    handleTypeChange(e.target.value)
                                                }}
                                                value={value || ''}
                                                options={employeeservice.getVariantTypeOptions()}
                                                label="Type *"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            {
                                show &&
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
                            }

                            <div className={style.gridrow}>
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
                                        name={"purchaseprice"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Purchase Price is required" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Purchase Price is invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.purchaseprice && errors.purchaseprice.message}
                                                error={errors.purchaseprice ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Purchase Price *"
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
                                        name={"sellingprice"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Selling Price is required" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Selling Price is invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.sellingprice && errors.sellingprice.message}
                                                error={errors.sellingprice ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Selling Price *"
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
                            </div>

                            <div className={style.row}>
                                <Controller
                                    name={"variantaddedby"}
                                    control={control}
                                    rules={{
                                        required: { value: true, message: "Added by is required" },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            fullWidth={true}
                                            className={style.field}
                                            helperText={errors.variantaddedby && errors.variantaddedby.message}
                                            error={errors.variantaddedby ? true : false}
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
                                        name={"variantstatus"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Status is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                className={style.field}
                                                helperText={errors.variantstatus && errors.variantstatus.message}
                                                error={errors.variantstatus ? true : false}

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
