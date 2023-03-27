import React,{useContext} from 'react';
import { AuthContext } from '../App';

export default function Checkout(props) {

    const {user} = useContext(AuthContext)
    window.localStorage.setItem('cart', "")

    return (
        <div className='checkout--container' style={{display: "flex", justifyContent: "center", margin :"30%"}}>
            <h2 style={{textAlign : "center", fontSize: "4vw"}}>Thank you for Shopping at E-Commerce Store,{<br></br>}{user.name}</h2>
        </div>
    );
}
