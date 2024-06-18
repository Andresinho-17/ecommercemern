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

      <HorizontalCardProduct category={"Mujer"} heading={"Mujer"}/>
      <HorizontalCardProduct category={"Hombre"} heading={"Populares Hombres"}/>
      <HorizontalCardProduct category={"Promocion"} heading={"Ofertas"}/>

      <VerticalCardProduct category={"Infantil"} heading={"Infantiles"}/>
      <VerticalCardProduct category={"Temporada"} heading={"Temporada"}/>
    </div>
  )
}

export default Home