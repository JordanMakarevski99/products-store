import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem'
import { CartContext } from '../contexts/CartContext'

function Cart () {
  const {
    cart,
    isCartOpen,
    closeCart,
    cartTotalPrice,
    removeFromCart,
    updateQuantity,
    cartItemCount
  } = useContext(CartContext)

  const navigate = useNavigate()

  if (!isCartOpen) return null

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  const totalItems = cartItemCount

  return (
    <div
      className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-end items-start transition-opacity duration-300 ease-in-out'
      onClick={closeCart}
    >
      <div
        className='bg-gray-800 text-white shadow-xl w-full max-w-md h-full flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0'
        onClick={e => e.stopPropagation()}
        style={{ transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className='flex justify-between items-center p-5 border-b border-gray-700 flex-shrink-0'>
          <h2 className='text-xl font-semibold'>Your Cart ({totalItems})</h2>
          <button
            onClick={closeCart}
            className='text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700'
            aria-label='Close cart'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div className='flex-grow p-5 overflow-y-auto'>
          {cart.length === 0 ? (
            <div className='text-center text-gray-400 py-10 flex flex-col items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 text-gray-600 mb-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <p>Your cart is empty.</p>
              <p className='text-sm mt-1'>Add some products to get started!</p>
            </div>
          ) : (
            <ul className='space-y-4'>
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className='p-5 border-t border-gray-700 bg-gray-850 flex-shrink-0'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-lg font-medium text-gray-300'>
                Subtotal:
              </span>
              <span className='text-xl font-bold text-white'>
                $
                {cartTotalPrice !== undefined
                  ? cartTotalPrice.toFixed(2)
                  : cart
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
