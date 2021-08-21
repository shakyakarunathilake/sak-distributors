import { useState } from 'react';

export default function useForm(initialFieldValues, validateOnChange = false, validate) {

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
        
        if (validateOnChange) {
            validate({ [name]: value })
        }
    }

    const resetForm = e => {
        setValues(initialFieldValues);
        setErrors({});
    }

    return ({
        errors,
        values,
        setErrors,
        setValues,
        resetForm,
        handleInputChange,
        handleClickShowPassword,
        handleMouseDownPassword
    })
};