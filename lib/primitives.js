import { m3 } from './matrix.js';

export class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
export class Triangle{
    constructor(a,b,c){
        this.vertex = [a,b,c];
        this.color = [Math.random(),Math.random(),Math.random(),1];
        this.translation = [0, 0];
        this.angleInRadians = 0;
        this.scale = [1, 1];
    }
    getVertexList(){
        return [this.vertex[0].x,this.vertex[0].y,
                this.vertex[1].x,this.vertex[1].y,
                this.vertex[2].x,this.vertex[2].y];
    }
    getColor(){
        return [this.color[0],
                this.color[1],
                this.color[2],
                this.color[3]];
    }
    getTranslation(){
        return [this.translation[0],this.translation[1]];
    }
    getAngleInRadians(){
        return this.angleInRadians;
    }
    getScale(){
        return [this.scale[0],this.scale[1]];
    }
    getCentroid(){
        var sumx=0,sumy=0;
        for (let index = 0; index <3 ; index++) {
            sumx += this.vertex[index].x;
            sumy += this.vertex[index].y;
        }
        return new Point(sumx/3,sumy/3);
    }
    setPositionBuffer(buffer){
        this.positionBuffer = buffer;
    }
    reset(){
        var matrixMoveOrigin = m3.translation(-this.getCentroid().x,-this.getCentroid().y);
        var matrixMoveBackOrigin = m3.translation(this.getCentroid().x,this.getCentroid().y);
        var matrix = m3.identity();
        matrix = m3.translate(matrix,this.translation[0],this.translation[1]);
        matrix = m3.multiply(matrix,matrixMoveBackOrigin);
        matrix = m3.rotate(matrix,this.angleInRadians);
        matrix = m3.scale(matrix,this.scale[0],this.scale[1]);
        matrix = m3.multiply(matrix,matrixMoveOrigin);

        for(var i =0;i<this.vertex.length;++i){
            var newX = this.vertex[i].x*matrix[0]+this.vertex[i].y*matrix[3]+matrix[6];
            var newY = this.vertex[i].x*matrix[1]+this.vertex[i].y*matrix[4]+matrix[7];
            this.vertex[i].x=newX;
            this.vertex[i].y=newY;
        }
        this.scale=[1,1];
        this.angleInRadians = 0;
        this.translation = [0,0];
    }
}
export class Quadrilateral{
    constructor(a,b,c,d){
        this.vertex = [a,b,c,d];
        this.color = [Math.random(),Math.random(),Math.random(),1];
        this.translation = [0, 0];
        this.angleInRadians = 0;
        this.scale = [1, 1];
    }
    reset(){
        var matrixMoveOrigin = m3.translation(-this.getCentroid().x,-this.getCentroid().y);
        var matrixMoveBackOrigin = m3.translation(this.getCentroid().x,this.getCentroid().y);
        var matrix = m3.identity();
        matrix = m3.translate(matrix,this.translation[0],this.translation[1]);
        matrix = m3.multiply(matrix,matrixMoveBackOrigin);
        matrix = m3.rotate(matrix,this.angleInRadians);
        matrix = m3.scale(matrix,this.scale[0],this.scale[1]);
        matrix = m3.multiply(matrix,matrixMoveOrigin);

        for(var i =0;i<this.vertex.length;++i){
            var newX = this.vertex[i].x*matrix[0]+this.vertex[i].y*matrix[3]+matrix[6];
            var newY = this.vertex[i].x*matrix[1]+this.vertex[i].y*matrix[4]+matrix[7];
            this.vertex[i].x=newX;
            this.vertex[i].y=newY;
        }
        this.scale=[1,1];
        this.angleInRadians = 0;
        this.translation = [0,0];
    }
    setPositionBuffer(buffer){
        this.positionBuffer = buffer;
    }
    getVertexList(){
        return [this.vertex[0].x,this.vertex[0].y,
                this.vertex[1].x,this.vertex[1].y, 
                this.vertex[2].x,this.vertex[2].y,
                this.vertex[0].x,this.vertex[0].y,
                this.vertex[2].x,this.vertex[2].y, 
                this.vertex[3].x,this.vertex[3].y,
                ];
    }
    getColor(){
        return [this.color[0],
                this.color[1],
                this.color[2],
                this.color[3]];
    }
    getTranslation(){
        return [this.translation[0],this.translation[1]];
    }
    getAngleInRadians(){
        return this.angleInRadians;
    }
    getScale(){
        return [this.scale[0],this.scale[1]];
    }
    getCentroid(){
        var sumx=0,sumy=0;
        for (let index = 0; index <4 ; index++) {
            sumx += this.vertex[index].x;
            sumy += this.vertex[index].y;
        }
        return new Point(sumx/4,sumy/4);
    }
}