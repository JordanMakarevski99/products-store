import React from 'react'
import { Link } from 'react-router-dom'

const CartIcon = () => (
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
      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
    />
  </svg>
)

function Header ({ cartItemCount, onCartClick }) {
  return (
    <header className='bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30 w-full'>
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
        <Link
          to='/'
          className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400'
        >
          React Storefront
        </Link>
        <button
          onClick={onCartClick}
          className='relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
          aria-label={`View cart with ${cartItemCount} items`}
        >
          <CartIcon />
          {cartItemCount > 0 && (
            <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-white dark:ring-gray-800'>
              {cartItemCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}

export default Header
