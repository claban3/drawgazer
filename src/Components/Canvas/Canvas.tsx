import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { SelectedShape, SelectedAnimation, SketchData, ShapeColors } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';
import { useState } from "react";
import React from "react";
import { Animation } from '../../Types/Animations/Animation';

let defaultColorSettings: ShapeColors = {
    triangle: '#ED1C24',
    rectangle: '#28306D',
    circle: '#36A533', 
};

function sketch (p) {
    let sketchData: SketchData = {
        onPressed: false,
        figs: [],
        points: [],
        colorSettings: defaultColorSettings,
        selectedFigure: SelectedShape.None,
        selectedAnimation: SelectedAnimation.None, 
        bufferWidth: 40,
        bufferHeight: 40,
        canvasHeight: window.innerHeight * 0.75 - 40 /* bufferWidth */,
        canvasWidth: window.innerWidth * 0.85 - 40 /* bufferHeight */,
    };
    
    let reset = false;
    let setClearCanvasInParent = () => {};
    let renderer;

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
        sketchData.canvasHeight = window.innerHeight * 0.75 -  sketchData.bufferHeight;
        sketchData.canvasWidth = window.innerWidth * 0.85 - sketchData.bufferWidth;
        p.resizeCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        sketchData.selectedFigure = props.canvasSettings.selectedFigure;
        sketchData.selectedAnimation = props.canvasSettings.selectedAnimation;
        if (props.canvasSettings.colorSettings) {
            sketchData.colorSettings = props.canvasSettings.colorSettings;
        } else {
            sketchData.colorSettings = defaultColorSettings;
        }
        reset = props.canvasSettings.reset;
        setClearCanvasInParent = props.canvasSettings.resetInParent;
    }

    p.draw = function () {
        if (reset) {
            sketchData.figs = [];
            sketchData.points = [];
            reset = false;
            p.background(255);
            setClearCanvasInParent();
        }

        p.mouseClicked = function (event) {
            // if (event.type == 'touchstart') {
            return Animation.mousePressed(sketchData, p);
        }
        
        p.mouseReleased = function() {
            Animation.mouseReleased(sketchData, p);
            // return false;
        }
        
        Animation.draw(sketchData, p);
    }
}

export default function Canvas(props) {
    return (
         <div className="canvas-container" id="canvas">
                <P5Wrapper 
                    className="p5Wrapper"
                    sketch={sketch}     
                    canvasSettings={props.canvasSettings}/>
        </div>
    ); 
}