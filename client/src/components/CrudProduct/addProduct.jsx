import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/productActions';
import swal from 'sweetalert';

const AddedProduct = () => {

    const initProduct = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        rating: 0,
        img: '',
        size: 0,
    };
    const [product, setProduct] = useState(initProduct)
    const [fileUpload, setFileUpload] = useState(null)
    const nuevoProducto = useSelector((state) => state.newProduct);
    let pathProduct = '/images/product_image/';
    let pathCard = '/images/card_image/';

    // Form validation
    const { register, errors, watch, handleSubmit } = useForm();

    const onSubmit = data => console.log(data);

    useEffect(() => {

    }, [nuevoProducto]);


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProduct({ ...product, [name]: value })

    }
    //------REDUX-------
    const dispatch = useDispatch();


    const addProductDb = (e) => {

        e.preventDefault();

        const formData = new FormData()
        formData.append('image', fileUpload)


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const productSend = {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            size: product.size,
            formData: formData,
            config: config,
            pathProduct: pathProduct,
            pathCard: pathCard,
            nameImage: fileUpload.name

        }

        dispatch(addProduct(productSend));
        swal("Successfully created product");
    }



    return (
        <div onSubmit={handleSubmit(onSubmit)}>
            <div className="flex max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-md-lg shadow-lg overflow-hidden lg:max-w-2xl mt-5 border-t-2" >

                <div className="w-full py-8 px-6 md:px-8 ">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">Add product</h2>

                    {/**FORMULARIO */}
                    <form onSubmit={addProductDb}>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="cus_name">
                                Product Name
                            </label>
                            <input
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"

                                type="text"
                                id="cus_name"
                                name="name"
                                placeholder="Product Name"
                                aria-label="Name"
                                value={product.name}
                                onChange={handleInputChange}
                                ref={watch({ required: true, max: 8 })}
                            />
                            <span class="block text-red-700 sm:inline">{errors.name && "Name is required"}</span>
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
                                type="text"
                                placeholder="Description"
                                aria-label="Description"
                                value={product.description}
                                onChange={handleInputChange}

                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"


                            />
                            
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
                                type="number"
                                placeholder="$00.00"
                                aria-label="Price USD"
                                value={product.price}
                                onChange={handleInputChange}
                                ref={watch({
                                    required: "Enter a number",
                                    pattern: {
                                        value: /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/,
                                        message: "Entered value does not match number format"
                                    }
                                })}
                                className="appearance-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <span class="block text-red-700 sm:inline">{errors.price && "Price Required"}</span>
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="cus_stock">
                                Stock
                            </label>
                            <input
                                id="cus_stock"
                                name="stock" type="number"
                                placeholder="Stock" aria-label="Stock"
                                value={product.stock}
                                onChange={handleInputChange}
                                ref={watch({
                                    required: "Enter a number",
                                    pattern: {
                                        value: /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/,
                                        message: "Entered value does not match number format"
                                    }
                                })}
                                className="appearance-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <span class="block text-red-700 sm:inline">{errors.stock && "Stock is required"}</span>
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="cus_size">
                                Size
                            </label>
                            <input
                                id="cus_size"
                                name="size"
                                type="number"
                                placeholder="Size" aria-label="size"
                                value={product.size}
                                onChange={handleInputChange}
                                ref={watch({
                                    pattern: {
                                        value: /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/,
                                        message: "Entered value does not match number format"
                                    }
                                })}
                                className="appearance-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <span class="block text-red-700 sm:inline">{errors.size && "Size is required as a number"}</span>
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="cus_thumbnail">
                                Image
                            </label>

                            <input
                                id="cus_image"
                                name="image"
                                type="file"
                                onChange={(e) => setFileUpload(e.target.files[0])}
                                ref={register({ required: true })}
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <span class="block text-red-700 sm:inline">{errors.image && "Image is required"}</span>

                        </div>
                        <div className="mt-8">
                            <button className="bg-gray-700 text-white py-2 px-4 w-full tracking-wide rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Add Product
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                        <Link to={`/products/paneladmin`}>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">Go Back</span>
                        </Link>

                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddedProduct;
