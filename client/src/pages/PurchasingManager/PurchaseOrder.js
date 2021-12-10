import React from 'react';
import { useForm, Controller } from 'react-hook-form';

//Shared Components
import Select from '../../shared/Select/Select';

//Material UI 
import { Button, Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@mui/material';

//Material UI Icons
import DeleteIcon from '@mui/icons-material/Delete';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

import style from './PurchaseOrder.module.scss';

export default function PurchaseOrder(props) {

    const { supplierOptions, setSelectedProductOptions, productOptions, data, setData, selectedProductOptions } = props;

    const { formState: { errors }, control, getValues, setValue, trigger } = useForm({ mode: "all" });







    return (
        <div>

        </div>
    )
}
