import React from 'react'
import "./Home.css"
import { User } from '../../App';
interface HomeProps {
  user: User;
}

const home = ({ user }: HomeProps) => {
  return (
    <div className='Home'>
          
      <h1>Welcome, {user.username}</h1>
      
    
     
    </div>
  )
}

export default home
