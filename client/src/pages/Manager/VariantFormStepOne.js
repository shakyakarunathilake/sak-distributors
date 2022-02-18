import React from 'react';
import classnames from 'classnames';
import { Controller } from 'react-hook-form';

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
import style from './VariantFormStepOne.module.scss';
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

export default function VariantFormStepOne(props) {

    const {
        errors,
        control,
        file,
        completeFormStep,
        action,
        handleClosePopUp,
        employeeOptions,
        handleImageChange,
        handleProductChange,
        productOptions,
        resetForm,
        watch
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Product Variant"}
                        {action === "Edit" && "Edit Product Variant"}
                        {action === "View" && "View Product Variant"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

                <div className={style.columnA}>

                    <div className={style.image}>
                        <div className={style.imgWrapper}>
                            <img src={file ? file : product} alt="" />
                            <div className={style.uploadWrapper}>
                                <Controller
                                    name={"productimage"}
                                    control={control}
                                    rules={{
                                        required: { value: true, message: "Required *" }
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <input
                                            disabled
                                            type="file"
                                            id="product-image"
                                            className={style.input}
                                            hidden
                                            onChange={(e) => {
                                                onChange(e.target.files[0]);
                                                handleImageChange(e);
                                            }}
                                        />
                                    )}
                                />
                                <label
                                    className={classnames(style.label, action === 'Create' && style.pointer)}
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
                            render={({ field }) => (
                                <input
                                    disabled
                                    type="text"
                                    className={style.input}
                                    onChange={field.onChange}
                                    value={`ID: ${field.value ? field.value : ''}`}
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

                        <ThemeProvider theme={theme}>
                            <Controller
                                render={({ field }) => (
                                    <Autocomplete
                                        options={productOptions || []}
                                        fullWidth
                                        getOptionLabel={(option) => option.name}
                                        onChange={handleProductChange}
                                        disabled={action === "Edit"}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                error={errors.name ? true : false}
                                                helperText={errors.name && errors.name.message}
                                                label="Product"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                                name={"name"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </ThemeProvider>

                    </div>

                    <div className={style.row}>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={employeeservice.getSupplierOptions()}
                                    size="small"
                                    label="Supplier *"
                                    disabled={true}
                                />
                            )}
                            control={control}
                            name={"supplier"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>

                    <div className={style.row}>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    fullWidth={true}
                                    options={employeeOptions || []}
                                    placeholder="Ex: Shakya Karunathilake"
                                    size="small"
                                    label="Added By"
                                    disabled={true}
                                />
                            )}
                            control={control}
                            name={"addedby"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>

                    <div className={style.gridrow}>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        size="small"
                                        label="Added Date *"
                                        disabled={true}
                                    />
                                )}
                                control={control}
                                name={"addeddate"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={employeeservice.getProductStatusOptions()}
                                        size="small"
                                        label="Status *"
                                        disabled={true}
                                    />
                                )}
                                control={control}
                                name={"productstatus"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>

                    </div>

                    <div className={style.dividerDiv}>

                        <Divider variant="middle" />

                    </div>

                    <div className={style.gridrow}>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        placeholder="Ex: PV0001"
                                        size="small"
                                        label="Variant ID *"
                                        disabled={true}
                                    />
                                )}
                                name={"variantid"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={employeeservice.getVariantTypeOptions()}
                                        helperText={errors.type && errors.type.message}
                                        error={errors.type ? true : false}
                                        size="small"
                                        label="Type *"
                                    />
                                )}
                                name={"type"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>

                    </div>

                    {
                        watch('type') === "Promotion" &&
                        <div className={style.row}>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        helperText={errors.offercaption && errors.offercaption.message}
                                        error={errors.offercaption ? true : false}
                                        placeholder="Ex: Buy 24 and get 6 free"
                                        label="Offer Caption"
                                        size="small"
                                    />
                                )}
                                name={"offercaption"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>
                    }

                    <div className={style.gridrow}>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        helperText={errors.piecespercase && errors.piecespercase.message}
                                        error={errors.piecespercase ? true : false}
                                        placeholder="24"
                                        size="small"
                                        label="Pieces/Case *"
                                    />
                                )}
                                name={"piecespercase"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^[0-9]*$/, message: "Invalid" }
                                }}
                            />

                        </div>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        helperText={errors.bulkprice && errors.bulkprice.message}
                                        error={errors.bulkprice ? true : false}
                                        placeholder="999.99"
                                        size="small"
                                        label="Bulk Price *"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    Rs
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                )}
                                name={"bulkprice"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
                                }}
                            />
                        </div>

                    </div>

                    <div className={style.rowminicolumns}>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        helperText={errors.purchaseprice && errors.purchaseprice.message}
                                        error={errors.purchaseprice ? true : false}
                                        placeholder="999.99"
                                        size="small"
                                        label="Purchase Price *"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    Rs
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                name={"purchaseprice"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
                                }}
                            />

                        </div>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        helperText={errors.sellingprice && errors.sellingprice.message}
                                        error={errors.sellingprice ? true : false}
                                        placeholder="999.99"
                                        label="Selling Price *"
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
                                name={"sellingprice"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
                                }}
                            />

                        </div>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        helperText={errors.mrp && errors.mrp.message}
                                        error={errors.mrp ? true : false}
                                        placeholder="999.99"
                                        size="small"
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
                                name={"mrp"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
                                }}
                            />

                        </div>

                    </div>

                    <div className={style.row}>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    fullWidth={true}
                                    options={employeeOptions || []}
                                    helperText={errors.variantaddedby && errors.variantaddedby.message}
                                    error={errors.variantaddedby ? true : false}
                                    size="small"
                                    label="Added By"
                                />
                            )}
                            name={"variantaddedby"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>

                    <div className={style.gridrow}>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={employeeservice.getVariantStatusOptions()}
                                        helperText={errors.variantstatus && errors.variantstatus.message}
                                        error={errors.variantstatus ? true : false}
                                        size="small"
                                        label="Status *"
                                    />
                                )}
                                name={"variantstatus"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>

                        <div>

                            <Controller
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        helperText={errors.variantaddeddate && errors.variantaddeddate.message}
                                        error={errors.variantaddeddate ? true : false}
                                        size="small"
                                        label="Added Date *"
                                    />
                                )}
                                name={"variantaddeddate"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action === "Create" &&
                        <Button
                            onClick={resetForm}
                            variant="contained"
                        >
                            Reset
                        </Button>
                    }
                </div>

                <div className={style.doneBtn}>
                    <Button
                        onClick={completeFormStep}
                        variant="contained"
                    >
                        Next
                    </Button>
                </div>

            </div>

        </div>

    )
}
