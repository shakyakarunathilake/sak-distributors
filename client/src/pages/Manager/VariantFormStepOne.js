import React from 'react';
import { Controller } from 'react-hook-form';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';
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
        handleClosePopUp,
        handleProductChange,
        productOptions,
        stepOneResetForm,
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Create Product Variant
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 4
                </div>

            </div>

            <div className={style.body}>

                <div className={style.columnA}>

                    <div className={style.image}>
                        <div className={style.imgWrapper}>
                            <Controller
                                render={({ field: { value } }) => (
                                    typeof value === "string" ?
                                        <img src={value ? `http://${value}` : product} alt="" /> :
                                        <img src={value ? file : product} alt="" />
                                )}
                                name={"productimage"}
                                control={control}
                            />
                        </div>
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
                                        {...field}
                                        options={productOptions}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.name === value.name}
                                        renderInput={params => (
                                            <MuiTextField
                                                {...params}
                                                error={errors.name ? true : false}
                                                helperText={errors.name && errors.name.message}
                                                label="Product"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                        onChange={(e, option) => {
                                            handleProductChange(e, option)
                                            field.onChange(option)
                                        }}
                                    />
                                )}
                                name="name"
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
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    size="small"
                                    placeholder="Ex: Swadeshi Industrial Works PLC"
                                    label="Supplier *"
                                    error={errors.supplier ? true : false}
                                    helperText={errors.supplier && errors.supplier.message}
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
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    placeholder="Ex: Shakya Karunathilake"
                                    size="small"
                                    label="Added By *"
                                    error={errors.addedby ? true : false}
                                    helperText={errors.addedby && errors.addedby.message}
                                />
                            )}
                            control={control}
                            name={"addedby"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>

                    <div className={style.twocolumns}>

                        <div className={style.row}>

                            <Controller
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        size="small"
                                        label="Added Date *"
                                        error={errors.addeddate ? true : false}
                                        helperText={errors.addeddate && errors.addeddate.message}
                                    />
                                )}
                                control={control}
                                name={"addeddate"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />

                        </div>

                        <div className={style.row}>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        placeholder="Ex: Active"
                                        size="small"
                                        label="Status *"
                                        error={errors.productstatus ? true : false}
                                        helperText={errors.productstatus && errors.productstatus.message}
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

                    <div className={style.twocolumns}>

                        <div className={style.row}>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        placeholder="Ex: PV0001"
                                        size="small"
                                        label="Variant ID *"
                                        error={errors.variantid ? true : false}
                                        helperText={errors.variantid && errors.variantid.message}
                                    />
                                )}
                                name={"variantid"}
                                control={control}
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

                </div>


            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    <Button
                        onClick={stepOneResetForm}
                        variant="contained"
                    >
                        Reset
                    </Button>
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