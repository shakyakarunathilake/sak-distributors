import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';

// //Material UI Styling
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//     select: {
//         "& .MuiOutlinedInput-input": {
//             padding: "11.86px 14px !important"
//         }
//     }
// });

export default function Select(props) {

    // const classes = useStyles();

    const { label, size, name, options, onChange, value, error = null, helperText, disabled } = props;

    return (
        <FormControl
            fullWidth
            size={size}
            variant="outlined"
            {...(error && { error: true })}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                disabled={disabled}
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
