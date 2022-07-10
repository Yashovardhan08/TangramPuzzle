import { Point,Quadrilateral,Triangle } from "./primitives.js";

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

export function calculateCentre(primitiveList){
    var count=0,sumX=0,sumY=0;
    for(var i=0;i<primitiveList.length;++i){
        for(var j=0;j<primitiveList[i].vertex.length;++j){
            sumX+=primitiveList[i].vertex[j].x;
            sumY+=primitiveList[i].vertex[j].y;
            count+=1;
        }
    }
    return [sumX/count,sumY/count];
}

export function makeTriangles(side,minHeight,minWidth,maxHeight,maxWidth){
    var ret =[];
    var point = new Point(getRandomIntInclusive(minWidth,maxWidth),getRandomIntInclusive(minHeight,maxHeight));
    console.log(point);
    if(point.x + side <maxWidth){
        if(point.y + side <maxHeight){
            var point2 = new Point(point.x+side,point.y);
            var point3 = new Point(point.x,point.y+side);
            ret.push(new Triangle(point,point2,point3));
        }
        else {
            var point2 = new Point(point.x+side,point.y);
            var point3 = new Point(point.x,point.y-side);
            ret.push(new Triangle(point,point2,point3));
        }
    }
    else {
        if(point.y + side <maxHeight){
            var point2 = new Point(point.x-side,point.y);
            var point3 = new Point(point.x,point.y+side);
            ret.push(new Triangle(point,point2,point3));
        }
        else {
            var point2 = new Point(point.x-side,point.y);
            var point3 = new Point(point.x,point.y-side);
            ret.push(new Triangle(point,point2,point3));
        }
    }
    return ret;
}

export function getRandomPrimitiveList(begin,end,SideLength=200){
    var ret = [],maxHeight = end.y,maxWidth = end.x,minHeight = begin.y,minWidth = begin.x;
    console.log(begin,end);
    console.log(minWidth,maxWidth,minHeight,maxHeight);
    var side = Math.floor(SideLength/Math.sqrt(2));
    // 2 big triangles
    for(var i=0;i<2;++i){
        var temp = makeTriangles(side,minHeight,minWidth,maxHeight,maxWidth);
        ret.push(temp[0]);
    }
    side = Math.floor(SideLength/(Math.sqrt(2)*2));
    // 2 small triangles
    for(var i=0;i<2;++i){
        var temp = makeTriangles(side,minHeight,minWidth,maxHeight,maxWidth);
        ret.push(temp[0]);
    }
    // 1 medium triangle 
    side = Math.floor(SideLength/2);
    var temp = makeTriangles(side,minHeight,minWidth,maxHeight,maxWidth);
    ret.push(temp[0]);
    temp=[];
    // 1 square 
    var side = Math.floor(SideLength/(2*Math.sqrt(2)))
    var point = new Point(getRandomIntInclusive(minWidth,maxWidth),getRandomIntInclusive(minWidth,maxHeight));
    if(point.x + side <maxWidth){
        if(point.y + side <maxHeight){
            var point2 = new Point(point.x+side,point.y);
            var point3 = new Point(point.x+side,point.y+side);
            var point4 = new Point(point.x,point.y+side);
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
        else {
            var point2 = new Point(point.x+side,point.y);
            var point3 = new Point(point.x+side,point.y-side);
            var point4 = new Point(point.x,point.y-side);
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
    }
    else {
        if(point.y + side <maxHeight){
            var point2 = new Point(point.x-side,point.y);
            var point3 = new Point(point.x-side,point.y+side);
            var point4 = new Point(point.x,point.y+side);
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
        else {
            var point2 = new Point(point.x-side,point.y);
            var point3 = new Point(point.x-side,point.y-side);
            var point4 = new Point(point.x,point.y-side);
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
    }
    // 1 parallelogram
    side = Math.floor(SideLength);
    var point = new Point(getRandomIntInclusive(minWidth,maxWidth),getRandomIntInclusive(minHeight,maxHeight));
    if(point.x+(3*side/4)<maxWidth){
        if(point.y + (side/4)<maxHeight){
            var point2 = new Point(point.x+(side/2),point.y);
            var point3 = new Point(point.x+(3*(side)/4),point.y+(side/4));
            var point4 = new Point(point.x+(side/4),point.y+(side/4));
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
        else{
            var point2 = new Point(point.x+(side/2),point.y);
            var point3 = new Point(point.x+(3*(side)/4),point.y-(side/4));
            var point4 = new Point(point.x+(side/4),point.y-(side/4));
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
    }
    else{
        if(point.y + (side/4)<maxHeight){
            var point2 = new Point(point.x-(side/2),point.y);
            var point3 = new Point(point.x-(3*(side)/4),point.y+(side/4));
            var point4 = new Point(point.x-(side/4),point.y+(side/4));
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
        else{
            var point2 = new Point(point.x-(side/2),point.y);
            var point3 = new Point(point.x-(3*(side)/4),point.y-(side/4));
            var point4 = new Point(point.x-(side/4),point.y-(side/4));
            ret.push(new Quadrilateral(point,point2,point3,point4));
        }
    }
    return ret;
}

export function getSquare(l=200){
    var ret =[];
    ret.push(new Quadrilateral(new Point(l/2,l/2),new Point(3*l/4,3*l/4),new Point(l/2,l),new Point(l/4,3*l/4)));
    ret.push(new Quadrilateral(new Point(l,0),new Point(l,l/2),new Point(3*l/4,3*l/4),new Point(3*l/4,l/4)));
    ret.push(new Triangle(new Point(0,0),new Point(0,l),new Point(l/2,l/2)));
    ret.push(new Triangle(new Point(0,0),new Point(l,0),new Point(l/2,l/2)));
    ret.push(new Triangle(new Point(0,l),new Point(l/2,l),new Point(l/4,3*l/4)));
    ret.push(new Triangle(new Point(3*l/4,l/4),new Point(3*l/4,3*l/4),new Point(l/2,l/2)));
    ret.push(new Triangle(new Point(l/2,l),new Point(l,l/2),new Point(l,l)));
    for(var i=0;i<ret.length;++i){
        ret[i].translation = [100,100]
    }
    return ret;
}
export function getTriangle(l=200){
    var ret = [];
    l=(l/Math.sqrt(2));
    ret.push(new Quadrilateral(new Point(l/2,0),new Point(l,0),new Point(l,l/2),new Point(l/2,l/2)));
    ret.push(new Quadrilateral(new Point(3*l/2,0),new Point(2*l,0),new Point(3*l/2,l/2),new Point(l,l/2)));
    ret.push(new Triangle(new Point(0,0),new Point(l/2,0),new Point(l/2,l/2)));
    ret.push(new Triangle(new Point(l,0),new Point(3*l/2,0),new Point(l,l/2)));
    ret.push(new Triangle(new Point(l/2,l/2),new Point(3*l/2,l/2),new Point(l,l)));
    ret.push(new Triangle(new Point(0,0),new Point(l,l),new Point(0,l)));
    ret.push(new Triangle(new Point(0,l),new Point(0,2*l),new Point(l,l)));
    for(var i=0;i<ret.length;++i){
        ret[i].translation = [100,100]
    }
    return ret;
}
export function getRectangle(l=200){
    var ret = [];
    l=(l/Math.sqrt(2));
    ret.push(new Quadrilateral(new Point(l,0),new Point(3*l/2,0),new Point(3*l/2,l/2),new Point(l,l/2)));
    ret.push(new Quadrilateral(new Point(3*l/2,l/2),new Point(2*l,l),new Point(2*l,l/2),new Point(3*l/2,0)));
    ret.push(new Triangle(new Point(2*l,0),new Point(2*l,l/2),new Point(3*l/2,0)));
    ret.push(new Triangle(new Point(l,l),new Point(3*l/2,l/2),new Point(2*l,l)));
    ret.push(new Triangle(new Point(l,l),new Point(3*l/2,l/2),new Point(l,l/2)));
    ret.push(new Triangle(new Point(0,0),new Point(l,0),new Point(l,l)));
    ret.push(new Triangle(new Point(0,0),new Point(0,l),new Point(l,l)));
    for(var i=0;i<ret.length;++i){
        ret[i].translation = [100,100]
    }
    return ret;
}

export function getBoundingVertices(){
    var ret =[];
    ret.push(new Quadrilateral(new Point(100,100),new Point(100,101),new Point(500,101),new Point(500,100)));
    ret.push(new Quadrilateral(new Point(100,100),new Point(101,100),new Point(101,500),new Point(100,500)));
    ret.push(new Quadrilateral(new Point(100,500),new Point(100,501),new Point(500,501),new Point(500,500)));
    ret.push(new Quadrilateral(new Point(500,500),new Point(501,500),new Point(501,100),new Point(500,100)));
    return ret;
}