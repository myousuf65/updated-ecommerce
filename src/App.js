import { Route, Routes } from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import "../src/styles/globalStylesheet.css"
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import UserLogin from "./components/authentication/UserLogin";
import UserRegistration from "./components/authentication/UserRegistration";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs"
import SellerProfile from "./pages/SellerProfile";
import UpdateProduct from "./pages/UpdateProduct";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SearchPage from "./pages/SearchPage";


export const AuthContext = createContext(null);

function App() {


    const [user, setUser] = useState({
        name : "",
        email : "",
        profilePic : ""
    })
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        if(window.localStorage.getItem('email') === null || window.localStorage.getItem('email').length === 0){
            return
        }else{
            setUser(prev => ({
                name: window.localStorage.getItem('name'),
                email : window.localStorage.getItem('email'),
                profilePic: window.localStorage.getItem('profilePic')
            }))

            setLoggedIn(true)
        }
    },[])


  return (
    <div>
      <AuthContext.Provider value={{user, setUser, loggedIn, setLoggedIn}}>
        <Navbar />
        <Routes>
            <Route path="/" element={ <Homepage /> } />
            <Route path="/auth/login" element={ <UserLogin /> } />
            <Route path="/auth/register" element={ <UserRegistration /> } />
            <Route path="/upload-product" element={ <AddProduct/> } />
            <Route path="/all-products" element={ <AllProducts/> } />
            <Route path="/contact-us" element={ <ContactUs /> } />
            <Route path="/seller" element={ <SellerProfile /> } />
            <Route path="/update-product" element={ <UpdateProduct /> } />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/checkout" element={ <Checkout /> } />
            <Route path="/search" element={ <SearchPage /> } />

        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
