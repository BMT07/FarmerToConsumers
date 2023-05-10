import React, { useEffect } from "react"
import { ImQuotesRight } from "react-icons/im"
import { customer } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
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
  useEffect(()=>{
    slideInTop("#box2");
  },[])
  return (
    <>
      <section  className='customer'>
        <Heading title='Choose The Plans' desc='Meet our newbies! The latest templates uploaded to the marketplace.' />

        <div className='content'>
          {customer.map((items) => (
            <div id="box2" className='card' key={items.id}>
              <button>
                <ImQuotesRight />
              </button>
              <p> "{items.desc}"</p>
              <h3>{items.name}</h3>
              <span>{items.post}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
