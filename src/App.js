import { dblClick } from '@testing-library/user-event/dist/click';
import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from './Header';
import Post from './Post';
import {auth, db} from "./firebase"
import { Avatar, Box, Button, makeStyles, Modal, Typography } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { IGEmbed } from 'react-ig-embed';
import UserLike from './UserLike';


function Root(){
    const [seed, setSeed]= useState();
    const [allusers, setAllusers]= useState();

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*50000));
    }, []);
    const [posts, setPosts] = useState([]);
    const [curentUser, setCurentUser] = useState([]);
    const [{user}, dispatch]= useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
      db.collection("users")
        .onSnapshot((snapshot) => {
          setAllusers(snapshot.docs.map((doc) => doc.data()));
        });
     
      db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => (
          {
            id: doc.id,
            post:doc.data()
          }
        )))
      })

    }, []);

  // Keep track of which person is currently looged in. This is just a listener
  useEffect(()=>{
    //run once when app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('the user is ', authUser);

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
        setCurentUser(authUser)
      }
      else{
        //user logged out
        dispatch({
          type:'SET_USER',
          user:null
        })

        navigate('/');
      }
    })
  }, []) //anything inside the square bracket on change will relaunch the useEffect

  
  return (
       <div className="App">
          <Routes>
            <Route path='/' element={
              <Fragment>
                <Login/>
              </Fragment>
            }>
            </Route>
            <Route path='/home' element={
              <Fragment>
                <div className='header'>
                  <Header/>
                </div>

                <div className='main'>
                  <div className='posts'>{
                  posts.map(({id, post}) => (
                    <Post key={id} postId={id} username={post.username.split('@')[0]} postImage={post.imageUrl} caption={post.caption}/>
                  ))
                   }
                   </div>
                  <div className='right'>
                    <UserLike username={user?user.email.split('@')[0]:""} switchButton={true}/>
                    <h4>Suggested for you</h4>
                    {
                      allusers?.map((user)=>(
                        <UserLike username={user.username}/>
                      ))
                    }
                    <img src={require('./images/insta-copyright.png')}/>
                  </div>
                </div>
                
              </Fragment>
            }>
              </Route>
          </Routes>
    </div>
  );
}

function App() {
return (
    <Router>
      <Root/>
    </Router>
    
  );
}

export default App;
