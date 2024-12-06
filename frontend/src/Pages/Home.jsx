import React from 'react'
import Hero from '../Components/Hero'
import LatestCollections from '../Components/LatestCollections'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero />
      <OurPolicy />
      <LatestCollections />
      <BestSeller />
      <NewsLetter />
    </div>
  )
}

export default Home
