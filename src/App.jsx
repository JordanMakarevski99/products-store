import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Cart from './components/Cart'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import { CartContext } from './contexts/CartContext'

function App () {
  const { cartItemCount, toggleCart } = useContext(CartContext)

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
      <Header cartItemCount={cartItemCount} onCartClick={toggleCart} />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Cart />
    </div>
  )
}

function NotFoundPage () {
  return (
    <div className='container mx-auto px-4 py-16 text-center'>
      <h1 className='text-4xl font-bold text-red-600 dark:text-red-400 mb-4'>
        404 - Not Found
      </h1>
      <p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to='/'
        className='text-indigo-600 dark:text-indigo-400 hover:underline'
      >
        ← Go back to Home
      </Link>
    </div>
  )
}

export default App
