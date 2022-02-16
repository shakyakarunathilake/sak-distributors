import React from 'react';
import { Controller } from 'react-hook-form';
import { OutTable } from 'react-excel-renderer';

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';
import * as employeeservice from '../../services/employeeService';

//Material UI Components
import Button from '@material-ui/core/Button';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Styles
import style from './QuotationFormStepOne.module.scss';
import './excel-2007.css';

export default function QuotationFormStepOne(props) {

  const {
    errors,
    control,
    setOpenPopup,
    resetForm,
    completeFormStep,
    rows,
    cols,
    handleFileChange
  } = props;

  return (
    <div className={style.container}>

      <div className={style.header}>

        <div className={style.title}>

          <div>
            Add Quotation
          </div>

          <div>
            <HighlightOffIcon
              className={style.icon}
              onClick={() => { setOpenPopup(false) }}
            />
          </div>

        </div>

        <div className={style.step}>
          Step 1 of 2
        </div>

      </div>

      <div className={style.body}>

        <div className={style.orderDetails}>

          <table className={style.details}>
            <tbody>

              <tr>
                <th align="left">
                  Quotation ID <span className={style.red}>*</span>
                </th>
                <td align="left">
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth={true}
                        size="small"
                        disabled={true}
                      />
                    )}
                    name={"quotationid"}
                    control={control}
                    rules={{
                      required: { value: true, message: "Required *" }
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th align="left">
                  Issuing Date <span className={style.red}>*</span>
                </th>
                <td align="left">
                  <Controller
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        size="small"
                        helperText={errors.issuingdate && errors.issuingdate.message}
                        error={errors.issuingdate ? true : false}
                      />
                    )}
                    name={"issuingdate"}
                    control={control}
                    rules={{
                      required: { value: true, message: "Required *" }
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th align="left">
                  Validity Period <span className={style.red}>*</span>
                </th>
                <td align="left">
                  <Controller
                    name={"validityperiod"}
                    control={control}
                    rules={{ required: { value: true, message: "Required *" } }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        options={employeeservice.getValidityPeriodOptions()}
                        helperText={errors.validityperiod && errors.validityperiod.message}
                        error={errors.validityperiod ? true : false}
                      />
                    )}
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
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        options={employeeservice.getSupplierOptions()}
                        helperText={errors.supplier && errors.supplier.message}
                        error={errors.supplier ? true : false}
                      />
                    )}
                    name={"supplier"}
                    control={control}
                    rules={{ required: { value: true, message: "Required *" } }}
                  />
                </td>
              </tr>

              <tr>
                <th align="left">
                  End Date <span className={style.red}>*</span>
                </th>
                <td align="left">
                  <Controller
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        size="small"
                        helperText={errors.enddate && errors.enddate.message}
                        error={errors.enddate ? true : false}
                      />
                    )}
                    name={"enddate"}
                    control={control}
                    rules={{
                      required: { value: true, message: "Required *" }
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th align="left">
                  <label>
                    File <span className={style.red}>*</span>
                  </label>
                </th>
                <td align="left">
                  <Controller
                    render={({ field }) => (
                      <input
                        id="quotationfileinput"
                        type="file"
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                          handleFileChange(e);
                        }}
                        accept=".xlsx"
                      />
                    )}
                    control={control}
                    name={"quotationfile"}
                    rules={{ required: { value: true, message: "Required *" } }}
                  />
                  <div className={style.redFontCenter}>
                    {
                      errors.quotationfile && errors.quotationfile.message
                    }
                  </div>
                </td>
              </tr>

            </tbody>
          </table>

        </div>

        <div className={style.previewContainer}>

          {
            rows !== null &&
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

        </div>

      </div>

      <div className={style.footer}>

        <div className={style.resetBtn}>
          <Button
            onClick={resetForm}
            variant="contained"
          >
            Reset
          </Button>
        </div>

        <div className={style.nextBtn}>
          <Button
            onClick={completeFormStep}
            variant="contained"
          >
            Next
          </Button>
        </div>

      </div>

    </div >
  )
}
