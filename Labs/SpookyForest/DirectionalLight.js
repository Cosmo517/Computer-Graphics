class DirectionalLight extends GameObject {
    constructor() {
        super();
        this.lightDirection = [0, 0, 0];
        this.isTrigger = true;
    }

    setLightData(lightData) {
        this.lightDirection = lightData;
    }

    render(program) {
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;
		var type = gl.FLOAT;
		var normalize = false;
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;
		var offset = 0;
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");

		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;
		offset = 3*Float32Array.BYTES_PER_ELEMENT;
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, "scale");
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
        const directionalLightLoc = gl.getUniformLocation(program, 'directionalLightDir');
        gl.uniform3fv(directionalLightLoc, new Float32Array(this.lightDirection));

        //var ibuffer = gl.createBuffer();
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
        //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
        //gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 6);
    }
}