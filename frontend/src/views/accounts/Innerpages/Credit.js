import React from 'react'

const Credit = () => {
  return (
    <div>
      <div>
        <label for="date" className='text-field-3'>Date</label>
        <input type="date" placeholder="" className='text-field-4' name='date' />
      </div>

      <div>
        <label for="bank-account" className='text-field-3'>Bank Account</label>
        <input type="text" placeholder="" className='text-field-4' name='bank-account' />
      </div>

      <div>
        <label for="payment-details" className='text-field-3'>Payment Details</label>
        <input type="text" placeholder="" className='text-field-4' name='payment-details' />
      </div>

      <div>
        <label for="outstanding-job" className='text-field-3'>Outstanding/Job</label>
        <input type="text" placeholder="" className='text-field-4' name='outstanding-job' />
      </div>

      <div>
        <label for="amountreceived" className='text-field-3'>Amount Recieved</label>
        <input type="text" placeholder="" className='text-field-4' name='amountreceived' />
      </div>

      <div>
        <label for="remarks" className='text-field-3'>Remarks</label>
        <input type="text" placeholder="" className='text-field-4' name='remarks' />
      </div>


    </div>
  )
}

export default Credit
