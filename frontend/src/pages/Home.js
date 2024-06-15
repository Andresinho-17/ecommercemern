import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"Promocion"} heading={"Promocion"}/>
      <HorizontalCardProduct category={"Hombre"} heading={"Populares Hombres"}/>

      <VerticalCardProduct category={"Infantil"} heading={"Infantiles"}/>
    </div>
  )
}

export default Home