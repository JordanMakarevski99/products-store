import React, {
  createContext,
  useReducer,
  useState,
  useMemo,
  useCallback
} from 'react'

export const CartContext = createContext()

function cartReducer (state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id
      )
      if (existingItemIndex > -1) {
        const newState = [...state]
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          quantity: newState[existingItemIndex].quantity + 1
        }
        return newState
      } else {
        return [...state, { ...action.payload, quantity: 1 }]
      }
    }
    case 'REMOVE_ITEM': {
      return state.filter(item => item.id !== action.payload.id)
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.id !== action.payload.id)
      }
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    }
    case 'CLEAR_CART': {
      return []
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback(product => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }, [])

  const removeFromCart = useCallback(productId => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: productId } })
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
    setIsCartOpen(false)
  }, [])

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )
  const cartTotalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartItemCount,
      cartTotalPrice,
      isCartOpen,
      toggleCart,
      closeCart
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartItemCount,
      cartTotalPrice,
      isCartOpen,
      toggleCart,
      closeCart
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
