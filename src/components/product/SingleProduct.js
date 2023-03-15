import React,{useState} from 'react';
import styles from "../../styles/single-product.module.css"

function SingleProduct(props) {

    const [addedToCart, setAddedToCart] = useState(false)
    const [notAddedToCart, setNotAddedToCart] = useState(true)

    function addToCart(){
        setAddedToCart(true)
        setNotAddedToCart(false)
        props.getInfo(props.id, props.name, props.price, props.image)
    }

    return (
        <div className={styles.productContainer}>

            <div id={styles.image}>
                <img src={props.image}/>
            </div>

            <div className={styles.productInfo1}>
                <h2>{props.name}</h2>
                <h3>${props.price}</h3>
            </div>

            <div className={styles.productInfo2}>
                <p>{props.desc}</p>
            </div>


            {notAddedToCart && <button className={styles.button} onClick={addToCart}>Buy Item</button>}

            {addedToCart && <button className={styles.redButton} >Added To Cart</button>}
            

        </div>
    );
}

export default SingleProduct;