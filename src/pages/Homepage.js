import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";
import SingleProduct from "../components/product/SingleProduct";
import styles from "../styles/homepage.module.css";

function Homepage(props) {
  const [products, setProducts] = useState({
    jeans: [],
    shirts: [],
    hoodies: []
  });

  const [cart, setCart] = useState(() => {
    let me = window.localStorage.getItem("cart");

    if (me == null) {
      return [];
    } else if (me.length === 0) {
      return [];
    } else return JSON.parse(me);
  });

  function addToCart(id, name, price, image) {
    setCart((oldArray) => [...oldArray, { id, name, price, image }]);
  }

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    handleJeansFetch();
      handleShirtsFetch();
    handleHoodiesFetch()
  }, []);

  function handleJeansFetch() {
    const colRef = collection(db, "Products");
    const q = query(colRef, where("category", "==", "Jeans"));

    console.log("handlefetch");
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            setProducts(prevProducts => ({
                ...prevProducts,
                jeans: [...prevProducts.jeans, { ...doc.data(), id: doc.id }]
              }));
            console.log(products.jeans);
      });
    });
  }

  function handleShirtsFetch(){

      const colRef = collection(db, 'Products')
      const q = query(colRef, where("category", "==", "Shirts"))

      console.log("handlefetch")
      onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach(doc => {
            setProducts(prevProducts => ({
                ...prevProducts,
                shirts: [...prevProducts.shirts, { ...doc.data(), id: doc.id }]
              }));
          })
      })
  }

  function handleHoodiesFetch(){
      const colRef = collection(db, 'Products')
      const q = query(colRef, where("category", "==", "Hoodies"))

      console.log("handlefetch")
      onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach(doc => {
            setProducts(prevProducts => ({
                ...prevProducts,
                hoodies: [...prevProducts.hoodies, { ...doc.data(), id: doc.id }]
              }));
          })
      })
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 style={{ margin: "10px" }}>Jeans</h1>

        <div className={styles.scrollingWrapper}>
          {products.jeans.map((jeans) => (
            <SingleProduct
              className={styles.card}
              id={jeans.id}
              getInfo={addToCart}
              image={jeans.imageUrl}
              name={jeans.name}
              desc={jeans.description}
              price={jeans.price}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 style={{ margin: "10px" }}>Shirts</h1>

        <div className={styles.scrollingWrapper}>
          {
            products.shirts.map(jeans => (
                <SingleProduct id={jeans.id} className={styles.card} getInfo={addToCart} image={jeans.imageUrl} name={jeans.name} desc={jeans.description} price={jeans.price}/>
            ))
          }
        </div>
      </div>

      <div>
        <h1 style={{ margin: "10px" }}>Hoodies</h1>

        <div className={styles.scrollingWrapper}>
          {
            products.hoodies.map(jeans => (
                <SingleProduct id={jeans.id} className={styles.card} getInfo={addToCart} image={jeans.imageUrl} name={jeans.name} desc={jeans.description} price={jeans.price}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Homepage;
