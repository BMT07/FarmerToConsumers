import React from "react"
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { AiOutlineHeart } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { ADD } from "../../../controller/action"

// all copy past from productItem page

export const SearchItems = ({ products, value, onSearch }) => {
  const dispatch = useDispatch()
  const addToCart = (e) => {
    dispatch(ADD(e))
  }

  return (
    <>
      <section className='searchItems'>
        <div className='product_items'>
          {products
            ?.filter((items) => {
              const searchkey = value.toLowerCase()
              const title = items.name.toLowerCase()

              return searchkey && title.startsWith(searchkey) && title !== searchkey
            })
            ?.slice(0, 10)
            ?.map((items) => (
              <div className='box' onClick={() => onSearch(items.name)} key={items.id}>
                <div className='img'>
                  <img src={items.image} alt='' />
                  <div className='overlay'>
                    <button className='button' onClick={() => addToCart(items)}>
                      <FiShoppingBag />
                    </button>
                    <button className='button'>
                      <FiSearch />
                    </button>
                  </div>
                </div>
                <div className='details'>
                  <h3>{items.name}</h3>
                  <p>{items.farmer}</p>
                  <h4>${items.price}</h4>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  )
}
