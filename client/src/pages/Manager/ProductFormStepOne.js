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

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//SCSS Styles
import style from './ProductFormStepOne.module.scss';

export default function ProductFormStepOne(props) {

    const {
        errors,
        control,
        handleClosePopUp,
        action,
        file,
        completeFormStep,
        handleImageChange,
        resetForm,
        employeeOptions,
    } = props;

    return (

        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === "Create" && "Create Product"}
                        {action === "Edit" && "Edit Product"}
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
                                    render={({ field }) => (
                                        <input
                                            type="file"
                                            id="product-image"
                                            hidden
                                            onChange={(e) => {
                                                field.onChange(e.target.files[0]);
                                                handleImageChange(e);
                                            }}
                                        />
                                    )}
                                    control={control}
                                    name={"productimage"}
                                    rules={{ required: { value: true, message: "Required *" } }}
                                />

                                <label
                                    className={style.label}
                                    htmlFor="product-image"
                                >
                                    Upload *
                                </label>

                            </div>

                        </div>

                        <div className={style.partialCircle}>
                        </div>

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
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.name ? true : false}
                                    helperText={errors.name && errors.name.message}
                                    placeholder="Ex: Ice Cream – Butter Scotch"
                                    size="small"
                                    label="Product Name *"
                                />
                            )}
                            control={control}
                            name={"name"}
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
                                    options={employeeservice.getSupplierOptions()}
                                    error={errors.supplier ? true : false}
                                    helperText={errors.supplier && errors.supplier.message}
                                    size="small"
                                    label="Supplier *"
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
                                    error={errors.addedby ? true : false}
                                    helperText={errors.addedby && errors.addedby.message}
                                    size="small"
                                    label="Added By"
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
                                    <Select
                                        {...field}
                                        options={employeeservice.getVariantStatusOptions()}
                                        error={errors.status ? true : false}
                                        helperText={errors.status && errors.status.message}
                                        size="small"
                                        label="Status *"
                                    />
                                )}
                                control={control}
                                name={"status"}
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
                                        error={errors.addeddate ? true : false}
                                        helperText={errors.addeddate && errors.addeddate.message}
                                        size="small"
                                        label="Added Date *"
                                    />
                                )}
                                name={"addeddate"}
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

                <div className={style.resetBtn}>
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

                <div className={style.nextBtn}>
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
