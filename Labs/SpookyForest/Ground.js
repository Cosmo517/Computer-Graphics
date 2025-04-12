class Ground extends GameObject {
	constructor() {
		super();
        this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];

		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices = [
			-50, 0, -50, 0, 1, 0,
			50,  0, -50, 0, 1, 0,
			-50, 0, 50,  0, 1, 0,
			50,  0, 50,  0, 1, 0 
		];
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}
    
	update() {
		//Do Nothing
	}

	render(program) {
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;
		var type = gl.FLOAT;
		var normalize = false;
		var stride = 6 * Float32Array.BYTES_PER_ELEMENT;
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
        
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
}