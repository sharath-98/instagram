import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import "./Post.css"

function Post({username, postImage, caption}) {
  
  return (
    <div className='post'>
        <div className='post_header'>
            <Avatar className='post_avatar' src='' alt="Sharath"/>
            <h3>{username}</h3>
        </div>
        
        <img className='post_image' src={postImage}></img>
        <h4 className='post_caption'><strong>{username} </strong>{caption}</h4>
    </div>
  )
}

export default Post