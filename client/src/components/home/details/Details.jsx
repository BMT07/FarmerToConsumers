import React, { useEffect, useState } from "react"
import { MdStarRate } from "react-icons/md"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, Link } from "react-router-dom"
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action"
import { Rating, Button, ListItem } from "@mui/material"
import axios from "axios"
import { Alert } from "@mui/material"

export const Details = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  const [alert, setAlert] = useState('')
  const [bool, setBool] = useState(false)
  const [cartData, setCartData] = useState([])
  // console.log(id)

  const getdata = useSelector((state) => state.cartReducer.carts)
  //
  const getProducts = async () => {
    const datas = await axios.get(`http://localhost:8080/FarmerToConsumer/getProducts/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('jwt')}`
      }
    })
    setData(datas.data)

  }

  useEffect(() => {
    getProducts()
  }, [])





  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e._id == id
    })
    setCartData(compareData)
  }
  console.log(data)
  useEffect(() => {
    compare()
  }, [id])
  console.log("bakary", cartData)

  const handleSubmit = () => {
    axios.put('http://localhost:8080/api/rating', {
      star: data.totalrating,
      productId: id
    }, {
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    }).then((result) => {
      // const newData = data.map(item => {
      //   if (item._id === result.data._id) {
      //     return result.data
      //   } else {
      //     return item
      //   }
      // })
      // setData(newData)
      // console.log("voici new data:", newData)
      getProducts()
    })
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
          {cartData.map((item) => (
            <div className='details_content'>
              <div className='details_content_img'>
                <img src={data.image} alt='' />
              </div>
              <div className='details_content_detail'>
                <h1>{data.name}</h1>
                <h3> ${item.price * item.quantity}</h3>
                <p>{item.farmer}</p>
                <Rating
                  name="simple-controlled"
                  value={parseInt(data.totalrating)}
                  onChange={(event, newValue) => {
                    setData({ ...data, totalrating: newValue });
                  }}
                /><Button onClick={handleSubmit} size="small" variant="outlined" color="secondary" style={{ marginBottom:'15px',marginLeft:'10px'  }}> Rate</Button>
                {bool && <Alert>{alert}</Alert>}
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
                </div>
                <div className="mt-4" style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f8f8f8' }}>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>PRODUCT DETAILS</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <div className="d-flex">

                    </div>
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