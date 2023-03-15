import React, { useEffect, useState, useRef, useReducer } from 'react';
import {collection, getDocs } from "firebase/firestore"
import { db } from '../config/firebase';
import SingleProduct from "../components/product/SingleProduct"
import styles from "../styles/all-products-page.module.css"

function AllProducts(props) {

    const allProducts = useRef([])
    const [rerender, setRerender] = useState(false);

    const [cart, setCart] = useState(()=>{

        let me  = window.localStorage.getItem('cart')

        if(me == null){
            return []
        }else if(me.length === 0){
            return []
        }else return JSON.parse(me)
        
    })

    function getInfo(id, name, price, image){
        setCart(oldArray => [...oldArray, {id, name, price, image}])
    }

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])


    const colRef = collection(db, 'Products')

    useEffect(() => {
        getDocs(colRef).then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                allProducts.current.push({...doc.data(),id:doc.id})
            })
            setRerender(!rerender);
        })
    },[])

    return (
        <div>
            <h1 style={{textAlign: "center", margin: "20px"}}>All Products</h1>

            <div className={styles.allProductsContainer}>
                {
                    allProducts.current.map(product =>(
                        <SingleProduct id={product.id} key={props.id} getInfo={getInfo} image={product.imageUrl} name={product.name} price={product.price} desc={product.description}/>
                    ))

                }
            </div>

        </div>
    );
}

export default AllProducts;