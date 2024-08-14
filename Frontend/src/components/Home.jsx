import React from 'react'

const Home = ({username}) => (
    <div className='mainpg'style={{backdropFilter: 'blur(10px)'}} >
      <h1>Welcome to the Chat Application Mr.{username} </h1>
      <p>App where u can create a temporary chat room and chat with your friend</p>
    </div>
  );

export default Home
