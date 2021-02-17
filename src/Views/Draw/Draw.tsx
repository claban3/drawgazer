import React, { useState } from "react";
import './Draw.css';
import Canvas from '../../Components/Canvas/Canvas';

export default function Draw(){
    return (
      <div>
        <h1> Drawing Container </h1>
        <Canvas/>
     </div>
    );  
    // Render Toolbar and canvas component
}