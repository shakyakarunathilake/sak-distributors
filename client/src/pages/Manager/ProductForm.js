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

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//SCSS Styles
import style from './ProductForm.module.scss';




export default function ProductsForm(props) {

    const { setOpenPopup, addOrEdit, productRecords, nextId } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    const [file, setFile] = useState("");

    useEffect(() => {
        if (productRecords != null) {
            setFile(`http://${productRecords.productimage}`);

            setValue("productid", productRecords.productid);
            setValue("name", productRecords.name);
            setValue("supplier", productRecords.supplier);
            setValue("productimage", productRecords.productimage);
            setValue("addeddate", productRecords.addeddate);
            setValue("addedby", productRecords.addedby);
            setValue("variantid", productRecords.variantid);
            setValue("type", productRecords.type);
            setValue("bulkprice", productRecords.bulkprice);
            setValue("mrp", productRecords.mrp);
            setValue("price", productRecords.price);
            setValue("grnid", productRecords.grnid);
            setValue("offercaption", productRecords.offercaption);
            setValue("status", productRecords.status);
            setValue("variantaddeddate", productRecords.variantaddeddate);
            setValue("variantaddedby", productRecords.variantaddedby);


        } else {
            setValue("productid", nextId[0]);
            setValue("variantid", nextId[1]);
            setValue("grnid", nextId[2]);
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
                                            placeholder="Ex: Ice Cream – Butter Scotch (1L)"
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

    );
};
