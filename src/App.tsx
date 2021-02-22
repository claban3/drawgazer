import logo from './logo.svg';
import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import React, { useState } from 'react';
import { ViewType } from './Types/Views';
import HeaderToolbar from './Components/HeaderToolbar/Header';

function App() {
  const [currentView, setCurrentView] = useState(ViewType.Draw);

  function viewSelectionHandler(event, selection : ViewType) {
    setCurrentView(selection)
  }

  switch (currentView) {
    case ViewType.Draw: 
      return ( 
        <div> 
          <HeaderToolbar currentView={currentView} selectionHandler={viewSelectionHandler}/>        
          <Draw/> 
        </div>);

    case ViewType.Settings:
      return (<div> 
          <HeaderToolbar currentView={currentView} selectionHandler={viewSelectionHandler}/>        
          <Settings/> 
        </div>);

    default: 
        return <div>bad</div>
  }
}

export default App;
