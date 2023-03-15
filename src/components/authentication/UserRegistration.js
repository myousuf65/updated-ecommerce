import React,{useEffect, useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, signInWithGoogle} from "../../config/firebase"
import styles from '../../styles/authentication.module.css'
import googleButtonStyles from '../../styles/google.module.scss'
import { useNavigate } from 'react-router-dom';


function UserRegistration(props) {


    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const [unsuccess, setUnsuccess] = useState(false)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()


        
    const register =async () =>{
        setSuccess(false)
        setUnsuccess(false)
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password)
        }catch(error){
            setUnsuccess(true)
            return
        }
        window.localStorage.setItem('email',email)
        setSuccess(true)
        navigate('/auth/login')
        
    }
   

    return (
        <div className={styles.container}>
        <h1>User Registration Page</h1>
        <div className={styles.subContainer}>
            
            <input placeholder='tom_cruise@gmail.com'  name="email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder='Password'  name="password" onChange={(e) => setPassword(e.target.value)}  />
            <input placeholder='Confirm Password' name="confirmPassword"  onChange={(e) => setConfirmPassword(e.target.value)}/>


            <div className={styles.buttonContainer}>
                <button className={styles.buttons}  type="submit" onClick={register} >Register</button>
            </div>
        </div>

        <button type="button" className={ googleButtonStyles.loginWithGoogleBtn} onClick={signInWithGoogle}>
            Sign in with Google
        </button>

        { success && (
            <div id={styles.success} >
                <img src="https://static.thenounproject.com/png/801900-200.png" alt='done' />
                Sucessfully Registered
            </div>
            
            ) }

        { unsuccess && (
        <div id={styles.unsuccess}>
            <img src="https://static.thenounproject.com/png/5484560-200.png" alt='done' />
            Failed to Register
        </div>
        
        ) }
    </div>
    );
}

export default UserRegistration;