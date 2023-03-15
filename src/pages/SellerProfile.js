import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React,{useContext, useEffect, useRef, useState} from 'react';
import { db } from '../config/firebase';
import styles from "../styles/seller-profile.module.css"
import EditableProduct from '../components/product/EditableProduct';
import SingleProduct from '../components/product/SingleProduct';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function SellerProfile(props) {

    const navigate = useNavigate()

    const {user, setUser, loggedIn, setLoggedIn} = useContext(AuthContext)

    const product = useRef([])
    const [render, setRender] = useState(false)
    const [refetch, setRefetch] = useState(false)


    useEffect(()=>{

        product.current = []
        const colRef = collection(db, 'Products')
        const q = query(colRef, where("user", "==", user.name))

        const unsubCol = onSnapshot(q, (snapshot) => {
             snapshot.docs.forEach(doc => {
            product.current.push({ ...doc.data(), id: doc.id })
        })

        if(product.current.length === 0){
            var div = document.createElement('div')
            div.innerText = "You have not uploaded any products"
            div.className=styles.notUploadedDiv
            document.getElementById('productsContainer').appendChild(div)
        }
        setRender(!render)
        })

    },[refetch])




    function handleRefresh(){
        setRefetch(!refetch)
    }

    return (
        <div className={styles.container}>

            <div style={{display:"flex", alignItems: "center", gap: "10px"}}>
                <h1 style={{textAlign:"center", margin:"0px 20px"}}>@{user.name}</h1>
                
                <button className={styles.redButton} onClick={()=>{

                    setUser(prev => ({
                        name : "",
                        email : "",
                        profilePic : "",
                    }))

                    window.localStorage.setItem('name', "")
                    window.localStorage.setItem('email', "")
                    window.localStorage.setItem('profilePic', "")

                    setLoggedIn(false)
                    navigate("/")
                    
                }}>Log Out</button>

                <button className={styles.button} onClick={()=> navigate("/upload-product")} >Add Product</button>
            </div>


            <div className={styles.productsContainer} id="productsContainer">
            {
                product.current.map(product =>(
                    <EditableProduct refresh={handleRefresh} id={product.id}  key={props.id} image={product.imageUrl} name={product.name} price={product.price} desc={product.description}/>
                ))

            }
            </div>

    </div>
    );
}

export default SellerProfile;