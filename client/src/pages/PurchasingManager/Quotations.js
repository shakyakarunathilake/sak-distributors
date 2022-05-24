import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { ExcelRenderer } from 'react-excel-renderer';
import { OutTable } from 'react-excel-renderer';

//Shared Components
import Select from '../../shared/Select/Select';

//Material UI 
import { Button } from '@material-ui/core';

//SCSS styles
import style from './Quotations.module.scss';

//Connection to backend
import axios from 'axios';

export default function Quotations(props) {

    const {
        quotationOptions
    } = props;

    const [rows, setRows] = useState(null);
    const [cols, setCols] = useState(null);

    const { control, formState: { errors, isValid }, getValues, trigger } = useForm({
        mode: "all",
        defaultValues: {
            quotation: '',
        }
    });

    const onSubmit = () => {

        if (isValid) {
            const quotationid = getValues('quotation').substring(0, 6);

            axios
                .get(`http://localhost:8080/quotations/xlsx-file/${quotationid}`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    },
                    responseType: 'blob',
                })
                .then(res => {

                    ExcelRenderer(res.data, (err, resp) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            setCols(resp.cols);
                            setRows(resp.rows);

                        }
                    });

                })
                .catch(err => {
                    console.log(err);
                })

        } else {
            trigger();
        }

    }

    const quotationComponent = () => (
        <div className={style.preview}>
            <OutTable
                data={rows}
                columns={cols}
                className={style.ExcelTable2007}
                tableClassName="ExcelTable2007"
                tableHeaderRowClass="heading"
            />
        </div>
    )

    return (

        <div className={style.container}>

            <div className={style.quotationHeader}>

                <div className={style.title}>
                    Quotations
                </div>

                <div className={style.quotationSelect} >

                    <Controller
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={quotationOptions || []}
                                error={errors.quotation ? true : false}
                                helperText={errors.quotation && errors.quotation.message}
                                size="small"
                            />
                        )}
                        control={control}
                        name={'quotation'}
                        rules={{ required: { value: true, message: "Required *" } }}
                    />

                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={onSubmit}
                    >
                        Fetch Quotation
                    </Button>

                </div>

            </div>

            <div className={style.quotationTable}>

                {
                    rows !== null &&
                    quotationComponent()
                }

            </div>

        </div>
    )
}
