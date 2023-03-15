import React,{useState, useEffect, useRef, useContext} from 'react';
import CartProduct from '../components/product/CartProduct';
import SingleProduct from '../components/product/SingleProduct';
import styles from "../styles/cart-page.module.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Cart(props) {

    const {user, loggedIn} = useContext(AuthContext)
    const [notLoggedInMsg,setNotLoggedInMsg] =useState(false)
    const navigate = useNavigate()
    const [price, setPrice] = useState(0)
    const [cart, setCart] = useState(()=>{

        let me  = window.localStorage.getItem('cart')

        if(me == null){
            return []
        }else if(me.length === 0){
            return []
        }else return JSON.parse(me)
        
    })
    const [show, setShow] = useState(
        cart.length >0 ? true : false
    )
    const [unsuccess, setUnsucces] = useState(
        cart.length >0 ? false : true
    )

    useEffect(()=>{
        cart.map(element => {
            setPrice(prev => prev + parseFloat(element.price))
        });
    },[cart])


    function handleDelete(id){

        for(var i=0 ; i<cart.length; i++){
    
            if(cart[i].id === id){
                console.log(cart[i])
                cart.splice(i, 1)
            } 
        }

        window.localStorage.setItem('cart', JSON.stringify(cart))

        setCart(JSON.parse(window.localStorage.getItem('cart')))
        setPrice(0)
    }


    function handleCheckout(){
        if(cart.length === 0){
            setUnsucces(true)
            return
        }

        console.log(loggedIn)
        if(loggedIn === false){
            setNotLoggedInMsg(true)
            return
        }
        navigate('/checkout')
        
    }

    return (

        <>

        {
            show && (
                <>
                <center style={{margin: "20px"}}><h1>Cart</h1></center>
                <div className={styles.container}>
                    {
                        cart.map((product)=>
                            (
                            <CartProduct id={product.id} deleteItem={handleDelete}  image={product.image} name={product.name} price={product.price} />
                            )
                        )
                    }
                </div>


                <center style={{margin: "20px"}}><h1>Total Price : $ {price.toFixed(2)}</h1></center>


                <center>
                    <button onClick={handleCheckout} className={styles.button}>Checkout</button>
                </center>
                </>
            )
        }


            <center>
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
            </center>



        </>

    );
}

export default Cart;