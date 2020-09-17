import React from 'react';
import { Route } from 'react-router-dom';
import QuizeApp from './QuizeApp';
import QuizeApp1 from './Quize/quize';
function App() {
  return (
    <div>
      <Route exact path='/' component={QuizeApp} />
      <Route exact path='/quize' component={QuizeApp1} />
    </div>
  );
}

export default App;
