import { useForm } from 'react-hook-form';

//Steps
import AdvancePaymentStepTwo from './AdvancePaymentFormStepTwo';
import CompletePaymentStepOne from './CompletePaymentFormStepOne';


export default function ViewSupplierPayment(props) {

  const { handleClosePopUp, paymentRecords, action, } = props;

  const { handleSubmit, control } = useForm({
    mode: 'all',
    defaultValues: {
      supplier: paymentRecords.supplier,
      ponumber: paymentRecords.ponumber,
      grnnumber: paymentRecords.grnnumber,
      status: paymentRecords.status,
      pogrosstotal: paymentRecords.pogrosstotal,
      receiveddiscounts: paymentRecords.receiveddiscounts,
      podamagedmissingitems: paymentRecords.podamagedmissingitems,
      pototal: paymentRecords.pototal,
      grngrosstotal: paymentRecords.grngrosstotal,
      grndamagedmissingitems: paymentRecords.grndamagedmissingitems,
      grntotal: paymentRecords.grntotal,
      paidamount: paymentRecords.paidamount,
      advancepayment: paymentRecords.advancepayment,
      advancepaymentpaidat: paymentRecords.advancepaymentpaidat,
      advancepaymentpaidby: paymentRecords.advancepaymentpaidby,
      paymentcompletedat: paymentRecords.paymentcompletedat,
      paymentcompletedby: paymentRecords.paymentcompletedby,
      debt: paymentRecords.debt.toFixed(2),
    }
  });

  const onSubmit = () => {
    handleClosePopUp();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >

      {
        action === 'View Advance Payment' &&
        <AdvancePaymentStepTwo
          action={action}
          handleClosePopUp={handleClosePopUp}
          control={control}
          onSubmit={onSubmit}
        />
      }

      {
        action === 'View Complete Payment' &&
        <CompletePaymentStepOne
          action={action}
          handleClosePopUp={handleClosePopUp}
          control={control}
          onSubmit={onSubmit}
        />
      }

    </form >
  )
}
