import React, { useState } from "react"

interface IProps {
    initialFValues: any,
}

const useForm = ({ initialFValues }: IProps) => {

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleChange = (name: string) => (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        setValues({
            ...values,
            [name]: e.currentTarget.value
        })
    }

    const handleSelectChange = (name: string) => (event: React.ChangeEvent<{ value: unknown }>) => {

        setValues({
            ...values,
            [name]: event.target.value
        })

    }

    const checkError = (name: string) => {
        if (errors[name]) {
            return true
        }
        return false
    }

    const getError = (name: string) => {
        return (
            errors[name]
        )
    }

    console.log(errors)
    console.log(values)

    return {
        checkError,
        getError,
        errors,
        setErrors,
        values,
        setValues,
        handleChange,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleSelectChange
    }
}

export default useForm;