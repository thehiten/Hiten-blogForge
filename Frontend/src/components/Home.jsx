import React from 'react'
import Hero from "..//home/Hero";
import Trending from '../home/Trending';
import Creator from '../home/Creator';

function Home() {
  return (
   <>
   <div className='bg-grey-100'>
   <Hero></Hero>
   <Trending></Trending>
   <Creator></Creator>
   </div>
   </>
  )
}

export default Home