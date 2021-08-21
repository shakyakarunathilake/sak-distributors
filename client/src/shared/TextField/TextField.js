import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, onChange, placeholder, InputProps, disabled, error = null, type } = props;

    return (
        <MuiTextField
            fullWidth
            placeholder={placeholder}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={InputProps}
            disabled={disabled}
            type={type}
            {...(error && { error: true, helperText: error })}
        />
    );
};
