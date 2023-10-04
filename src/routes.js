import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import UserLogin from "./components/authentication/UserLogin";
import UserRegistration from "./components/authentication/UserRegistration";
import AllProducts from "./pages/AllProducts";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SearchPage from "./pages/SearchPage";
import ContactUs from "./pages/ContactUs";
import Layout from "./components/Layout.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: Layout,
        children: [
            { index: true, element: <Homepage /> },
            { path: "/all-products", element: <AllProducts /> },
            { path: "/upload-product", element: <AddProduct /> },
            { path: "/update-product", element: <UpdateProduct /> },
            { path: "/cart", element: <Cart /> },
            { path: "/checkout", element: <Checkout /> },
            { path: "/search", element: <SearchPage /> },
            { path: "/contact-us", element: <ContactUs /> },
            { path: "/auth/login", element: <UserLogin /> },
            { path: "/auth/register", element: <UserRegistration /> }
        ]
    }
]);


export default routes;