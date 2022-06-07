import { Avatar, IconButton, makeStyles, Menu, MenuList, Modal } from '@material-ui/core'
import { BookmarkBorder, ChatBubbleOutline, EmojiEmotions, Favorite, FavoriteBorder, List, SendOutlined } from '@material-ui/icons'
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import firebase from 'firebase';
import "./Post.css"
import UserLike from './UserLike';
import { useStateValue } from './StateProvider';

function getModalStyle(){
  const top=50;
  const left=50;

  return{
    top:`${top}%`,
    left: `${left}%`,
    transform:  `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      height: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid lightgrey',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2,4,3),
      borderRadius: '10px',
    },
    }
  ));

function Post({postId, username, postImage, caption}) {
  const [{user}, dispatch] = useStateValue();
  const [show, setShow] = useState();
  const [input, setInput] = useState();

  const [disabled, setDisabled] = useState(true);
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [checkLike, setCheckLike] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const classes = useStyles();

  useEffect(()=>{
    if(input=="")
      setDisabled(true);
    else
    {
      setDisabled(false);
    }
  },[input]);

  useEffect(()=>{
    let getComments;
    let getLikeCount;
    let getLikeUsers;
    let getLike;

    if(postId){
      getComments = db.collection("posts").doc(postId)
      .collection("comments")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });

      getLikeCount = db.collection("posts").doc(postId)
      .collection("likes")
      .onSnapshot((snapshot) => {
        setLikesCount(snapshot.size);
      });

      getLikeUsers = db.collection("posts").doc(postId)
      .collection("likes")
      .onSnapshot((snapshot) => {
        setLikedUsers(snapshot.docs.map((doc) => doc.data()));
      });

      likedUsers.forEach((user) => {
        if (user.username == username) {
          setCheckLike(true);
        }
      })

    }
    return () => {
      getComments();
      getLikeCount();
      getLikeUsers();
    }
  }, [postId]);

  useEffect(()=>{
      likedUsers.forEach((user) => {
        if (user.username == username) {
          setCheckLike(true);
        }
      })
    },[]);

  const sendMessage= (e) =>{
    e.preventDefault();
    db.collection("posts").doc(postId)
    .collection("comments").add({
      comment:input,
      username:username.split('@')[0],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');
  };

  const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject)
        setInput(input + emojiObject.emoji);
  };

  const [seed, setSeed]= useState();

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*50000));
    }, []);

    

    const handleLike = () =>{
      if(checkLike == false)
      {
        setCheckLike(true);
        db.collection("posts").doc(postId)
        .collection("likes")
        .add({
          username:username
        })
      }
    };
  
  return (
    <div className='post'>
        <div className='post_header'>
          <div className='post_header_left'>
            <Avatar className='post_avatar' alt="Sharath" src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <h3>{username}</h3>
          </div>
          <div className='post_header_right'>
            <IconButton><List/></IconButton>
          </div>
            
        </div>
        
        <img className='post_image' src={postImage}></img>
        <div className='post_icons'>
          <div className='post_icons_left'>
            <IconButton onClick={handleLike}>{checkLike ? <Favorite/>:<FavoriteBorder/>}</IconButton>
            <IconButton><ChatBubbleOutline/></IconButton>
            <IconButton><SendOutlined/></IconButton>
          </div>
          <div className='post_icons_right'>
            <IconButton><BookmarkBorder/></IconButton>
          </div>
        </div>
        <strong onClick={handleOpen} className='post_likes'>{likesCount} Likes</strong>
        <Modal
              open={open}
              onClose={() => setOpen(false)}
            >
              <div style={modalStyle} className={classes.paper}>
                <div className='Likes'>
                  <div className='likeModal'>
                    <h3 className='title'>Likes</h3>
                  </div>
                  {
                    
                    likedUsers.map((user) => (
                      <UserLike username={user.username}/>
                    ))
                  }
                </div>
              </div>
            </Modal>

        <h4 className='post_caption'><strong>{username} </strong>{caption}</h4>

        <div className='post_comments'>
          {
            comments.map((comment) => (
              <p>
                <strong>{comment.username} </strong>{comment.comment}
              </p>
            ))
          }
        </div>

         <div className='emoji'>
              {
                  show? <EmojiPicker onEmojiClick={onEmojiClick} pickerStyle={{ width: '50%', border:'1px solid gray' }}/> : null
              }
          </div>
        <div className='chat_footer'>
                <EmojiEmotions onClick={()=>{setShow(!show)}}/>
                <form onSubmit={sendMessage}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" disabled={disabled}> POST</button>
                </form>
                
        </div>
    </div>
  )
}

export default Post