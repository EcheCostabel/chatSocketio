import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function App() {

  const [ isConnected, setIsConnected ] = useState(false);
  const [ newMessage, setNewMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);


 const handleSubmit = ( e ) => {
  e.preventDefault();
  socket.emit('message', { //le paso ''message'' pq asi lo tengo en el backend
    user: socket.id,
    message: newMessage
  }); 
 };


useEffect(() => {
  socket.on('connect', () => setIsConnected(true));

  socket.on('message', (data) => {
    setMessages(messages => [...messages, data]); 
  
  })

  return () => {
    socket.off('connect');
    socket.off('message');
    }
  },[])


  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>React Chat</h1>
        <input 
          className='border-2 border-zinc-500 p-2 w-full text-black'
          type="text" 
          placeholder='Write your message...' 
          onChange={(e) => setNewMessage(e.target.value)}  
        />

        <button>
          Send
        </button>
        <ul>
          {
            messages.map((message, index) => (
              
              <li key={index} className={
              `my-2 p-2 table text-sm rounded-md ${message.user === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black'} `
                }
                >
              {message.from === socket.id ? 'Me' : message.user}  {message.message}
              </li>
            ))
          }
        </ul>
      </form>
    </div>
  )
};

export default App;