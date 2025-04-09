import React, { useState, useEffect, useMemo, useContext } from 'react'
import ProductList from '../components/ProductList'
import Pagination from '../components/Pagination'
import { CartContext } from '../contexts/CartContext'

const ITEMS_PER_PAGE = 8

function HomePage () {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      setCurrentPage(1)
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setAllProducts(data)
      } catch (e) {
        console.error('Failed to fetch products:', e)
        setError(e.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts]
    if (searchTerm) {
      products = products.filter(
        product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'title-asc':
        products.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-desc':
        products.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        products.sort((a, b) => a.id - b.id)
        break
    }
    return products
  }, [allProducts, searchTerm, sortOption])

  const totalItems = filteredAndSortedProducts.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
      const adjustedStartIndex = (totalPages - 1) * ITEMS_PER_PAGE
      return filteredAndSortedProducts.slice(
        adjustedStartIndex,
        adjustedStartIndex + ITEMS_PER_PAGE
      )
    }
    if (currentPage < 1 && totalPages > 0) {
      setCurrentPage(1)
      return filteredAndSortedProducts.slice(0, ITEMS_PER_PAGE)
    }
    return filteredAndSortedProducts.slice(startIndex, endIndex)
  }, [filteredAndSortedProducts, currentPage, totalPages])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleSortChange = event => {
    setSortOption(event.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='mb-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
        <div className='relative w-full sm:w-auto flex-grow max-w-xs'>
          <input
            type='text'
            placeholder='Search products...'
            value={searchTerm}
            onChange={handleSearchChange}
            className='w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
          <svg
            className='w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <div className='relative w-full sm:w-auto'>
          <label htmlFor='sort-options' className='sr-only'>
            Sort by:
          </label>
          <select
            id='sort-options'
            value={sortOption}
            onChange={handleSortChange}
            className='appearance-none w-full sm:w-48 px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value='default'>Default Sort</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='title-asc'>Name: A to Z</option>
            <option value='title-desc'>Name: Z to A</option>
          </select>
          <svg
            className='w-5 h-5 text-gray-400 dark:text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 9l4-4 4 4m0 6l-4 4-4-4'
            />
          </svg>
        </div>
      </div>

      <ProductList
        products={paginatedProducts}
        loading={loading}
        error={error}
        onAddToCart={addToCart}
      />

      {!loading && !error && totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default HomePage
