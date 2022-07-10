import { m3 } from './lib/matrix.js';
import { calculateCentre } from './lib/helper.js';

export function drawPrimitives(program,primitiveList,positionBuffer){
    for(var i=0;i<primitiveList.length;++i){
        var positionData = [];
        var vertexList = primitiveList[i].getVertexList();
        for(var j=0;j<vertexList.length;++j){
            positionData.push(vertexList[j]);
        }
        positionData= new Float32Array(positionData);
        drawScene(program,positionBuffer,positionData,
            primitiveList[i].getColor(),primitiveList[i].getScale(),
            primitiveList[i].getAngleInRadians(),primitiveList[i].getTranslation(),primitiveList[i]);
    }
}

export function drawPrimitivesCentre(program,primitiveList,positionBuffer,globalAngleInRadians,globalScale,globalTranslation){
    var move = calculateCentre(primitiveList);
    for(var i=0;i<primitiveList.length;++i){
        var positionData = [];
        var vertexList = primitiveList[i].getVertexList();
        for(var j=0;j<vertexList.length;++j){
            positionData.push(vertexList[j]);
        }
        positionData= new Float32Array(positionData);
        drawSceneAll(program,positionBuffer,positionData,
            primitiveList[i].getColor(),globalScale,
            globalAngleInRadians,globalTranslation,move);
    }
}

export function drawScene(program,positionBuffer,positionData,color,scale,angleInRadians,translation,primitive){
    program.bindArrayBuffer(positionBuffer,positionData);
    program.enableAttributeData(program.gl.getAttribLocation(program.program,"a_position"),2,0,0);
    program.gl.uniform4fv(program.uniformLocation("u_color"),color);

    var matrixMoveOrigin = m3.translation(-primitive.getCentroid().x,-primitive.getCentroid().y);
    var matrixMoveBackOrigin = m3.translation(primitive.getCentroid().x,primitive.getCentroid().y);
    var matrix = m3.projection(program.gl.canvas.width,program.gl.canvas.height);
    matrix = m3.translate(matrix,translation[0],translation[1]);
    matrix = m3.multiply(matrix,matrixMoveBackOrigin);
    matrix = m3.rotate(matrix,angleInRadians);
    matrix = m3.scale(matrix,scale[0],scale[1]);
    matrix = m3.multiply(matrix,matrixMoveOrigin);

    var matrixLocation  = program.gl.getUniformLocation(program.program,"u_matrix");
    program.gl.uniformMatrix3fv(matrixLocation,false,matrix);
    program.drawArrays(positionData.length/2,program.gl.TRIANGLES);
}

export function drawSceneAll(program,positionBuffer,positionData,color,scale,angleInRadians,translation,move){
    program.bindArrayBuffer(positionBuffer,positionData);
    program.enableAttributeData(program.gl.getAttribLocation(program.program,"a_position"),2,0,0);
    program.gl.uniform4fv(program.uniformLocation("u_color"),color);

    var matrix = m3.projection(program.gl.canvas.width,program.gl.canvas.height);
    matrix = m3.translate(matrix,translation[0],translation[1]);
    matrix = m3.translate(matrix,move[0],move[1]);
    matrix = m3.rotate(matrix,angleInRadians);
    matrix = m3.scale(matrix,scale[0],scale[1]);
    matrix = m3.translate(matrix,-move[0],-move[1]);

    var matrixLocation  = program.gl.getUniformLocation(program.program,"u_matrix");
    program.gl.uniformMatrix3fv(matrixLocation,false,matrix)
    program.drawArrays(positionData.length/2,program.gl.TRIANGLES);
}
