import React from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';

export default function Select(props) {

    const {
        // error, helperText,
        label, name, options, onChange, value } = props;

    return (
        <FormControl
            fullWidth
            variant="outlined"
        // error={error}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                // renderValue={() => `${helperText}`}
                label={label}
                onChange={onChange}
                value={value}
                name={name}

            >
                {
                    options.map(
                        (option) => (
                            <MenuItem key={option.id} value={option.title}>{option.title}</MenuItem>
                        ),
                    )
                }
            </MuiSelect>
        </FormControl>
    );
};
