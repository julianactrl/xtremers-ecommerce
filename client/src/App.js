import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// ------   COMPONENTS
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

// ----- Products & categories
import AddedProduct from './components/CrudProduct/addProduct';
import EditProduct from './components/CrudProduct/editProduct';
import DeleteProduct from './components/CrudProduct/deleteProduct';
import Product from './components/Product/Product';
import ModalCategories from './components/CrudProduct/modalCategories';
import FormCategory from './components/Category/FormCategory';
// ---------- Users
import Register from './components/User/Register';
import Login from './components/Login/Login';
import TableUsers from './components/User/TableUsers';
import Profile from './components/User_page/Profile/Profile';
import EditUser from './components/User/EditUser';
import Order_details from './components/User_page/Order_details/Order_details';
// ------- Admin
import PanelAdmin from './components/PanelAdmin/PanelAdmin';
// ---------- Cart
import Cart from './components/cart/Cart';
import Catalog from './components/Catalog/Catalog';
// ----------- reviews
import ReviewForm from './components/Reviews/ReviewForm';
import Reviews from './components/Reviews/Reviews';
// ------ proteccion de rutas
import PrivateRoute from './components/ProtectedRoutes/PrivateRoute';

// --------- PASSWORD RESET ---------------------------------------------
import { ResetPassword } from './components/ResetPassword/ResetPassword';

// ----------- ALERTS ----------------------------------------------------
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit_Profile_User from './components/User_page/Edit_profile/Edit_profile';
// ------------- ESTILOS -------------------------------------------------
import './styles/app.css';

// -------- HOME SECTION
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
// -------- Checkout
import Step2 from './components/Checkout/Step2';
import Step3 from './components/Checkout/Step3';
import Step4 from './components/Checkout/Step4';
import Steps from './components/Checkout/Steps';


const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/" component={Navbar} />
        </Switch>

        <Switch>
          <Route exact path="/products/add" component={AddedProduct} />

          <PrivateRoute
            exact
            path="/products/paneladmin"
            component={PanelAdmin}
          />
          <Route
            exact
            path="/products/edit/:id"
            render={({ match }) => <EditProduct id={match.params.id} />}
          />
          <Route
            exact
            path="/products/delete/:id"
            render={({ match }) => <DeleteProduct id={match.params.id} />}
          />
          <Route
            exact
            path="/products/addCategoriesProduc/:id"
            render={({ match }) => <ModalCategories id={match.params.id} />}
          />

          <Route
            exact
            path="/products/:id"
            render={({ match }) => <Product id={match.params.id} />}
          />
          <Route path="/products" component={Catalog} />
          <Route path="/categories/admin" component={FormCategory} />
          <Route path="/cart" component={Cart} />
          <Route path="/users/paneladmin" component={TableUsers} />
          <Route
            exact
            path="/users/edit/:id"
            render={({ match }) => <EditUser id={match.params.id} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/resetpassword" component={ResetPassword} />

          {/*  REVIEWS */}
          <Route path="/rating" component={ReviewForm} />
          <Route path="/showComment/:id" component={Reviews} />

          {/*  Checkout */}
          <Route path="/shipping" component={Step2} />
          <Route path="/payment" component={Step3} />
          <Route path="/placeorder" component={Step4} />
          <Route path="/steps" component={Steps} />

          {/*UserProfile*/}
          <Route path="/userpage" component={Profile} />
          <Route path="/Orderdetails" component={Order_details}></Route>
          <Route path="/editprofile" component={Edit_Profile_User} />

          {/* */}
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/contactus" component={ContactUs} />

           {/*Checkout*/}
          <Route path="/shipping" component={Step2}></Route>
          <Route path="/payment" component={Step3}></Route>
          <Route path="/placeorder" component={Step4}></Route>
          <Route path="/steps" component={Steps}></Route>
        </Switch>
      </Router>
      <ToastContainer autoClose={2000} />
    </>
  );
};
export default App;
