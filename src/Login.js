import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './Login.css'
import {auth, db} from './firebase'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = e =>{
    //prevent page from refreshing
    e.preventDefault();
    
    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        navigate('/home');
      })
    .catch(error => alert(error.message))

  }

  const signUp= e =>{
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // the auth in the then is an object that is return after a user is properly created
        //This place in the code denoted that a user is successfuly created in the firestore
        console.log(auth);
        if(auth){
          db.collection("users").add({
            user:email.split('@')[0]
          })
          navigate('/home')
        }
      }) 
      .catch(error => alert(error.message))
  }

  return (
    <div className='login'>
      <div className='login_left'>
        <img className='login_image1' src="https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png"/>
        <img className='login_image2' src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"/>
      </div>
      <div className='login_right'>
        <div className='container'>
          <Link to='/'>
            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png' alt='logo'/>
          </Link> 
          <form>
            <input placeholder='   Email...' type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
            <input placeholder='   Password..' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button className='signIn' onClick={signIn}>Continue</button>
          </form>
        </div>  
        <div className='signUp'> 
          <p>Don't have an account?<a onClick={signUp}><span className='span'> Sign up</span></a></p>
        </div>
        <div className='get_app_title'>
          <p>Get the app.</p>
        </div>
        <div className='app_store'>
          <img src='https://www.aps.edu/students-parents/images/downloadOnTheGooglePlayStoreBadge.png/download'/>
          <img src='https://de.maplesoft.com/products/MapleCalculator/images/app-store-icons-apple-app-store.png'/>
        </div>
      </div>
      
    </div>
  )
}

export default Login