import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main } from './Main/Main'
import { About } from './About'
import { Cart } from './Cart'
import { Catalog } from './Catalog'
import { Contacts } from './Contacts'
import { Product } from './Product'

export const Routing = () => {
  return (
    <Routes>
        <Route path='' element={<Main/>}/>
        <Route path='catalog' element={<Catalog/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contacts' element={<Contacts/>}/>
        <Route path='catalog/:id' element={<Product/>}/>
        <Route path='cart' element={<Cart/>}/>
    </Routes>
  )
}
