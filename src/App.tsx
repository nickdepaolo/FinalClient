import React from 'react';
import './App.css';
import Main from './Components/Main'

const App: React.FunctionComponent = () => {
  
  return (
    <div className="App">
      <h1>App Page</h1>
      <React.Fragment>
      <Main />
    </React.Fragment>
    </div>
  );
}

export default App;