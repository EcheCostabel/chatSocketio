import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function App() {

  useEffect(() => {

  }, [])


  return (
    <div>Hello World</div>
  )
};

export default App;