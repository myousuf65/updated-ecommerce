import React from 'react';
import styles from "../../styles/cart-product.module.css"


function CartProduct(props) {


    function handleClick(){
        props.deleteItem(props.id)
    }
   
    return (
        <div className={styles.container}>

            <div id={styles.image}>
                <img src={props.image} alt="animage"/>
            </div>

            <div className={styles.subContainer}>
                <h2>{props.name}</h2>
                <h3>${props.price}</h3>
            </div>

            <button className={styles.redButton} onClick={handleClick}>Remove From Cart</button>
        </div>
    );
}

export default CartProduct;