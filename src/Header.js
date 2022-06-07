import { Avatar, Button, IconButton } from '@material-ui/core'
import { AddBox, Explore, Facebook, FavoriteBorder, Home, Message, Person, SearchOutlined, Textsms } from '@material-ui/icons'
import React from 'react'
import { auth } from './firebase';
import "./Header.css"
import { useStateValue } from './StateProvider';
import { Link, useNavigate} from 'react-router-dom'

function Header() {
  const [{user},dispatch]= useStateValue();
  const navigate = useNavigate();

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
          <IconButton><AddBox/></IconButton>
          <IconButton><Explore/></IconButton>
          <IconButton><FavoriteBorder/></IconButton>
          <Link to={!user && '/'} className='header_optionLineTwo' >
            <Button onClick={handleSignOut}>{ user ? 'Sign Out':'Sign In'}</Button>
          </Link>
        </div>
    </div>
  )
}

export default Header