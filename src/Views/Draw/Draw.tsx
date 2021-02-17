import React, { useState } from "react";
import './Draw.css';
import Canvas from '../../Components/Canvas/Canvas';

export class Draw extends React.Component {
  render() {
    return (
      <div>
        <h1> Drawing Container </h1>
      <Canvas> </Canvas>
     </div>

    );  
    // Render Toolbar and canvas component
  }
}