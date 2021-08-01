import React, { FC } from "react"

import TextField from '@material-ui/core/TextField'

interface IProps {
    label: string,
    name: string,
    onChange: any,
    value: string
}

const DatePicker: FC<IProps> = (props) => {

    const { label, name, onChange, value } = props;

    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            onChange={onChange}
            type="date"
            value={value}
            variant="outlined"
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}

export default DatePicker;