import React from 'react'

function CartItem ({ item, onRemove, onUpdateQuantity }) {
  const handleQuantityChange = e => {
    const newQuantity = parseInt(e.target.value, 10)
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      if (newQuantity === 0) {
        onRemove(item.id)
      } else {
        onUpdateQuantity(item.id, newQuantity)
      }
    }
  }

  const increment = () => onUpdateQuantity(item.id, item.quantity + 1)
  const decrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    } else {
      onRemove(item.id)
    }
  }

  return (
    <li className='flex items-center space-x-4 py-3'>
      <img
        src={item.image}
        alt={item.title}
        className='w-20 h-20 object-contain rounded bg-white p-1 flex-shrink-0'
      />
      <div className='flex-1 min-w-0'>
        <p
          className='text-sm font-medium text-white truncate mb-1'
          title={item.title}
        >
          {item.title}
        </p>
        <p className='text-xs text-gray-400'>${item.price.toFixed(2)} each</p>
        <div className='flex items-center space-x-2 mt-2'>
          <button
            onClick={decrement}
            className='p-1 rounded bg-gray-600 hover:bg-gray-500 text-white text-xs leading-none w-6 h-6 flex items-center justify-center disabled:opacity-50'
            aria-label='Decrease quantity'
          >
            -
          </button>
          <input
            type='number'
            min='1'
            value={item.quantity}
            onChange={handleQuantityChange}
            className='w-10 text-center bg-gray-700 border border-gray-600 rounded text-white text-sm py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            aria-label={`Quantity for ${item.title}`}
          />
          <button
            onClick={increment}
            className='p-1 rounded bg-gray-600 hover:bg-gray-500 text-white text-xs leading-none w-6 h-6 flex items-center justify-center'
            aria-label='Increase quantity'
          >
            +
          </button>
        </div>
      </div>
      <div className='text-right flex flex-col items-end space-y-2'>
        <p className='text-base font-semibold text-white w-20'>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className='text-red-500 hover:text-red-400 transition-colors text-xs hover:underline'
          title='Remove item'
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
