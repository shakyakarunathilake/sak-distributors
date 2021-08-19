import { useState } from 'react';

export default function useForm(initialFieldValues) {

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
        const { name, value } = e.currentTarget;
        setValues({
            ...values,
            [name]: value
        });
        // if (validateOnChange)
        //     validate({ [name]: value })
    };

    return (
        errors,
        values,
        setErrors,
        setValues,
        handleInputChange,
        handleClickShowPassword,
        handleMouseDownPassword
    );
};

// export function Form(props) {
//     return (
//         <form>
//             {props.children}
//         </form>
//     )
// };