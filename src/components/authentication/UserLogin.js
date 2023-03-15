import React, {useState, useEffect, useContext} from 'react';
import styles from '../../styles/authentication.module.css'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, signInWithGoogle, } from "../../config/firebase"
import googleButtonStyles from '../../styles/google.module.scss'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function UserLogin(props) {



    const {user, setUser, loggedIn, setLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()
    const [success, setSuccess] = useState()
    const [unsuccess, setUnsuccess] = useState()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const login = async () =>{

        setSuccess(false)
        setUnsuccess(false)

        try{
            const user = await signInWithEmailAndPassword(auth, email, password) 
            
        }catch(error){
            setUnsuccess(true)
            return
        }

        setSuccess(true)
        window.localStorage.setItem('name', "Yousuf" )
        window.localStorage.setItem('email', email)
        window.localStorage.setItem('profilePic', "https://cdn-icons-png.flaticon.com/512/1077/1077114.png")

        setUser(prev => ({
            name: "Yousuf",
            email: email,
            profilePic: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
        }) )

        setLoggedIn(true)
        navigate('/')


        navigate('/')
        
    }

    function log(){
        signInWithGoogle().then((result)=>{
            const name = result.user.displayName
            const email = result.user.email
            const profilePic = result.user.photoURL

            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
            window.localStorage.setItem('profilePic', profilePic)

                setUser(prev => ({
                    name: name,
                    email: email,
                    profilePic: profilePic
                }) )

                setLoggedIn(true)
                navigate('/')
            }).catch((error) =>{

            console.log(error)
            })
    }


    return (
        <div className={styles.container}>
            <h1>User Login Page</h1>
            <div className={styles.subContainer}>
                
                <input placeholder='tom_cruise@gmail.com'  name="email" onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder='Password'  name="password" onChange={(e) => setPassword(e.target.value)}  />

                <div className={styles.buttonContainer}>
                    <button className={styles.buttons}  type="submit" onClick={login} >Login</button>
                    <button  type="submit" onClick={()=> navigate("/auth/register")}>Not A User</button>
                </div>
            </div>


            <button type="button" className={ googleButtonStyles.loginWithGoogleBtn} onClick={log}>
                Sign in with Google
            </button>

            { success && (
                <div id={styles.success} >
                    <img src="https://static.thenounproject.com/png/801900-200.png" alt='done' />
                    Sucessfully Logged In
                </div>
                
                ) }

            { unsuccess && (
            <div id={styles.unsuccess}>
                <img src="https://static.thenounproject.com/png/5484560-200.png" alt='done' />
                Failed to Login
            </div>
            
            ) }
    
        </div>
    );
}

export default UserLogin;