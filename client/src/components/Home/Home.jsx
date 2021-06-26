import React, { useEffect } from 'react'
import Content from './Content'

import Header from './Header'
import {
    useLocation
  } from "react-router-dom";

function Home() {


    function useQuery() {
        return new URLSearchParams(useLocation().search);

      } 
      
      let query = useQuery();
      let token1 = (query.get('jwt'))
     let token= `"${(query.get('jwt'))}"`;
    useEffect(() => {

               if(token1 != null){
                const exist = token == localStorage.getItem('userInfo')
                if(exist){
                    window.location.replace('http://localhost:3000/products')
                }else{
                localStorage.setItem('userInfo', token)
                window.location.replace('http://localhost:3000/products')}
                }
            }
, [])  
    
// else{
//     localStorage.setItem('userInfo', token)
// window.location.replace('http://localhost:3000')}

    return (
        <>
            <Header />
            <Content />
           
        </>
    )
}

export default Home
