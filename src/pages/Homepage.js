import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import SingleProduct from "../components/product/SingleProduct";
import styles from "../styles/homepage.module.css";



function Homepage(props) {
  
  const [products, setProducts] = useState({
    jeans: [],
    shirts: [],
    hoodies: []
  });

  useEffect(() => {
    handleJeansFetch();
    handleShirtsFetch();
    handleHoodiesFetch();
  }, []);

  function handleJeansFetch() {
    const colRef = collection(db, "Products");
    const q = query(colRef, where("category", "==", "Jeans"));

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setProducts((prevProducts) => ({
          ...prevProducts,
          jeans: [...prevProducts.jeans, { ...doc.data(), id: doc.id }]
        }));
      });
    });
  }

  function handleShirtsFetch() {
    const colRef = collection(db, "Products");
    const q = query(colRef, where("category", "==", "Shirts"));

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setProducts((prevProducts) => ({
          ...prevProducts,
          shirts: [...prevProducts.shirts, { ...doc.data(), id: doc.id }]
        }));
      });
    });
  }

  function handleHoodiesFetch() {
    const colRef = collection(db, "Products");
    const q = query(colRef, where("category", "==", "Hoodies"));

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setProducts((prevProducts) => ({
          ...prevProducts,
          hoodies: [...prevProducts.hoodies, { ...doc.data(), id: doc.id }]
        }));
      });
    });
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 style={{ margin: "10px" }}>Jeans</h1>

        <div className={styles.scrollingWrapper}>
          {products.jeans.map((jeans) => (
            <SingleProduct
              key={jeans.id}
              className={styles.card}
              id={jeans.id}
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
          {products.shirts.map((shirt) => (
            <SingleProduct
              key={shirt.id}
              id={shirt.id}
              className={styles.card}
              image={shirt.imageUrl}
              name={shirt.name}
              desc={shirt.description}
              price={shirt.price}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 style={{ margin: "10px" }}>Hoodies</h1>

        <div className={styles.scrollingWrapper}>
          {products.hoodies.map((hoodie) => (
            <SingleProduct
              key={hoodie.id}
              id={hoodie.id}
              className={styles.card}
              image={hoodie.imageUrl}
              name={hoodie.name}
              desc={hoodie.description}
              price={hoodie.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
