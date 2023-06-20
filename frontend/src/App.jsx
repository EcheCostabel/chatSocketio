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
  socket.emit('message', newMessage.body); //le paso ''message'' pq asi lo tengo en el backend
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
        <input type="text" placeholder='Write your message...' onChange={(e) => setMessage(e.target.value)}  />

        <button>
          Send
        </button>
      </form>
      <ul>
        {
          messages.map((message, index) => (
            
            <li key={index}>
             {message.from === socket.id ? 'Me' : message.from}  {message.body}
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default App;