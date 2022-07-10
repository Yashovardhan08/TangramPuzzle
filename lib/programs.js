function compileShader(gl,shaderCode,shaderType){
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader,shaderCode);
    gl.compileShader(shader);
    var result = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
    if(!result){
        throw "error compiling "+String(shaderType)+" shader";
    }
    return shader;
}

function createProgram(gl,vShader,fShader){
    var program = gl.createProgram();

    gl.attachShader(program,vShader);
    gl.attachShader(program,fShader);

    gl.linkProgram(program);

    var result = gl.getProgramParameter(program,gl.LINK_STATUS);
    if(!result){
        throw "error linking programs";
    }
    return program;
}

function createShaderFromScript(gl,scriptId,shaderType){
    var shaderCode=document.getElementById(scriptId);
    if(!shaderCode){
        throw("error: unknown script element" + scriptId);
    }

    shaderCode=shaderCode.text;
    return compileShader(gl,shaderCode,shaderType);
}

export class Program{
    constructor(canvas,scriptIds){
        this.gl = canvas.getContext("webgl");
        if(!this.gl){
            throw "gl context could not be obtained";
        }
        this.vertexShader = createShaderFromScript(this.gl,scriptIds[0],this.gl.VERTEX_SHADER);
        this.fragmentShader = createShaderFromScript(this.gl,scriptIds[1],this.gl.FRAGMENT_SHADER);
        this.program = createProgram(this.gl,this.vertexShader,this.fragmentShader);
    }

    attributeLocation(attributeName){
        return this.gl.getAttribLocation(this.program,attributeName);
    }

    uniformLocation(uniformName){
        return this.gl.getUniformLocation(this.program,uniformName);
    }

    use(){
        this.gl.useProgram(this.program);
    }

    createBuffer(){
        const buffer=this.gl.createBuffer();
        if(!buffer){
            throw new Error("Buffer could not be updated");
        }
        return buffer;
    }

    bindArrayBuffer(buffer,data){
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER,data,this.gl.DYNAMIC_DRAW);
    }

    enableAttributeData(attribLocation,elementPerAttribute,stride,offset){
        this.gl.enableVertexAttribArray(attribLocation);
        this.gl.vertexAttribPointer(attribLocation,elementPerAttribute,this.gl.FLOAT,false,stride,offset);
    }

    drawArrays(numberOfElements,primitiveType){
        this.gl.drawArrays(primitiveType,0,numberOfElements);
    }
    
    setViewportAndColorBit(a,b,c,d){
      this.gl.viewport(a,b,c,d);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}