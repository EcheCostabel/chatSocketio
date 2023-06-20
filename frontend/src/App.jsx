import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function App() {

  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);


 const handleSubmit = ( e ) => {
  e.preventDefault();
  const newMessage = {
    body: message,
    from: 'Me'
  }
  setMessages([...messages, newMessage])
  socket.emit('message', message); //le paso ''message'' pq asi lo tengo en el backend
 };


 useEffect(() => {
  socket.on('message',receiveMessage)
  return () => {
    socket.off('message', receiveMessage)
   }
 }, []);


 const receiveMessage = (message) => setMessages((state) => [...state, message])


  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>React Chat</h1>
        <input 
          className='border-2 border-zinc-500 p-2 w-full text-black'
          type="text" 
          placeholder='Write your message...' 
          onChange={(e) => setMessage(e.target.value)}  
        />

        <button>
          Send
        </button>
        <ul>
          {
            messages.map((message, index) => (
              
              <li key={index} className={
              `my-2 p-2 table text-sm rounded-md ${message.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black'} `
                }
                >
              {message.from === socket.id ? 'Me' : message.from}  {message.body}
              </li>
            ))
          }
        </ul>
      </form>
    </div>
  )
};

export default App;