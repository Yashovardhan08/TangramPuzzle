import { Program } from './lib/programs.js';
import { Point } from './lib/primitives.js';
import { getRandomPrimitiveList, getSquare, getTriangle,getRectangle,getBoundingVertices } from './lib/helper.js';
import {drawPrimitives,drawPrimitivesCentre} from './draw.js';

function main(){
    var canvas = document.getElementById("canvas");
    var canvasF = document.getElementById("fixed-canvas");
    var begin = new Point(100,100),end = new Point(500,500);
    var program = new Program(canvas,["vertex-shader","fragment-shader"]);
    var program1 = new Program(canvasF,["vertex-shader","fragment-shader"]);
    var boundingVertexList = getBoundingVertices();

    var primitiveList = getRandomPrimitiveList(begin,end);
    var positionBuffer = program.createBuffer();
    var positionBuffer1 = program1.createBuffer();
    program.setViewportAndColorBit(0,0,canvas.width,canvas.height);
    program.use();
    drawPrimitives(program,primitiveList,positionBuffer);
    drawPrimitives(program,boundingVertexList,positionBuffer);

    var state = 0,selected = -1,main_shape_selected=-1;

    var globalTranslation = [0, 0];
    var globalAngleInRadians = 0;
    var globalScale = [1, 1];
    function resetPrimitives(){
        for(var i =0;i<primitiveList.length;++i){
            primitiveList[i].reset();
        }
    }
    
    function click_method(event){
        event.preventDefault();
        if(state === 1){
            var minDistance= 1000000,min_index = 0,x = event.clientX-canvasF.width,y = event.clientY;
            console.log("clicked at location",x,y);
            for(var i = 0 ; i<primitiveList.length;++i){
                var centroid = primitiveList[i].getCentroid();
                var distance = Math.sqrt((centroid.x-x)*(centroid.x-x)+(centroid.y-y)*(centroid.y-y));
                if(distance < minDistance){
                    min_index=i;
                    minDistance = distance;
                }
            }
            selected = min_index;
        }
    }
    function keyDown(event){
        console.log(event.code);
        event.preventDefault();
        if(event.key === "m"){
            state = ((state+1)%4);
            console.log(state.toString());
            document.getElementById("text").innerHTML = "Current Mode : "+state.toString();
            if(state === 2){
                resetPrimitives();
            }
            else if(state === 3){
                // remove all primitives;
                primitiveList = getRandomPrimitiveList(begin,end); 
                // reset all variables;
                globalAngleInRadians = 0;
                globalTranslation = [0,0];
                globalScale = [1,1];
                program.gl.clear(program.gl.COLOR_BUFFER_BIT);

            }
            else if(state === 0){
                program.setViewportAndColorBit(0,0,canvas.width,canvas.height);
                program.use();
                drawPrimitives(program,primitiveList,positionBuffer);
                drawPrimitives(program,boundingVertexList,positionBuffer);
            }
            console.log("current state :",state);
        }
        else if(state === 2){
            resetPrimitives();
            if(event.key === "ArrowUp"){
                globalTranslation[1]-=3;
            }
            else if(event.key ==="ArrowDown"){
                globalTranslation[1]+=3;
            }
            else if(event.key === "ArrowRight"){
                globalTranslation[0]+=3;
            }
            else if(event.key === "ArrowLeft"){
                globalTranslation[0]-=3;
            }
            else if(event.key === "["){
                console.log("in bracket right global");
                globalAngleInRadians = globalAngleInRadians + (3*Math.PI/180);
            }
            else if(event.key === "]"){
                console.log("in bracket left global");
                globalAngleInRadians = globalAngleInRadians - (3*Math.PI/180);
            }
            else if(event.key == "+"){
                globalScale[0]+=0.05;
                globalScale[1]+=0.05;
            }
            else if(event.key == "-"){
                globalScale[0]-=0.05;
                globalScale[1]-=0.05;
            }
            drawPrimitivesCentre(program,primitiveList,positionBuffer,globalAngleInRadians,globalScale,globalTranslation);
            drawPrimitives(program,boundingVertexList,positionBuffer);
        }
        else if(state == 1){
            if(event.key === "ArrowUp"){
                primitiveList[selected].translation[1]-=3;
            }
            else if(event.key ==="ArrowDown"){
                primitiveList[selected].translation[1]+=3;
            }
            else if(event.key === "ArrowRight"){
                primitiveList[selected].translation[0]+=3;
            }
            else if(event.key === "ArrowLeft"){
                primitiveList[selected].translation[0]-=3;
            }
            else if(event.key === "["){
                primitiveList[selected].angleInRadians = primitiveList[selected].angleInRadians+(3*Math.PI/180);
            }
            else if(event.key === "]"){
                primitiveList[selected].angleInRadians = primitiveList[selected].angleInRadians-(3*Math.PI/180);
            }
            else if(event.key == "+"){
                primitiveList[selected].scale[0]+=0.05;
                primitiveList[selected].scale[1]+=0.05;
            }
            else if(event.key == "-"){
                primitiveList[selected].scale[0]-=0.05;
                primitiveList[selected].scale[1]-=0.05;
            }
            program.setViewportAndColorBit(0,0,canvas.width,canvas.height);
            program.use();
            drawPrimitives(program,boundingVertexList,positionBuffer);
            drawPrimitives(program,primitiveList,positionBuffer);
            for(var i =0;i<primitiveList.length;++i){
                primitiveList[i].reset();
            }
        }
    }
    canvas.addEventListener("click",click_method);
    document.addEventListener("keydown",keyDown);

    document.getElementById("button").addEventListener("click",(event)=>{
        var radioElements = document.getElementsByName("shape");
        console.log("in button select");
        for (var i = 0; i < radioElements.length; i++) {
            if (radioElements[i].checked){
                main_shape_selected = i;
            }
        }
        console.log("selected ",main_shape_selected);
        program1.setViewportAndColorBit(0,0,canvas.width,canvas.height);
        program1.use();
        if(main_shape_selected === 0){
            drawPrimitives(program1,boundingVertexList,positionBuffer1);
            drawPrimitives(program1,getTriangle(),positionBuffer1);
        }
        if(main_shape_selected === 1){
            drawPrimitives(program1,boundingVertexList,positionBuffer1);
            drawPrimitives(program1,getSquare(),positionBuffer1);
        }
        if(main_shape_selected === 2){
            drawPrimitives(program1,boundingVertexList,positionBuffer1);
            drawPrimitives(program1,getRectangle(),positionBuffer1);
        }
    });
}

main();