import React from 'react';
import './App.scss';
import Navbar from './Components/Navbar';
import SecondNavbar from './Components/SecondNavbar';
import DescriptionBar from './Components/Descriptionbar';
import GridLayout from './Components/Gridlayout';

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <SecondNavbar/>
      <DescriptionBar/>
      <GridLayout/>
    </React.Fragment>
  );
}

export default App;