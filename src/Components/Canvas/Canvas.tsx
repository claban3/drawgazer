import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { SelectedShape, SelectedAnimation, SketchData } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';
import { useState } from "react";
import React from "react";
import { Animation } from '../../Types/Animations/Animation';


function sketch (p) {
    let sketchData: SketchData = {
        onPressed: false,
        figs: [],
        points: [],
        selectedFigure: SelectedShape.None,
        selectedAnimation: SelectedAnimation.None, 
        bufferWidth: 60,
        canvasHeight: window.innerHeight * 0.90 - 60,
        canvasWidth: window.innerWidth * 0.70 - 60,
    };
    
    let reset = false;
    let setClearCanvasInParent = () => {};
    let renderer ;

    function inCanvas(mouseX, mouseY, width, height) {
        return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    }

    p.setup = function () {
        renderer = p.createCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
        renderer.parent("canvas");
        sketchData.figs = [];
        sketchData.points = [];
    }

    p.windowResized = function () {
        sketchData.canvasHeight = window.innerHeight -  sketchData.bufferWidth;
        sketchData.canvasWidth = window.innerWidth * 0.70 - sketchData.bufferWidth;
        p.resizeCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        sketchData.selectedFigure = props.canvasSettings.selectedFigure;
        sketchData.selectedAnimation = props.canvasSettings.selectedAnimation;
        reset = props.canvasSettings.reset;
        setClearCanvasInParent = props.canvasSettings.resetInParent;
    }

    p.draw = function () {
        if (reset) {
            sketchData.figs = [];
            sketchData.points = [];
            reset = false;
            setClearCanvasInParent();
        }
        
        Animation.draw(sketchData, p);
    }

    p.mousePressed = function () {
        Animation.mousePressed(sketchData, p);
    }

    p.mouseReleased = function () {
        Animation.mouseReleased(sketchData, p);
    }
}

export default function Canvas(props) {
    // props.canvasSettings.selectedAnimation = SelectedAnimation.RadialForce;
    return (
         <div className="canvas-container" id="canvas">
                <P5Wrapper 
                    className="p5Wrapper"
                    sketch={sketch}     
                    canvasSettings={props.canvasSettings}/>
        </div>
    ); 
}