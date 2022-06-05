import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './Header';
import Post from './Post';

function App() {

    const [posts, setPosts] = useState([
        {
            username:"Sharath Chander Pugazhenthi",
            imageURL:"https://thumbs.dreamstime.com/b/natural-scenery-765585.jpg",
            caption: "Nature's own beauty",
        },
        {
            username:"Sharath Chander Pugazhenthi",
            imageURL:"https://thumbs.dreamstime.com/b/natural-scenery-765585.jpg",
            caption: "Nature's own beauty",
        },
    ]);
  return (
    <Router>
    <div className="App">
          <Routes>
            <Route path='/' element={
              <Fragment>
                <Header/>
                {
                  posts.map(post => (
                    <Post username={post.username} postImage={post.imageURL} caption={post.caption}/>
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
