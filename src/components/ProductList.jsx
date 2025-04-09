import React from 'react'
import ProductCard from './ProductCard'

function ProductList ({ products, loading, error, onAddToCart }) {
  if (loading) {
    return (
      <div className='text-center py-16'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto'></div>
        <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>
          Loading Products...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <p className='text-center text-red-600 dark:text-red-400 text-xl py-10 bg-red-100 dark:bg-red-900/20 rounded-md p-4'>
        Error: {error}
      </p>
    )
  }

  if (!products || products.length === 0) {
    return (
      <p className='text-center text-gray-500 dark:text-gray-400 text-xl py-10'>
        No products found matching your criteria.
      </p>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8'>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList
