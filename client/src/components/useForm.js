import { useState } from 'react';

export default function useForm(initialFieldValues) {

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState();
    //useState({}) was like this

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
    }

    return ({
        errors,
        values,
        setErrors,
        setValues,
        handleInputChange,
        handleClickShowPassword,
        handleMouseDownPassword
    })
};