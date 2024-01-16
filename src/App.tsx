import React from 'react';
import logo from './logo.svg';
import './App.css';
import TagInput from './TagInput';
import { generateDummyData } from './DummyData';

function App() {
  const items = ['Nick Giannopoulos', 'John Doe', 'Jane Smith', 'Alice Johnson'];
  const dummyData = [
    { username: 'JohnDoe', image: 'https://example.com/johndoe.jpg' },
    { username: 'AliceSmith', image: 'https://example.com/alicesmith.jpg' },
    { username: 'BobJohnson', image: 'https://example.com/bobjohnson.jpg' },
    { username: 'EmilyBrown', image: 'https://example.com/emilybrown.jpg' },
    // Add more data as needed
  ];
  return (
    <div className="App">
      <p
      style={{
        fontSize:25,
        color:'blue',
        fontWeight:'bold',

      }}
      >Pick Users </p>
      <TagInput 
      users={generateDummyData(10)}
      />
    </div>
  );
}

export default App;
