import React,{useState} from 'react';
import styles from "../../styles/single-product.module.css"
import { useCartStore } from '../../stores/cartStore';

function SingleProduct({id, name , price, image, desc}) {

    const [addedToCart, setAddedToCart] = useState(false)
    const {addToCart, removeFromCart} = useCartStore();

    
    const button = !addedToCart ? (
        <button
          className={styles.button}
          onClick={() => {
              addToCart({ id, name, price, image });
              setAddedToCart(prev => !prev)
          }}
        >
          Buy Item
        </button>
      ) : (
            <button onClick={() => {
                removeFromCart(id);
                setAddedToCart(prev => !prev);
            }}
                className={styles.redButton}>Added To Cart</button>
      );

    return (
        <div className={styles.productContainer}>

            <div id={styles.image}>
                <img src={image} alt='product'/>
            </div>

            <div className={styles.productInfo1}>
                <h2>{name}</h2>
                <h3>${price}</h3>
            </div>

            <div className={styles.productInfo2}>
                <p>{desc}</p>
            </div>
            
            {button}

        </div>
    );
}

export default SingleProduct;