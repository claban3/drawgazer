import logo from './logo.svg';
import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import React, { useState } from 'react';
import { ViewType } from './Types/Views';
import HeaderToolbar from './Components/HeaderToolbar/Header';
function App() {
  const [currentView, setCurrentView] = useState(ViewType.Draw);
  const [clearCanvas, setClearCanvas] = useState(false);

  function viewSelectionHandler(event, selection : ViewType) {
    setCurrentView(selection)
  }

  function setClearCanvasHandler() {
    setClearCanvas(!clearCanvas);
  }

  switch (currentView) {
    case ViewType.Draw: 
      return ( 
        <div> 
          <HeaderToolbar currentView={currentView} 
                         resetCanvas={setClearCanvasHandler}
                         selectionHandler={viewSelectionHandler}/>        
          <Draw clearCanvas={clearCanvas} resetInParent={setClearCanvasHandler}/>
        </div>);

    case ViewType.Settings:
      return (<div> 
          <HeaderToolbar currentView={currentView} 
                         resetCanvas={setClearCanvasHandler}
                         selectionHandler={viewSelectionHandler}/>        
          <Settings/> 
        </div>);

    default: 
        return <div>Error, invalid view</div>
  }
}

export default App;
