import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React,{useState, useRef} from 'react';
import { db, storage } from '../config/firebase';
import styles from "../styles/update-products.module.css"
import {v4 } from "uuid"
import { updateDoc, doc } from 'firebase/firestore';

function UploadProduct(props) {

    const [success, setSuccess] = React.useState(false)
    const [unsuccess, setUnsuccess] = React.useState(false)

    let user = window.localStorage.getItem('name')

    const product = JSON.parse(window.localStorage.getItem('update-product'))
    console.log(product)

    const [id, setId] = useState(product.id)
    const [name, setName] = useState(product.name)
    const [desc, setDesc] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [image, setImage] = useState(product.image)

    const imageURL = useRef()

    function uploadImage(){
        setSuccess(false)
        setUnsuccess(false)

        if(product.image === image){
            handleSubmit(image)
            return
        }

        if(image !== null){
            console.log("77777777777777")
            const imageRef = ref(storage, "images/"+ v4() + image.name);
            
            uploadBytes(imageRef, image).then((snapshot) => {

              getDownloadURL(snapshot.ref).then((url) => {        
                handleSubmit(url)
              })
            }).catch((error) => {
                setUnsuccess(true)
            })
        }

    }

    function handleSubmit(url){

        const docRef = doc(db, 'Products', id)


        console.log("current : "+ imageURL.current)

        updateDoc(docRef,{
          name: name,
          description: desc,
          price: price,
          imageUrl : url
        });

        setSuccess(true);
      };

    return (
        <div className={styles.container}>

            <h1>Update Product Details</h1>

            <div className={styles.subContainer}>

                    <img style={{width:"200px", height: "200", objectFit : "cover", border : "1px solid black", borderRadius : "20px" , padding: "5px 10px"}}  src={image} alt="phots"/>

                    <input placeholder='Denim Jacket' value={name} id="name" onChange={(e) => setName(e.target.value)}/>

                    <input placeholder='This is a beautiful and trendy product' value={desc} id='desc' onChange={(e) => setDesc(e.target.value)}/>

                    <input placeholder='10' value={price} type="number" id='price' onChange={(e) => setPrice(e.target.value)}/>
                    
                    
                    <input type="file" placeholder='file' id='photo' name="photo" onChange={(e) => setImage(e.target.files[0])}/>
                    <label style={{color : "red", borderRadius: "5px", border : "1px solid red", padding : "5px", fontSize : "10px"}} htmlFor='photos'>#The photo would remain unchanged if no photos are selected</label>

                    <button className={styles.button} onClick={uploadImage} > Upload Product</button>
                </div>

            { success && 
                (
                    <div id={styles.success} >
                        <img src="https://static.thenounproject.com/png/801900-200.png" alt='done' />
                        Sucessfully Uploaded the Product
                    </div>
                
                ) 
            }

            { unsuccess && 
                (
                    <div id={styles.unsuccess} >
                        <img src="https://static.thenounproject.com/png/5484560-200.png" alt='done' />
                        Upload Unsuccessful ... Try again
                    </div>

                )
            }
        </div>
    );
}

export default UploadProduct;