import React, { useEffect, useState } from "react"
import { ImQuotesRight } from "react-icons/im"
import { Heading } from "../../common/Heading"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import axios from "axios"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)


export const Testimonial = () => {

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
        delay: delay || 0.8,
        duration: duration || 0.6,
        scrollTrigger: {
          trigger: elem,
          start: "top center",
          end: "bottom center"
        }
      }
    )
  }   
  const[customer, setBlog]=useState([])
  const getBlogs = async () => {
    const blogs = await axios.get("http://localhost:8080/FarmerToConsumer/getBlogs")
        .then((res) => {return setBlog(res.data)
        })
        .catch((err) => console.log(err))
}
useEffect(()=>{
  slideInTop("#box2");
},[])
  useEffect(()=>{
    console.log(customer)
    getBlogs()
  },[])
  return (
    <>
      <section  className='customer'>
        <Heading title='LATEST BLOG POSTS ' desc='Latest marketplace news, success stories and tutorials.' />

        <div id="box2" className='content'>
          {customer.slice(0,3).map((items) => (
            <div  className='card' key={items.id}>
              <button>
                <ImQuotesRight />
              </button>
              <p> "{items.description}"</p>
              <h3>{items.Name}</h3>
              <span>{items.CompanyName}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
