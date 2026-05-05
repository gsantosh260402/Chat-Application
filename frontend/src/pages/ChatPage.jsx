import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function ChatPage() {

  const {logout} = useAuthStore();
  
  return (
    <div className='z-10'>
      <h1>Chatpage</h1>
      <div>
          <button onClick={logout}>Logout</button>
      </div>
    </div>
    
  )
}

export default ChatPage
