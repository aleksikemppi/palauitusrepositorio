import React from 'react';
import Courses from './Courses';

const App = () => {
  return (
    <div style={{ margin: '0 auto', width: '50%', fontFamily: 'Arial, sans-serif', textAlign: 'left' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Web development curriculum</h1>
      <Courses />
    </div>
  );
};

export default App;
