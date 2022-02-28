import { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './SupplierPaymentForm.module.scss';

//Steps
import AdvancePaymentStepOne from './AdvancePaymentFormStepOne';
import AdvancePaymentStepTwo from './AdvancePaymentFormStepTwo';
import CompletePaymentStepOne from './CompletePaymentFormStepOne';
import CompletePaymentStepTwo from './CompletePaymentFormStepTwo';

export default function SupplierPaymentForm(props) {

  const { handleClosePopUp, addOrEdit, paymentRecords, action, } = props;

  const today = new Date();

  const date = today.getFullYear() + '-' +
    (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
    (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

  const time = (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ":" +
    (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`) + ":" +
    (today.getSeconds() > 9 ? today.getSeconds() : `0${today.getSeconds()}`);

  const dateTime = date + ' ' + time;

  const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
  const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
  const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

  const { handleSubmit, formState: { errors, isValid }, control, reset, trigger, setValue, getValues } = useForm({
    mode: 'all',
    defaultValues: {
      supplier: paymentRecords ? paymentRecords.supplier : '',
      ponumber: paymentRecords ? paymentRecords.ponumber : '',
      grnnumber: paymentRecords ? paymentRecords.grnnumber : '',
      status: paymentRecords ? paymentRecords.status : '',
      pogrosstotal: paymentRecords ? paymentRecords.pogrosstotal : '',
      receiveddiscounts: paymentRecords.receiveddiscounts !== '0' ? paymentRecords.receiveddiscounts : '0.00',
      podamagedmissingitems: paymentRecords ? paymentRecords.podamagedmissingitems : '',
      pototal: paymentRecords ? paymentRecords.pototal : '',
      grngrosstotal: paymentRecords ? paymentRecords.grngrosstotal : '',
      grndamagedmissingitems: paymentRecords ? paymentRecords.grndamagedmissingitems : '',
      grntotal: paymentRecords ? paymentRecords.grntotal : '',
      paidamount: paymentRecords ? paymentRecords.paidamount : '',
      advancepayment: paymentRecords ? paymentRecords.advancepayment : '',
      advancepaymentpaidat: paymentRecords.status !== "Advance Payment To Be Paid" ? paymentRecords.advancepaymentpaidat : dateTime,
      advancepaymentpaidby: paymentRecords.status !== "Advance Payment To Be Paid" ? paymentRecords.advancepaymentpaidby : `${firstname} ${lastname} (${employeeid})`,
      paymentcompletedat: paymentRecords.status !== "Payment To Be Complete" ? paymentRecords.paymentcompletedat : dateTime,
      paymentcompletedby: paymentRecords.status !== "Payment To Be Complete" ? paymentRecords.paymentcompletedby : `${firstname} ${lastname} (${employeeid})`,
      debt: paymentRecords ? paymentRecords.debt.toFixed(2) : '',
    }
  });

  const [formStep, setFormStep] = useState(0);

  const completeFormStep = () => {
    if (isValid) {
      setFormStep(x => x + 1);
    } else {
      trigger();
    }
  }

  const backFormStep = () => {
    setFormStep(x => x - 1);
  }


  const onSubmit = () => {
    const supplierPaymentFormData = new formData();

    if (action === 'Pay Advance Payment') {
      supplierPaymentFormData.append('advancepaymentpaidat', getValues('advancepaymentpaidat'));
      supplierPaymentFormData.append('advancepaymentpaidby', getValues('advancepaymentpaidby'));
      supplierPaymentFormData.append('advancepayment', getValues('advancepayment'));
      supplierPaymentFormData.append('paidamount', getValues('paidamount'));
      supplierPaymentFormData.append('debt', getValues('debt'));
    }

    if (action === 'Complete Payment') {
      supplierPaymentFormData.append('paymentcompletedat', getValues('paymentcompletedat'));
      supplierPaymentFormData.append('paymentcompletedby', getValues('paymentcompletedby'));
      supplierPaymentFormData.append('paidamount', getValues('paidamount'));
      supplierPaymentFormData.append('debt', getValues('debt'));
    }

    addOrEdit(supplierPaymentFormData, getValues('ponumber'));
  };

  const resetForm = () => {
    reset();
  }

  return (
    <form
      className={style.container}
      onSubmit={handleSubmit(onSubmit)}
    >

      {
        action === 'Pay Advance Payment' && formStep >= 0 &&
        <section className={formStep === 0 ? style.visible : style.hidden}>

          <AdvancePaymentStepOne
            errors={errors}
            control={control}
            completeFormStep={completeFormStep}
            handleClosePopUp={handleClosePopUp}
            resetForm={resetForm}
            getValues={getValues}
            setValue={setValue}
          />

        </section>
      }

      {
        action === 'Pay Advance Payment' && formStep >= 1 &&
        <section className={formStep === 1 ? style.visible : style.hidden}>

          <AdvancePaymentStepTwo
            action={action}
            handleClosePopUp={handleClosePopUp}
            control={control}
            backFormStep={backFormStep}
            onSubmit={onSubmit}
          />

        </section >
      }

      {
        action === 'Complete Payment' && formStep >= 0 &&
        <section className={formStep === 0 ? style.visible : style.hidden}>

          <CompletePaymentStepOne
            action={action}
            handleClosePopUp={handleClosePopUp}
            control={control}
            backFormStep={backFormStep}
            completeFormStep={completeFormStep}
          />

        </section>
      }

      {
        action === 'Complete Payment' && formStep >= 1 &&
        <section className={formStep === 1 ? style.visible : style.hidden}>

          <CompletePaymentStepTwo
            action={action}
            handleClosePopUp={handleClosePopUp}
            control={control}
            backFormStep={backFormStep}
            onSubmit={onSubmit}
            getValues={getValues}
            setValue={setValue}
          />

        </section>
      }

    </form >
  )
}
