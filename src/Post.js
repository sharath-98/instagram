import { Avatar, IconButton, Menu, MenuList } from '@material-ui/core'
import { BookmarkBorder, ChatBubbleOutline, EmojiEmotions, FavoriteBorder, List, SendOutlined } from '@material-ui/icons'
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react'
import "./Post.css"

function Post({username, postImage, caption}) {

  const [show, setShow] = useState();
  const [input, setInput] = useState();

  const sendMessage= () =>{

  };
  const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject)
        setInput(input + emojiObject.emoji);
  };
  
  return (
    <div className='post'>
        <div className='post_header'>
          <div className='post_header_left'>
            <Avatar className='post_avatar' src='' alt="Sharath"/>
            <h3>{username}</h3>
          </div>
          <div className='post_header_right'>
            <IconButton><List/></IconButton>
          </div>
            
        </div>
        
        <img className='post_image' src={postImage}></img>
        <div className='post_icons'>
          <div className='post_icons_left'>
            <IconButton><FavoriteBorder/></IconButton>
            <IconButton><ChatBubbleOutline/></IconButton>
            <IconButton><SendOutlined/></IconButton>
          </div>
          <div className='post_icons_right'>
            <IconButton><BookmarkBorder/></IconButton>
          </div>
        </div>
        <h4 className='post_caption'><strong>{username} </strong>{caption}</h4>
        <div className='chat_footer'>
                <EmojiEmotions onClick={()=>{setShow(!show)}}/>
                <form onSubmit={sendMessage}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit"> POST</button>
                </form>
                
        </div>
         <div className='emoji'>
              {
                  show? <EmojiPicker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }}/> : null
              }
          </div>
    </div>
  )
}

export default Post