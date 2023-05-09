import React, { useEffect, useState } from "react"
import { MdStarRate } from "react-icons/md"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, Link } from "react-router-dom"
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action"
import { Rating, Button } from "@mui/material"
import axios from "axios"
import { Alert } from "@mui/material"

export const Details = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  const [count, setCount] = useState(0)
  const [alert, setAlert] = useState('')
  const [bool, setBool] = useState(false)
  // console.log(id)

  const getdata = useSelector((state) => state.cartReducer.carts)
  //

  console.log(getdata)

  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e._id == id
    })
    setData(compareData)
  }

  useEffect(() => {
    compare()
  }, [id])



  const handleSubmit = () => {
    axios.put('http://localhost:8080/api/rating', {
      star: count,
      productId: id
    }, {
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    })
    compare()
    setBool(true)
    setAlert('Your rating is registered');
    setTimeout(() => {
      setAlert('')
      setBool(false)
    }, 2000)

  }

  // delete item
  const history = useHistory()
  const deletes = (id) => {
    dispatch(DELETE(id))
    history.push("/")
  }

  // increment item
  const dispatch = useDispatch()
  const increment = (e) => {
    dispatch(ADD(e))
  }

  // descriment item
  const decrement = (item) => {
    dispatch(REMOVE_INT(item))
  }
  return (
    <>
      <article>
        <section className='details'>
          <h2 className='details_title'>Product Details Pages</h2>
          {data.map((item) => (
            <div className='details_content'>
              <div className='details_content_img'>
                <img src={item.image} alt='' />
              </div>
              <div className='details_content_detail'>
                <h1>{item.name}</h1>
                <h3> ${item.price * item.quantity}</h3>
                <div className="d-flex">
                  <Rating name="half-rating" defaultValue={item.totalrating} precision={0.5} onChange={(e) => setCount(e.target.value)} />
                  <Button onClick={handleSubmit} style={{ backgroundColor: "#4CAF50", border: "none", color: "white", padding: "5px 10px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", margin: "2px 4px", cursor: "pointer", borderRadius: "5px" }}> Rate</Button>
                  {bool && <Alert>{alert}</Alert>}
                </div>
                <p>{item.farmer}</p>
                <div className='qty'>
                  <div className='count'>
                    <button onClick={() => increment(item)}>
                      <AiOutlinePlus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={item.quantity <= 1 ? () => deletes(item._id) : () => decrement(item)}>
                      <AiOutlineMinus />
                    </button>
                  </div>
                  <Link to={'/checkout'}>
                    <button className='button'>Add To Cart</button>
                  </Link>
                </div>
                <div className="mt-4" style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f8f8f8' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>PRODUCT DETAILS</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>quantity:{item.quantity}</li>
                    <li style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>ProductionDate:{item.productionDate}</li>
                    <li style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Category:{item.category}</li>
                    <li style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Organic?:{item.organic ? "Yes" : "No"}</li>
                  </ul>
                </div>


              </div>
            </div>
          ))}
        </section>
      </article>
    </>
  )
}
