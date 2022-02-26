import React from 'react';
import classnames from 'classnames';
import { Controller } from 'react-hook-form';

//Shared Components
import TextField from '../../shared/TextField/TextField';

//Material UI Components
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CalculateIcon from '@mui/icons-material/Calculate';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS Styles
import style from './AdvancePaymentFormStepOne.module.scss';

export default function AdvancePaymentFormStepOne(props) {

  const {
    errors,
    control,
    completeFormStep,
    handleClosePopUp,
    resetForm,
    getValues,
    setValue,
  } = props;

  const calculatePayments = () => {
    let advancepayment = getValues('advancepayment');
    let pototal = getValues('pototal');
    let debt = pototal - advancepayment;

    setValue('paidamount', advancepayment);
    setValue('debt', debt.toFixed(2));
  }

  return (

    <div className={style.container}>

      <div className={style.header}>

        <div className={style.title}>

          <div>
            Pay Advance Payment
          </div>

          <div>
            <HighlightOffIcon
              className={style.icon}
              onClick={() => handleClosePopUp()}
            />
          </div>

        </div>

        <div className={style.step}>
          Step 1 of 2
        </div>

      </div>

      <div className={style.body}>

        <div className={style.row}>
          <div className={style.boldText}>
            PO Number
          </div>
          <div className={style.customerData}>
            <Controller
              name={"ponumber"}
              control={control}
              render={({ field: { value } }) => (
                <Typography
                  className={
                    classnames(
                      style.blue,
                      style.input,
                    )
                  }
                >
                  {value}
                </Typography>
              )}
            />
          </div>
        </div>

        <div className={style.row}>
          <div className={style.boldText}>
            Supplier
          </div>
          <div className={style.customerData}>
            <Controller
              name={"supplier"}
              control={control}
              render={({ field: { value } }) => (
                <Typography className={style.input}>
                  {value}
                </Typography>
              )}
            />
          </div>
        </div>

        <div className={style.row}>
          <div className={style.boldText}>
            Status
          </div>
          <div className={style.customerData}>
            <Controller
              name={"status"}
              control={control}
              render={({ field: { value } }) => (
                <Typography
                  className={
                    classnames(
                      style.input,
                      value === 'Advance Payment To Be Paid' && style.yellow,
                      value === 'Advance Payment Paid' && style.orange,
                      value === 'Complete Payment' && style.green,
                    )
                  }
                >
                  {value}
                </Typography>
              )}
            />
          </div>
        </div>


        <div className={style.row}>
          <div className={style.boldText}>
            Paid at
          </div>
          <div className={style.customerData}>
            <Controller
              name={"advancepaymentpaidat"}
              control={control}
              render={({ field: { value } }) => (
                <Typography className={style.input}>
                  {value}
                </Typography>
              )}
            />
          </div>
        </div>


        <div className={style.row}>
          <div className={style.boldText}>
            Paid by
          </div>
          <div className={style.customerData}>
            <Controller
              name={"advancepaymentpaidby"}
              control={control}
              render={({ field: { value } }) => (
                <Typography className={style.input}>
                  {value}
                </Typography>
              )}
            />
          </div>
        </div>

        <div className={style.box}>

          <div className={style.row}>
            <div className={style.boldText}>
              PO Gross Total
            </div>
            <div className={style.customerData}>
              <Controller
                name={"pogrosstotal"}
                control={control}
                render={({ field: { value } }) => (
                  <Typography className={style.rightInput}>
                    Rs. {NumberWithCommas(value)}
                  </Typography>
                )}
              />
            </div>
          </div>

          <div className={style.row}>
            <div className={style.boldText}>
              Received Discounts
            </div>
            <div className={style.customerData}>
              <Controller
                name={"receiveddiscounts"}
                control={control}
                render={({ field: { value } }) => (
                  <Typography className={style.rightInput}>
                    Rs. {NumberWithCommas(value)}
                  </Typography>
                )}
              />
            </div>
          </div>

          <div className={style.row}>
            <div className={style.boldText}>
              Previous GRN Damaged/Missing items
            </div>
            <div className={style.customerData}>
              <Controller
                name={"podamagedmissingitems"}
                control={control}
                render={({ field: { value } }) => (
                  <Typography className={style.rightInput}>
                    Rs. {NumberWithCommas(value)}
                  </Typography>
                )}
              />
            </div>
          </div>

          <div className={style.row}>
            <div className={style.boldText}>
              PO Total
            </div>
            <div className={style.customerData}>
              <Controller
                name={"pototal"}
                control={control}
                render={({ field: { value } }) => (
                  <Typography className={style.rightInput}>
                    Rs. {NumberWithCommas(value)}
                  </Typography>
                )}
              />
            </div>
          </div>

          <div className={style.dividerDiv}>
            <Divider variant="middle" />
          </div>

          <div className={style.rowTextField}>

            <div className={style.boldTextForTextField}>
              Advance Payment  <span className={style.red}>*</span>
            </div>

            <div className={style.customerDataTextField} dir="rtl">

              <CalculateIcon
                className={style.icon}
                onClick={() => calculatePayments()}
                disabled={getValues('status') === 'Advance Payment To Be Paid'}
              />

              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    focused={getValues('status') === 'Advance Payment To Be Paid'}
                    disabled={getValues('status') !== 'Advance Payment To Be Paid'}
                    type="number"
                    error={errors.advancepayment ? true : false}
                    helperText={errors.advancepayment && errors.advancepayment.message}
                    placeholder="999.99"
                    margin="dense"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          Rs
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                control={control}
                name={"advancepayment"}
                rules={{
                  required: { value: true, message: "Required *" },
                  pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
                }}
              />

            </div>

          </div>

        </div>

        <div className={style.row}>
          <div className={style.boldText}>
            Paid Amount
          </div>
          <div className={style.customerData}>
            <Controller
              name={"paidamount"}
              control={control}
              render={({ field: { value } }) => (
                <Typography className={style.rightInput}>
                  Rs. {NumberWithCommas(value)}
                </Typography>
              )}
            />
          </div>
        </div>

        <div className={style.row}>
          <div className={style.boldText}>
            Amount to Settle
          </div>
          <div className={style.customerData}>
            <Controller
              name={"debt"}
              control={control}
              render={({ field: { value } }) => (
                <Typography className={style.rightInput}>
                  Rs. {NumberWithCommas(value)}
                </Typography>
              )}
            />
          </div>
        </div>

      </div >

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
