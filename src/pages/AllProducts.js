import React, { useEffect, useState} from 'react';
import {collection, getDocs } from "firebase/firestore"
import { db } from '../config/firebase';
import SingleProduct from "../components/product/SingleProduct"
import styles from "../styles/all-products-page.module.css"

function AllProducts(props) {

    const [allProducts, setAllProducts] = useState([]);

    const colRef = collection(db, 'Products')

    useEffect(() => {
        getDocs(colRef).then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                setAllProducts(prev => [...prev, {...doc.data(),id:doc.id}])
            })
        })
    },[])

    return (
        <div>
            <h1 style={{textAlign: "center", margin: "20px"}}>All Products</h1>

            <div className={styles.allProductsContainer}>
                {
                    allProducts.map(product =>(
                        <SingleProduct id={product.id} key={props.id} image={product.imageUrl} name={product.name} price={product.price} desc={product.description}/>
                    ))

                }
            </div>

        </div>
    );
}

export default AllProducts;