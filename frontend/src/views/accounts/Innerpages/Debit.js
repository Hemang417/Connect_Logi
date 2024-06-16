import React from 'react'

const Debit = () => {
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
        <label for="type-of-expense" className='text-field-3'>Type of Exepnse</label>
        <input type="text" placeholder="" className='text-field-4' name='type-of-expense' />
      </div>
      
      <div>
        <label for="taxable-amount" className='text-field-3'>Taxable Amount</label>
        <input type="text" placeholder="" className='text-field-4' name='taxable-amount' />
      </div>
      
      <div>
        <label for="gst-amount" className='text-field-3'>GST Amount</label>
        <input type="text" placeholder="" className='text-field-4' name='gst-amount' />
      </div>
      
      <div>
        <label for="total-invoice-amount" className='text-field-3'>Total Invoice Amount</label>
        <input type="text" placeholder="" className='text-field-4' name='total-invoice-amount' />
      </div>
      
      <div>
        <label for="tds-amount" className='text-field-3'>TDS Amount</label>
        <input type="text" placeholder="" className='text-field-4' name='tds-amount' />
      </div>
      
      <div>
        <label for="net-payment-amount" className='text-field-3'>Net Payment Amount</label>
        <input type="text" placeholder="" className='text-field-4' name='net-payment-amount' />
      </div>
      
      <div>
        <label for="utr-details" className='text-field-3'>UTR Details</label>
        <input type="text" placeholder="" className='text-field-4' name='utr-details' />
      </div>
      
      <div>
        <label for="job-no" className='text-field-3'>Job No.</label>
        <input type="text" placeholder="" className='text-field-4' name='job-no' />
      </div>
      
      <div>
        <label for="customer-name" className='text-field-3'>Customer Name</label>
        <input type="text" placeholder="" className='text-field-4' name='customer-name' />
      </div>
      
      <div>
        <label for="remarks" className='text-field-3'>Remarks</label>
        <input type="text" placeholder="" className='text-field-4' name='remarks' />
      </div>


    </div>
  )
}

export default Debit
