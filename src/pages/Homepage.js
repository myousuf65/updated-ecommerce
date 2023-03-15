import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState} from 'react';
import { db } from '../config/firebase';
import SingleProduct from '../components/product/SingleProduct';
import styles from "../styles/homepage.module.css"



function Homepage(props) {

    const jeansRef = useRef([])
    const shirtsRef = useRef([])
    const hoodiesRef = useRef([])
    const [render,setRender] = useState(false)

    const [cart, setCart] = useState(()=>{

        let me  = window.localStorage.getItem('cart')

        if(me == null){
            return []
        }else if(me.length === 0){
            return []
        }else return JSON.parse(me)
        
    })

    function getId(id, name, price, image){
        setCart(oldArray => [...oldArray, {id, name, price, image}])
    }

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])


    useEffect(()=>{
        handleJeansFetch()
        handleShirtsFetch()
        handleHoodiesFetch()
    },[])

    function handleJeansFetch(){

        const colRef = collection(db, 'Products')
        const q = query(colRef, where("category", "==", "Jeans"))

        console.log("handlefetch")
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach(doc => {
                jeansRef.current.push({ ...doc.data(), id: doc.id })
                console.log({ ...doc.data(), id: doc.id })
            })
            setRender(!render)
        })  
    }

    function handleShirtsFetch(){

        const colRef = collection(db, 'Products')
        const q = query(colRef, where("category", "==", "Shirt"))

        console.log("handlefetch")
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach(doc => {
                shirtsRef.current.push({ ...doc.data(), id: doc.id })
                console.log({ ...doc.data(), id: doc.id })
            })
            setRender(!render)
        })
    }

    function handleHoodiesFetch(){
        const colRef = collection(db, 'Products')
        const q = query(colRef, where("category", "==", "Hoodie"))

        console.log("handlefetch")
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach(doc => {
                hoodiesRef.current.push({ ...doc.data(), id: doc.id })
            })
            setRender(!render)
        })
    }
    

    return (
        <div className={styles.container}>
            <div>
                <h1 style={{margin : "10px"}}>Jeans</h1>

                <div className={styles.scrollingWrapper}>
                    {
                    jeansRef.current.map(jeans => (
                        <SingleProduct className={styles.card} id={jeans.id} getInfo={getId} image={jeans.imageUrl} name={jeans.name} desc={jeans.description} price={jeans.price}/>
                    ))
                    }
                </div>
            </div>

            <div>
                <h1 style={{margin : "10px"}}>Shirts</h1>

                <div className={styles.scrollingWrapper}>
                    {
                    shirtsRef.current.map(jeans => (
                        <SingleProduct id={jeans.id} className={styles.card} getInfo={getId} image={jeans.imageUrl} name={jeans.name} desc={jeans.description} price={jeans.price}/>
                    ))
                    }
                </div>
            </div>

            <div>
                <h1 style={{margin : "10px"}}>Hoodies</h1>

                <div className={styles.scrollingWrapper}>
                    {
                    hoodiesRef.current.map(jeans => (
                        <SingleProduct id={jeans.id} className={styles.card} getInfo={getId} image={jeans.imageUrl} name={jeans.name} desc={jeans.description} price={jeans.price}/>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Homepage;