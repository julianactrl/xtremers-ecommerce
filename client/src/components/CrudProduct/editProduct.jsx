import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, getProductById } from '../../actions/productActions';
import { useForm } from "react-hook-form";


const EditProduct = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const id = props.id
  const initProduct = {
    name: "",
    description: "",
    price: "",
    stock: "",
    rating: null,
    img: '',
    size: null,
  };
  const [product, setProduct] = useState(initProduct)

  //-----------REDUX---------------
  const dispatch = useDispatch();
  const productId = useSelector(state => state.product)


  useEffect(() => {
    dispatch(getProductById(id));
  }, [])

  const onSubmit = async (product, e) => {
    e.preventDefault();

    var updates = {
      name: "",
      description: "",
      price: 0,
      stock: 0
    }

    for (const property in product) {
      if (!product[property]) {
        switch (property) {
          case 'name':
            updates.name = productId.product.name
            break;
          case 'description':
            updates.description = productId.product.description
            break;
          case 'price':
            updates.price = productId.product.price
            break;
          case 'stock':
            updates.stock = productId.product.stock
            break;
        }

      } else {
        switch (property) {
          case 'name':
            updates.name = product[property]
            break;
          case 'description':
            updates.description = product[property]
            break;
          case 'price':
            updates.price = product[property]
            break;
          case 'stock':
            updates.stock = product[property]
            break;
        }
      }

    }

    dispatch(editProduct(id, updates))
    //<Link to={`/products/paneladmin`} className="">
    
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProduct({ ...product, [name]: value })
  }



  return (

    <div >
      <div className="flex max-w-sm mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden lg:max-w-2xl mt-5 border-t-2" >

        <div className="w-full py-8 px-6 md:px-8 ">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">Edit</h2>

          <p className="text-xl text-gray-600 dark:text-gray-200 text-center">Product</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b dark:border-gray-600 w-1/5 lg:w-1/4"></span>

            <a href="#" className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase hover:underline">Edit the product</a>

            <span className="border-b dark:border-gray-400 w-1/5 lg:w-1/4"></span>
          </div>
          {/**FORMULARIO */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                for="cus_name">
                Name
                    </label>
              <input
                id="cus_name"
                name="name"
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                value={!product.name ? productId.product.name : product.name}
                onChange={handleInputChange}
                ref={register({
                  required: "Enter an name",
                  // pattern: {
                  //         value: /^\S+@\S+$/i,
                  //         message: "Entered value does not match email format"
                  // }
                })}
                onChange={handleInputChange}


              />
              <span class="block text-red-700 sm:inline">{errors?.name?.message}</span>
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                for="cus_description">
                Description
                    </label>
              <textarea
                id="cus_description"
                name="description"
                className="bg-white dark:bg-gray-800 h-200 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                value={!product.description ? productId.product.description : product.description}
                ref={register({
                  required: "Enter a product description"
                })
                }
                onChange={handleInputChange}

              />
              <span class="block text-red-700 sm:inline">{errors?.description?.message}</span>
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                for="cus_price">
                Price
                    </label>
              <input
                id="cus_price"
                name="price"
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                value={!product.price ? productId.product.price : product.price}
                ref={register({
                  required: "Enter the price of the product",
                  pattern: {
                    value: /^\d+$/,
                    message: "The value entered must be a number"
                  }
                })}
                onChange={handleInputChange}

              />
              <span class="block text-red-700 sm:inline">{errors?.price?.message}</span>
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                for="cus_stock">
                Stock
                    </label>
              <input
                id="cus_stock"
                name="stock"
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                value={!product.stock ? productId.product.stock : product.stock}
                ref={register({
                  required: "Enter the stock of the product",
                  pattern: {
                    value: /^\d+$/,
                    message: "The value entered must be a number"
                  }
                })}
                onChange={handleInputChange}

              />
              <span class="block text-red-700 sm:inline">{errors?.stock?.message}</span>
            </div>
            <div className="mt-8">
              

                <button
                  className="bg-gray-700 text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"

                >
                  Edit
                </button>
              
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
            <Link to={`/products/paneladmin`} className="">
              <a href="#" className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">Back to Panel</a>
            </Link>

            <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditProduct;
