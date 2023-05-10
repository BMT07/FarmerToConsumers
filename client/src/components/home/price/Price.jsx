import React from "react"
import { price } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { Link, useHistory } from 'react-router-dom';
export const Price = () => {
  const history = useHistory();
  return (
    <>
      <section className='price'>
        <Heading title='Meet our Plans' desc='The latest offers have just been uploaded to the marketplace, and you can win gifts by checking them out !' />

        <div className='content'>
          {price.map((item) => (
            <div className='box' key={item.id}>
              <h3>{item.name}</h3>
              <h1>
                <span>$</span>
                {item.price}
              </h1>
              <p>{item.desc}</p>
              <button className='button' onClick={()=>history.push("/shop")}>GET STATRED</button>

              <ul>
                {item.list.map((lists,index) => (
                  <li key={index}>
                    <i>{lists.icon}</i>
                    <span>{lists.para}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}