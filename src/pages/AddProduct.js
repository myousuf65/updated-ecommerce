import React,{useRef, useState} from 'react';
import { db } from '../config/firebase';
import { collection, addDoc} from "firebase/firestore"
import { storage } from '../config/firebase';
import {ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {v4} from "uuid"
import styles from "../styles/add-product-page.module.css"


function AddProduct(props) {

    const [success, setSuccess] = React.useState(false)
    const [unsuccess, setUnsuccess] = React.useState(false)

    let user = window.localStorage.getItem('name')

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState(null)
    const imageURL = useRef()


    function uploadImage(){

        setSuccess(false)
        setUnsuccess(false)

        if(image !== null){
            const imageRef = ref(storage, "images/"+ v4() + image.name);
  
            uploadBytes(imageRef, image).then((snapshot) => {

              getDownloadURL(snapshot.ref).then((url) => {        
                imageURL.current = url;
                submitProduct();
              })
            }).catch((error) => {
                setUnsuccess(true)
            })
        }
    }

    function submitProduct(){

        console.log("submit "+ imageURL.current)

        const colRef = collection(db, "Products")

        addDoc(colRef,{
            name: name,
            lowercasename: name.toLowerCase(),
            description: desc,
            price: price,
            category: category,
            user : user,
            imageUrl: imageURL.current
          }).then((doc)=>{
            
            setSuccess(true)

          }).catch(()=>{
            setUnsuccess(true)
          })

    }

    return (
        <div className={styles.container}>
            <h1>Upload Product</h1>
            <div className={styles.subContainer}>
                <input placeholder='Denim Jacket' id="name" onChange={(e) => setName(e.target.value)}/>
                <input placeholder='This is a beautiful and trendy product' id='desc' onChange={(e) => setDesc(e.target.value)}/>
                <input placeholder='10' type="number" id='price' onChange={(e) => setPrice(e.target.value)}/>
                <input placeholder='Jeans' type="text" id='category' onChange={(e) => setCategory(e.target.value)}/>
                
                <input type="file" id='photo' onChange={(e) => setImage(e.target.files[0])}/>

                <button className={styles.button} onClick={uploadImage} > Upload Product</button>
            </div>

            { success && (
                <div id={styles.success} >
                    <img src="https://static.thenounproject.com/png/801900-200.png" alt='done' />
                    Sucessfully Uploaded the Product
                </div>
                
                ) }

            { unsuccess && (
            <div id={styles.unsuccess} >
                <img src="https://static.thenounproject.com/png/5484560-200.png" alt='done' />
                Upload Unsuccessful ... Try again
            </div>
            
            ) }

        </div>
    );
}

export default AddProduct;