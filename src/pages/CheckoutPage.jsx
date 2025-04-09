import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'

function CheckoutPage () {
  const { cart, cartTotalPrice, clearCart } = useContext(CartContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (cart.length === 0) return
    setIsSubmitting(true)
    console.log('Simulating Order:', {
      customerDetails: formData,
      items: cart,
      total: cartTotalPrice.toFixed(2)
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setOrderPlaced(true)
      clearCart()
    }, 1500)
  }

  if (orderPlaced) {
    return (
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center'>
        <div className='bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-6 py-8 rounded-lg max-w-lg mx-auto shadow-md'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <h2 className='text-2xl font-semibold mb-3'>
            Order Placed Successfully!
          </h2>
          <p className='mb-6'>Thank you for your purchase.</p>
          <Link
            to='/'
            className='inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center'>
        <h1 className='text-3xl font-bold mb-6'>Checkout</h1>
        <div className='bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-6 py-8 rounded-lg max-w-lg mx-auto shadow-md'>
          <p className='text-xl mb-4'>Your cart is empty.</p>
          <Link
            to='/'
            className='inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200'
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center sm:text-left'>
        Checkout
      </h1>
      <div className='flex flex-col lg:flex-row gap-12'>
        <div className='lg:w-2/3'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
              <h2 className='text-xl font-semibold mb-4 border-b dark:border-gray-700 pb-2'>
                Contact Information
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>
              </div>
            </section>

            <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
              <h2 className='text-xl font-semibold mb-4 border-b dark:border-gray-700 pb-2'>
                Shipping Address
              </h2>
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    Street Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='postalCode'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                    >
                      ZIP / Postal Code
                    </label>
                    <input
                      type='text'
                      id='postalCode'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                    >
                      Country
                    </label>
                    <input
                      type='text'
                      id='country'
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
              <h2 className='text-xl font-semibold mb-4 border-b dark:border-gray-700 pb-2'>
                Payment Details
              </h2>
              <div
                className='bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-md mb-4'
                role='alert'
              >
                <p className='font-medium'>Demo Only:</p>
                <p className='text-sm'>
                  Do not enter real credit card information.
                </p>
              </div>
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='cardNumber'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    Card Number
                  </label>
                  <input
                    type='text'
                    id='cardNumber'
                    name='cardNumber'
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder='xxxx xxxx xxxx xxxx'
                    required
                    pattern='\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}'
                    title='Enter 16 digits'
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='expiryDate'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                    >
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type='text'
                      id='expiryDate'
                      name='expiryDate'
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder='MM/YY'
                      required
                      pattern='(0[1-9]|1[0-2])\/\d{2}'
                      title='MM/YY format'
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='cvv'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                    >
                      CVV
                    </label>
                    <input
                      type='text'
                      id='cvv'
                      name='cvv'
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder='123'
                      required
                      pattern='\d{3,4}'
                      title='3 or 4 digits'
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className='mt-8 flex justify-end'>
              <button
                type='submit'
                disabled={isSubmitting || cart.length === 0}
                className={`inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white ${
                  isSubmitting || cart.length === 0
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900'
                } transition duration-150 ease-in-out`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Place Order ($${cartTotalPrice.toFixed(2)})`
                )}
              </button>
            </div>
          </form>
          <div className='mt-6 text-center sm:text-left'>
            <Link
              to='/'
              className='text-sm text-indigo-600 dark:text-indigo-400 hover:underline'
            >
              ← Back to Shopping
            </Link>
          </div>
        </div>

        <div className='lg:w-1/3'>
          <div className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow sticky top-24'>
            <h2 className='text-xl font-semibold mb-4 border-b dark:border-gray-700 pb-2'>
              Order Summary
            </h2>
            <ul className='space-y-4 mb-6 max-h-80 overflow-y-auto pr-2'>
              {cart.map(item => (
                <li
                  key={item.id}
                  className='flex items-center justify-between space-x-3'
                >
                  <div className='flex items-center space-x-3 flex-1 min-w-0'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-12 h-12 object-contain rounded bg-white p-1 flex-shrink-0'
                    />
                    <div className='min-w-0'>
                      <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                        {item.title}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className='text-sm font-medium text-gray-900 dark:text-white flex-shrink-0'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className='border-t dark:border-gray-700 pt-4 space-y-2'>
              <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400'>
                <span>Subtotal</span>
                <span>${cartTotalPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400'>
                <span>Shipping</span>
                <span>
                  $0.00 <span className='text-xs'>(Demo)</span>
                </span>
              </div>
              <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400'>
                <span>Taxes</span>
                <span>
                  $0.00 <span className='text-xs'>(Demo)</span>
                </span>
              </div>
              <div className='flex justify-between text-lg font-bold text-gray-900 dark:text-white border-t dark:border-gray-700 pt-2 mt-2'>
                <span>Total</span>
                <span>${cartTotalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
