import React,{useState, useEffect} from 'react';
import styles from "../styles/navbar.module.css"
import search from "../images/search-icon.png"
import user from "../images/user.png"
import incognito from "../images/incognito.png"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';
import SearchPage from "../pages/SearchPage";
import hamburger from  "../images/hamburger.png"


function Navbar(props) {

    const {user, setUser, loggedIn, setLoggedIn} = useContext(AuthContext) 

    const navigate = useNavigate()

    return (
        
        <div className={styles.navContainer}>

                <div className={styles.navTitle} onClick={()=> navigate("/")}>
                    <h1>E-Commerce Store</h1>
                </div>

                <div className={styles.navPages}>
                    <div className={styles.page} onClick={()=> navigate("/all-products") }>All Products</div>
                    <div className={styles.page} onClick={()=> navigate("/cart")}>Browse Cart</div>
                    <div className={styles.page} onClick={()=> navigate("/contact-us")}>Contact Us</div>
                </div>

            
                <form className={styles.navSearch} onSubmit={(e) =>{
                    e.preventDefault();
                    window.localStorage.setItem('search', e.target[0].value);
                    <SearchPage ni={e.target[0].value} />
                    navigate('/search')
                }}>
                    <input placeholder='Red Hoodie' name='searchProduct' id='search-product'/>
                    <div className={styles.searchIcon}>
                        <img src={search} alt="search-icon" onClick={()=> {
                        }}/>
                    </div>
                </form>

                <div className={styles.leftContainer}>

                    {!loggedIn && (
                    <div className={styles.navLogin} onClick={() => navigate("/auth/login")}>
                        <div className={styles.loginIcon}>
                            <img src={incognito} />
                        </div>
                        <div className='login--label'>
                            Guest
                        </div>
                    </div>
                    )}
                    {loggedIn && (
                    <div className={styles.navLogin} onClick={() => navigate("/seller")}>
                        <div className={styles.loginIcon}>
                            {
                                    <img src={user.profilePic} />
                            }
                    
                        </div>
                        <div className={styles.loginLabel}>
                            {user.name}
                        </div>
                    </div>
                    )}
                    <div className={styles.toggleIcon}>
                            <img src={hamburger} onClick={ ()=>{

                                const search = document.getElementsByClassName(styles.navSearch)[0]
                                const nav = document.getElementsByClassName(styles.navPages)[0]

                                console.log(nav)
                                nav.classList.toggle(styles.active)
                                search.classList.toggle(styles.active)




                            }} />
                    </div>
            </div>

        </div>
    );
}

export default Navbar;