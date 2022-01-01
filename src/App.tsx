import React from 'react';
import './App.css';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import AllProducts from './pages/allProducts/AllProducts';
import AddNewProduct from './pages/addNewProduct/AddNewProduct';
import Details from './pages/details/Details';
import PrivateRoute from './common/privateRoute';
import Cart from './pages/cart/Cart';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/details/:id" component={Details} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/allProducts" component={AllProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/home" component={Home} />
        <PrivateRoute path="/addProduct" component={AddNewProduct} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
