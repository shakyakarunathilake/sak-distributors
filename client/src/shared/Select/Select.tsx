import React, { FC } from 'react'

//MUI Components
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'

type IProps = {
    error: boolean,
    helperText: string,
    // name: string,
    label: string,
    options: { id: string, title: string }[],
    onChange: any,
    value: string,
}

const Select: FC<IProps> = (props) => {

    const { error, helperText, label, options, onChange, value } = props;

    return (
        <FormControl
            fullWidth
            variant="outlined"
            error={error}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                renderValue={() => `${helperText}`}
                label={label}
                onChange={onChange}
                value={value}

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
    )
}

export default Select