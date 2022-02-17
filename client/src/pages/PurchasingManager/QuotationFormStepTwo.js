import React from 'react';
import { Controller } from 'react-hook-form';
import { OutTable } from 'react-excel-renderer';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './QuotationFormStepTwo.module.scss';

export default function QuotationFormStepTwo(props) {

    const {
        backFormStep,
        action,
        setOpenPopup,
        control,
        onSubmit,
        rows,
        cols,
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Add Quotation"}
                        {action === "View" && "View Quotation"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                {
                    action !== "View" &&
                    <div className={style.step}>
                        Step 2 of 2
                    </div>
                }

            </div>

            <div className={style.body} >

                <div className={style.orderDetails}>

                    <table className={style.details}>
                        <tbody>

                            <tr>
                                <th align="left">
                                    Quotation ID <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                        name={"quotationid"}
                                        control={control}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th align="left">
                                    Issuing Date <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                        name={"issuingdate"}
                                        control={control}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th align="left">
                                    Validity Period <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                        name={"validityperiod"}
                                        control={control}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>

                            <tr>
                                <th align="left">
                                    Supplier <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                        name={"supplier"}
                                        control={control}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th align="left">
                                    End Date <span className={style.red}>*</span>
                                </th>
                                <td align="left">
                                    <Controller
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                        name={"enddate"}
                                        control={control}
                                    />
                                </td>
                            </tr>

                            {
                                action === "Create" &&
                                <tr>
                                    <th align="left">
                                        <label>
                                            File <span className={style.red}>*</span>
                                        </label>
                                    </th>
                                    <td align="left">
                                        <Controller
                                            render={({ field: { value } }) => (
                                                <Typography className={style.input}>
                                                    {value.name}
                                                </Typography>
                                            )}
                                            name={"quotationfile"}
                                            control={control}
                                        />
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>

                </div>

                <div className={style.previewContainer}>

                    {
                        action === "Create" && rows !== null &&
                        <div className={style.preview}>
                            <OutTable
                                data={rows}
                                columns={cols}
                                className={style.ExcelTable2007}
                                tableClassName="ExcelTable2007"
                                tableHeaderRowClass="heading"
                            />
                        </div>
                    }

                    {
                        action === "View" &&
                        <div className={style.preview}>

                        </div>
                    }

                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action !== "View" &&
                        <Button
                            onClick={backFormStep}
                            variant="contained"
                        >
                            Back
                        </Button>
                    }
                </div>

                <div className={style.doneBtn}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        {action === "Create" && "Confirm & Submit"}
                        {action === "View" && "Done"}
                    </Button>
                </div>

            </div>

        </div>
    )
}
