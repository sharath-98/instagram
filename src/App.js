import { dblClick } from '@testing-library/user-event/dist/click';
import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from './Header';
import Post from './Post';
import {auth, db} from "./firebase"
import { Box, Button, makeStyles, Modal, Typography } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import Login from './Login';
import { useStateValue } from './StateProvider';


function Root(){

    const [posts, setPosts] = useState([]);
    const [{user}, dispatch]= useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
    
     
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
                <Header/>
                {
                  posts.map(({id, post}) => (
                    <Post key={id} username={post.username.split('@')[0]} postImage={post.imageUrl} caption={post.caption}/>
                  ))
                }
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
