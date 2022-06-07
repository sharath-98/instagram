import { Avatar, Box, Button, IconButton, makeStyles, Modal, Typography } from '@material-ui/core'
import { AddBox, Explore, Facebook, FavoriteBorder, Home, Message, Person, SearchOutlined, Textsms } from '@material-ui/icons'
import React, { useState } from 'react'
import { auth } from './firebase';
import "./Header.css"
import { useStateValue } from './StateProvider';
import { Link, useNavigate} from 'react-router-dom'
import ImageUpload from './ImageUpload';


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
    },
    }
  ));

function Header() {
  const [{user},dispatch]= useStateValue();
  const navigate = useNavigate();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const classes = useStyles();


  const handleSignOut = () =>{
    if(user){
      auth.signOut()
      dispatch({
        type:'SIGN_OUT'
      })
      navigate('/');
    }
  }
  

  return (
    <div className='header'>
        <div className='header_logo'>
            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png'/>
        </div>
        <div className='search'>
          <form>
            <SearchOutlined/>
            <input value=""  type="text" placeholder="Type a message"/>
            <button type="submit"> Search</button>
          </form>
        </div>
        <div className='header_icons'>
          <IconButton><Home/></IconButton>
          <IconButton><Textsms/></IconButton>
          <IconButton ><AddBox onClick={handleOpen} /></IconButton>
          <IconButton><Explore/></IconButton>
          <IconButton><FavoriteBorder/></IconButton>
          <Link to={!user && '/'} className='header_optionLineTwo' >
            <Button onClick={handleSignOut}>{ user ? 'Sign out':'Sign In'}</Button>
          </Link>
          <Modal
              open={open}
              onClose={() => setOpen(false)}
            >
              <div style={modalStyle} className={classes.paper}>
                <div className='image_upload'>
                  <ImageUpload username={user.email}/>
                </div>
              </div>
            </Modal>
        </div>
    </div>
  )
}

export default Header