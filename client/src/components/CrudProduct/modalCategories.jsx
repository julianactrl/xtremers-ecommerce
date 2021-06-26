import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './modalCategories.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../actions/crudCategoriesActions';
import { addCategoriesProduct, getProductById , removeCategoryProduct } from '../../actions/productActions'
import swal from 'sweetalert';



const ModalCategories = (props) => {
   
   const id= props.id;
   const dispatch = useDispatch();
   const getCategories = useSelector(state => state.categories)
   const product = useSelector(state => state.product.product)
   const {allCategories}=getCategories;
   
   console.log("Esto es product para sacrs categories", product)
   console.log("Esto es product categories", product.categories)

   useEffect(() =>{
    dispatch(getAllCategories());
    dispatch(getProductById(id));
  },[])
    const [categoriesSelect, setCategoriesSelect] =useState([])
    const [catSelectDelete, setCatSelectDelete] =useState([])
   
    const handleInputCheck = (event) => {
    const target = event.target;
    const  value  = event.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;
    const res = categoriesSelect.find(element => element === parseInt(value))
    

    if(categoriesSelect){
      
      if(!res){
        console.log("esto es value despues del primer click", value)
       return setCategoriesSelect([...categoriesSelect, parseInt(value)]) 
      }else{
        return setCategoriesSelect(categoriesSelect.filter(category=> category!==parseInt(value)))
      }
    }else{
        
        setCategoriesSelect( [...categoriesSelect, parseInt(value) ])
           
    }
    
    
       
  }

  const handleInputCheckDel  = (event) => {
    const target = event.target;
    const  value  = event.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;
    const res = catSelectDelete.find(element => element === parseInt(value))
    

    if(catSelectDelete){
      
      if(!res){
        console.log("esto es value despues del primer click", value)
       return setCatSelectDelete([...catSelectDelete, parseInt(value)]) 
      }else{
        return setCatSelectDelete(catSelectDelete.filter(category=> category!==parseInt(value)))
      }
    }else{
        
        setCatSelectDelete( [...catSelectDelete, parseInt(value) ])
           
    }
    
    
       
  }
  
  const addCategoriesDB = ()=>{
      categoriesSelect.map((category)=>{
          dispatch(addCategoriesProduct(id,category))
          swal('Categories added')
      }
      )
  }
  const deleteCategoriesDB = ()=>{
    catSelectDelete.map((category)=>{
        dispatch(removeCategoryProduct(id,category))
        swal('Categories deleted')
    }
    )
}

    return(
        <div className="w-full mx-auto max-w-3xl bg-white  text-gray-700 mt-10">
          
          <section class="inline-block min-w-full shadow rounded-lg overflow-hidden py-5">
                <h1 class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">DELETE CATEGORIES</h1>
                <form onSubmit={(e) => e.preventDefault}>
                    <div class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {product.categories && product.categories.map((category) => (
                        <label class="flex justify-start items-start mb-4">{category.name}
                        <input 
                        class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
                        type="checkbox"
                               name={category.id} 
                               value={category.id}
                               onClick={handleInputCheckDel}
                               />
                        </label>
                    ))
                }
                    </div>
                </form>
                <button onClick={deleteCategoriesDB} class="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight
                          hover:bg-yellow-100 hover:text-yellow-900 m-2">
                    <span
                    aria-hidden="true"
                    class="absolute inset-0 bg-purple-200 opacity-50 rounded-full"></span>
                    <span class="relative"><i class="fas fa-trash"></i></span>
                </button>
            </section>
            <section class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <h1 class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">ADD CATEGORIES</h1>
                <form onSubmit={(e) => e.preventDefault}>
                    <div class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    { allCategories.map((category,index) => (
                        <label class="flex justify-start items-start mb-4">{category.name}
                        <input 
                        class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
                        type="checkbox"
                               name={index} 
                               value={category.id}
                               onClick={handleInputCheck}
                               />
                        </label>
                    ))
                }
                    </div>
                </form>
                <button onClick={addCategoriesDB} class="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight
                          hover:bg-yellow-100 hover:text-yellow-900 m-2">
                    <span
                    aria-hidden="true"
                    class="absolute inset-0 bg-purple-200 opacity-50 rounded-full"></span>
                    <span class="relative"><i class="far fa-check-circle"></i></span>
                </button> 
                <Link to='/products/paneladmin' className="cerrarmodal">
                <button  class="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight
                hover:bg-yellow-100 hover:text-yellow-900 m-2">
                    <span
                    aria-hidden="true"
                    class="absolute inset-0 bg-purple-200 opacity-50 rounded-full"></span>
                    <span class="relative"><i class="far fa-times-circle"></i></span>
                </button>
                </Link>
            </section>
           

        </div>
    )
}

export default ModalCategories;
