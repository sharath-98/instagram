import { dblClick } from '@testing-library/user-event/dist/click';
import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './Header';
import Post from './Post';
import {db} from "./firebase"
function App() {

    const [posts, setPosts] = useState([]);

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

  return (
    <Router>
    <div className="App">
          <Routes>
            <Route path='/' element={
              <Fragment>
                <Header/>
                {
                  posts.map(({id, post}) => (
                    <Post key={id} username={post.username} postImage={post.imageURL} caption={post.caption}/>
                  ))
                }
              </Fragment>
            }>
            </Route>
          </Routes>
    </div>
    </Router>
    
  );
}

export default App;
