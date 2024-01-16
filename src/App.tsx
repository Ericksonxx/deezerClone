import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

//components
import {Header} from './components/Header'
import {Body} from './components/Body'
import { Player } from './components/Player'


function App() {



  return (
    <div className="App">
      <Header />
      <Body />
      <Player />
    </div>
  );
}

export default App;
