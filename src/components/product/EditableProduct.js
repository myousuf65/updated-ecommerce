import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db } from '../../config/firebase';
import styles from "../../styles/editable-product.module.css"
import { useNavigate } from 'react-router-dom';


function EditableProduct(props) {

    const navigate = useNavigate()

    function handleUpdate(){

        let product = {id: props.id, name: props.name, description: props.desc, price: props.price, image: props.image}

        window.localStorage.setItem('update-product', JSON.stringify(product));
       navigate("/update-product")
    }

    function handleDelete(){
        const docRef = doc(db, 'Products', props.id)

        deleteDoc(docRef)
            .then(() => {
                console.log('deleted')
                props.refresh()
            })
        
    }

    return(

        <div className={styles.productContainer}>
            <div id={styles.image}>
                <img src={props.image} alt="anImage"/>
            </div>

            <div className={styles.productInfo1}>
                <h2>{props.name}</h2>
                <h3>${props.price}</h3>
            </div>

            <div className={styles.productInfo2}>
                <p>{props.desc}</p>
            </div>

            <button className={styles.updateButton} id='update-button' onClick={handleUpdate}>Update Item</button>
            <button className={styles.redButton} id='delete-button' onClick={handleDelete}>Delete Item</button>

        </div>
    );


}

export default EditableProduct;