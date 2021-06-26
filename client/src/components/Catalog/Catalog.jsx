import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard.jsx';
import Message from '../Message/Message';
import Loaders from '../Loader/Loader';
import { listProducts } from '../../actions/productActions';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Pagination from "../Pagination/Pagination.jsx";

import Footer from '../Home/Footer'
//Redux

const Catalog = (props) => {

  // const keyword = match.params.keyword
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const searchBar = useSelector(state => state.searchBar)
  const { keyword, categoryName } = searchBar



  const { loading, error, products } = productList
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(products)


  const miSuperFiltro = () => {
    setFilteredProducts(products.filter(product => {

      const exist = product.categories.find(category => category.name === categoryName)
      if (exist)
        return true;
    }))

  }


  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [])

  useEffect(() => {
   
  }, [filteredProducts])



  useEffect(() => {
    mifiltro()
  }, [keyword])

  useEffect(() => {
    miSuperFiltro()
  }, [categoryName])

  const mifiltro = () => {
    if (keyword) {
      if (keyword === "") {
        setFilteredProducts(products)
      } else {
        setFilteredProducts(products.filter(product => {
          return product.name.toLowerCase().includes(keyword.toLowerCase())
        }))
      }
    } else {
      setFilteredProducts(products)
    }
  }

 //---Pagination----
 const [ currentPage, setCurrentPage ] = useState(1); // pagina mostrando actualmente
 const [ prodPerPage ] = useState(4); // cant de prod por pag
 console.log('prodPerPage----', prodPerPage)

 
//---Get current Prod----
//     55                       11        5
const indexOfLastProd = currentPage * prodPerPage;  // índice primer prod de la pag
const indexOfFirstProd = indexOfLastProd - prodPerPage; // índice último prod de la pag
const array = productList;


const arrayProd = productList.products;



//---Change Page----
const paginate = (pageNumbers) => setCurrentPage(pageNumbers)




  return (
    <>
    
    
      <section className="container mx-auto flex flex-wrap pt-4 pb-12 justify-center">
        {loading ? <Loaders /> : error ? <Message>{error}</Message> : <div className="row-span-3">
          <div className=''>
            {
              // products.map((product, i) =>
              filteredProducts && filteredProducts.slice(indexOfFirstProd, indexOfLastProd).map((product, i) =>
                <ProductCard className="productCard"
                  name={product.name}
                  image={product.thumbnail}
                  price={product.price}
                  id={product.id}
                  idCategory={product.category}
                  key={i}
                />
              )

            }
          </div>
          <div className='block w-full justify-center'>
           
             <Pagination prodPerPage={prodPerPage} totalProd={filteredProducts && filteredProducts.length} paginate={paginate} />
          
          </div>
        </div>}


        
      </section>
      
    
    <Footer />
    </>
  );
};

export default Catalog