import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
// import classnames from 'classnames';

export default function Input(props) {

    const { name, label, value, onChange, placeholder, helperText, InputProps, disabled, fullWidth, error = null, type, color, focused, size } = props;

    // const windowHeight = window.innerHeight;

    return (
        <MuiTextField
            focused={focused}
            color={color}
            fullWidth={fullWidth}
            placeholder={placeholder}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={InputProps}
            disabled={disabled}
            type={type}
            size={size}
            // size={classnames(windowHeight < 900 ? "small" : "normal")}
            {...(error && { error: true, helperText: helperText })}
        />
    );
};
