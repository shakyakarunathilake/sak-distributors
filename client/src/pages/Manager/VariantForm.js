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
import { TextField as MuiTextField } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//Styles
import style from './VariantForm.module.scss';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
    overrides: {
        MuiFormLabel: {
            root: {
                fontSize: '0.9em',
                fontFamily: 'Roboto, Poppins, sans-serif',
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.9em',
                fontFamily: 'Roboto, Poppins, sans-serif',
            }
        },
        MuiFormHelperText: {
            root: {
                fontSize: '0.64em',
                fontFamily: 'Roboto, Poppins, sans-serif',
            }
        },
        MuiOutlinedInput: {
            inputMarginDense: {
                paddingTop: "10px",
                paddingBottom: "10px"
            }
        },
        MuiAutocomplete: {
            inputRoot: {
                '&&[class*="MuiOutlinedInput-root"] $input': {
                    padding: 1
                }
            }
        },
    }
});

export default function VariantForm(props) {

    const { handleClosePopUp, addVariant, productOptions, employeeOptions, productRecords } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({ mode: "onBlur" });

    const [file, setFile] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (productRecords != null) {
            setFile(`http://${productRecords.productimage}`);

            console.log(productRecords);

            setValue("productid", productRecords.productid);
            setValue("name", productRecords.name);
            setValue("supplier", productRecords.supplier);
            setValue("productimage", productRecords.productimage);
            setValue("addeddate", productRecords.addeddate);
            setValue("addedby", productRecords.addedby);
            setValue("productstatus", productRecords.status);
            setValue("variantid", productRecords.variant.variantid);
            setValue("type", productRecords.variant.type);
            setValue("piecespercase", productRecords.variant.piecespercase);
            setValue("bulkprice", productRecords.variant.bulkprice);
            setValue("mrp", productRecords.variant.mrp);
            setValue("sellingprice", productRecords.variant.sellingprice);
            setValue("purchaseprice", productRecords.variant.purchaseprice);
            setValue("offercaption", productRecords.variant.offercaption);
            setValue("variantstatus", productRecords.variant.status);
            setValue("variantaddeddate", productRecords.variant.addeddate);
            setValue("variantaddedby", productRecords.variant.addedby);

            setShow(productRecords.offercaption ? true : false);
        }
    }, [productRecords, setValue])

    const handleProductChange = (event, option) => {
        if (option) {
            setFile(`http://${option.productimage}`);
            setValue("productid", option.productid);
            setValue("name", option.name);
            setValue("supplier", option.supplier);
            setValue("productimage", option.productimage);
            setValue("addeddate", option.addeddate);
            setValue("addedby", option.addedby);
            setValue("variantid", option.variantid);
            setValue("productstatus", option.status);
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
            productstatus: '',
            variantid: '',
            type: '',
            piecespercase: '',
            bulkprice: '',
            mrp: '',
            sellingprice: '',
            purchaseprice: '',
            offercaption: '',
            variantstatus: '',
            variantaddeddate: '',
            variantaddedby: '',
        });
        setShow(false);
        setFile("");
    }

    const onSubmit = (values) => {

        const productFormData = new formData();

        productFormData.append('productid', values.productid);
        productFormData.append('productstatus', values.productstatus);
        productFormData.append("variantid", values.variantid);
        productFormData.append('type', values.type);
        productFormData.append("offercaption", values.offercaption ? values.offercaption : "");
        productFormData.append("piecespercase", values.piecespercase);
        productFormData.append("bulkprice", values.bulkprice);
        productFormData.append("purchaseprice", values.purchaseprice);
        productFormData.append("sellingprice", values.sellingprice);
        productFormData.append("mrp", values.mrp);
        productFormData.append("variantaddedby", values.variantaddedby);
        productFormData.append("variantaddeddate", values.variantaddeddate);
        productFormData.append("variantstatus", values.variantstatus);


        resetForm();
        addVariant(productFormData, values.productid, values.variantid);
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                <div> {productRecords ? "Edit Variant" : "Add New Variant"} </div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClosePopUp() }}
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
                                            rules={{
                                                required: { value: true, message: "Required *" }
                                            }}
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
                                {
                                    productRecords ?
                                        <Controller
                                            name={"name"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Required *" },
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
                                                    disabled={true}
                                                    label="Product Name *"
                                                    size="small"
                                                />
                                            )}
                                        />
                                        :
                                        <ThemeProvider theme={theme}>
                                            <Controller
                                                control={control}
                                                name={"autocomplete"}
                                                rules={{
                                                    required: { value: true, message: "Required *" },
                                                }}
                                                render={({ field: { value } }) => (
                                                    <Autocomplete
                                                        options={productOptions || []}
                                                        fullWidth
                                                        getOptionLabel={(option) => option.title}
                                                        onChange={handleProductChange}
                                                        inputValue={value}
                                                        renderInput={(params) => (
                                                            <MuiTextField
                                                                {...params}
                                                                error={errors.autocomplete ? true : false}
                                                                helperText={errors.autocomplete && errors.autocomplete.message}
                                                                label="Product"
                                                                variant="outlined"
                                                                size="small"
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </ThemeProvider>
                                }

                            </div>

                            <div className={style.row}>
                                <Controller
                                    name={"supplier"}
                                    control={control}
                                    rules={{
                                        required: { value: true, message: "Required *" },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            disabled={true}
                                            className={style.field}
                                            onChange={onChange}
                                            value={value || ''}
                                            options={employeeservice.getSupplierOptions()}
                                            label="Supplier *"
                                            size="small"
                                        />
                                    )}
                                />
                            </div>

                            <div className={style.row}>
                                <Controller
                                    name={"addedby"}
                                    control={control}
                                    rules={{
                                        required: { value: true, message: "Required *" },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            disabled={true}
                                            fullWidth={true}
                                            className={style.field}
                                            placeholder="Ex: Shakya Karunathilake"
                                            onChange={onChange}
                                            value={value || ''}
                                            options={employeeOptions || []}
                                            label="Added By"
                                            size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                disabled={true}
                                                className={style.field}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Added Date *"
                                                size="small"
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name={"productstatus"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                disabled={true}
                                                className={style.field}
                                                onChange={onChange}
                                                value={value || ''}
                                                options={employeeservice.getProductStatusOptions()}
                                                label="Status *"
                                                size="small"
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
                                                size="small"
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name={"type"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Required *" },
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
                                                size="small"
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
                                                size="small"
                                            />
                                        )}
                                    />
                                </div>
                            }

                            <div className={style.gridrow}>
                                <div>
                                    <Controller
                                        name={"piecespercase"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Required *" },
                                            pattern: { value: /^[0-9]*$/, message: "Invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.piecespercase && errors.piecespercase.message}
                                                error={errors.piecespercase ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Pieces/Case *"
                                                placeholder="24"
                                                fullWidth={true}
                                                size="small"
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name={"bulkprice"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Required *" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
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
                                                size="small"
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

                            <div className={style.rowminicolumns}>
                                <div>
                                    <Controller
                                        name={"purchaseprice"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Required *" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
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
                                                size="small"
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
                                        name={"sellingprice"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Required *" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
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
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
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
                                                size="small"
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
                                        required: { value: true, message: "Required *" },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            fullWidth={true}
                                            className={style.field}
                                            helperText={errors.variantaddedby && errors.variantaddedby.message}
                                            error={errors.variantaddedby ? true : false}
                                            onChange={onChange}
                                            value={value || ''}
                                            size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                className={style.field}
                                                helperText={errors.variantstatus && errors.variantstatus.message}
                                                error={errors.variantstatus ? true : false}
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                className={style.field}
                                                helperText={errors.variantaddeddate && errors.variantaddeddate.message}
                                                error={errors.variantaddeddate ? true : false}
                                                onChange={onChange}
                                                value={value || ''}
                                                label="Added Date *"
                                                size="small"
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
