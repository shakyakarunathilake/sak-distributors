import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';

export default function Select(props) {

    const { label, name, options, onChange, value, error = null, helperText } = props;

    return (
        <FormControl
            fullWidth
            variant="outlined"
            {...(error && { error: true })}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                onChange={onChange}
                value={value}
                name={name}
            >
                {
                    options?.map(
                        (item) => (
                            <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                        ),
                    )
                }
            </MuiSelect>
            {error && <FormHelperText> {helperText} </FormHelperText>}
        </FormControl>
    );
};
