import React from 'react'

function ProductCard ({ product, onAddToCart }) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl group'>
      <div className='relative overflow-hidden h-56 p-4 bg-white'>
        <img
          src={product.image}
          alt={product.title}
          className='object-contain w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110'
        />
      </div>
      <div className='p-5 flex flex-col flex-grow'>
        <p className='text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mb-1'>
          {product.category}
        </p>
        <h3
          className='text-lg font-bold text-gray-800 dark:text-white mb-2 h-14 overflow-hidden text-ellipsis line-clamp-2'
          title={product.title}
        >
          {product.title}
        </h3>
        <div className='mt-auto flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700'>
          <p className='text-xl font-extrabold text-gray-900 dark:text-white'>
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className='bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
          >
            Add <span className='sr-only'>{product.title}</span> to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
