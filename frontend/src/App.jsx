import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function App() {

  const messageContainerRef = useRef(null);

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

 const scrollToBottom = () => {
  if (messageContainerRef.current) {
    setTimeout(() => {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const clientHeight = messageContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      messageContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }, 10); // Ajusta el tiempo según sea necesario
  }
};


useEffect(() => {
  socket.on('connect', () => setIsConnected(true));

  socket.on('message', (data) => {
    setMessages(messages => [...messages, data]);
    scrollToBottom(); 
  
  })

  return () => {
    socket.off('connect');
    socket.off('message');
    }
  },[])


  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-sky-700 p-10  sm:w-1/2 h-3/4 rounded-2xl'>
        <h1 className='text-2xl font-bold my-2'>Chat</h1>
        <input 
          className='border-2 border-zinc-500 p-2 w-full text-black rounded-md'
          type="text" 
          placeholder='Escribi tu mensaje...' 
          onChange={(e) => setNewMessage(e.target.value)}  
        />

        <button>
          Enviar
        </button>
        <div ref={messageContainerRef} className='overflow-y-auto h-3/4 scrollbar-thin py-2'>
          <ul>
            {
              messages.map((message, index) => (
                
                <li key={index} className={
                `my-2 p-2 table text-sm rounded-md max-w-1/3 ${message.user === socket.id ? 'bg-sky-900 ml-auto' : 'bg-black'} `
                  }
                  >
                {message.message}
                </li>
              ))
            }
          </ul>

        </div>
      </form>
    </div>
  )
};

export default App;