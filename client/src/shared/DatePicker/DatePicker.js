import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function DatePicker(props) {

    const { name, label, value, onChange, error } = props;

    return (
        <TextField
            fullWidth
            format="yyyy-mm-dd"
            InputLabelProps={{
                shrink: true,
            }}
            label={label}
            name={name}
            onChange={onChange}
            type="date"
            value={value}
            variant="outlined"
            {...(error && { error: true, helperText: error })}
        />
    )
}
