import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

export default function Input(props) {

    const { error, helperText, name, label, value, onChange, placeholder } = props;

    return (
        <MuiTextField
            fullWidth
            placeholder={placeholder}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
        />
    );
};
