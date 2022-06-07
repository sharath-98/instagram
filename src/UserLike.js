import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./UserLike.css"

function UserLike({username}) {

    const [seed, setSeed]= useState();

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*50000));
    }, []);

  return (
    <div className='userlike'>
        <div className='userlike_left'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <h4>{username}</h4>
        </div>
        <div className='userlike_right'>
            <Button variant="contained" size='small'>Follow</Button>
        </div>
        
    </div>
  )
}

export default UserLike