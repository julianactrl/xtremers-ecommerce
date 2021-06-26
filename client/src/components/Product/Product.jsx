import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import Reviews from "../Reviews/Reviews.jsx";
import jwt from 'jsonwebtoken';



import Modal from "react-modal";
//actions from redux
import {
  getProductById,
  createOrder,
  clearOrder,
  getReviews,
} from "../../actions/productActions.js";
import { addOrder, addOrderLocal, getOrderline } from "../../actions/cartActions";
import swal from "sweetalert";


function Product(props) {
  const dispatch = useDispatch();
  const productById = useSelector((state) => state.product);
  const { loading, error, product } = productById;
  const orderById = useSelector((state) => state.cart.order);
  const { images } = product;
  const id = props.id;
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const orderCartstate = useSelector((state) => state.cart2.cartItems);
  const user = jwt.decode(JSON.parse(localStorage.getItem('userInfo')));
  const [ orderProduct, setOrderProduct ] = useState(false);
  const [ UserId, setUserId ] = useState(0);
 console.log("Esto es orderby id--->", orderById)
 

 
    useEffect(() => {
      if (user){
        setUserId(user.id);
      }
    }, []);  

    useEffect(() => {
      if (user){
        dispatch(getOrderline(user.id));
      }
      
    }, []);
  const [modalIsOpen, SetModalIsOpen] = useState(false);

  useEffect(() => {
    searchById(id);
    searchReviews(id);
  }, []);

  const searchReviews = (id) => {
    dispatch(getReviews(id));
  };
  const reviews = useSelector((state) => state.product.list);
  console.log(reviews);

const createOrderCart = (id, orderCheck) => {
  dispatch(createOrder(id, orderCheck))
}
const onClicks = async(e) => {
        e.preventDefault()
        const orderCart = {
            subtotal:(parseInt(product.price) * parseInt(quantity)),
            quantity: quantity,
            productId: product.id,  
        }
        
  if(quantity<=0){
          swal('Must add item')
  }else if (product.stock <=0) {

          swal('Product out of stock')
  } else{
    if(user){
      
          if(!orderById){
            createOrderCart(UserId, orderCart);
            setOrderProduct(true);
            swal('Product add to cart')
          }else{
            const exist = orderById.orderlines && orderById.orderlines.find(x=> x.product.id=== orderCart.productId)
            if(exist){
              swal('Exist in cart product')
            }else{
              createOrderCart(UserId, orderCart);
              setOrderProduct(true);
              swal('Product add to cart')
            }
          }
            
        
        }else if(!user) {
          const existProduct = orderCartstate.find((x) => x.idProduct === orderCart.productId)

        if(existProduct){
            swal('Product already exists')
        }else{
             const subtotal = quantity * product.price
             console.log(product.id, quantity , subtotal)
            dispatch(addOrderLocal(product.id,quantity, subtotal))
            swal('Product add to cart')
        }
        }
      }
        
    }
function promedyReviews (reviews){
  if(reviews && reviews !== undefined && reviews !== null){
    let reviewsTotal = 0;
    reviews.map((review) => {
      reviewsTotal = reviewsTotal + review.rate;
    });
    return reviewsTotal / reviews.length;}
  }

  const promedio = promedyReviews(reviews);
  console.log(reviews);

  const handleInputChange = function (event) {
    setQuantity(event.target.value);
  };

  const handleTotalChange = function (event) {
    const total = quantity * product.price;
    setTotal(total);
  };

  const searchById = (id) => {
    dispatch(getProductById(id));
  };

  const addOrderCart = (id, order) => {
    dispatch(addOrder(id, order));
  };

  return (
    <div className="container mx-auto px-4">
      <section className="py-12 px-4">
        <div className="flex flex-wrap -mx-8">
          <div className=" lg:w-1/2 px-8 ">
            <div>
              <img
                class="mb-4 rounded-lg shadow-md bg-green-400 "
                src={images && images[0].path}
                alt=""
              />
            </div>
            <div className="flex flex-wrap overflow-hidden">
              <div className="w-1/3 px-2">
                <img
                  className="rounded-lg shadow-md bg-gray-300"
                  src={images && images[0].path}
                  alt=""
                />
              </div>
              <div className="w-1/3 px-2 ">
                <img
                  className="rounded-lg shadow-md bg-gray-500"
                  src={images && images[0].path}
                  alt=""
                />
              </div>
              <div className="w-1/3 px-2">
                <img
                  className="rounded-lg shadow-md bg-black"
                  src={images && images[0].path}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 px-8 mt-6 lg:mt-0 order-2 lg:order-none">
            <h2 className="text-4xl mb-2 font-heading">{product.name}</h2>
            <p className="mb-6">${product.price} (Ex. Tax)</p>
            {promedio ? (
            <div className='flex '>
              <StarRatings
                rating={promedio}
                starRatedColor="violet"
                starDimension="1.75em"
                starSpacing="0"
              />
              <div clssName=''>    {reviews.length} Reviews </div> </div>
            ) : (
              <div>No reviews</div>
            )}
            <div className="flex mb-6">
              <ul className="flex list-reset">
                <li>
                  {" "}
                  <a
                    className="block py-2 px-3 mr-2 bg-gray-200 rounded"
                    href="#"
                  >
                    Product Details
                  </a>
                </li>

                {promedio !== undefined  && reviews.length > 0 ?  (
                  <li>
                    <button
                      className="block py-2 px-3 mr-2 bg-gray-200 rounded"
                      onClick={() => SetModalIsOpen(true)}
                    >
                      Reviews
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
            <Modal isOpen={modalIsOpen}>
              <div class="modal-content py-4 text-left px-6">
                <div class=" border-b-2 border-gray-200 flex justify-between items-center pb-3">
                  <p class="text-2xl font-bold">Opiniones sobre el producto</p>
                  <div class="modal-close cursor-pointer z-50">
                    <div class="flex justify-end pt-2">
                      <button
                        onClick={() => SetModalIsOpen(false)}
                        class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
            {  reviews && reviews !== undefined && reviews !== null ? reviews.map((review) =>(
             <Reviews rate={review.rate} content={review.content} nameUser={review.user.name} lastName={review.user.last_name} />

              )) : null}

              </div>
            </Modal>

            <p className="mb-8 text-gray-500 leading-relaxed">
              {product.description}
            </p>
            <table className="w-full mb-6">
              <tbody>
                <tr className="border-t">
                  <td className="py-3">Size</td>
                  <td className="text-right">{product.size}</td>
                </tr>

                <tr className="border-t">
                  <td className="py-3">Stock</td>
                  <td className="text-right">{product.stock}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex mb-6">
              <span class="text-2xl">${total.toFixed(2)}</span>
              <div className="flex flex-wrap ml-4">
                <div className="w-1/2">
                  <input
                    className="appearance-none 
                                            block w-28 
                                            py-2 px-4 
                                            leading-snug 
                                            text-gray-700 
                                            bg-gray-200 
                                            focus:bg-white 
                                            border border-gray-200 
                                            focus:border-gray-500 
                                            rounded md:rounded
                                            focus:outline-none"
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    onClick={handleTotalChange}
                    disabled={product.stock < 1 ? "disabled" : ""}
                    min="0"
                    max={product.stock}
                  />
                </div>
                <div className="w-1/2 flex flex-row-reverse ">
                  <div>
                  
                    <button
                      className="inline-block w-40 py-3 px-4 leading-none text-white bg-green-400 hover:bg-green-700 rounded md:rounded ml-2"
                      onClick={onClicks}
                    >
                      Add To Cart
                    </button>
                    
                  </div>
                  <div>
                    {/* <button
                      className="inline-block 
                                            w-28 py-3 px-4 
                                            leading-none text-white 
                                            bg-green-400
                                            hover:bg-green-700 
                                            rounded md:rounded 
                                            ml-2"
                    >
                      Buy
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
