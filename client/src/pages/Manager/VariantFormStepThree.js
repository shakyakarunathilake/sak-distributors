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
import { InputAdornment } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField as MuiTextField } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Styles
import style from './VariantFormStepThree.module.scss';
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

export default function VariantFormStepThree(props) {

    const {
        errors,
        control,
        completeFormStep,
        backFormStep,
        action,
        handleClosePopUp,
        employeeOptions,
        productVariantOptions,
        stepThreeClearError,
        watch
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Product Variant"}
                        {action === "Edit" && "Edit Product Variant"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    {action === "Edit" && "Step 1 of 2"}
                    {action === "Create" && "Step 2 of 4"}
                </div>


            </div>

            <div className={style.body}>

                <div className={style.redFont}>
                    The fields with "*" are required
                </div>

                {
                    watch("type") !== "General" &&
                    <div className={style.twominionefullcolumns}>

                        <div className={style.row}>

                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        helperText={errors.eligibleqty && errors.eligibleqty.message}
                                        error={errors.eligibleqty ? true : false}
                                        placeholder="9"
                                        size="small"
                                        label="Eligible Qty *"
                                        disabled={watch("type") === "General"}
                                    />
                                )}
                                name={"eligibleqty"}
                                control={control}
                                rules={{
                                    required: { value: watch("type") !== "General", message: "Required *" },
                                    pattern: { value: /^[0-9]*$/, message: "Invalid" }
                                }}
                            />

                        </div>

                        <div className={style.row}>

                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={[
                                            { id: "pcs", title: "Pieces" },
                                            { id: "cases", title: "Cases" }
                                        ]}
                                        helperText={errors.eligibleqtytype && errors.eligibleqtytype.message}
                                        error={errors.eligibleqtytype ? true : false}
                                        size="small"
                                        label="Pcs / Cases *"
                                        disabled={watch("type") === "General"}
                                    />
                                )}
                                name={"eligibleqtytype"}
                                control={control}
                                rules={{
                                    required: { value: watch("type") !== "General", message: "Required *" },
                                }}
                            />

                        </div>


                        {
                            watch("type") === "Promotion (Discounts)" &&
                            <div className={style.row}>

                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth={true}
                                            helperText={errors.discount && errors.discount.message}
                                            error={errors.discount ? true : false}
                                            placeholder="9"
                                            size="small"
                                            label="Discount *"
                                            disabled={watch("type") !== "Promotion (Discounts)"}
                                        />
                                    )}
                                    name={"discount"}
                                    control={control}
                                    rules={{
                                        required: { value: watch("type") === "Promotion (Discounts)", message: "Required *" },
                                        pattern: { value: /^[0-9]*$/, message: "Invalid" }
                                    }}
                                />

                            </div>

                        }

                        {
                            watch("type") !== "Promotion (Discounts)" &&
                            <div className={style.twocolumns}>

                                <div className={style.row}>

                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth={true}
                                                helperText={errors.freeqty && errors.freeqty.message}
                                                error={errors.freeqty ? true : false}
                                                placeholder="9"
                                                size="small"
                                                label="Free Qty *"
                                                disabled={watch("type") !== "Promotion (Free Products)"}
                                            />
                                        )}
                                        name={"freeqty"}
                                        control={control}
                                        rules={{
                                            required: { value: watch("type") === "Promotion (Free Products)", message: "Required *" },
                                            pattern: { value: /^[0-9]*$/, message: "Invalid" }
                                        }}
                                    />
                                </div>

                                <div className={style.row}>
                                    <Controller
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={[
                                                    { id: "pcs", title: "Pieces" },
                                                    { id: "cases", title: "Cases" }
                                                ]}
                                                helperText={errors.freeqtytype && errors.freeqtytype.message}
                                                error={errors.freeqtytype ? true : false}
                                                size="small"
                                                label="Pcs / Cases *"
                                                disabled={watch("type") !== "Promotion (Free Products)"}
                                            />
                                        )}
                                        name={"freeqtytype"}
                                        control={control}
                                        rules={{
                                            required: { value: watch("type") === "Promotion (Free Products)", message: "Required *" },
                                        }}
                                    />
                                </div>

                            </div>
                        }

                    </div>
                }

                {
                    watch("type") !== "General" &&
                    <div className={style.row}>

                        <ThemeProvider theme={theme}>
                            <Controller
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        fullWidth
                                        options={productVariantOptions}
                                        getOptionLabel={(option) => option}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                error={errors.freeproductname ? true : false}
                                                helperText={errors.freeproductname && errors.freeproductname.message}
                                                label="Promotion Product *"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                        onChange={(e, option) => {
                                            field.onChange(option)
                                        }}
                                    />
                                )}
                                name={"freeproductname"}
                                control={control}
                                rules={{
                                    required: { value: watch("type") !== "General", message: "Required *" },
                                }}
                            />
                        </ThemeProvider>

                    </div>
                }


                <div className={style.twocolumns}>

                    <div className={style.row}>

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

                    <div className={style.row}>

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

                <div className={style.threecolumns}>

                    <div className={style.row}>

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

                    <div className={style.row}>

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

                    <div className={style.row}>

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
                                disabled={action === "Edit"}
                            />
                        )}
                        name={"variantaddedby"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                </div>

                <div className={style.twocolumns}>

                    <div className={style.row}>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={employeeservice.getStatusOptions()}
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

                    <div className={style.row}>

                        <Controller
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    helperText={errors.variantaddeddate && errors.variantaddeddate.message}
                                    error={errors.variantaddeddate ? true : false}
                                    size="small"
                                    label="Added Date *"
                                    disabled={action === "Edit"}
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

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {action === "Create" &&
                        < Button
                            onClick={backFormStep}
                            variant="contained"
                        >
                            Back
                        </Button>
                    }
                </div>

                <div className={style.resetBtn}>
                    {action === "Create" &&
                        <Button
                            onClick={stepThreeClearError}
                            variant="contained"
                        >
                            Clear Errors
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

        </div >
    )
}