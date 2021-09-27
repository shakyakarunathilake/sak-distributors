import React from 'react';
// import classnames from 'classnames';

import TextField from '@material-ui/core/TextField';

export default function DatePicker(props) {

    const { name, label, value, onChange, error, helperText } = props;
    
    // const windowHeight = window.innerHeight;

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
            // size={classnames(windowHeight < 900 ? "small" : "normal")}

            variant="outlined"
            {...(error && { error: true, helperText: helperText })}
        />
    )
}
