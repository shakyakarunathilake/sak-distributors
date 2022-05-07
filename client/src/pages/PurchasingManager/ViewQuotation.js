import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ExcelRenderer } from 'react-excel-renderer';

//Form Step
import StepTwo from './QuotationFormStepTwo';

export default function ViewPurchaseOrder(props) {

    const { setOpenPopup, quotationRecords, action, file } = props;

    const [rows, setRows] = useState(null);
    const [cols, setCols] = useState(null);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            quotationid: quotationRecords ? quotationRecords.quotationid : '',
            supplier: quotationRecords ? quotationRecords.supplier : '',
            validityperiod: quotationRecords ? quotationRecords.validityperiod : '',
            issuingdate: quotationRecords ? quotationRecords.issuingdate : '',
            enddate: quotationRecords ? quotationRecords.enddate : '',
            quotationfile: quotationRecords.quotationfile,
        }
    });

    useEffect(() => {

        console.log(file);

        ExcelRenderer(file, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                setCols(resp.cols);
                setRows(resp.rows);
             
            }
        });

    }, []);

    const onSubmit = () => {
        setOpenPopup()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <StepTwo
                action={action}
                setOpenPopup={setOpenPopup}
                control={control}
                onSubmit={onSubmit}
                rows={rows}
                cols={cols}
            />

        </form >
    )
}
