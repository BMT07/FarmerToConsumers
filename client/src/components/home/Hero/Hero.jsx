import React, { useEffect, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"
// import { products } from "../../assets/data/data"
import { SearchItems } from "./SearchItems"
import { useSelector } from "react-redux";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export const Hero = () => {
  const products=useSelector(state=>state.productReducer.Product);

  // search
  const [value, setValue] = useState("")
  const onChanage = (e) => {
    setValue(e.target.value)
  }

  const onSearch = (key) => {
    setValue(key)
    console.log("search", key)
  }
  const titleRef = useRef()

  const slideInTop = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        y: -200,
      },
      {
        opacity: 1,
        y: 0,
        delay: delay || 0.4,
        duration: duration || 0.6,
        scrollTrigger: {
          trigger: elem,
          start: "top center",
          end: "bottom center"
        }
      }
    )
  }
  const onLoad = () => {
    gsap.timeline({
      onComplete: function () {
        console.log('animation terminée')
      }
    })
      .fromTo(".letter",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.33,
        delay: 0.5
      }      
    )
    .to(".title", {
      y: 45,
      delay: 0.5
    })
    .to(".letter", {
      margin: "0 5vw",
      delay: 0.5,
      duration: 0.5
    })
    .to(".letter", {
      margin: "0",
      delay: 0.8,
      duration: 0.5
    })
    .to(".letter", {
      x: -titleRef.current.clientWidth,
      delay: 1,
      duration: 1,
      rotate: -360
    })
    .to(window, {      
      duration: 0.5,
      scrollTo: "#nextSection"
    })
    .to("#nextSection", {      
      backgroundColor: "#000",
      color: "#fff",
      duration: 0.2
    })
    .to(".title", {
      y: 0,
      delay:-3
    })
    .to(".letter", {
      x: 0,
      delay: 1,
      duration: 2
    })
  }
  useEffect(() => {
    onLoad();
  }, [])
  useEffect(()=>{
    slideInTop("#box0");
  },[])
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <h1 className="title" ref={titleRef}>
            <label>
            From 
            <span className="letter">Farm</span>
              to 
            <span className="letter">Table</span> 
            </label>
            <br />
            <label>
            Support Local Farmers, Taste the Difference       </label>
          </h1>
          <p className="title" ref={titleRef}>Connecting you to the freshest, healthiest, and most delicious food from local farmers.</p>
          <div className='search' id="box0">
            <span>All Products</span>
            <hr />
            <input  type='text' placeholder='Search Products...' onChange={onChanage} value={value} />
            <button onClick={() => onSearch(value)}>
              <BiSearch className='serachIcon heIcon' />
            </button>
          </div>
          <SearchItems products={products} value={value} onSearch={onSearch} />
          <p>Examples: Vegetables, Fruits, Meat...</p>
        </div>
      </section>
    </>
  )
}