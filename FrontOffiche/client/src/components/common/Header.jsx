import React, { useState } from "react"
import logo from "../assets/images/logo.png"

import cartimg from "../assets/images/cart.png"
import { BiSearch } from "react-icons/bi"
import { BsBagCheck } from "react-icons/bs"
import { RiUser3Line } from "react-icons/ri"
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import { navlist } from "../assets/data/data"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { DELETE } from "../../controller/action"
import { useEffect } from "react"
import { Badge, Button, Typography, styled } from "@mui/material"

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 9,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



export const Header = ({user,name}) => {
  // navbar
  const [mobile, setMobile] = useState(false)
  // cartopen and close
  const [cartList, setCartList] = useState(false)
  // scroll navbar
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })
  // useEffect(() => {
  //   console.log(user)
  //   console.log(name)
  // }, [])
  // cart add in shop
  const getdata = useSelector((state) => state.cartReducer.carts)
  //console.log(getdata)

  // delete cart
  const dispatch = useDispatch()
  const delet = (id) => {
    dispatch(DELETE(id))
  }

  const history=useHistory()
  // total prcie
  const [price, setPrice] = useState(0)
  console.log(price)

      const totals = () => {
        let price = 0
        getdata.map((e, i) => {
          price = parseFloat(e.price) * e.quantity + price
        })
        setPrice(price)
      }

  useEffect(() => {
    totals()
  }, [totals])

  const handleCloses = () => {
    setCartList(null)
  }
  return (
    <>
      <header className='header'>
        <div className='container'>
          <nav>
            <div className='toggle'>
              <button onClick={() => setMobile(!mobile)}>{mobile ? <AiOutlineClose className='close heIcon' /> : <AiOutlineMenu className='open heIcon' />}</button>
            </div>
            
        <Link to='/' >
                 <Typography
                component="img"
                src={logo}                
                alt="Live from space album cover"
                sx={{
                  width:{xs:0,md:100}, height: 60,
                   marginLeft: { xs:-11, sm: 0, md: 5 },
                   
                }}
                 />

              </Link>
             
            
            <div className='center'>
              <ul className={mobile ? "mobile-nav" : "menu"}>
                {navlist.map((nav, i) => (
                  <li key={i}>
                    <Link to={nav.path}>{nav.text}</Link>
                  </li>
                ))}
              </ul>
              
            </div>
          </nav>
        
            <div className='right'>
            
                  <div className='right_search'>
              <input type='text' placeholder='Search Products...' />
              <BiSearch className='serachIcon heIcon' />
            </div>
            <div className='right_card'>
              <div style={{display:"flex",alignItems:"center"}}>
              
            <div style={{'marginRight':'10px','marginLeft':'20px','fontSize':'13px',marginBottom:"16px"}}>
              <Link to={'/profile'} style={{display:"flex",alignItems:"center"}}>
              <RiUser3Line className='userIcon heIcon' />
               <div style={{marginTop:'12px'}}>
               {name}
               </div>
              </Link>
              {/* <AiOutlineHeart className='userIcon heIcon' /> */}
            </div>
            {user !== 'FARMER' ? (
              <StyledBadge badgeContent={getdata.length} color="warning">
              <button className='button' onClick={() => setCartList(!cartList)}>
                <BsBagCheck className='shop heIcon' />
                MY CART
              </button>
                </StyledBadge>):
                <Link to="/farmer" color="text.primary" > 
                <button className="button">I'am a farmer</button>
                
              </Link>
                }
            </div>

              <div className={cartList ? "showCart" : "hideCart"}>
                {getdata.length ? (
                  <section className='details'>
                    <div className='details_title'>
                      <h3>Photo</h3>
                      <p>Product Name</p>
                    </div>
                    {getdata.map((e) => (
                      <div className='details_content' key={e._id}>
                        <div className='details_content_img'>
                          <Link to={`/cart/${e._id}`} onClick={handleCloses}>
                            <img src={e.image} alt='' />
                          </Link>
                        </div>
                        <div className='details_content_detail'>
                          <div className='details_content_detail_price'>
                            <p>{e.name.slice(0,6)}...</p>
                            <p>Price : {e.price} Dt</p>
                            <p>Quantity : {e.quantity}</p>
                          </div>
                        </div>
                        <div className='details_content_detail_icon'>
                          <i onClick={() => delet(e._id)}>
                            <AiOutlineDelete />
                          </i>
                        </div>
                      </div>
                    ))}
                    <div className='details_total'>
                      <h4>Total : {price} Dt</h4>
                    </div>
                    <Button onClick={()=>{history.push('/cartEdit');handleCloses()}} sx={{paddingLeft:15}} color="success">View and edit cart</Button>
                  </section>
                ) : (
                  <div className='empty'>
                    <p>Your cart is empty</p>
                    <img src={cartimg} alt='' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    amount: state.amount,
  }
}
connect(mapStateToProps)(Header)
