import React from 'react'

const Home = ({username}) => (
    <div className='mainpg' >
      <h1 style={{backdropFilter: 'blur(10px)'}}>Welcome to the Chat Application Mr.{username} </h1>
      <p style={{backdropFilter: 'blur(10px)'}}>App where u can create a temporary chat room and chat with your friend</p>
    </div>
  );

export default Home
