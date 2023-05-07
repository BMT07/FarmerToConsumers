import React from 'react';
import { Banner } from './banner/Banner';
import { Blog } from './blog/Blog';
import { Card } from './Hero/Card';
import { Hero } from './Hero/Hero';
import { Price } from './price/Price';
import { Testimonial } from './testimonial/Testimonial';
import { TopProduct } from './top/TopProduct';
import { Product } from './product/Product';
import Newsletter from './newsletter/Newsletter';
import CropRec from '../compte/cropRecommendation/CropRec';

export const Home = () => {
  return (
    <>
      <Hero />
      <Card />
      <TopProduct />
      <CropRec />
      {/* <Price /> */}
      <Testimonial />
      <Newsletter />
    </>
  );
};
