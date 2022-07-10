export function Vector(){
    var self = this;

    self.create = function(dx,dy,dz){
        var v = new Float32Array(3);
        v[0]=0;
        v[1]=0;
        v[2]=0;
        if(arguments.length>=1)v[0]=dx;
        if(arguments.length>=2)v[1]=dy;
        if(arguments.length>=3)v[2]=dz;
        return v;
    }

    self.createFrom  = function(prev){
        var v = new Float32Array(3);
        v[0]=prev[0];
        v[1]=prev[1];
        v[2]=prev[2];
        return v;
    }

    self.createFromEndPoints = function(head,tail){
        var v = new Float32Array(3);
        v[0]=head[0]-tail[0];
        v[1]=head[1]-tail[1];
        v[2]=head[2]-tail[2];
        return v;
    }

    self.copy = function(prev,final){
        final[0]=prev[0];
        final[1]=prev[1];
        final[2]=prev[2];
    }

    self.magnitude = function(v){
        return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    }

    self.normalize = function(v){
        var mag = self.magnitude(v);

        if(Math.abs(mag)<0.0000001){
            return null;
        }

        v[0]=v[0]/mag;
        v[1]=v[1]/mag;
        v[2]=v[2]/mag;
        return v;
    }

    self.add = function(ret,v1,v2){
        ret[0]=v1[0]+v2[0];
        ret[1]=v1[1]+v2[1];
        ret[2]=v1[2]+v2[2];
    }
    
    self.subtract = function(ret,v1,v2){
        ret[0]=v1[0]-v2[0];
        ret[1]=v1[1]-v2[1];
        ret[2]=v1[2]-v2[2];
    }

    self.crossProduct = function(ret,v1,v2){
        ret[0]=v1[1]*v2[2]-v1[2]*v2[1];
        ret[1]=v1[2]*v2[0]-v1[0]*v2[2];
        ret[2]=v1[0]*v2[1]-v1[1]*v2[0];
    }

    self.dotProduct = function(v1,v2){
        return (v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2]);
        // ((self.magnitude(v1))*(self.magnitude(v2)));
    }

    
}