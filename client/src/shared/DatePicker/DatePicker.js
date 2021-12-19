import React from 'react';

//Material UI Components
import TextField from '@material-ui/core/TextField';

export default function DatePicker(props) {

    const { name, label, value, onChange, error, helperText, disabled, margin, type } = props;

    return (
        <TextField
            fullWidth
            format="MM/dd/yyyy"
            InputLabelProps={{
                shrink: true,
            }}
            label={label}
            margin={margin}
            name={name}
            onChange={onChange}
            type={type === "datetime-local" ? "datetime-local" : "date"}
            value={value}
            disabled={disabled}
            variant="outlined"
            {...(error && { error: true, helperText: helperText })}
        />
    )
}