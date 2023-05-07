import React from 'react';
import { ImQuotesRight } from 'react-icons/im';
import { customer } from '../../assets/data/data';
import { Heading } from '../../common/Heading';

export const Testimonial = () => {
  return (
    <>
      <section className="customer">
        <Heading title="Testimonials" desc="What our clients are saying" />

        <div className="content">
          {customer.map((items) => (
            <div className="card" key={items.id}>
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
  );
};
