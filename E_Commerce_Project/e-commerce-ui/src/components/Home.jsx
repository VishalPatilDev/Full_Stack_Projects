import React, { useContext } from 'react'
import Card from './Card'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { GlobalContext } from './ContextApi'


const Home = () => {
  // const [products, setProducts] = useState([])
  const { products, setProducts, fetchData } = useContext(GlobalContext);
  useEffect(() => {
    fetchData();
  }, [])


  return (<>
    <div className='   '>
      <div className='flex flex-wrap gap-4 p-10 '>
        {products.map((elem, idx) => (
          <Card key={idx} id={elem.id} productName={elem.productName} productDescription={elem.productDescription} productPrice={elem.productPrice} productImage={elem.productImage} setProducts={setProducts}></Card>
        ))}
      </div>
    </div>
  </>
  )


}

export default Home
