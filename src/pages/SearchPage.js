import React, {useEffect, useRef, useState} from 'react';
import SingleProduct from "../components/product/SingleProduct";
import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {db} from "../config/firebase";
import {createRoot} from "react-dom/client";


function SearchPage(props) {

    const search = useRef(window.localStorage.getItem('search'))

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
        console.log()
    }


    console.log((search.current.toString()))

    useEffect(()=>{
        const colRef = collection(db, 'Products')

        const q = query(colRef, where("lowercasename" , "==",  (search.current.toString()).toLowerCase()))
        const unsubCol = onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach(doc => {
                const product = { ...doc.data(), id: doc.id }

                createRoot(document.getElementById('hello')).render(
                    <>
                        <h1>Results : </h1>
                        <SingleProduct name={product.name} getInfo={getInfo} image={product.imageUrl} price={product.price} desc={product.description} />
                    </>

                )
            })
        })
    },[])


    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    return (
        <div style={{ margin : "20px", width: "100%", display: "flex", flexDirection: "column" , gap : "40px" , justifyContent: "center", alignItems : "center"}} id="hello">
            <h1>Result : </h1>
        </div>
    );
}

export default SearchPage;