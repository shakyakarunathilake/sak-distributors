import { useState } from 'react';

export function useForm(initialFieldValues) {

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
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
        handleInputChange
    );
};

// export function Form(props) {
//     return (
//         <form>
//             {props.children}
//         </form>
//     )
// };