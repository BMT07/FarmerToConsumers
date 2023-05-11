import React, { useEffect, useState } from "react"
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ADD } from "../../../controller/action"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios"
import { useHistory } from "react-router-dom"

export const ProductItems = ({ Like, cartItems, unLike }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
    name: auth.user.name,
    idUser: auth.user.id
  };
  const addToCart = (e) => {
    dispatch(ADD(e))
  }
  const lk = (id) => {
    Like(id);
  };
  const unlike = (id) => {
    unLike(id)
  }
  const [openImage, setOpenImage] = useState(false)
  const [img, setImg] = useState("")
  const onOpenImage = (src) => {
    setImg(src)
    setOpenImage(true)
  }

  const createChat = async (userI, productI) => {
    console.log("voici user connected:", auth.user.id);
    console.log("voici userI:", userI);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem('jwt')}`
        }
      };

      if (userI != auth.user.id) {
        await axios.post(`http://localhost:8080/api/chat`, {
          userId: userI,
          productId: productI
        },
          config
        );
        history.push('/chat');
      }
      else {
        history.push('/chat');

      }



    } catch (error) {
      console.log(error.message)
    }


  }
  return (
    <>
      <div className='product_items'>
        {cartItems.map((items, index) => (
          <div className='box' key={index}>
            <div className='img'>
              <img src={items.image} alt='' />
              <div className='overlay'>
                <button className='button' onClick={() => addToCart(items)}>
                  <FiShoppingBag />
                </button>
                <button className="button" onClick={() => createChat(items.user, items._id)}>
                  <ChatIcon />
                </button>
                {
                  (user.isConnected && user.role === "RESTAURANT") ? (
                    <>
                      {
                        items.likes.includes(user.idUser) ? (
                          <button className='button' onClick={() => unlike(items._id)}>
                            <FavoriteIcon />
                          </button>
                        ) : (
                          <button className='button' onClick={() => lk(items._id)} >
                            <FavoriteBorderIcon />
                          </button>
                        )
                      }
                    </>
                  ) : ""
                }

                <button className='button' onClick={() => onOpenImage(items.image)}>
                  <FiSearch />
                </button>
              </div>
            </div>
            <div className='details'>
              <h4>{items.name}</h4>
              <p>{items.farmer}</p>
              <h6>{items.price}DT</h6>
              <h6><FavoriteIcon />{items.likes.length} likes </h6>
            </div>
          </div>
        ))}
      </div>

      <div className={openImage ? "modelOpen" : "modelClose"}>
        <div className='onClickImage'>
          <img src={img} alt='' />
          <button className='button' onClick={() => setOpenImage(false)}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </>
  )
}
