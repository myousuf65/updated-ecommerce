import React, { useState, useEffect, useRef, useContext } from "react";
import CartProduct from "../components/product/CartProduct";
import SingleProduct from "../components/product/SingleProduct";
import styles from "../styles/cart-page.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useCartStore } from "../stores/cartStore";

function Cart(props) {
  const { user, loggedIn } = useContext(AuthContext);
  const [notLoggedInMsg, setNotLoggedInMsg] = useState(false); //use private route for cart
  const navigate = useNavigate();
  const [price, setPrice] = useState(0); //for caculating total cart price

  const { cartArray, removeFromCart } = useCartStore();

  return (
    <>
      <>
        <center style={{ margin: "20px" }}>
          <h1>Cart</h1>
              </center>
              

        <div className={styles.container}>
          {cartArray.map((product) => (
            <CartProduct
              id={product.id}
              deleteItem={removeFromCart}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        {/* <center style={{margin: "20px"}}><h1>Total Price : $ {price.toFixed(2)}</h1></center>
         */}

        {/* 
                <center>
                    <button onClick={handleCheckout} className={styles.button}>Checkout</button>
                </center> 
                */}
          </>
          

      {/* <center>
                { unsuccess && (
                    <div id={styles.unsuccess}>
                        The cart is empty
                    </div>
                )}
            </center>

            <center>
                { notLoggedInMsg && (
                    <div id={styles.unsuccess}>
                        You have to be Logged in to proceed to checkout
                    </div>
                )}
            </center> */}
    </>
  );
}

export default Cart;
