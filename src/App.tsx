import logo from './logo.svg';
import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import React, { useState } from 'react';
import { ViewType } from './Types/Views';
function App() {
  const [currentView, setCurrentView] = useState(ViewType.Draw);

  function viewSelectionHandler(event, selection : ViewType) {
    setCurrentView(selection)
  }

  switch (currentView) {
    case ViewType.Draw: 
      return ( 
        <div> 
          <Draw/>
        </div>);

    case ViewType.Settings:
      return (<div> <Settings/>  </div>);

    default: 
        return <div>Error, invalid view</div>
  }
}

export default App;
